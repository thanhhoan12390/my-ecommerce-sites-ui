import classNames from 'classnames/bind';
import { useState } from 'react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faGlobe, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountModal.module.scss';
import Divider from '~/components/Divider/Divider';
import images from '~/assets/images';
import OverLay from '~/components/OverLay/OverLay';

import { AccountModalData } from '~/apiFakeData'; // Fake Data

const cx = classNames.bind(styles);

function AccountModal({ isOpen = false, onClose = () => {} }) {
    const [history, setHistory] = useState([{ data: AccountModalData }]);
    const current = history[history.length - 1];

    const handleBackBtn = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    // Sử lý thêm cấp thấp hơn của Menu đa cấp bậc
    // Nếu child có số phần tử của field children > 0 thì tiếp tục check:
    /**
     *  Nếu child có số phần tử của field children > 0 thì tiếp tục duyệt qua số phần tử
     *  của field children của child ( child.children hay gọi tắt là subchild)
     *  Nếu subchild có số lượng phần tử của field children > 0 thì thêm child.children
     *  làm cấp tiếp theo của Menu: setHistory((prev) => [...prev, { data: child.children }]);
     *  Ngược lại thêm child làm cấp tiếp theo của Menu: setHistory((prev) => [...prev, { data: [child] }]);
     */
    const handleAddChild = (child) => {
        if (child.children.length > 0) {
            const isHasSubChild = child.children.some((subChild) => subChild.children.length > 0);

            if (isHasSubChild) {
                return setHistory((prev) => [...prev, { data: child.children }]);
            } else {
                return setHistory((prev) => [...prev, { data: [child] }]);
            }
            // * Optinal chaining (?.)
        }
    };

    // Render title của children của item làm content phía dưới
    // Nếu child không có children thì tạo thẻ a, ngược lại tạo thẻ span và icon đi tiếp
    const renderChildren = (childs) =>
        childs.map((child, index) => {
            const isHasNoChild = child.children.length === 0;

            if (isHasNoChild) {
                return (
                    <li key={index}>
                        <a className={cx('content-item-link')} href={child.to}>
                            {child.title}
                        </a>
                    </li>
                );
            }

            return (
                <li key={index}>
                    <span
                        className={cx('content-child-text')}
                        onClick={() => {
                            handleAddChild(child);
                        }}
                    >
                        {child.title}
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} className={cx('content-child-icon')} />
                </li>
            );
        });

    // Reder title của item làm Heading và title của field children của item làm content phía dưới
    const renderItems = () =>
        current.data.map((item, index) => {
            const hasChildren = item.children.length > 0;

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
        isOpen && (
            <Fragment>
                {/* OverLay */}
                <OverLay className={cx('over-lay')} onClick={onClose} />

                <div className={cx('wrapper')}>
                    {/* Close button */}
                    <FontAwesomeIcon icon={faXmark} className={cx('modal-close-btn')} onClick={onClose} />

                    <header className={cx('modal-header')}>
                        {/* Avatar */}
                        <img src={images.noImage} alt="avatar" className={cx('modal-header-avatar')} />
                        <h3 className={cx('modal-header-text')}>Hello, Hoan</h3>
                    </header>

                    <div className={cx('modal-content')}>
                        {/* Back button */}
                        {history.length > 1 && (
                            <Fragment>
                                <span className={cx('content-back-btn')} onClick={handleBackBtn}>
                                    <FontAwesomeIcon icon={faArrowLeft} className={cx('content-back-icon')} />
                                    MAIN MENU
                                </span>
                                <Divider />
                            </Fragment>
                        )}

                        {/* Render MenuData */}
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
                                        <a href="/" className={cx('help-settings-globe-text')}>
                                            <FontAwesomeIcon icon={faGlobe} className={cx('help-settings-icon')} />
                                            English
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className={cx('help-settings-flag-text')}>
                                            <img
                                                src={images.usFlag}
                                                className={cx('help-settings-flag')}
                                                alt="flag"
                                            ></img>
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
            </Fragment>
        )
    );
}

export default AccountModal;
