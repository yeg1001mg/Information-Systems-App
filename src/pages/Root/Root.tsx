import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout';

interface RootProps {
    showBreadcrumbs?: boolean
}

const Root: FC<RootProps> = (props) => {
    return (
        <MainLayout {...props}>
            <Outlet />
        </MainLayout>
    )
}

export default Root
