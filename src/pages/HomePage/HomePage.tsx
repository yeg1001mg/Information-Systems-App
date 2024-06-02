import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './HomePage.module.scss'
import { AuthActions, AuthSelectors } from '../../redux/reducers/auth'
import { Links } from '../../constants/routes'

export const HomePage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(AuthSelectors.getCurrentUser)

    useEffect(() => {
        !!userData?.uid &&
            dispatch(
                AuthActions.getCurrentUserProfileData({
                    uid: userData?.uid || '',
                })
            )
    }, [userData])

    return (
        <div className={styles.container}>
            {userData ? (
                <>
                    <div
                        className={styles.option}
                        onClick={() => navigate(Links.SystemsTable)}
                    >
                        Личный кабинет
                    </div>
                    <div
                        className={styles.option}
                        onClick={() => navigate(Links.UserProfile)}
                    >
                        Профиль
                    </div>
                    <div
                        className={styles.option}
                        onClick={() => navigate(Links.SignUp)}
                    >
                        Регистрация
                    </div>
                    <div
                        className={styles.option}
                        onClick={() => {
                            dispatch(AuthActions.logout())
                            navigate(Links.SignIn)
                        }}
                    >
                        Выйти из аккаунта
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={styles.option}
                        onClick={() => navigate(Links.SignIn)}
                    >
                        Sign In
                    </div>
                    <div
                        className={styles.option}
                        onClick={() => navigate(Links.SignUp)}
                    >
                        Sign Up
                    </div>
                </>
            )}
        </div>
    )
}
