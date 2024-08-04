import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './LanguageMenu.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import LanguageItem from './LanguageItem';
import images from '~/assets/images';
import Divider from '~/components/Divider';

import { languageData } from '~/apiFakeData'; // Fake Data

const cx = classNames.bind(styles);

function LanguageMenu({ children }) {
    return (
        <div>
            <Tippy
                interactive
                offset={[72, -2]}
                render={(attrs) => (
                    <div className={cx('language-menu')} tabIndex="-1" {...attrs}>
                        <MenuWrapper>
                            <span className={cx('language-menu-text')}>
                                Change language <a href="/">Learn more</a>
                            </span>
                            <LanguageItem checked>English - EN</LanguageItem>

                            <Divider className={cx('divider-mleft')} />

                            {languageData.map((languageItem, index) => (
                                <LanguageItem key={index} checked={languageItem.checked}>
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
                                <img src={images.usFlag} alt="US flag" className={cx('language-menu-flag')} />
                                You are shopping on Amazon.com
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
    );
}

LanguageMenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LanguageMenu;
