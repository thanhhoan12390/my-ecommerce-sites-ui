import classNames from 'classnames/bind';
import { faChevronDown, faCircleExclamation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './ViewProduct.module.scss';
import StarRating from '~/components/StarRating';
import Divider from '~/components/Divider';
import images from '~/assets/images';
import { deliverNationSelector } from '~/redux/selectors';
import MenuWrapper from '~/components/MenuWrapper';
import { addToCart, addCheckedList } from '~/pages/CartPage/cartPageSlice';
import { addToViewHistory } from '~/pages/ViewHistory/viewHistorySlice';
import config from '~/config';

import { productsData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function ViewProduct() {
    const [colorChoice, setColorChoice] = useState('Black');
    const [isOpenQuantity, SetIsOpenQuantity] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const deliverNation = useSelector(deliverNationSelector);

    const { productId } = useParams();

    const quantityArray = useMemo(
        () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        [],
    );

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        dispatch(addToViewHistory(+productId));
    }, [productId, dispatch]);

    // Vì productId lấy trả về kiểu string nên dùng mẹo thêm dấu cộng phía trước để convert về number
    const product = useMemo(() => productsData.find((item) => item.id === +productId), [productId]);

    const price = useMemo(
        () => (product.typicalPrice - (product.typicalPrice * product.saleOff) / 100).toFixed(2),
        [product],
    );

    const handleAddToCart = () => {
        dispatch(addToCart({ id: product.id, quantity: quantity }));
        dispatch(addCheckedList(product.id));
        navigate(config.routes.cartPage);
    };

    const handleBuyNowBtn = () => {
        dispatch(addToCart({ id: product.id, quantity: quantity }));
        dispatch(addCheckedList(product.id));
        navigate(config.routes.checkout);
    };

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
                                    <Tippy
                                        delay={[400, 300]}
                                        offset={[0, 4]}
                                        content={
                                            <MenuWrapper className={cx('choice-tooltip-wrapper')}>
                                                <div className={cx('choice-tooltip')}>
                                                    <span>
                                                        ECommerce's Choice highlights highly rated, well-priced products
                                                        available to ship immediately.
                                                    </span>
                                                </div>
                                            </MenuWrapper>
                                        }
                                        placement="top"
                                    >
                                        <div className={cx('choice-group')}>
                                            <span>ECommerce's</span>
                                            <span>Choice</span>
                                        </div>
                                    </Tippy>

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
                                    <HeadlessTippy
                                        interactive
                                        delay={[200, 400]}
                                        placement="bottom"
                                        render={(attrs) => (
                                            <div className={cx('typical-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('typical-wrapper')}>
                                                    <div className={cx('typical-text')}>
                                                        This is determined using the 90-day median price paid by
                                                        customers for the product on Amazon. We exclude prices paid by
                                                        customers for the product during a limited time deal.
                                                    </div>
                                                    <div className={cx('typical-learn-more')}>Learn more</div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircleExclamation}
                                            className={cx('typical-price-icon')}
                                        />
                                    </HeadlessTippy>
                                </div>

                                <div>
                                    <HeadlessTippy
                                        interactive
                                        trigger="click"
                                        delay={[200, 400]}
                                        placement="bottom"
                                        render={(attrs) => (
                                            <div className={cx('return-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('return-wrapper')}>
                                                    <h4>Return this item for free</h4>
                                                    <div className={cx('return-text')}>
                                                        Free returns are available for the shipping address you chose.
                                                        You can return the item for any reason in new and unused
                                                        condition: no return shipping charges.
                                                    </div>
                                                    <div className={cx('return-learn-more')}>
                                                        Learn more about free returns
                                                    </div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('main-free-return')}>
                                            <span>FREE Returns</span>
                                            <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                        </div>
                                    </HeadlessTippy>
                                </div>

                                <span className={cx('main-ship')}>Shipping & Import Charges to {deliverNation}</span>

                                <div className={cx('detail-tippy-wrapper')}>
                                    <HeadlessTippy
                                        interactive
                                        trigger="click"
                                        delay={[200, 400]}
                                        placement="bottom"
                                        render={(attrs) => (
                                            <div className={cx('detail-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('detail-wrapper')}>
                                                    <h3>Shipping & Fee Details</h3>
                                                    <Divider />
                                                    <div className={cx('detail-group')}>
                                                        <div className={cx('detail-left')}>
                                                            <span>Price</span>
                                                            <span>AmazonGlobal Shipping</span>
                                                            <span>Estimated Import Charges</span>
                                                        </div>
                                                        <div className={cx('detail-right')}>
                                                            <span>$13.59</span>
                                                            <span>$32.41</span>
                                                            <span>$18.26</span>
                                                        </div>
                                                    </div>

                                                    <Divider />

                                                    <div className={cx('total-group')}>
                                                        <span className={cx('total-left')}>Total</span>
                                                        <span className={cx('total-right')}>$64.26</span>
                                                    </div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('main-ship-detail')}>
                                            <span>Details</span>
                                            <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                        </div>
                                    </HeadlessTippy>
                                </div>

                                <span className={cx('main-available')}>
                                    Available at a lower price from other sellers that may not offer free Prime
                                    shipping.
                                </span>

                                <div>
                                    <HeadlessTippy
                                        interactive
                                        delay={[300, 400]}
                                        placement="bottom"
                                        render={(attrs) => (
                                            <div className={cx('extra-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('extra-wrapper')}>
                                                    <ul className={cx('extra-text')}>
                                                        <li> ECommerce Store offer with this purchase</li>
                                                    </ul>
                                                    <div className={cx('extra-learn-more')}>
                                                        <span>Term</span>
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            className={cx('free-return-icon')}
                                                        />
                                                    </div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('main-extra-saving')}>
                                            <span className={cx('extra-first-text')}>Extra Savings</span>
                                            <span>
                                                ECommerce store offer with this purchase
                                                <span className={cx('main-promotion')}>1 Applicable Promotion</span>
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    className={cx('free-return-icon')}
                                                />
                                            </span>
                                        </div>
                                    </HeadlessTippy>
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
                        <div className={cx('right-side')}>
                            <div className={cx('right-price')}>
                                <span>$</span>
                                <span>{price}</span>
                            </div>

                            <div className={cx('right-content')}>
                                <div className={cx('right-claim')}>
                                    <span>27% claimed</span>
                                    <div className={cx('claim-group')}>
                                        <div className={cx('claim-percent')}></div>
                                    </div>
                                </div>

                                {/* Inherit from main side */}
                                <div>
                                    <HeadlessTippy
                                        interactive
                                        trigger="click"
                                        delay={[200, 400]}
                                        placement="bottom"
                                        render={(attrs) => (
                                            <div className={cx('return-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('return-wrapper')}>
                                                    <h4>Return this item for free</h4>
                                                    <div className={cx('return-text')}>
                                                        Free returns are available for the shipping address you chose.
                                                        You can return the item for any reason in new and unused
                                                        condition: no return shipping charges.
                                                    </div>
                                                    <div className={cx('return-learn-more')}>
                                                        Learn more about free returns
                                                    </div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('main-free-return')}>
                                            <span>FREE Returns</span>
                                            <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                        </div>
                                    </HeadlessTippy>
                                </div>

                                {/* Inherit from main side */}
                                <span className={cx('main-ship')}>Shipping & Import Charges to {deliverNation}</span>
                                {/* Inherit from main side */}
                                <div className={cx('detail-tippy-wrapper')}>
                                    <HeadlessTippy
                                        interactive
                                        trigger="click"
                                        delay={[200, 400]}
                                        placement="bottom"
                                        render={(attrs) => (
                                            <div className={cx('detail-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('detail-wrapper')}>
                                                    <h3>Shipping & Fee Details</h3>
                                                    <Divider />
                                                    <div className={cx('detail-group')}>
                                                        <div className={cx('detail-left')}>
                                                            <span>Price</span>
                                                            <span>AmazonGlobal Shipping</span>
                                                            <span>Estimated Import Charges</span>
                                                        </div>
                                                        <div className={cx('detail-right')}>
                                                            <span>$13.59</span>
                                                            <span>$32.41</span>
                                                            <span>$18.26</span>
                                                        </div>
                                                    </div>

                                                    <Divider />

                                                    <div className={cx('total-group')}>
                                                        <span className={cx('total-left')}>Total</span>
                                                        <span className={cx('total-right')}>$64.26</span>
                                                    </div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('main-ship-detail')}>
                                            <span>Details</span>
                                            <FontAwesomeIcon icon={faChevronDown} className={cx('free-return-icon')} />
                                        </div>
                                    </HeadlessTippy>
                                </div>

                                <div className={cx('right-delivery-day')}>
                                    <span>Delivery</span>
                                    <span>Tuesday, August 27.</span>
                                </div>

                                <div className={cx('right-order')}>
                                    <span>Order within</span>
                                    <span>7 hrs 46 mins</span>
                                </div>

                                <div className={cx('right-location')}>
                                    <FontAwesomeIcon icon={faLocationDot} className={cx('right-location-icon')} />
                                    <span>Deliver to {deliverNation}</span>
                                </div>

                                <span className={cx('right-stock')}>In Stock</span>

                                <div className={cx('quantity-tippy-wrapper')}>
                                    <HeadlessTippy
                                        interactive
                                        visible={isOpenQuantity}
                                        offset={[0, -32]}
                                        placement="bottom"
                                        onClickOutside={() => SetIsOpenQuantity(false)}
                                        render={(attrs) => (
                                            <div className={cx('quantity-popover')} tabIndex="-1" {...attrs}>
                                                <MenuWrapper className={cx('quantity-wrapper')}>
                                                    <div className={cx('quantity-content')}>
                                                        {quantityArray.map((num) => (
                                                            <div
                                                                key={num}
                                                                className={
                                                                    quantity === num
                                                                        ? cx('quantity-item', 'quantity-active')
                                                                        : cx('quantity-item')
                                                                }
                                                                onClick={() => {
                                                                    setQuantity(num);
                                                                    SetIsOpenQuantity(false);
                                                                }}
                                                            >
                                                                <span>{num}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </MenuWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('right-quantity')} onClick={() => SetIsOpenQuantity(true)}>
                                            <span>Quantity: {quantity}</span>
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                className={cx('right-quantity-icon')}
                                            />
                                        </div>
                                    </HeadlessTippy>
                                </div>

                                <button className={cx('right-add-btn')} onClick={handleAddToCart}>
                                    Add to Cart
                                </button>

                                <button className={cx('right-buy-btn')} onClick={handleBuyNowBtn}>
                                    Buy Now
                                </button>

                                <div className={cx('right-table-group')}>
                                    <div className={cx('right-left-col')}>
                                        <span>Ships from</span>
                                        <span>Sold by</span>
                                        <span>Returns</span>
                                        <span>Customer service</span>
                                        <span>Gift wrap</span>
                                        <span>Payment</span>
                                        <span>Packaging</span>
                                    </div>

                                    <div className={cx('right-right-col')}>
                                        <span>ECommerce.com</span>
                                        <span>ECommerce.com</span>
                                        <span>30-day refund/replacement</span>
                                        <span>ECommerce.com</span>
                                        <span>Available at checkout</span>
                                        <span>Secure transaction</span>
                                        <span>Ships in product packaging</span>
                                    </div>
                                </div>

                                <Divider />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extra Saving Term Modal */}
            </div>
        </div>
    );
}

export default ViewProduct;
