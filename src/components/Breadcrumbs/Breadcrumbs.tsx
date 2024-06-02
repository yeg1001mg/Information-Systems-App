import React, { FC, useMemo } from 'react'
import styles from './Breadcrumbs.module.scss'
import { ReactComponent as RightArrowIcon } from '../../images/icons/leftArrow.svg'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Links } from '../../constants/routes'
import classNames from 'classnames'

export const Breadcrumbs: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathnames = useMemo(
        () => location.pathname.split('/').filter((x) => x),
        [location]
    )

    const renderBreadcrumbs = useMemo(() => {
        const breadcrumbsItem = (title: string, current: boolean) => (
            <div
                className={classNames(styles.item, {
                    [styles.currentItem]: current,
                })}
                onClick={() => !current && navigate(Links.Home)}
            >
                <RightArrowIcon />
                <>{title}</>
            </div>
        )

        if (pathnames.length === 1) {
            if (Links.Home.includes(pathnames[0])) {
                return breadcrumbsItem('Главная страница', true)
            }
            if (
                Links.SignIn.includes(pathnames[0]) ||
                Links.SignUp.includes(pathnames[0])
            ) {
                return breadcrumbsItem('Вернуться на главную', false)
            }
            if (Links.SystemsTable.includes(pathnames[0])) {
                return (
                    <>
                        {breadcrumbsItem('Главная', false)}
                        {breadcrumbsItem('Личный кабинет', true)}
                    </>
                )
            }
            if (Links.UserProfile.includes(pathnames[0])) {
                return (
                    <>
                        {breadcrumbsItem('Главная', false)}
                        {breadcrumbsItem('Профиль', true)}
                    </>
                )
            }
        }
        return breadcrumbsItem('Вернуться на главную', false)
    }, [pathnames])

    return <div className={styles.container}>{renderBreadcrumbs}</div>
}
