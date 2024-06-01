import React, { FC } from 'react'
import { Links } from '../../../constants/routes'
import styles from './NavMenu.module.scss'
import { useNavigate } from 'react-router'
import classNames from 'classnames'

export const NavMenu: FC = () => {
    const navigate = useNavigate()

    const prepareNavItems = [
        {
            key: 'menu',
            title: 'Меню',
            link: Links.Home,
            disabled: true,
        },
        {
            key: 'questions',
            title: 'Вопросы и ответы',
            link: Links.Home,
            disabled: true,
        },
        {
            key: 'about',
            title: 'Об АИС',
            link: Links.Home,
            disabled: true,
        },
    ]

    return (
        <div className={styles.menu}>
            {prepareNavItems.map((item) => (
                <div
                    key={item.key}
                    className={classNames(styles.menuItem, {
                        [styles.menuItemDisabled]: item.disabled,
                    })}
                    onClick={() => {
                        !item.disabled && navigate(item.link)
                    }}
                >
                    {item.title}
                </div>
            ))}
        </div>
    )
}
