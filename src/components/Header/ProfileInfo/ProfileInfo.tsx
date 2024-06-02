import React, { FC, useMemo } from 'react'
import styles from './ProfileInfo.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as NotificationsIcon } from './../../../images/icons/notifications.svg'
import { ReactComponent as VerticalLineIcon } from './../../../images/icons/line.svg'
import { ReactComponent as UpperArrowIcon } from './../../../images/icons/upperArrow.svg'
import { UserPreview } from '../../common/UserPreview';
import { Dropdown, MenuProps } from 'antd';
import { Links } from '../../../constants/routes';
import { useNavigate } from 'react-router';
import { endSession, isLoggedIn as getSessionAccessToken } from '../../../utils/api/session';
import { AuthActions, AuthSelectors } from '../../../redux/reducers/auth';

const loginPlaceholder = 'Вход в аккаунт';


export const ProfileInfo: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(AuthSelectors.getCurrentUser)

    const isLoggedIn = useMemo(() => !!user && getSessionAccessToken(), [user]);

    const onLogout = (e: any) => {
        e.preventDefault()
        endSession();
        dispatch(AuthActions.logout())
        navigate(Links.SignIn)
    }


    const profileDropdownMenuItems: MenuProps['items'] = useMemo(() => {
        return !!user && isLoggedIn ? [
            {
                key: 'profile',
                label: (
                    <div onClick={() => navigate(Links.UserProfile)}>Мой профиль</div>
                ),
            }, {
                key: 'logout',
                label: (
                    <div onClick={onLogout}>Выйти из профиля</div>
                ),
            }] : [
            {
                key: 'signin',
                label: (
                    <div onClick={() => navigate(Links.SignIn)}>Войти</div>
                ),
            }, {
                key: 'signup',
                label: (
                    <div onClick={() => navigate(Links.SignUp)}>Зарегистрироваться</div>
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
                        // url={isLoggedIn ? (!!user?.photoURL?user?.photoURL:undefined) : undefined}
                        username={isLoggedIn ? user?.displayName || '' : loginPlaceholder}
                        classes={{ wrapperClassName: styles.dropdownUserPreview }} />
                    <UpperArrowIcon />
                </div>
            </Dropdown>
        </div>
    )
}
