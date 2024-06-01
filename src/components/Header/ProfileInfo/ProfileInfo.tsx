import React, { FC, useEffect, useMemo } from 'react'
import styles from './ProfileInfo.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as NotificationsIcon } from './../../../images/icons/notifications.svg'
import { ReactComponent as VerticalLineIcon } from './../../../images/icons/line.svg'
import { ReactComponent as UpperArrowIcon } from './../../../images/icons/upperArrow.svg'
import { UserPreview } from '../../UserPreview';
import { UserInfo } from '@firebase/auth';
import { Dropdown, MenuProps, Space } from 'antd';
import { Links } from '../../../constants/routes';
import { useNavigate } from 'react-router';
import { endSession, isLoggedIn as getSessionAccessToken } from '../../../utils/api/session';

const loginPlaceholder = 'Вход в аккаунт';


export const ProfileInfo: FC = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const user = useSelector(AuthSelectors.getCurrentUser)
    const user: any = undefined;

    const isLoggedIn = useMemo(() => !!user && getSessionAccessToken(), []);

    // useEffect(() => {
    //     if (!user && isLoggedIn) {
    //         dispatch(AuthActions.getCurrentUser())
    //     }
    // }, [user, isLoggedIn])

    const profileDropdownMenuItems: MenuProps['items'] = useMemo(() => {
        return !!user && isLoggedIn ? [
            {
                key: 'profile',
                label: (
                    <a rel="noopener noreferrer" href={Links.UserProfile}>
                        Мой профиль
                    </a>
                ),
            }, {
                key: 'logout',
                label: (
                    <a rel="noopener noreferrer"
                       onClick={(e) => {
                           e.preventDefault()
                           endSession();
                           navigate(Links.Login)
                       }}>
                        Выйти из профиля
                    </a>
                ),
            }] : [
            {
                key: 'login',
                label: (
                    <a rel="noopener noreferrer"
                       href={Links.Login}>
                        Войти
                    </a>
                ),
            }, {
                key: 'signup',
                label: (
                    <a rel="noopener noreferrer" href={Links.SignUp}>
                        Зарегистрироваться
                    </a>
                ),
            }]
    }, [user, isLoggedIn]);

    return (
        <div className={styles.container}>
            <NotificationsIcon onClick={() => {
                console.log('You have clicked on notifications btn. Congrats!')
            }} />
            <VerticalLineIcon />
            <Dropdown
                overlayClassName={styles.profileDropdown}
                menu={{ items: profileDropdownMenuItems }}
                placement='bottomLeft'
                arrow={false}
                trigger={['click']}
            >
                <div className={styles.profileDropdown}>
                    <UserPreview
                        url={isLoggedIn ? user?.photoURL : undefined}
                        username={isLoggedIn ? user?.displayName : loginPlaceholder}
                        classes={{ wrapperClassName: styles.dropdownUserPreview }} />
                    <UpperArrowIcon />
                </div>
            </Dropdown>
        </div>
    )
}
