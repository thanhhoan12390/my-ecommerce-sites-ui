import classNames from 'classnames/bind';
import { faChevronDown, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './ViewProduct.module.scss';
import StarRating from '~/components/StarRating';
import Divider from '~/components/Divider';
import images from '~/assets/images';
import { deliverNationSelector } from '~/redux/selectors';

import { productsData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function ViewProduct() {
    const [colorChoice, setColorChoice] = useState('Black');

    const deliverNation = useSelector(deliverNationSelector);

    const { productId } = useParams();

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [productId]);

    // Vì productId lấy trả về kiểu string nên dùng mẹo thêm dấu cộng phía trước để convert về number
    const product = useMemo(() => productsData.find((item) => item.id === +productId), [productId]);

    const price = useMemo(
        () => (product.typicalPrice - (product.typicalPrice * product.saleOff) / 100).toFixed(2),
        [product],
    );

    return (
        <div className="col l-12 m-12 c-12">
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        {/* Left side */}
                        <div className={cx('left-side')}>
                            <div className={cx('left-side-content')}>
                                <div className={cx('alt-image')}>
                                    <ul className={cx('alt-image-list')}>
                                        <li className={cx('alt-image-item')}>
                                            <input className={cx('alt-image-input')}></input>
                                            <span>
                                                <img src={product.image} alt="alt img" />
                                            </span>
                                        </li>
                                        <li className={cx('alt-image-item')}>
                                            <input className={cx('alt-image-input')}></input>
                                            <span>
                                                <img src={product.image} alt="alt img" />
                                            </span>
                                        </li>
                                        <li className={cx('alt-image-item')}>
                                            <input className={cx('alt-image-input')}></input>
                                            <span>
                                                <img src={product.image} alt="alt img" />
                                            </span>
                                        </li>
                                        <li className={cx('alt-image-item')}>
                                            <input className={cx('alt-image-input')}></input>
                                            <span>
                                                <img src={product.image} alt="alt img" />
                                            </span>
                                        </li>
                                        <li className={cx('alt-image-item')}>
                                            <input className={cx('alt-image-input')}></input>
                                            <span>
                                                <img src={product.image} alt="alt img" />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('center-image')}>
                                    <span className={cx('center-image-item')}>
                                        <img src={product.image} alt="alt img" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Main side */}
                        <div className={cx('main-side')}>
                            <div className={cx('main-side-content')}>
                                <div className={cx('main-header')}>
                                    <h1>{product.description}</h1>
                                </div>

                                <span className={cx('main-brand')}>Visit the {product.brand} Store</span>

                                <div className={cx('main-rating')}>
                                    <StarRating rating={product.rating} />
                                    <span className={cx('main-rating-count')}>19,347 rating</span>
                                    <span>Search this page</span>
                                </div>

                                <div className={cx('main-choice')}>
                                    <div className={cx('choice-group')}>
                                        <span>ECommerce's</span>
                                        <span>Choice</span>
                                    </div>
                                    <span>by {product.brand}</span>
                                </div>

                                <span className={cx('main-bought')}>10K+ bought this past week</span>

                                <Divider />

                                <span className={cx('main-deal')}>Limited time deal</span>

                                <div className={cx('main-price-group')}>
                                    <span className={cx('main-sale-off')}>-{product.saleOff}%</span>

                                    <div className={cx('main-price')}>
                                        <span>$</span>
                                        <span>{price}</span>
                                    </div>
                                </div>

                                <div className={cx('main-typical-price')}>
                                    <span>Typical price: </span>
                                    <span>${product.typicalPrice}</span>
                                    <FontAwesomeIcon icon={faCircleExclamation} className={cx('typical-price-icon')} />
                                </div>

                                <div className={cx('main-free-return')}>
                                    <span>FREE Returns</span>
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                </div>

                                <span className={cx('main-ship')}>Shipping & Import Charges to {deliverNation}</span>

                                <div className={cx('main-ship-detail')}>
                                    <span>Details</span>
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                </div>

                                <span className={cx('main-available')}>
                                    Available at a lower price from other sellers that may not offer free Prime
                                    shipping.
                                </span>

                                <div className={cx('main-extra-saving')}>
                                    <span className={cx('extra-first-text')}>Extra Savings</span>
                                    <span>
                                        ECommerce store offer with this purchase
                                        <span className={cx('main-promotion')}>1 Applicable Promotion</span>
                                        <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                    </span>
                                </div>

                                <Divider />

                                <span className={cx('main-color')}>
                                    Color: <span>{colorChoice}</span>
                                </span>

                                <div className={cx('main-color-choose')}>
                                    <div
                                        className={
                                            colorChoice === 'Black'
                                                ? cx('black-color', 'active-color')
                                                : cx('black-color')
                                        }
                                        onClick={() => setColorChoice('Black')}
                                    >
                                        <img src={images.blackColor} alt="black color" />
                                        <span>${price}</span>
                                    </div>
                                    <div
                                        className={
                                            colorChoice === 'Silver'
                                                ? cx('silver-color', 'active-color')
                                                : cx('silver-color')
                                        }
                                        onClick={() => setColorChoice('Silver')}
                                    >
                                        <img src={images.silverColor} alt="black color" />
                                        <span>${price}</span>
                                    </div>
                                </div>

                                <div className={cx('main-specification-title')}>
                                    <span>Brand</span>
                                    <span>Output Power</span>
                                    <span>Connectivity Technology</span>
                                    <span>Audio Output Mode</span>
                                    <span>Mounting Type</span>
                                </div>

                                <div className={cx('main-specification-text')}>
                                    <span>{product.brand}</span>
                                    <span>5 Watts</span>
                                    <span>3.5mm Aux input</span>
                                    <span> Stereo</span>
                                    <span>Plug Mount</span>
                                </div>

                                <Divider />

                                <div className={cx('main-about')}>
                                    <h4>About this item</h4>
                                    <ul className={cx('main-about-list')}>
                                        <li>
                                            External computer speaker in Black (set of 2) for amplifying PC or laptop
                                            audio
                                        </li>
                                        <li>USB-Powered from USB port of PC or Laptop</li>
                                        <li>In-line volume control for easy access</li>
                                        <li>Blue LED lights; metal finish and scratch-free padded base</li>
                                        <li>Bottom radiator for “springy” bass sound</li>
                                        <li>
                                            Frequency range of 80 Hz - 20 KHz; 2.4 watts of total RMS power (1.2 watts
                                            per speaker)
                                        </li>
                                        <li>Product Dimensions: 3.9 x 2.6 x 2.8 inches (LxWxH)</li>
                                    </ul>
                                </div>

                                <div className={cx('main-report')}>
                                    <FontAwesomeIcon icon={faComments} className={cx('main-report-icon')} />
                                    <span>Report an issue with this product or seller</span>
                                </div>
                                <span className={cx('main-note')}>
                                    Note:
                                    <span>
                                        Products with electrical plugs are designed for use in the US. Outlets and
                                        voltage differ internationally and this product may require an adapter or
                                        converter for use in your destination. Please check compatibility before
                                        purchasing.
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className={cx('right-side')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
