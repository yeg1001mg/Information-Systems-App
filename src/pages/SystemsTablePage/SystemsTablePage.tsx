import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './SystemsTablePage.module.scss'
import { SystemsTableActions } from '../../redux/reducers/systemsTable';
import { NoMockUpTab } from './NoMockUpTab';
import { Tabs } from '../../components/common/Tabs';
import { SystemsTableTab } from './SystemsTableTab';

export const SystemsTablePage: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SystemsTableActions.getTableData())
    }, []);

    const tabs = [
        {
            label: 'Реестры',
            key: 'Registries',
            children: <SystemsTableTab />
        },
        {
            label: 'Электронные сервисы',
            key: 'ElectronicServices',
            children: <NoMockUpTab />,
        },
        {
            label: 'Потребление данных',
            key: 'DataConsumption',
            children: <NoMockUpTab />,
        }, {
            label: 'Справочники',
            key: 'Directories',
            children: <NoMockUpTab />,
        }, {
            label: 'Отчёты',
            key: 'Reports',
            children: <NoMockUpTab />,
        },
    ]

    const [activeTabKey, setActiveTabKey] = useState<string>(tabs[0]?.key || 'Registries')


    return <div className={styles.container}>
        <div className={styles.head}>
            <div className={styles.title}>
                Личный кабинет
            </div>
            <Tabs
                items={tabs}
                activeKey={activeTabKey}
                onChange={(activeKey) => {
                    setActiveTabKey(activeKey)
                }}
            />
        </div>
    </div>
}
