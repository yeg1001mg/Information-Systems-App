import { FC, PropsWithChildren } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer';
import styles from './MainLayout.module.scss'
import { Breadcrumbs } from '../../../components/Breadcrumbs';

const MainLayout: FC<PropsWithChildren> = ({
                                               children,
                                           }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Breadcrumbs />
            <div className={styles.content}>{children}</div>
            <Footer />
        </div>
    )
}

export default MainLayout
