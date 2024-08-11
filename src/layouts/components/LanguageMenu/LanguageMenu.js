import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch để dispatch thunk action creator, useSelector để dùng selector lấy state
import { useEffect, useState } from 'react';

import styles from './LanguageMenu.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import LanguageItem from './LanguageItem';
import images from '~/assets/images';
import Divider from '~/components/Divider';
import { languageSelector } from '~/redux/selectors'; // selector
import { getLanguage, updateLanguage } from '~/layouts/components/Header/headerSlice'; // action creator
import OverLay from '~/components/OverLay/OverLay';

const cx = classNames.bind(styles);

function LanguageMenu({ children }) {
    const [checkedLanguageId, setCheckedLanguageId] = useState(0);

    const languageList = useSelector(languageSelector);

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
                    offset={[72, -2]}
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('language-menu')} tabIndex="-1" {...attrs}>
                            <MenuWrapper>
                                <span className={cx('language-menu-text')}>
                                    Change language <a href="/">Learn more</a>
                                </span>
                                <LanguageItem
                                    checked={checkedLanguageId === 0}
                                    onClick={() => {
                                        setCheckedLanguageId(0);
                                        dispatch(updateLanguage('English - EN'));
                                    }}
                                >
                                    English - EN
                                </LanguageItem>

                                <Divider className={cx('divider-mleft')} />

                                {languageList.map((languageItem, index) => (
                                    <LanguageItem
                                        key={index}
                                        checked={languageItem.id === checkedLanguageId}
                                        onClick={() => {
                                            setCheckedLanguageId(languageItem.id);
                                            dispatch(updateLanguage(languageItem.content));
                                        }}
                                    >
                                        {languageItem.content}
                                    </LanguageItem>
                                ))}

                                <Divider className={cx('divider')} />

                                <span className={cx('language-menu-text')}>
                                    Change currency <a href="/">Learn more</a>
                                </span>

                                <div className={cx('currency-change')}>
                                    <span>$ - USD - US Dollar</span>
                                    <a href="/">Change</a>
                                </div>

                                <Divider className={cx('divider')} />

                                <span className={cx('language-menu-text')}>
                                    <img src={images.vnFlag} alt="US flag" className={cx('language-menu-flag')} />
                                    You are shopping on eCommerce site
                                </span>

                                <a href="/" className={cx('change-country-region')}>
                                    Change country/region
                                </a>
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
