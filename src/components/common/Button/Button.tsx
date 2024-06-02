import React, { ReactNode, useCallback, FC } from 'react'
import classNames from 'classnames'

import './Button.scss'

export enum ButtonTypes {
    primary = 'primary',
    secondary = 'secondary',
}

export enum ButtonSizes {
    small = 'small',
    big = 'big',
}

export interface IButton extends React.HTMLProps<HTMLButtonElement> {
    type?: ButtonTypes
    buttonSize?: ButtonSizes
    icon?: ReactNode
    disabled?: boolean
    className?: string
    children?: ReactNode
    onClick?: () => void
}

export const Button: FC<IButton> = (props) => {
    const {
        type,
        buttonSize,
        icon,
        disabled = false,
        className,
        children,
        onClick,
        ...otherProps
    } = props

    const isDisabled = disabled
    const click = useCallback(() => {
        if (!isDisabled) {
            onClick?.()
        }
    }, [isDisabled, onClick])

    return (
        <button
            {...otherProps}
            style={{
                justifyContent: !icon || !children ? 'center' : 'space-between',
            }}
            className={classNames('button', className, {
                iconOnly: !!icon && !children,
                iconText: !!icon && !!children,
                textOnly: !icon && !!children,
                primary: type === ButtonTypes.primary,
                secondary: type === ButtonTypes.secondary,
                bigButton: buttonSize === ButtonSizes.big,
                smallButton: buttonSize === ButtonSizes.small,
            })}
            disabled={isDisabled}
            onClick={click}
        >
            {icon}
            {!!children && <div>{children}</div>}
        </button>
    )
}
