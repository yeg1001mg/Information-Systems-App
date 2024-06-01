import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'
import styles from './ProfilePage.module.scss'
import { endSession, getSession, isLoggedIn } from '../../session'

export const ProfilePage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login')
        }

        let session = getSession()
        // setEmail(session.email);

        console.log('Your access token is: ' + session.accessToken)
    }, [navigate])

    const onLogout = () => {
        endSession()
        navigate('/login')
    }

    const userData = {}
    // useSelector(EmployeeSelectors.getUserData)

    return userData ? <div className={styles.container}>ProfilePage</div> : null
}
