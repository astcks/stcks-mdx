import { lazy, Suspense } from 'react';
import './styles/atom-one-dark.min.css';
import './styles/lapis.css'

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