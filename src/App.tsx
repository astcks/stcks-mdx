import { lazy, Suspense } from 'react';

export const App = () => {
  const Page = lazy(() => import("./page.mdx"))
  return (
    <div className="markdown-body">
      <Suspense fallback={<div>loading ...</div>}>
        <Page />
      </Suspense>
    </div>
  )
}