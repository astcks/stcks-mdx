import fs from 'fs-extra';
import path from 'path';
import { visit } from 'unist-util-visit';

const importFrom_regex = /import\s+([^;]+?)\s+from/;
const from_regex = /from\s+['"]([^'"]*)['"]/;

function readDir(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  const list: { name: any; content: any }[] = [];
  files.forEach((file: string) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const subList = readDir(filePath);
      list.push(...subList);
    } else {
      const content = fs.readFileSync(filePath, 'utf-8');
      list.push({ name: file, content });
    }
  });
  return list;
}




export const codeDemoGenerate = () => {
  return async (tree: any, vfile: any) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name === 'CodeBox' && node?.children?.length) {
        if (tree.children) {
          // 获取导入信息和导入文件
          const esmData = tree.children.reduce((list, item) => {
            if (item.type === 'mdxjsEsm') {
              const str = item.value;
              const extractedContent = {
                importContent: '',
                filePath: ''
              };
              const importFrom_matches = str.match(importFrom_regex);
              if (importFrom_matches && importFrom_matches[1]) {
                extractedContent.importContent = importFrom_matches[1].replace(/[\{\}]/g, '').trim();
              }
              const from_matches = str.match(from_regex);
              if (from_matches && from_matches[1]) {
                extractedContent.filePath = from_matches[1];
              }
              if (extractedContent.importContent && extractedContent.filePath) {
                list.push(extractedContent)
              }
            }
            return list;
          }, []).find(item => item?.importContent === node.children[0].name);
          // 拼接路径读取内容
          if (esmData?.filePath) {
            const filePath = path.join(path.parse(vfile?.history?.[0])?.dir, esmData.filePath);
            const dirPath = path.dirname(filePath);
            const list = readDir(dirPath);
            if (list.length) {
              node.attributes.push(
                {
                type: "mdxJsxAttribute",
                name: "sourceData",
                value: JSON.stringify(list),
              });
              node.attributes.push({
                type: "mdxJsxAttribute",
                name: "entryFile",
                value: path.basename(filePath),
              });
            }
          }
        }
      }
    });
  };
};
