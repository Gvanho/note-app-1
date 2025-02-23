import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { lazy, Suspense } from "react"

const EditPanel = lazy(() => import('../editPanel/EditPanel'))
const Welcome = lazy(() => import('../editPanel/Welcome'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Suspense fallback={'加载中'}><Welcome/></Suspense>
      },
      {
        path: 'editPanel',
        element: <Suspense fallback={'加载中'}><EditPanel/></Suspense>
      }
    ]
  }
])

export default router