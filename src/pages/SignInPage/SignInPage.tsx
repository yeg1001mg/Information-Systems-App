import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './SignInPage.module.scss'
import { AuthActions } from '../../redux/reducers/auth';
import { SignInUpForm } from '../../components/SignInUpForm';
import { Button, ButtonSizes, ButtonTypes } from '../../components/common/Button';
import { notification } from 'antd';
import { Links } from '../../constants/routes';

export const SignInPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLoginSubmit = async (email: string, password: string) => {
        dispatch(AuthActions.signInRequest({
            email, password, callback: () => {
                navigate(Links.Home)
            }
        }));
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: 'Ooops',
            description:
                `Sorry, but you can't use me right now.`,
        });
    };

    return (
        <div className={styles.container}>
            {contextHolder}
            <SignInUpForm signIn handleSubmit={onLoginSubmit} />
            <Button
                className={styles.authBtn}
                type={ButtonTypes.secondary}
                buttonSize={ButtonSizes.big}
                onClick={openNotification}
            >
                Авторизация с использованием ЕС ИФЮЛ
            </Button>
        </div>
    )
}
