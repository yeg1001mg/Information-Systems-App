import React, { FC } from 'react'
import styles from './Footer.module.scss'
import { ReactComponent as LogoIcon } from './../../images/icons/logo.svg'
import { ReactComponent as BankLogoIcon } from './../../images/icons/bankLogo.svg'
import { notification } from 'antd';

export const Footer: FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: 'Ooops',
            description:
                `Sorry, but you can't use this right now.`,
        });
    };

    return (
        <div className={styles.wrapperFooter}>
            {contextHolder}
            <div className={styles.contentRow}>
                <div className={styles.column}>
                    <LogoIcon />
                    <div className={styles.text}>Автоматизированная информационная<br />система «Реестры»</div>
                    <div className={styles.text}>© АИС «Реестры», 2022.<br />Все права защищены.</div>
                </div>
                <div className={styles.column}>
                    <div className={styles.bold}>Техническая поддержка</div>
                    <div className={styles.phones}>
                        <div className={styles.text}>+375 25 111 22 33</div>
                        <div className={styles.text}>+375 29 222 44 55</div>
                        <div className={styles.text}>dev@agsr.by</div>
                        <div className={styles.link} onClick={() => {
                            openNotification();
                        }}>Связаться с поддержкой
                        </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.bold}>Контакты</div>
                    <div className={styles.phones}>
                        <div className={styles.text}>+375 33 112 22 45</div>
                        <div className={styles.text}>+375 29 222 44 88</div>
                        <div className={styles.text}>dev@agsr.by</div>
                        <div className={styles.text}>г. Минск, ул. К.Цеткин, д. 24-705</div>
                    </div>
                </div>
            </div>
            <div className={styles.partnersRow}>
                <BankLogoIcon />
                <div className={styles.partner}>Условный партнёр</div>
                <div className={styles.partner}>Условный партнёр</div>
                <div className={styles.partner}>Условный партнёр</div>
                <div className={styles.partner}>Условный партнёр</div>
            </div>
            <div className={styles.developerRow}>
                © АИС «Реестры»<br />
                Разработчик: ОАО «Агентство сервисизации и реинжиниринга» (г. Минск, ул. К. Цеткин, д. 24–705
                dev@agsr.by)
            </div>
        </div>
    )
}