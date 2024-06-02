import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './SignUpPage.module.scss'
import { SignInUpForm } from '../../components/SignInUpForm';
import { AuthActions } from '../../redux/reducers/auth';
import { Links } from '../../constants/routes';

export const SignUpPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onRegisterSubmit = async (email: string, password: string) => {
        dispatch(AuthActions.signUpRequest({
            email, password, callback: () => {
                navigate(Links.Home)
            }
        }));
    }

    return (
        <div className={styles.container}>
            <SignInUpForm signIn={false} handleSubmit={onRegisterSubmit} />
        </div>
    )
}
