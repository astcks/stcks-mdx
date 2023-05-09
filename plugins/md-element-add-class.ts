import { visit } from 'unist-util-visit';

export const mdElementAddClass = () => {
  return async (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.properties) {
        node.properties.className = [...(node.properties?.className || []), `md-${node.tagName}`];
      }
      
    });
  }
}