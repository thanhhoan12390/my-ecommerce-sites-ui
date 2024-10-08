import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch để dispatch thunk action creator, useSelector để dùng selector lấy state
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './LanguageMenu.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import LanguageItem from './LanguageItem';
import images from '~/assets/images';
import Divider from '~/components/Divider';
import { languageSelector, browserLanguageSelector } from '~/redux/selectors'; // selector
import { getLanguage, updateLanguage } from '~/layouts/components/Header/headerSlice'; // action creator
import OverLay from '~/components/OverLay/OverLay';

const cx = classNames.bind(styles);

function LanguageMenu({ children, isOpen = false, onOpen = () => {} }) {
    const languageList = useSelector(languageSelector);
    const browserLanguage = useSelector(browserLanguageSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLanguage());
    }, [dispatch]);

    return (
        <div>
            <OverLay className={cx('overlay')} />

            {/* div này để fix warning tippy */}
            <div className={cx('tippy-wrapper')}>
                <Tippy
                    interactive
                    visible={isOpen}
                    offset={[72, -2]}
                    placement="bottom"
                    render={(attrs) => (
                        <div
                            className={cx('language-menu')}
                            tabIndex="-1"
                            {...attrs}
                            onMouseLeave={() => onOpen(false)}
                            onMouseEnter={() => onOpen(true)}
                        >
                            <MenuWrapper>
                                <span className={cx('language-menu-text')}>
                                    Change language <Link to="">Learn more</Link>
                                </span>
                                <LanguageItem
                                    checked={browserLanguage === 'English - EN'}
                                    onClick={() => {
                                        dispatch(updateLanguage('English - EN'));
                                        onOpen(false);
                                    }}
                                >
                                    English - EN
                                </LanguageItem>

                                <Divider className={cx('divider-mleft')} />

                                {languageList.map((languageItem, index) => (
                                    <LanguageItem
                                        key={index}
                                        checked={languageItem.content === browserLanguage}
                                        onClick={() => {
                                            dispatch(updateLanguage(languageItem.content));
                                            onOpen(false);
                                        }}
                                    >
                                        {languageItem.content}
                                    </LanguageItem>
                                ))}

                                <Divider className={cx('divider')} />

                                <span className={cx('language-menu-text')}>
                                    Change currency <Link to="">Learn more</Link>
                                </span>

                                <div className={cx('currency-change')}>
                                    <span>$ - USD - US Dollar</span>
                                    <Link to="">Change</Link>
                                </div>

                                <Divider className={cx('divider')} />

                                <span className={cx('language-menu-text')}>
                                    <img src={images.vnFlag} alt="US flag" className={cx('language-menu-flag')} />
                                    You are shopping on eCommerce site
                                </span>

                                <Link to="" className={cx('change-country-region')}>
                                    Change country/region
                                </Link>
                            </MenuWrapper>
                        </div>
                    )}
                >
                    {children}
                </Tippy>
            </div>
        </div>
    );
}

LanguageMenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LanguageMenu;
