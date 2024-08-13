import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import styles from './CartPage.module.scss';
import { cartSelector } from '~/redux/selectors';
import { getCart } from './cartPageSlice';
import Divider from '~/components/Divider/Divider';
import CartItem from './CartItem';

import { productsData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function CartPage() {
    const [checkedList, setCheckedList] = useState([]);

    const cart = useSelector(cartSelector);

    const dispatch = useDispatch();

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

    const total = useMemo(() => {
        if (!!products) {
            const totalPrice = products.reduce((total, currentProduct) => {
                return (
                    total +
                    (
                        currentProduct.typicalPrice -
                        (currentProduct.typicalPrice * currentProduct.saleOff) / 100
                    ).toFixed(2) *
                        currentProduct.quantity
                );
            }, 0);

            return totalPrice.toFixed(2);
        }
    }, [products]);

    const itemsCount = useMemo(() => {
        if (!!products) {
            const totalItems = products.reduce((totalCount, currentProduct) => {
                return totalCount + currentProduct.quantity;
            }, 0);

            return totalItems;
        }
    }, [products]);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

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
                                    <span>Deselect all items</span>
                                    <span>Price</span>
                                </div>

                                <Divider className={cx('divider')} />

                                {!!products &&
                                    products.map((product, index) => (
                                        <CartItem
                                            key={index}
                                            data={product}
                                            checkedList={checkedList}
                                            setChecked={setCheckedList}
                                        />
                                    ))}
                            </div>

                            {/* Main total */}
                            <div className={cx('main-total')}>
                                <span>Subtotal ({itemsCount} items): </span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-side')}></div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
