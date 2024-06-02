import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout';
import { useSelector } from 'react-redux';
import { AuthSelectors } from '../../redux/reducers/auth';
import { endSession, isLoggedIn } from '../../utils/api/session';
import { useNavigate } from 'react-router';
import { Links } from '../../constants/routes';

interface RootProps {
    showBreadcrumbs?: boolean
}

const Root: FC<RootProps> = (props) => {
    const navigate = useNavigate();
    const currentUser = useSelector(AuthSelectors.getCurrentUser);

    useEffect(() => {
        if (!currentUser && isLoggedIn()) {
            endSession();
            navigate(Links.SignIn)
        }
    }, [currentUser]);


    return (
        <MainLayout {...props}>
            <Outlet />
        </MainLayout>
    )
}

export default Root
