import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import routes from './routes'

const Router = () => {
    const router = createBrowserRouter(routes)

    return (
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    )
}

export default Router
