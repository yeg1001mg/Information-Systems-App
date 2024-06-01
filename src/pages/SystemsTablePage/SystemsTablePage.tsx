import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import styles from './SystemsTablePage.module.scss'

export const SystemsTablePage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = {}
    // useSelector(EmployeeSelectors.getUserData)

    return userData ? (
        <div className={styles.container}>SystemsTablePage</div>
    ) : null
}
