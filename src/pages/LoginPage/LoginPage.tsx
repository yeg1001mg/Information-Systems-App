import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './LoginPage.module.scss'
import { createUser, signInUser } from '../../utils/api/firebaseAPI'
import { startSession, UserType } from '../../utils/api/session'
import { AuthActions } from '../../redux/reducers/auth';
import { SignInUpForm } from '../../components/SignInUpForm';
import { Button, ButtonSizes, ButtonTypes } from '../../components/Button';
import { notification } from 'antd';

export const LoginPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLoginSubmit = (email: string, password: string) => {

        // dispatch(AuthActions.getCurrentUser({ email, password }))
        /* try {
            let loginResponse = await signInUser(email, password)
            startSession(loginResponse.user as UserType)
            navigate('/user')
        } catch (error: any) {
            console.error(error.message)
        } */
    }

    // const onRegisterSubmit = async () => {
    //     try {
    //         let registerResponse = await createUser(email, password)
    //         startSession(registerResponse.user as UserType)
    //         navigate('/user')
    //     } catch (error: any) {
    //         console.error(error.message)
    //     }
    // }

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
            <Button className={styles.authBtn} type={ButtonTypes.secondary} buttonSize={ButtonSizes.big} onClick={openNotification}>Авторизация с
                использованием ЕС ИФЮЛ</Button>
        </div>
    )
}
