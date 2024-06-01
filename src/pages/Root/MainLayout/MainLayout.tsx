import { FC, PropsWithChildren } from 'react'
import { Header } from '../../../components/Header'

interface MainLayoutProps {
    showBreadcrumbs?: boolean
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
                                                                children,
                                                                showBreadcrumbs = true,
                                                            }) => {
    return (
        <div>
            <Header />
            Breadcrumbs
            {/* {showBreadcrumbs && <Breadcrumbs />} */}
            <div>{children}</div>
            {/* <Footer /> */}
        </div>
    )
}

export default MainLayout
