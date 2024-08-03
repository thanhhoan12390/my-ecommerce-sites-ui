import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faLanguage, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { Logo } from '~/components/Icons';
import config from '~/config';
import NavFill from './NavFill';
import AccountMenu from '~/components/AccountMenu';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            {/* Nav with logo*/}
            <div className={cx('nav-belt')}>
                {/* Nav left */}
                <div className={cx('nav-left')}>
                    <Link to={config.routes.home} className={cx('nav-logo-link')}>
                        <Logo width="4.8rem" height="4.8rem" className={cx('nav-logo')} />
                    </Link>
                    <div className={cx('nav-deliver-to')}>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('nav-location')}></FontAwesomeIcon>
                        <div className={cx('nav-text')}>
                            <span>Diliver to</span>
                            <span>Vietnam</span>
                        </div>
                    </div>
                </div>
                {/* Nav fill Component */}
                <NavFill />

                {/* Nav Right */}
                <div className={cx('nav-right')}>
                    <div className={cx('nav-language')}>
                        <FontAwesomeIcon icon={faLanguage} className={cx('nav-language-icon')}></FontAwesomeIcon>
                        <div className={cx('nav-language-text')}>
                            <span>EN</span>
                            <i className={cx('nav-language-down-icon')} />
                        </div>
                    </div>

                    <AccountMenu>
                        <div className={cx('nav-lists-account')}>
                            <div className={cx('nav-lists-account-text')}>
                                <span>Hello, Hoan</span>
                                <span>
                                    Account & Lists <i className={cx('nav-lists-account-icon')} />
                                </span>
                            </div>
                        </div>
                    </AccountMenu>

                    <div className={cx('nav-orders')}>
                        <div className={cx('nav-orders-text')}>
                            <span>Returns</span>
                            <span>& Orders</span>
                        </div>
                    </div>

                    <div className={cx('nav-cart')}>
                        <div className={cx('nav-cart-group')}>
                            <FontAwesomeIcon icon={faCartShopping} className={cx('nav-cart-icon')} />
                            <span className={cx('nav-cart-count')}>0</span>
                        </div>
                        <span className={cx('nav-cart-text')}>Cart</span>
                    </div>
                </div>
            </div>

            {/* Nav Main */}
            <div className={cx('nav-main')}></div>
        </header>
    );
}

export default Header;
