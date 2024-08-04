import classNames from 'classnames/bind';
import { useState } from 'react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faGlobe } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountModal.module.scss';
import Divider from '~/components/Divider/Divider';
import images from '~/assets/images';

import { AccountModalData } from '~/apiFakeData'; // Fake Data

const cx = classNames.bind(styles);

function AccountModal() {
    const [history, setHistory] = useState([{ data: AccountModalData }]);
    const current = history[history.length - 1];

    const handleAddSubChild = (subChild) => {
        if (subChild.children.length > 0) {
            setHistory((prev) => [...prev, { data: [subChild] }]);
        }
    };

    const renderChildren = (child) =>
        child.map((subChild, index) => {
            const isHasNoChild = subChild.children.length === 0;

            if (isHasNoChild) {
                return (
                    <li key={index}>
                        <a className={cx('content-item-link')} href={subChild.to}>
                            {subChild.title}
                        </a>
                    </li>
                );
            }

            return (
                <li key={index}>
                    <span
                        className={cx('content-subchild-text')}
                        onClick={() => {
                            handleAddSubChild(subChild);
                        }}
                    >
                        {subChild.title}
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} className={cx('content-subchild-icon')} />
                </li>
            );
        });

    const renderItems = () =>
        current.data.map((item, index) => {
            const hasChildren = item.children.length > 0;

            // Trường hợp nhiều hơn 4, thêm nút See all
            // const isMoreBtn = item.children.length > 4;

            return (
                <div key={index} className={cx('content-item')}>
                    <h4 className={cx('content-item-title')}>{item.title}</h4>
                    {hasChildren ? (
                        <ul className={cx('content-item-group')}>
                            {renderChildren(item.children)}
                            <Divider />
                        </ul>
                    ) : (
                        <Fragment />
                    )}
                </div>
            );
        });

    return (
        <div className={cx('wrapper')}>
            <header className={cx('modal-header')}>
                {/* Avatar */}
                <img src={images.noImage} alt="avatar" className={cx('modal-header-avatar')} />
                <h3 className={cx('modal-header-text')}>Hello, Hoan</h3>
            </header>

            <div className={cx('modal-content')}>
                {renderItems()}

                {history.length < 2 && (
                    <div className={cx('modal-help-settings')}>
                        <h4 className={cx('help-settings-heading')}>Help & Settings</h4>
                        <ul className={cx('help-settings-group')}>
                            <li>
                                <a href="/" className={cx('help-settings-text')}>
                                    Your Account
                                </a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faGlobe} className={cx('help-settings-icon')} />
                                <a href="/" className={cx('help-settings-globe-text')}>
                                    English
                                </a>
                            </li>
                            <li>
                                <img src={images.usFlag} className={cx('help-settings-flag')} alt="flag"></img>
                                <a href="/" className={cx('help-settings-flag-text')}>
                                    United States
                                </a>
                            </li>
                            <li>
                                <a href="/" className={cx('help-settings-text')}>
                                    Customer Service
                                </a>
                            </li>
                            <li>
                                <a href="/" className={cx('help-settings-text')}>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountModal;
