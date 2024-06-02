import React, { FC } from 'react'
import { Tabs as AntdTabs, TabsProps } from 'antd'
import classNames from 'classnames'
import styles from './Tabs.module.scss'

export const Tabs: FC<TabsProps> = (props) => {
    return (
        <AntdTabs
            {...props}
            className={classNames(styles.tabs, props.className)}
        />
    )
}
