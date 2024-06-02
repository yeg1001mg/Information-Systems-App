import { FC, PropsWithChildren, useMemo } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import styles from './MainLayout.module.scss'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Links } from '../../../constants/routes'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()
    const pathnames = useMemo(
        () => location.pathname.split('/').filter((x) => x),
        [location]
    )

    return (
        <div className={styles.wrapper}>
            <Header />
            <Breadcrumbs />
            <div
                className={classNames(styles.content, {
                    [styles.grayBackground]: Links.SystemsTable.includes(
                        pathnames[0]
                    ),
                })}
            >
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
