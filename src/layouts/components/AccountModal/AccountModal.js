import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faGlobe,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './AccountModal.module.scss';
import Divider from '~/components/Divider/Divider';
import images from '~/assets/images';
import OverLay from '~/components/OverLay/OverLay';

import { AccountModalData } from '~/apiFakeData'; // Fake Data

const cx = classNames.bind(styles);

function AccountModal({ isOpen = false, onClose = () => {} }) {
    const [contentHeight, setContentHeight] = useState('218px');
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
                    <li key={index} className={cx('content-list-item')}>
                        <Link className={cx('content-item-link')} to={child.to}>
                            {child.title}
                        </Link>
                    </li>
                );
            }

            return (
                <li className={cx('content-list-item')} key={index}>
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
                <Fragment key={index}>
                    {/* First menu cover: add 'See all', "see less" button */}
                    {history.length < 2 && (
                        <Fragment>
                            <div className={cx('content-item-first-cover')} style={{ maxHeight: contentHeight }}>
                                <Divider className={cx('first-cover-divider')} />
                                <h4 className={cx('content-item-title')}>{item.title}</h4>
                                {hasChildren ? (
                                    <ul className={cx('content-item-group')}>{renderChildren(item.children)}</ul>
                                ) : (
                                    <Fragment />
                                )}
                            </div>
                            {item.children.length > 4 && contentHeight === '218px' && (
                                <button className={cx('content-more-btn')} onClick={() => setContentHeight('unset')}>
                                    See all
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('content-more-icon')} />
                                </button>
                            )}
                            {item.children.length > 4 && contentHeight === 'unset' && (
                                <button className={cx('content-less-btn')} onClick={() => setContentHeight('218px')}>
                                    See less
                                    <FontAwesomeIcon icon={faChevronUp} className={cx('content-less-icon')} />
                                </button>
                            )}
                        </Fragment>
                    )}

                    {/* nth menu covers */}
                    {history.length >= 2 && (
                        <Fragment>
                            <div key={index} className={cx('content-item')}>
                                <Divider />
                                <h4 className={cx('content-item-title')}>{item.title}</h4>
                                {hasChildren ? (
                                    <ul className={cx('content-item-group')}>{renderChildren(item.children)}</ul>
                                ) : (
                                    <Fragment />
                                )}
                            </div>
                        </Fragment>
                    )}
                </Fragment>
            );
        });

    return (
        <Fragment>
            {/* OverLay */}
            <OverLay className={isOpen ? cx('over-lay') : cx('hidden-overlay')} onClick={onClose} />

            <div className={isOpen ? cx('wrapper', 'visible-modal') : cx('wrapper', 'hidden-modal')}>
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
                        </Fragment>
                    )}

                    {/* Render MenuData */}
                    {renderItems()}

                    {history.length < 2 && (
                        <div className={cx('modal-help-settings')}>
                            <Divider className={cx('first-cover-divider')} />

                            <h4 className={cx('help-settings-heading')}>Help & Settings</h4>
                            <ul className={cx('help-settings-group')}>
                                <li>
                                    <Link to="/" className={cx('help-settings-text')}>
                                        Your Account
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className={cx('help-settings-globe-text')}>
                                        <FontAwesomeIcon icon={faGlobe} className={cx('help-settings-icon')} />
                                        Vietnam
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className={cx('help-settings-flag-text')}>
                                        <img src={images.vnFlag} className={cx('help-settings-flag')} alt="flag"></img>
                                        Viet Nam
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className={cx('help-settings-text')}>
                                        Customer Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className={cx('help-settings-text')}>
                                        Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

AccountModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

export default AccountModal;
