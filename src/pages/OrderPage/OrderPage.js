import classNames from 'classnames/bind';
import { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './OrderPage.module.scss';
import Divider from '~/components/Divider';
import { getOrder } from './orderPageSlice';
import { orderSelector } from '~/redux/selectors';

import { productsData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function OrderPage() {
    const dispatch = useDispatch();

    const orders = useSelector(orderSelector);

    const ordersList = useMemo(() => {
        if (!!orders && orders.length !== 0) {
            return orders.map((order) => {
                const newItems = order.items.map((item) => {
                    const findProduct = productsData.find((product) => product.id === item.id);

                    return {
                        ...item,
                        description: findProduct.description,
                        image: findProduct.image,
                    };
                });

                return { ...order, items: newItems };
            });
        }
    }, [orders]);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch]);

    const renderOrders = () => {
        return ordersList.map((order, index) => (
            <div key={index} className={cx('order-group')}>
                <span className={cx('order-state')}>Order is being shipped to you</span>
                <Divider className={cx('card-group-divider')} />

                {order.items.map((item) => (
                    <div key={item.id} className={cx('order-card')}>
                        <Link to={`/viewProduct/${item.id}`} className={cx('item-img')}>
                            <img src={item.image} alt="img" />
                        </Link>

                        <div className={cx('desc-group')}>
                            <Link to={`/viewProduct/${item.id}`} className={cx('item-desc')}>
                                {item.description}
                            </Link>
                            <span className={cx('item-price')}>${item.price}</span>
                            <span className={cx('item-quantity')}>Quantity: {item.quantity}</span>
                        </div>
                    </div>
                ))}

                <Divider />

                <div className={cx('order-total')}>
                    <span>Payment Total: ${order.total}</span>
                </div>
            </div>
        ));
    };

    return (
        <div className="col l-12 m-12 c-12">
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('bread-crumb')}>
                        <span className={cx('bread-account')}>Your Account</span>
                        <FontAwesomeIcon icon={faChevronRight} className={cx('bread-icon')} />
                        <span className={cx('bread-order')}>Your Orders</span>
                    </div>

                    <h1 className={cx('page-title')}>Your Orders</h1>

                    <div className={cx('order-tab')}>
                        <span>Orders</span>
                    </div>

                    <Divider />

                    <div className={cx('content')}>
                        {!!ordersList ? (
                            renderOrders()
                        ) : (
                            <span className={cx('no-order')}>Looks like you haven't placed an order recently</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;
