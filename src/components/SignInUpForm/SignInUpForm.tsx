import React, { FC, useEffect, useState } from 'react'
import styles from './SignInUpForm.module.scss'
import { TextInput } from '../common/TextInput'
import { Button, ButtonSizes, ButtonTypes } from '../common/Button'

type SignInUpFormProps = {
    signIn: boolean
    handleSubmit: (email: string, password: string) => void
}

export const SignInUpForm: FC<SignInUpFormProps> = ({
    signIn = true,
    handleSubmit,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email.trim())
    }

    const isValidPassword = (password: string): boolean =>
        !(password.trim().length < 6)

    useEffect(() => {
        if (errorEmail && isValidEmail(email)) {
            setErrorEmail('')
        }
    }, [email])

    useEffect(() => {
        if (errorPassword && isValidPassword(password)) {
            setErrorPassword('')
        }
    }, [password])

    const onSubmit = () => {
        if (!email || !password) {
            setErrorEmail('Please enter your login and password')
            return
        }

        if (!isValidEmail(email)) {
            setErrorEmail('Invalid email format')
            return
        }

        if (!isValidPassword(password)) {
            !signIn &&
                setErrorPassword('Password must contain more than 6 symbols')
            return
        }

        handleSubmit(email, password)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {signIn ? 'Вход' : 'Регистрация'}
            </div>
            <div className={styles.form}>
                <TextInput
                    value={email}
                    name={'login'}
                    type={'email'}
                    label={'Логин'}
                    placeholder={'Введите логин'}
                    onChange={setEmail}
                />
                <TextInput
                    value={password}
                    name={'password'}
                    type={'password'}
                    label={'Пароль'}
                    placeholder={'Введите пароль'}
                    onChange={setPassword}
                />
                {(errorEmail || errorPassword) && (
                    <div className={styles.errorMsg}>
                        {errorEmail || errorPassword}
                    </div>
                )}
                <Button
                    type={ButtonTypes.primary}
                    buttonSize={ButtonSizes.big}
                    onClick={onSubmit}
                >
                    {signIn ? 'Вход' : 'Зарегистрироваться'}
                </Button>
            </div>
        </div>
    )
}
