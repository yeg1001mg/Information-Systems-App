import React, { FC, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer';
import { useNavigate } from 'react-router'
import styles from './ProfilePage.module.scss'
import { AuthSelectors } from '../../redux/reducers/auth';
import { Button, ButtonSizes, ButtonTypes } from '../../components/common/Button';
import { UserPreview } from '../../components/common/UserPreview';
import classNames from 'classnames';
import { TextInput } from '../../components/common/TextInput';
import { EditOutlined } from '@ant-design/icons';


export type GeneralProfileState = {
    firstName: string
    secondName: string
    lastName: string
    identificationNumber: string
    login: string
    email: string
    phoneNumber: string
    currentPassword: string
    newPassword: string
    conformedPassword: string
}


export const ProfilePage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(AuthSelectors.getCurrentUser);

    const onSave = () => {
        console.log('молодец')
    }

    const INITIAL_STATE: GeneralProfileState = {
        firstName: 'firstName',
        secondName: '',
        lastName: '',
        identificationNumber: '',
        login: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        conformedPassword: ''
    }

    const [generalState, setGeneralState] = useState<GeneralProfileState>(INITIAL_STATE)
    const onStateUpdate = (key: keyof GeneralProfileState, value: any) => {
        setGeneralState(currentState =>
            produce(currentState, (draft: any) => {
                draft[key] = value
            })
        );
    }

    const [editContacts, setEditContacts] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const isValidConformedPassword = useMemo(() => generalState.newPassword === generalState.conformedPassword, [generalState.newPassword, generalState.conformedPassword]);
    const isValidPhoneNumber = useMemo(() => generalState.phoneNumber.length ? /^\+375\d{9}$/.test(generalState.phoneNumber) : true, [generalState.phoneNumber]);
    const isValidForm = useMemo(() => isValidConformedPassword && isValidPhoneNumber, [isValidConformedPassword && isValidPhoneNumber]);


    return userData && <div className={styles.container}>
        <div className={styles.FIO}>
            <UserPreview
                username={userData.displayName}
                url={userData.photoURL || ''}
                avatar={{ width: '64px', height: '64px' }}
                classes={{
                    wrapperClassName: styles.userPreviewWrapper,
                    usernameClassName: styles.userPreviewUsername
                }}
            ></UserPreview>
            <div className={styles.statuses}>
                <div className={classNames(styles.card, styles.active)}>Активный</div>
                <div className={classNames(styles.card, styles.user)}>Пользователь</div>
            </div>
        </div>
        <div className={styles.contentCard}>
            <div className={styles.label}>Личные данные</div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <TextInput
                        readOnly
                        required
                        value={generalState.firstName}
                        name={'firstName'}
                        type={'text'}
                        label={'Имя'}
                        placeholder={'Введите имя'}
                        onChange={(value) => onStateUpdate('firstName', value)}
                    />
                    <TextInput
                        readOnly
                        required
                        value={generalState.secondName}
                        name={'secondName'}
                        type={'text'}
                        label={'Отчество'}
                        placeholder={'Введите отчество'}
                        onChange={(value) => onStateUpdate('secondName', value)}
                    />
                    <TextInput
                        readOnly
                        required
                        value={generalState.login}
                        name={'login'}
                        type={'text'}
                        label={'Логин'}
                        placeholder={'Введите логин'}
                        onChange={(value) => onStateUpdate('login', value)}
                    />
                </div>
                <div className={styles.column}>
                    <TextInput
                        readOnly
                        required
                        value={generalState.lastName}
                        name={'lastName'}
                        type={'text'}
                        label={'Фамилия'}
                        placeholder={'Введите фамилию'}
                        onChange={(value) => onStateUpdate('lastName', value)}
                    />
                    <TextInput
                        readOnly
                        required
                        value={generalState.identificationNumber}
                        name={'identificationNumber'}
                        type={'text'}
                        label={'Идентификационный номер*'}
                        placeholder={'Введите идентификационный номер'}
                        onChange={(value) => onStateUpdate('identificationNumber', value)}
                    />
                </div>
            </div>

        </div>
        <div className={styles.contentCard}>
            <div className={styles.label}>
                <>Контакты</>
                <div
                    className={styles.editBtn}
                    onClick={() => setEditContacts(!editContacts)}
                >
                    Редактировать {editContacts && <EditOutlined />}
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <TextInput
                        value={generalState.email}
                        name={'email'}
                        type={'email'}
                        disabled={!editContacts}
                        label={'Адресс электроной почты'}
                        placeholder={'agsr@mail.ru'}
                        onChange={(value) => onStateUpdate('email', value)}
                    />
                </div>
                <div className={styles.column}>
                    <TextInput
                        value={generalState.phoneNumber}
                        name={'phoneNumber'}
                        type={'text'}
                        disabled={!editContacts}
                        label={'Мобильный номер'}
                        errorText={!isValidPhoneNumber ? 'Неправильный формат номера' : ''}
                        placeholder={'+375 29 123 44 55'}
                        onChange={(value) => onStateUpdate('phoneNumber', value)}
                    />
                </div>
            </div>
        </div>
        <div className={styles.contentCard}>
            <div className={styles.label}>
                <>Пароль</>
                <div
                    className={styles.editBtn}
                    onClick={() => setEditPassword(!editPassword)}
                >
                    Редактировать {editPassword && <EditOutlined />}
                </div>
            </div>
            <div className={styles.row}>
                <div className={classNames(styles.column, styles.lonelyColumn)}>
                    <TextInput
                        value={generalState.currentPassword}
                        name={'currentPassword'}
                        type={'password'}
                        readOnly
                        label={'Текущий пароль'}
                        placeholder={'Текущий пароль'}
                        onChange={(value) => onStateUpdate('currentPassword', value)}
                    />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <TextInput
                        value={generalState.newPassword}
                        name={'newPassword'}
                        type={'password'}
                        disabled={!editPassword}
                        label={'Новый пароль'}
                        placeholder={'Введите пароль'}
                        onChange={(value) => onStateUpdate('newPassword', value)}
                    />
                </div>
                <div className={styles.column}>
                    <TextInput
                        value={generalState.conformedPassword}
                        name={'conformedPassword'}
                        type={'password'}
                        disabled={!editPassword}
                        label={'Подтвердите пароль'}
                        placeholder={'Подтвердите пароль'}
                        onChange={(value) => onStateUpdate('conformedPassword', value)}
                        errorText={!isValidConformedPassword ? 'Пароли не совпадают' : ''}
                    />
                </div>

            </div>
        </div>
        <Button
            type={ButtonTypes.primary}
            buttonSize={ButtonSizes.big}
            onClick={onSave}
            className={classNames(styles.saveBtn, { [styles.disabled]: !isValidForm })}
            disabled={!isValidForm}
        >
            Сохранить
        </Button>
    </div>
}