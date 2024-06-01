import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './LoginPage.module.scss'
import { createUser, signInUser } from '../../utils/api/firebaseAPI'
import { startSession, UserType } from '../../utils/api/session'
import { AuthActions } from '../../redux/reducers/auth';

export const LoginPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onLoginSubmit = async () => {
        if (!email || !password) {
            console.log('Please enter your username and password.')
            return
        }

        dispatch(AuthActions.getCurrentUser({ email, password }))
        /* try {
            let loginResponse = await signInUser(email, password)
            startSession(loginResponse.user as UserType)
            navigate('/user')
        } catch (error: any) {
            console.error(error.message)
        } */
    }

    const onRegisterSubmit = async () => {
        try {
            let registerResponse = await createUser(email, password)
            startSession(registerResponse.user as UserType)
            navigate('/user')
        } catch (error: any) {
            console.error(error.message)
        }
    }
    const userData = {}
    // useSelector(EmployeeSelectors.getUserData)

    return (
        <div className={styles.container}>
            <div>Login</div>
            {/* {error && <Alert severity="error" sx={{my: 2}}>{error}</Alert>} */}
            <div>
                <textarea
                    title='Email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                    title='Password'
                    // type="password"
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <button onClick={onRegisterSubmit}>Login</button> */}
                <button onClick={onLoginSubmit}>Login</button>
                {/* <Box sx={{ mt: 2 }}> */}
                {/*     Don't have an account yet? <Link href="/register">Register</Link> */}
                {/* </Box> */}
            </div>
        </div>
    )
}
