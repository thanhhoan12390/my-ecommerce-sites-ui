import classNames from 'classnames/bind';
import { Fragment, useMemo, useState, memo } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import styles from './CartItem.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import Divider from '~/components/Divider';
import { updateItemQuantity, deleteCartItem, toggleCheckedList } from '~/pages/CartPage/cartPageSlice';

const cx = classNames.bind(styles);

function CartItem({ data, checkedList = [] }) {
    const [isInputQuantityOpen, setIsInputQuantityOpen] = useState(false);
    const [isOpenQuantity, SetIsOpenQuantity] = useState(false);
    const [cacheQuantity, setCacheQuantity] = useState(1);

    const dispatch = useDispatch();

    const quantityArray = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);

    const price = useMemo(
        () => (data.typicalPrice - (data.typicalPrice * data.saleOff) / 100).toFixed(2),
        [data.typicalPrice, data.saleOff],
    );

    const handleQuantityChange = (e) => {
        const inputValue = e.target.value;

        if (!inputValue.startsWith(' ') && inputValue > 0) {
            setCacheQuantity(inputValue);
        }
    };

    const handleToggleCheck = (productId) => {
        dispatch(toggleCheckedList(productId));
    };

    const handleDeleteCartItem = (productId) => {
        dispatch(deleteCartItem(productId));
        if (checkedList.includes(productId)) {
            dispatch(toggleCheckedList(productId));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Fragment>
                <div className={cx('main-item-group')}>
                    <div className={cx('main-item')}>
                        <div className={cx('main-checkbox')}>
                            <input
                                type="checkbox"
                                checked={checkedList.includes(data.id)}
                                onChange={() => handleToggleCheck(data.id)}
                            />
                        </div>

                        <div className={cx('main-img')}>
                            <span>
                                <img src={data.image} alt="img" />
                            </span>
                        </div>

                        <div className={cx('main-des-content')}>
                            <div className={cx('main-des-group')}>
                                <div className={cx('main-left-des')}>
                                    <h3>{data.description}</h3>
                                    <span>In Stock</span>
                                    <span className={cx('main-size')}>
                                        Size: <span>XL</span>
                                    </span>
                                </div>

                                <div className={cx('main-right-des')}>
                                    <div className={cx('main-sale-off')}>
                                        <span>{data.saleOff}% off</span>
                                        <span>Limited time deal</span>
                                    </div>
                                    <span className={cx('main-price')}>${price}</span>
                                    <div className={cx('main-typical-price')}>
                                        <span>Typical price: </span>
                                        <span>${data.typicalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={
                                    isInputQuantityOpen
                                        ? cx('quantity-tippy-wrapper', 'quantity-tippy-hidden')
                                        : cx('quantity-tippy-wrapper')
                                }
                            >
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
                                                                data.quantity === num
                                                                    ? cx('quantity-item', 'quantity-active')
                                                                    : cx('quantity-item')
                                                            }
                                                            onClick={() => {
                                                                dispatch(
                                                                    updateItemQuantity({
                                                                        id: data.id,
                                                                        quantity: num,
                                                                    }),
                                                                );
                                                                SetIsOpenQuantity(false);
                                                            }}
                                                        >
                                                            <span>{num}</span>
                                                        </div>
                                                    ))}
                                                    <Divider className={cx('divider')} />

                                                    <div
                                                        className={cx('quantity-item')}
                                                        onClick={() => {
                                                            setCacheQuantity(data.quantity);
                                                            setIsInputQuantityOpen(true);
                                                        }}
                                                    >
                                                        <span>10+</span>
                                                    </div>
                                                </div>
                                            </MenuWrapper>
                                        </div>
                                    )}
                                >
                                    <div className={cx('main-quantity')} onClick={() => SetIsOpenQuantity(true)}>
                                        <span>Quantity: {data.quantity}</span>
                                        <FontAwesomeIcon icon={faChevronDown} className={cx('main-quantity-icon')} />
                                    </div>
                                </HeadlessTippy>
                            </div>

                            {isInputQuantityOpen && (
                                <div className={cx('quantity-input-group')}>
                                    <input
                                        type="number"
                                        value={cacheQuantity}
                                        onChange={(e) => handleQuantityChange(e)}
                                    />
                                    <button
                                        className={cx('quantity-input-btn')}
                                        onClick={() => {
                                            dispatch(
                                                updateItemQuantity({
                                                    id: data.id,
                                                    quantity: +cacheQuantity, // thêm dâu + để convert sang kiểu number
                                                }),
                                            );
                                            setIsInputQuantityOpen(false);
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            )}

                            <span className={cx('main-delete')} onClick={() => handleDeleteCartItem(data.id)}>
                                Delete
                            </span>

                            <span className={cx('main-share')}>Share</span>
                        </div>
                    </div>
                </div>

                <Divider className={cx('divider')} />
            </Fragment>
        </div>
    );
}

export default memo(CartItem);
