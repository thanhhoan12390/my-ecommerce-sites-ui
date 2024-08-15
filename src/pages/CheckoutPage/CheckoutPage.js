import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Checkout.module.scss';
import { Logo } from '~/components/Icons';
import images from '~/assets/images';
import config from '~/config';
import Divider from '~/components/Divider';
import CheckoutItem from './CheckoutItem';
import { cartSelector, checkedListSelector } from '~/redux/selectors';
import { getCart, getCheckedList } from '~/pages/CartPage/cartPageSlice';
import { addToOrder } from './checkoutPageSlice';
import MenuWrapper from '~/components/MenuWrapper/MenuWrapper';
import OverLay from '~/components/OverLay/OverLay';

import { productsData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function CheckoutPage() {
    const [checkedDelivery, setCheckedDelivery] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [errorCountry, setErrorCountry] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorStreet, setErrorStreet] = useState('');
    const [errorCity, setErrorCity] = useState('');
    const [errorZipCode, setErrorZipCode] = useState('');
    const [address, setAddress] = useState([
        'Hoan Phan Thanh',
        'Cộng Hòa Street',
        'Hồ Chí Minh City',
        720100,
        'Viet Nam',
    ]);

    const cart = useSelector(cartSelector);
    const checkedList = useSelector(checkedListSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const importChargeCost = useMemo(() => 26.39, []);

    const priorityShipCod = useMemo(() => 74.99, []);

    const noPriorityShipCodShipCod = useMemo(() => 42.99, []);

    const shipCod = useMemo(
        () => (checkedDelivery === 1 ? priorityShipCod : noPriorityShipCodShipCod),
        [priorityShipCod, noPriorityShipCodShipCod, checkedDelivery],
    );

    const products = useMemo(() => {
        if (Array.isArray(cart) && cart.length !== 0) {
            const data = cart.map((item) => {
                const product = productsData.find((temptItem) => temptItem.id === item.id);

                return {
                    ...product,
                    quantity: item.quantity,
                };
            });
            return data;
        }
    }, [cart]);

    const checkedProducts = useMemo(() => {
        if (Array.isArray(checkedList) && checkedList.length !== 0 && !!products) {
            const data = products.filter((item) => checkedList.includes(item.id));

            return data;
        }
    }, [checkedList, products]);

    const itemsTotal = useMemo(() => {
        if (!!checkedProducts) {
            const totalPrice = checkedProducts.reduce((total, currentProduct) => {
                return (
                    total +
                    (currentProduct.typicalPrice - (currentProduct.typicalPrice * currentProduct.saleOff) / 100) *
                        currentProduct.quantity
                );
            }, 0);

            return totalPrice.toFixed(2);
        }
    }, [checkedProducts]);

    const itemsCount = useMemo(() => {
        if (!!checkedProducts) {
            const totalItems = checkedProducts.reduce((totalCount, currentProduct) => {
                return totalCount + currentProduct.quantity;
            }, 0);

            return totalItems;
        }
    }, [checkedProducts]);

    const totalBeforeTax = useMemo(() => (+itemsTotal + +shipCod).toFixed(2), [itemsTotal, shipCod]);

    const totalPayment = useMemo(
        () => (+itemsTotal + +shipCod + +importChargeCost).toFixed(2),
        [importChargeCost, itemsTotal, shipCod],
    );

    useEffect(() => {
        dispatch(getCart());
        dispatch(getCheckedList());
    }, [dispatch]);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    const handleOrderBtnClick = () => {
        if (!!checkedProducts) {
            const data = checkedProducts.map((item) => {
                const price = (item.typicalPrice - (item.typicalPrice * item.saleOff) / 100).toFixed(2);

                return {
                    id: item.id,
                    quantity: item.quantity,
                    price,
                };
            });

            dispatch(
                addToOrder({
                    items: data,
                    total: totalPayment,
                }),
            );

            navigate(config.routes.order);
        }
    };

    const handleUpdateAddress = () => {
        if (country === '') {
            setErrorCountry('errorCountry');
        } else {
            setErrorCountry('');
        }
        if (name === '') {
            setErrorName('errorName');
        } else {
            setErrorName('');
        }
        if (street === '') {
            setErrorStreet('errorStreet');
        } else {
            setErrorStreet('');
        }
        if (city === '') {
            setErrorCity('errorCity');
        } else {
            setErrorCity('');
        }
        if (zipCode === '' || isNaN(zipCode) || +zipCode <= 0) {
            setErrorZipCode('errorZipCode');
        } else {
            setErrorZipCode('');
        }
        if (!!country && !!name && !!street && !!city && !!zipCode && !isNaN(zipCode) && +zipCode > 0) {
            setAddress([name, street, city, zipCode, country]);
            setIsOpenModal(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-content')}>
                    <Link to={config.routes.home} className={cx('header-link')}>
                        <Logo width="5.6rem" height="5.6rem" className={cx('header-logo')} />
                    </Link>
                    <h1 className={cx('header-text')}>
                        Checkout (<span>{itemsCount} item</span>)
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
                                    <span className={cx('address-name')}>{address[0]}</span>
                                    <span className={cx('address-street')}>{address[1]},</span>
                                    <span className={cx('address-city')}>{address[2]},</span>
                                    <span className={cx('address-zip-code')}>{address[3]},</span>
                                    <span className={cx('address-nation')}>{address[4]}</span>
                                </div>
                            </div>

                            <div className={cx('address-edit')}>
                                <button className={cx('edit-address-btn')} onClick={() => setIsOpenModal(true)}>
                                    Edit your address
                                </button>
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

                    <Divider />

                    {/* Review Item and shipping */}
                    <div className={cx('main-shipping')}>
                        <h3 className={cx('shipping-title')}>
                            <span>3</span> Review items and shipping
                        </h3>

                        <div className={cx('shipping-container')}>
                            <div className={cx('shipping-content')}>
                                <div className={cx('shipping-review')}>
                                    {!!checkedProducts &&
                                        checkedProducts.map((item) => <CheckoutItem key={item.id} data={item} />)}
                                </div>

                                <div className={cx('shipping-delivery')}>
                                    <h4 className={cx('delivery-title')}>Choose a delivery option:</h4>
                                    <div className={cx('delivery-input')}>
                                        <div className={cx('delivery-option')}>
                                            <input
                                                type="radio"
                                                checked={checkedDelivery === 1}
                                                onChange={() => setCheckedDelivery(1)}
                                            />
                                            <div className={cx('delivery-day-price')}>
                                                <span className={cx('delivery-day')}>Tuesday, August 27</span>
                                                <span className={cx('delivery-price')}>
                                                    ${priorityShipCod}
                                                    <span className={cx('delivery-priority')}>
                                                        - Global Priority Shipping
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className={cx('delivery-option')}>
                                            <input
                                                type="radio"
                                                checked={checkedDelivery === 2}
                                                onChange={() => setCheckedDelivery(2)}
                                            />
                                            <div className={cx('delivery-day-price')}>
                                                <span className={cx('delivery-day')}>Friday, August 27</span>
                                                <span className={cx('delivery-price')}>
                                                    ${noPriorityShipCodShipCod}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('shipping-total')}>
                                <div className={cx('shipping-order-btn')}>
                                    <button onClick={handleOrderBtnClick}>Place your order now</button>
                                    <span className={cx('shipping-policy')}>
                                        Click the "Place your order now" button to order. You may return new, unopened
                                        merchandise in original condition within 30 days of delivery. Exceptions and
                                        restrictions apply. See ECommerce.com's <span>Returns Policy</span>.
                                    </span>
                                </div>
                                <span className={cx('shipping-payment')}>
                                    Payment Total: ${totalPayment}
                                    <span className={cx('shipping-more')}>
                                        Need to add more items to your order? Continue shopping on the{' '}
                                        <Link to={config.routes.home} className={cx('shipping-link')}>
                                            ECommerce.com
                                        </Link>
                                        homepage.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
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
                                <span>${itemsTotal}</span>
                                <span>${shipCod}</span>
                                <Divider className={cx('summary-divider')} />
                                <span>${totalBeforeTax}</span>
                                <span>$0.00</span>
                                <span>${importChargeCost}</span>
                            </div>
                        </div>

                        <Divider />

                        <div className={cx('summary-total')}>
                            <span>Order total:</span>
                            <span>${totalPayment}</span>
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

            {/* Edit address modal */}
            {isOpenModal && (
                <Fragment>
                    <div className={cx('address-modal')}>
                        <MenuWrapper className={cx('modal-wrapper')}>
                            <div className={cx('modal-title')}>
                                <h3>Update your shipping address</h3>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx('modal-icon')}
                                    onClick={() => setIsOpenModal(false)}
                                />
                            </div>

                            <div className={cx('modal-container')}>
                                <div className={cx('modal-content')}>
                                    <h3 className={cx('modal-heading')}>Edit your address</h3>
                                    <span className={cx('modal-text')}>All fields are required</span>

                                    <div className={cx('modal-group')}>
                                        <h4 className={cx('group-title')}>Country/Region</h4>
                                        <input
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            placeholder="Enter your country/region"
                                            className={cx('modal-input', errorCountry)}
                                        />
                                        {country === '' && !!errorCountry && (
                                            <span className={cx('error-input-text')}>
                                                <FontAwesomeIcon icon={faWarning} className={cx('error-input-icon')} />{' '}
                                                Please enter a country
                                            </span>
                                        )}
                                    </div>

                                    <div className={cx('modal-group')}>
                                        <h4 className={cx('group-title')}>Full name (First and Last name)</h4>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className={cx('modal-input', errorName)}
                                        />
                                        {name === '' && !!errorName && (
                                            <span className={cx('error-input-text')}>
                                                <FontAwesomeIcon icon={faWarning} className={cx('error-input-icon')} />{' '}
                                                Please enter a name
                                            </span>
                                        )}
                                    </div>

                                    <div className={cx('modal-group')}>
                                        <h4 className={cx('group-title')}>Street address</h4>
                                        <input
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                            placeholder="Enter your street address"
                                            className={cx('modal-input', errorStreet)}
                                        />
                                        {street === '' && !!errorStreet && (
                                            <span className={cx('error-input-text')}>
                                                <FontAwesomeIcon icon={faWarning} className={cx('error-input-icon')} />{' '}
                                                Please enter a street
                                            </span>
                                        )}
                                    </div>

                                    <div className={cx('modal-group')}>
                                        <h4 className={cx('group-title')}>City</h4>
                                        <input
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Enter your city"
                                            className={cx('modal-input', errorCity)}
                                        />
                                        {city === '' && !!errorCity && (
                                            <span className={cx('error-input-text')}>
                                                <FontAwesomeIcon icon={faWarning} className={cx('error-input-icon')} />{' '}
                                                Please enter a city
                                            </span>
                                        )}
                                    </div>

                                    <div className={cx('modal-group')}>
                                        <h4 className={cx('group-title')}>Zip Code</h4>
                                        <input
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            placeholder="Enter Zip Code"
                                            className={cx('modal-input', errorZipCode)}
                                        />
                                        {!!errorZipCode && (
                                            <span className={cx('error-input-text')}>
                                                <FontAwesomeIcon icon={faWarning} className={cx('error-input-icon')} />{' '}
                                                Please enter a valid Zip Code
                                            </span>
                                        )}
                                    </div>

                                    <button className={cx('modal-btn')} onClick={handleUpdateAddress}>
                                        Update address
                                    </button>
                                </div>
                            </div>
                        </MenuWrapper>
                    </div>
                    <OverLay className={cx('overlay')} />
                </Fragment>
            )}
        </div>
    );
}

export default CheckoutPage;
