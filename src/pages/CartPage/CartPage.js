import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './CartPage.module.scss';
import { cartSelector, checkedListSelector } from '~/redux/selectors';
import { getCart, getCheckedList, selectAllCheckedList, deselectAllCheckedList } from './cartPageSlice';
import Divider from '~/components/Divider/Divider';
import CartItem from './CartItem';
import BannerCard from '~/components/BannerCard';
import MenuWrapper from '~/components/MenuWrapper';
import config from '~/config';

import { productsData, bannerCardData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function CartPage() {
    const [isCheckoutMessOpen, setIsCheckoutMessOpen] = useState(false);

    const cart = useSelector(cartSelector);
    const checkedList = useSelector(checkedListSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

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

    const total = useMemo(() => {
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

    useEffect(() => {
        dispatch(getCart());
        dispatch(getCheckedList());
    }, [dispatch]);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    const handleDeselectAll = () => {
        dispatch(deselectAllCheckedList());
    };

    const handleSelectAll = () => {
        dispatch(selectAllCheckedList());
    };

    const handleCheckout = () => {
        if (!itemsCount) {
            setIsCheckoutMessOpen(true);
        } else {
            // checkout
            navigate(config.routes.checkout);
        }
    };

    return (
        <div className="col l-12 m-12 c-12">
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('main-side')}>
                        <div className={cx('main-side-container')}>
                            {/* Main Content */}
                            <div className={cx('main-side-content')}>
                                <div className={cx('main-header')}>
                                    <h2>Shopping Cart</h2>
                                    {!!checkedProducts && !!products && checkedProducts.length === products.length && (
                                        <span className={cx('main-header-deselect')} onClick={handleDeselectAll}>
                                            Deselect all items
                                        </span>
                                    )}

                                    {!!checkedProducts && !!products && checkedProducts.length !== products.length && (
                                        <span className={cx('main-header-select')} onClick={handleSelectAll}>
                                            Select all items
                                        </span>
                                    )}

                                    {!!products && checkedList.length === 0 && (
                                        <span className={cx('main-header-no-items')}>
                                            No items selected.<span onClick={handleSelectAll}> Select all items</span>
                                        </span>
                                    )}

                                    <span className={cx('main-header-price')}>Price</span>
                                </div>

                                <Divider className={cx('divider')} />

                                {!!products &&
                                    products.map((product, index) => (
                                        <CartItem key={index} data={product} checkedList={checkedList} />
                                    ))}
                            </div>

                            {/* Main total */}
                            {!!itemsCount ? (
                                <div className={cx('main-total')}>
                                    <span>Subtotal ({itemsCount} items): </span>
                                    <span>${total}</span>
                                </div>
                            ) : (
                                <div className={cx('main-no-total')}>
                                    <span>No items selected</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('right-side')}>
                        <div className={cx('right-checkout-container')}>
                            <div className={cx('right-checkout-content')}>
                                <div className={cx('right-header')}>
                                    {!!itemsCount ? (
                                        <div className={cx('right-total')}>
                                            <span>Subtotal ({itemsCount} items): </span>
                                            <span>${total}</span>
                                        </div>
                                    ) : (
                                        <div className={cx('right-no-total')}>
                                            <span>No items selected</span>
                                        </div>
                                    )}
                                </div>

                                <Tippy
                                    interactive
                                    visible={isCheckoutMessOpen}
                                    onClickOutside={() => setIsCheckoutMessOpen(false)}
                                    offset={[0, 14]}
                                    placement="left"
                                    render={(attrs) => (
                                        <div className={cx('checkout-btn-popover')} tabIndex="-1" {...attrs}>
                                            <MenuWrapper className={cx('checkout-btn-wrapper')}>
                                                <span className={cx('checkout-btn-text')}>
                                                    Please select at least one item to Checkout
                                                </span>
                                            </MenuWrapper>
                                        </div>
                                    )}
                                >
                                    <button className={cx('right-checkout-btn')} onClick={handleCheckout}>
                                        Proceed to checkout
                                    </button>
                                </Tippy>
                            </div>
                        </div>

                        <div className={cx('right-banner-container')}>
                            <div className={cx('right-banner-content')}>
                                <div className={cx('banner-header')}>
                                    <h3>Pair with your cart</h3>
                                </div>

                                <div className={cx('banner-group')}>
                                    {bannerCardData.map((item) => (
                                        <BannerCard key={item.id} data={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
