import React, { CSSProperties, FC, useMemo, useState } from 'react'
import styles from './SystemsTableTab.module.scss'
import { useSelector } from 'react-redux';
import { SystemsTableSelectors } from '../../../redux/reducers/systemsTable';
import Search from 'antd/es/input/Search';
import { ReactComponent as ClearIcon } from './../../../images/icons/close.svg'
import { ReactComponent as EyeIcon } from './../../../images/icons/eye.svg'
import { ReactComponent as ExclamationMarkIcon } from './../../../images/icons/exclamationMark.svg'
import { ReactComponent as PlusIcon } from './../../../images/icons/plus.svg'
import { ReactComponent as GridIcon } from './../../../images/icons/grid.svg'
import { ReactComponent as LineSpacingIcon } from './../../../images/icons/Vector.svg'
import { ReactComponent as BookIcon } from './../../../images/icons/book.svg'
import { ReactComponent as BookmarkInABookIcon } from './../../../images/icons/bookmarkInABook.svg'
import { ReactComponent as ServerIcon } from './../../../images/icons/server.svg'
import { ReactComponent as RightArrowIcon } from '../../../images/icons/rightArrow.svg'
import { Button, ButtonSizes, ButtonTypes } from '../../../components/common/Button';
import classNames from 'classnames';
import { Table, } from 'antd';

export const SystemsTableTab: FC = () => {
    const tableData = useSelector(SystemsTableSelectors.getTableData)

    const [activeQuantity, setActiveQuantity] = useState(5);
    const [searchValue, setSearchValue] = useState('');

    const systemsDataSource = useMemo(() => {
        return tableData?.map((system, key) => {
            return {
                key: key,
                ...system
            }
        })
    }, [tableData]);


    const filteredTableData = useMemo(() => {
        return systemsDataSource?.filter(system => system.title.toLowerCase().includes(searchValue.toLowerCase())) || []
    }, [searchValue, systemsDataSource]);


    const onSearch = (value: string) => {
        setSearchValue(value)
    }


    const columnWithIconStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '5px',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
        padding: '10px',
        margin: 0
    }


    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            width: '70%',
            ellipsis: true,
            render: (title: string) => <div
                style={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '24.2px',
                    color: '#272A33',
                    display: 'flex',
                    padding: '10px',
                }}>{title}</div>,
        },
        {
            title: 'metadata',
            dataIndex: 'metadata',
            key: 'metadata',
            width: '10%',
            render: (metadata: number) => <div style={columnWithIconStyle}>
                <BookIcon />
                <div className={styles.label}>{metadata}</div>
                <RightArrowIcon />
            </div>,
        },
        {
            title: 'electronicServices',
            dataIndex: 'electronicServices',
            key: 'electronicServices',
            width: '10%',
            render: (electronicServices: number) => <div style={columnWithIconStyle}>
                <ServerIcon />{electronicServices}<RightArrowIcon />
            </div>,
        }, {
            title: 'directories',
            dataIndex: 'directories',
            key: 'directories',
            width: '10%',
            render: (directories: number) => <div style={columnWithIconStyle}>
                <BookmarkInABookIcon />{directories}<RightArrowIcon />
            </div>,
        },
    ];


    return (
        <div className={styles.container}>
            <div className={styles.searchPanel}>
                <div className={styles.label}>
                    Выбор ИС/СР для внесения метаданных
                </div>
                <Search
                    placeholder='Выберите ИС/СР для внесения метаданных...'
                    allowClear={{ clearIcon: <ClearIcon /> }}
                    enterButton='Показать'
                    onSearch={onSearch}
                />
            </div>
            <div className={styles.buttonsPanel}>
                <div className={styles.group}>
                    <Button
                        icon={<EyeIcon />}
                        type={ButtonTypes.secondary}
                        buttonSize={ButtonSizes.small}
                    >
                        Просмотр ИС/ИР
                    </Button>
                    <Button
                        icon={<ExclamationMarkIcon />}
                        type={ButtonTypes.secondary}
                        buttonSize={ButtonSizes.small}
                    >
                        Доп сведения ИС/ИР
                    </Button>
                    <Button
                        icon={<PlusIcon />}
                        type={ButtonTypes.primary}
                        buttonSize={ButtonSizes.small}
                    >
                        Добавить
                    </Button>
                </div>
                <div className={styles.group}>
                    <GridIcon />
                    <LineSpacingIcon />
                </div>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <div className={styles.label}>Список АИС</div>
                    <div className={styles.quantity}>
                        Показывать по:
                        {
                            [5, 10, 20].map(quantity => <div
                                onClick={() => setActiveQuantity(quantity)}
                                className={classNames(styles.quantityBtn, { [styles.activeQuantityBtn]: activeQuantity === quantity })}>{quantity}</div>)
                        }
                    </div>
                </div>
                <Table
                    columns={columns} dataSource={filteredTableData} showHeader={false} pagination={{
                    position: ['bottomCenter'],
                    total: filteredTableData?.length || 0,
                    pageSize: activeQuantity,
                }} />
            </div>
        </div>
    )
}

