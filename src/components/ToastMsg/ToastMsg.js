import classNames from 'classnames/bind';

import styles from './ToastMsg.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function ToastMsg({ message, isOpen = false, onClose = () => {} }) {
    const toastRef = useRef();

    useEffect(() => {
        console.log('fdf');
        const timeoutId = setTimeout(() => {
            onClose(false);
        }, 4000);

        return () => {
            clearTimeout(timeoutId);
        };
    });

    return (
        isOpen && (
            <div className={cx('wrapper')}>
                <div ref={toastRef} className={cx('container')}>
                    <FontAwesomeIcon icon={faCircleCheck} className={cx('toast-icon')} />
                    <div className={cx('toast-message')}>
                        <span className={cx('message-title')}>Success</span>
                        <span className={cx('message-text')}>{message}</span>
                    </div>
                    <FontAwesomeIcon icon={faXmark} className={cx('toast-close-icon')} onClick={() => onClose(false)} />
                </div>
            </div>
        )
    );
}

export default ToastMsg;
