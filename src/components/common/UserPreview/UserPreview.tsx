import React, { FC } from 'react'
import styles from './UserPreview.module.scss'
import { ReactComponent as UserEmptyIcon } from '../../../images/icons/userEmptyIcon.svg'
import classNames from 'classnames'

export interface UserPreviewProps {
    username?: string | null
    classes?: {
        wrapperClassName?: string
        usernameClassName?: string
    }
    url?: string
    avatar?: { width?: string; height?: string }
}

export const UserPreview: FC<UserPreviewProps> = ({
    classes,
    username,
    url,
    avatar,
}) => {
    return (
        <div
            className={classNames(classes?.wrapperClassName, styles.container)}
        >
            {url ? (
                <img
                    height={avatar?.height || 48}
                    width={avatar?.width || 48}
                    alt='user'
                    src={url}
                />
            ) : (
                <UserEmptyIcon
                    height={avatar?.height || 48}
                    width={avatar?.width || 48}
                />
            )}
            <div
                className={classNames(
                    styles.nameBlock,
                    classes?.usernameClassName
                )}
            >
                {username || 'Имя Фамилия'}
            </div>
        </div>
    )
}
