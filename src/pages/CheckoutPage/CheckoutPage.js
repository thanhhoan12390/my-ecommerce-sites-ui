import classNames from 'classnames/bind';

import styles from './Checkout.module.scss';
import { Logo } from '~/components/Icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import config from '~/config';
import Divider from '~/components/Divider';

const cx = classNames.bind(styles);

function CheckoutPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-content')}>
                    <Link to={config.routes.home} className={cx('header-link')}>
                        <Logo width="5.6rem" height="5.6rem" className={cx('header-logo')} />
                    </Link>
                    <h1 className={cx('header-text')}>
                        Checkout (<span>1 item</span>)
                    </h1>
                    <div className={cx('header-img')}>
                        <img src={images.checkoutImg} alt="img" />
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('main-side')}>
                    <div className={cx('main-address')}>
                        <h3 className={cx('address-title')}>
                            <span>1</span> Choose a shipping address
                        </h3>

                        <div className={cx('address-content')}>
                            <div className={cx('address-group')}>
                                <h4 className={cx('address-heading')}>Your address</h4>
                                <Divider />

                                <div className={cx('address-full')}>
                                    <span className={cx('location-icon')}>
                                        <img src={images.locationIconImg} alt="location icon" />
                                    </span>
                                    <span className={cx('address-name')}>Hoan Phan Thanh</span>
                                    <span className={cx('address-street')}>Cộng Hòa Street,</span>
                                    <span className={cx('address-city')}>Hồ Chí Minh City,</span>
                                    <span className={cx('address-zip-code')}>720100,</span>
                                    <span className={cx('address-nation')}>Việt Nam</span>
                                </div>
                            </div>

                            <div className={cx('address-edit')}>
                                <button className={cx('edit-address-btn')}>Edit your address</button>
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className={cx('main-payment')}>
                        <h3 className={cx('payment-title')}>
                            <span>2</span> Payment method
                        </h3>
                        <div className={cx('payment-content')}>
                            <div className={cx('payment-method')}>
                                <h3>Cash on Delivery</h3>
                                <span className={cx('payment-icon')}>
                                    <img src={images.cashOnDeliveryImg} alt="COD img" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Review Item and shipping https://fptshop.com.vn/tin-tuc/thu-thuat/checkout-amazon-la-gi-huong-dan-checkout-amazon-168753 */}
                </div>
                <div className={cx('right-side')}>
                    <div className={cx('right-summary')}>
                        <span className={cx('summary-text')}>
                            Choose a shipping address to continue checking out. You'll still have a chance to review and
                            edit your order before it's final.
                        </span>
                        <Divider />

                        <h4 className={cx('summary-title')}>Order Summary</h4>

                        <div className={cx('summary-group')}>
                            <div className={cx('summary-left')}>
                                <span>items</span>
                                <span>Shipping & handling:</span>
                                <span>Total before tax:</span>
                                <span>Estimated tax to be collected:</span>
                                <span>Import Charges:</span>
                            </div>

                            <div className={cx('summary-right')}>
                                <span>$12.99</span>
                                <span>$32.57</span>
                                <Divider className={cx('summary-divider')} />
                                <span>$45.56</span>
                                <span>$0.00</span>
                                <span>$26.39</span>
                            </div>
                        </div>

                        <Divider />

                        <div className={cx('summary-total')}>
                            <span>Order total:</span>
                            <span>$71.95</span>
                        </div>
                    </div>
                    <div className={cx('right-below')}>
                        <span className={cx('below-text')}>
                            You can track your shipment and view any applicable import fees deposit before placing your
                            order. <span>Learn more</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
