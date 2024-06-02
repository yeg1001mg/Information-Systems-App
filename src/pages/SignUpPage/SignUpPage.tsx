import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './SignUpPage.module.scss'
import { createUser, signInUser } from '../../utils/api/firebaseAPI'
import { startSession, UserType } from '../../utils/api/session'
import { AuthActions } from '../../redux/reducers/auth';
import { SignInUpForm } from '../../components/SignInUpForm';
import { Button, ButtonSizes, ButtonTypes } from '../../components/Button';

export const SignUpPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onRegisterSubmit = async (email: string, password: string) => {
        console.log(email, password)

        // try {
        //     let registerResponse = await createUser(email, password)
        //     startSession(registerResponse.user as UserType)
        //     navigate('/user')
        // } catch (error: any) {
        //     console.error(error.message)
        // }
    }

    return (
        <div className={styles.container}>
            <SignInUpForm signIn={false} handleSubmit={onRegisterSubmit} />
        </div>
    )
}
