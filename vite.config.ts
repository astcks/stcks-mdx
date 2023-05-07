import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import codesandbox from 'remark-codesandbox';
import gfm from 'remark-gfm';
import markGit from "remark-git-contributors";
import remarkToc from 'remark-toc';
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import emoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import addClasses from 'rehype-add-classes';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from '@jsdevtools/rehype-toc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [
        [codesandbox, { mode: 'button' }],
        gfm,
        emoji,
        markGit,
        remarkMath,
        remarkParse,
        remarkRehype,
        [remarkFrontmatter, ['yaml', 'toml']],
        remarkToc,
      ],
      recmaPlugins: [],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        rehypeAutolinkHeadings,
        addClasses,
        rehypeHighlight,
        rehypeStringify,
        [rehypeToc, {
          headings: ['h2', 'h3', 'h4']
        }]
      ]
    }) },
    react()
  ],
})
