import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faGamepad, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import styles from './Footer.module.scss';
import RelateView from '~/layouts/components/RelatedView';
import { virtualProductItem } from '~/utils/commonFuncs';
import images from '~/assets/images';
import { Logo } from '~/components/Icons';
import { browserLanguageSelector } from '~/redux/selectors';
import LanguageMenu from '../LanguageMenu/LanguageMenu';

import { relatedViewData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function Footer() {
    const browserLanguage = useSelector(browserLanguageSelector);

    const handleBackToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('relate-item-view')}>
                <RelateView data={virtualProductItem(relatedViewData)} />
                <div className={cx('relate-view-line')}></div>
                <br />
            </div>

            <div className={cx('nav-back-to-top')} onClick={handleBackToTop}>
                <span>Back to top</span>
            </div>

            <div className={cx('nav-accessibility', 'grid')}>
                <div className={cx('nav-accessibility-content', 'row')}>
                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                        <div className={cx('accessibility-item')}>
                            <h4 className={cx('accessibility-header')}>Get to Know Us</h4>
                            <ul className={cx('accessibility-list')}>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        About eCommerce site
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Investor Relations
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        ECommerce site Devices
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        ECommerce site Science
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                        <div className={cx('accessibility-item')}>
                            <h4 className={cx('accessibility-header')}>Make Money with Us</h4>
                            <ul className={cx('accessibility-list')}>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Sell products on eCommerce site
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Sell on eCommerce site Business
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Sell apps on eCommerce site
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Become an Affiliate
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Advertise Your Products
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Self-Publish with Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Host an eCommerce site Hub
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        › See More Make Money with Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                        <div className={cx('accessibility-item')}>
                            <h4 className={cx('accessibility-header')}>ECommerce site Payment Products</h4>
                            <ul className={cx('accessibility-list')}>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        ECommerce site Business Card
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Shop with Points
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Reload Your Balance
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        ECommerce site Currency Converter
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                        <div className={cx('accessibility-item')}>
                            <h4 className={cx('accessibility-header')}>Let Us Help You</h4>
                            <ul className={cx('accessibility-list')}>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        ECommerce site and COVID-19
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Your Account
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Your Orders
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Shipping Rates & Policies
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Returns & Replacements
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Manage Your Content and Devices
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className={cx('accessibility-link')}>
                                        Help
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('nav-footer-line')}></div>

            <div className={cx('nav-pad-item-line')}>
                <div className={cx('pad-line-logo')}>
                    <a href="/" className={cx('pad-line-logo-link')}>
                        <Logo height="4.5rem" width="4.5rem" />
                    </a>
                </div>

                <div className={cx('pad-line-group')}>
                    <LanguageMenu>
                        <div className={cx('pad-line-language')}>
                            <FontAwesomeIcon icon={faGlobe} className={cx('pad-line-icon')} />
                            <span>{browserLanguage}</span>
                            <FontAwesomeIcon icon={faArrowsUpDown} className={cx('pad-line-arrow')} />
                        </div>
                    </LanguageMenu>

                    <div className={cx('pad-line-currency')}>
                        <span>$ USD - U.S.Dollar</span>
                    </div>

                    <div className={cx('pad-line-us')}>
                        <img src={images.usFlag} alt="us flag" className={cx('pad-line-flag')} />
                        <span>United State</span>
                    </div>
                </div>
            </div>

            <div className={cx('nav-desc-line', 'grid')}>
                <div className={cx('nav-desc-line-content', 'row')}>
                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ECommerce site Ads</h5>
                                <span>Stream millions of songs</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ECommerce site Ads</h5>
                                <span>Reach customers wherever they spend their time</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>6pm</h5>
                                <span>Score deals on fashion brands </span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>AbeBooks</h5>
                                <span>Books, art & collectibles</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ACX</h5>
                                <span>Audiobook Publishing Made Easy</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Sell on eCommerce site</h5>
                                <span>Start a Selling Account</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ECommerce site Business</h5>
                                <span>Everything For Your Business</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ECommerce siteGlobal</h5>
                                <span>Ship Orders Internationally </span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Home Services</h5>
                                <span>Experienced Pros Happiness Guarantee</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ECommerce site Web Services</h5>
                                <span>Scalable Cloud Computing Services</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Audible</h5>
                                <span>Listen to Books & Original Audio Performances</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Box Office Mojo</h5>
                                <span>Find Movie Box Office Data</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Goodreads</h5>
                                <span>Book reviews & recommendations</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>IMDb</h5>
                                <span>Movies, TV & Celebrities</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>IMDbPro</h5>
                                <span>Get Info Entertainment Professionals Need</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Kindle Direct Publishing</h5>
                                <span>Indie Digital & Print Publishing Made Easy</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Prime Video Direct</h5>
                                <span>Video Distribution Made Easy</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Shopbop</h5>
                                <span>Designer Fashion Brands</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Woot!</h5>
                                <span>Deals and Shenanigans</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Zappos</h5>
                                <span>Shoes & Clothing</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Ring</h5>
                                <span>Smart Home Security Systems</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>eero WiFi</h5>
                                <span>Stream 4K Video in Every Room </span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Blink</h5>
                                <span>Smart Security for Every Home</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>Neighbors App</h5>
                                <span>Real-Time Crime & Safety Alerts</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'l-o-4', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>ECommerce site Subscription Boxes</h5>
                                <span>Top subscription boxes-right to your door</span>
                            </a>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-4', 'c-4')}>
                        <div className={cx('desc-line-item')}>
                            <a href="/" className={cx('desc-line-link')}>
                                <h5>PillPack</h5>
                                <span>Pharmacy Simplified</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('nav-copyright')}>
                <div className={cx('copyright-first-line')}>
                    <ul className={cx('copyright-list')}>
                        <li>
                            <a href="/" className={cx('copyright-link')}>
                                Condiciones de uso
                            </a>
                        </li>
                        <li>
                            <a href="/" className={cx('copyright-link')}>
                                Aviso de privacidad
                            </a>
                        </li>
                        <li>
                            <a href="/" className={cx('copyright-link')}>
                                Aviso de Privacidad de Datos de Salud del Consumidor
                            </a>
                        </li>
                        <li>
                            <a href="/" className={cx('copyright-link')}>
                                Tus opciones de privacidad de los anuncios
                            </a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faGamepad} className={cx('copyright-icon')} />
                        </li>
                    </ul>
                </div>
                <div className={cx('copyright-second-line')}>
                    <span>© 1996-2024 eCommerce site.com, Inc. o sus afiliados</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
