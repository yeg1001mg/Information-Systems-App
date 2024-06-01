import { FC, PropsWithChildren } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer';
import styles from './MainLayout.module.scss'

interface MainLayoutProps {
    showBreadcrumbs?: boolean
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
                                                                children,
                                                                showBreadcrumbs = true,
                                                            }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            Breadcrumbs
            {/* {showBreadcrumbs && <Breadcrumbs />} */}
            <div className={styles.content}>{children}</div>
            <Footer />
        </div>
    )
}

export default MainLayout
