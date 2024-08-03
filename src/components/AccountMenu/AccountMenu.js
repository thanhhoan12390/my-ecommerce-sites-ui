import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './AccountMenu.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import images from '~/assets/images';

import { listsAccountMenuData } from '~/apiFakeData'; // fake Data

const cx = classNames.bind(styles);

function AccountMenu({ children }) {
    return (
        <div>
            <Tippy
                interactive
                offset={[-78, -2]}
                render={(attrs) => (
                    <div className={cx('account-menu')} tabIndex="-1" {...attrs}>
                        <MenuWrapper>
                            <header className={cx('account-header')}>
                                <div className={cx('avatar-group')}>
                                    <img src={images.noImage} alt="avatar" className={cx('avatar')} />
                                    <div className={cx('name-group')}>
                                        <span>Hoan Phan</span>
                                        <span>Account Holder</span>
                                    </div>
                                </div>
                                <div className={cx('manage-profiles')}>
                                    Manage Profiles
                                    <FontAwesomeIcon icon={faChevronRight} className={cx('manage-profiles-icon')} />
                                </div>
                            </header>
                            <div className={cx('account-lists')}>
                                {/* Your Lists */}
                                <div className={cx('your-list')}>
                                    <h4 className={cx('your-list-header')}>Your Lists</h4>
                                    <ul className={cx('your-list-lists')}>
                                        {listsAccountMenuData.ListsData.map((dataItem, index) => (
                                            <li key={index}>
                                                <Link className={cx('your-list-item')} to={dataItem.to}>
                                                    {dataItem.content}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Your Account */}
                                <div className={cx('your-account')}>
                                    <h4 className={cx('your-account-header')}>Your Account</h4>

                                    <ul className={cx('your-account-lists')}>
                                        {listsAccountMenuData.AccountMenuData.map((dataItem, index) => (
                                            <li key={index}>
                                                <Link className={cx('your-account-item')} to={dataItem.to}>
                                                    {dataItem.content}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </MenuWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

AccountMenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccountMenu;
