import React, { FC, useMemo, useState } from 'react'
import { Input } from 'antd'
import styles from './Input.module.scss'
import classNames from 'classnames'
import { EyeOutlined } from '@ant-design/icons';
import { ReactComponent as EyeSlashIcon } from '../../../images/icons/eyeSlash.svg';

export interface ITextInput
    extends Omit<Partial<HTMLInputElement>, 'onchange'> {
    onChange: (value: string) => void
    name: string
    type?: 'email' | 'text' | 'password'
    value?: string
    placeholder?: string
    className?: string
    errorStyles?: Record<string, string>
    label?: JSX.Element | string
    errorText?: string
    required?: boolean
    prefix?: any
    readOnly?: boolean
    allowClear?: boolean
    disabled?: boolean
}

export const TextInput: FC<ITextInput> = (props) => {
    const [initialTriggered, setInitialTriggered] = useState<boolean>(false)

    const {
        onChange,
        type = 'text',
        placeholder,
        name,
        className,
        value,
        label,
        errorText,
        required,
        disabled = false,
        readOnly,
        allowClear,
        prefix,
    } = props

    const innerValidation = useMemo(() => {
        if (required && initialTriggered) {
            return (value?.length || 0) > 0
        }
        return true
    }, [value, initialTriggered, required])

    const isError = (!!errorText && errorText?.length !== 0) || !innerValidation

    return (
        <div className={styles.inputContainer}>
            {!!label && (
                <div
                    className={classNames(styles.label, {
                        [styles.required]: required,
                    })}
                >
                    {label}
                </div>
            )}
            {type === 'password' ? <Input.Password
                autoComplete='off'
                className={className}
                name={name}
                type={type}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                prefix={prefix}
                onBlur={() => setInitialTriggered(true)}
                status={isError ? 'error' : ''}
                allowClear={allowClear}
                showCount={!!props?.maxLength}
                maxLength={props?.maxLength}
                iconRender={(visible: boolean) => (visible ? <EyeOutlined /> : <EyeSlashIcon />)}
            /> : <Input
                autoComplete='off'
                className={className}
                name={name}
                type={type}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                prefix={prefix}
                onBlur={() => setInitialTriggered(true)}
                status={isError ? 'error' : ''}
                allowClear={allowClear}
                showCount={!!props?.maxLength}
                maxLength={props?.maxLength}
            />}
            {(errorText || !innerValidation) && (
                <p
                    className={classNames({
                        [styles.error]: isError,
                    })}
                >
                    {errorText}
                </p>
            )}
        </div>
    )
}
