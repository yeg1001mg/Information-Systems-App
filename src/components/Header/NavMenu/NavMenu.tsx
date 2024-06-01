import React, { FC } from 'react'
import { Links } from '../../../constants/routes'
import styles from './NavMenu.module.scss'
import classNames from 'classnames'
import { notification } from 'antd';

export const NavMenu: FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: 'Ooops',
            description:
                `Sorry, but you can't use me right now.`,
        });
    };

    const prepareNavItems = [
        {
            key: 'menu',
            title: 'Меню',
            link: Links.Home,
            disabled: false,
        },
        {
            key: 'questions',
            title: 'Вопросы и ответы',
            link: Links.Home,
            disabled: false,
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
            {contextHolder}
            {prepareNavItems.map((item) => (
                <div
                    key={item.key}
                    className={classNames(styles.menuItem, {
                        [styles.menuItemDisabled]: item.disabled,
                    })}
                    onClick={() => {
                        !item.disabled && openNotification()
                        // item.disabled && navigate(item.link)
                    }}
                >
                    {item.title}
                </div>
            ))}
        </div>
    )
}
