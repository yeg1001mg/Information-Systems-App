import React, { FC } from 'react'
import styles from './Header.module.scss'
import { ReactComponent as LogoIcon } from './../../images/icons/logo.svg'

import { ProfileInfo } from './ProfileInfo'
import { NavMenu } from './NavMenu'
import { useNavigate } from 'react-router'
import { Links } from '../../constants/routes'

export const Header: FC = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapperHead}>
            <LogoIcon
                height={40}
                className={styles.logo}
                onClick={() => navigate(Links.Home)}
            />
            <NavMenu />
            <ProfileInfo />
        </div>
    )
}
