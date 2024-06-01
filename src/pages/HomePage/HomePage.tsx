import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './HomePage.module.scss'

export const HomePage: FC = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = {}
    // useSelector(EmployeeSelectors.getUserData)

    return userData ? <div className={styles.container}>HomePage</div> : null
}
