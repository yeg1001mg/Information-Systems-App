import { Links } from '../constants/routes'
import { Navigate } from 'react-router-dom'
import { ProfilePage } from '../pages/ProfilePage'
import Root from '../pages/Root/Root'
import { SystemsTablePage } from '../pages/SystemsTablePage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage';

const routes = [
    {
        element: <Root />,
        children: [
            {
                path: Links.Home,
                element: <HomePage />,
            },
            {
                path: Links.Login,
                element: <LoginPage />,
            }, {
                path: Links.SignUp,
                element: <SignUpPage />,
            },
            {
                path: Links.UserProfile,
                element: <ProfilePage />,
            },
            {
                path: Links.SystemsTable,
                element: <SystemsTablePage />,
            },
            {
                path: Links.NonExistent,
                element: <Navigate to={Links.Home} replace />,
            },
        ],
    },
]

export default routes
