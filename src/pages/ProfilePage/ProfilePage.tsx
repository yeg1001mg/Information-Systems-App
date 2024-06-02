import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'
import styles from './ProfilePage.module.scss'
import { AuthSelectors } from '../../redux/reducers/auth';

export const ProfilePage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(AuthSelectors.getCurrentUser);

    return userData ? <div className={styles.container}>ProfilePage</div> : null
}
