import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faLanguage, faList, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Header.module.scss';
import { Logo } from '~/components/Icons';
import config from '~/config';
import NavFill from '~/layouts/components/NavFill';
import AccountMenu from '~/layouts/components/AccountMenu';
import LanguageMenu from '~/layouts/components/LanguageMenu';
import DeliverModal from '~/layouts/components/DeliverModal';
import AccountModal from '../AccountModal/AccountModal';
import { browserLanguageSelector, cartSelector, deliverNationSelector } from '~/redux/selectors';
import { getCart } from '~/pages/CartPage/cartPageSlice';

const cx = classNames.bind(styles);

function Header() {
    const [isOpenDeliverModal, setIsOpenDeliverModal] = useState(false);
    const [isOpenAccountModal, setIsOpenAccountModal] = useState(false);
    const [isOpenAccountMenu, setIsOpenAccountMenu] = useState(false);
    const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false);

    const dispatch = useDispatch();

    const browserLanguage = useSelector(browserLanguageSelector);
    const deliverNation = useSelector(deliverNationSelector);
    const cart = useSelector(cartSelector);

    const languageKey = useMemo(() => browserLanguage.slice(-2), [browserLanguage]);

    const cartCount = useMemo(() => {
        if (!!cart) {
            const count = cart.reduce((totalItem, item) => totalItem + item.quantity, 0);
            return count;
        } else return 0;
    }, [cart]);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <header className={cx('wrapper')}>
            {/* Nav with logo*/}
            <div className={cx('nav-belt')}>
                {/* Nav left */}
                <div className={cx('nav-left')}>
                    <Link to={config.routes.home} className={cx('nav-logo-link')}>
                        <Logo width="6.4rem" height="6.4rem" className={cx('nav-logo')} />
                    </Link>
                    <div className={cx('nav-deliver-to')} onClick={() => setIsOpenDeliverModal(true)}>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('nav-location')}></FontAwesomeIcon>
                        <div className={cx('nav-text')}>
                            <span>Deliver to</span>
                            <span>{deliverNation}</span>
                        </div>
                    </div>
                </div>
                {/* Nav fill Component */}
                <NavFill />

                {/* Nav Right */}
                <div className={cx('nav-right')}>
                    <LanguageMenu isOpen={isOpenLanguageMenu} onOpen={setIsOpenLanguageMenu}>
                        <div
                            className={cx('nav-language')}
                            onMouseEnter={() => setIsOpenLanguageMenu(true)}
                            onMouseLeave={() => setIsOpenLanguageMenu(false)}
                        >
                            <FontAwesomeIcon icon={faLanguage} className={cx('nav-language-icon')}></FontAwesomeIcon>
                            <div className={cx('nav-language-text')}>
                                <span>{languageKey}</span>
                                <i className={cx('nav-language-down-icon')} />
                            </div>
                        </div>
                    </LanguageMenu>

                    <AccountMenu isOpen={isOpenAccountMenu} onOpen={setIsOpenAccountMenu}>
                        <div
                            className={cx('nav-lists-account')}
                            onMouseEnter={() => setIsOpenAccountMenu(true)}
                            onMouseLeave={() => setIsOpenAccountMenu(false)}
                        >
                            <div className={cx('nav-lists-account-text')}>
                                <span>Hello, Hoan</span>
                                <span>
                                    Account & Lists <i className={cx('nav-lists-account-icon')} />
                                </span>
                            </div>
                        </div>
                    </AccountMenu>

                    <Link to={config.routes.order} className={cx('nav-orders')}>
                        <div className={cx('nav-orders-text')}>
                            <span>Returns</span>
                            <span>& Orders</span>
                        </div>
                    </Link>

                    <Link to={config.routes.cartPage} className={cx('nav-cart')}>
                        <div className={cx('nav-cart-group')}>
                            <FontAwesomeIcon icon={faCartShopping} className={cx('nav-cart-icon')} />
                            <span className={cx('nav-cart-count')}>{cartCount}</span>
                        </div>
                        <span className={cx('nav-cart-text')}>Cart</span>
                    </Link>
                </div>

                {/* Deliver Modal */}
                <DeliverModal isOpen={isOpenDeliverModal} onClose={() => setIsOpenDeliverModal(false)} />
            </div>

            {/* Nav Main */}
            <div className={cx('nav-main')}>
                <div className={cx('nav-main-item')} onClick={() => setIsOpenAccountModal(true)}>
                    <FontAwesomeIcon icon={faList} className={cx('nav-main-all-icon')} />
                    <h4 className={cx('nav-main-all-text')}>All Options</h4>
                </div>
                <div className={cx('nav-main-item')}>
                    <Link to={config.routes.todayDeal} className={cx('nav-main-link')}>
                        Today's Deals
                    </Link>
                </div>
                {/* <div className={cx('nav-main-item')}>
                    <Link to="/" className={cx('nav-main-link')}>
                        Buy Again
                    </Link>
                </div> */}
                {/* <div className={cx('nav-main-item')}>
                    <Link to="/" className={cx('nav-main-link')}>
                        Gift Cards
                    </Link>
                </div> */}
                {/* <div className={cx('nav-main-item')}>
                    <Link to="/" className={cx('nav-main-link')}>
                        Registry
                    </Link>
                </div> */}
                <div className={cx('nav-main-item')}>
                    <Link to={config.routes.recommend} className={cx('nav-main-link')}>
                        Hoan's eCommerce site
                    </Link>
                </div>
                {/* <div className={cx('nav-main-item')}>
                    <Link to="/" className={cx('nav-main-link')}>
                        Customer Service
                    </Link>
                </div> */}
                <div className={cx('nav-main-item')}>
                    <Link to={config.routes.viewHistory} className={cx('nav-main-link')}>
                        Browsing History
                    </Link>
                </div>
            </div>

            {/* Account Modal */}
            <AccountModal isOpen={isOpenAccountModal} onClose={() => setIsOpenAccountModal(false)} />
        </header>
    );
}

export default Header;
