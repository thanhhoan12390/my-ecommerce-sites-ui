import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState, useMemo, Fragment, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import styles from './CheckoutItem.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import Divider from '~/components/Divider';
import { updateItemQuantity } from '~/pages/CartPage/cartPageSlice';

const cx = classNames.bind(styles);

function CheckoutItem({ data }) {
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

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('review-img')}>
                    <img src={data.image} alt="review img" />
                </div>

                <div className={cx('review-desc-group')}>
                    <h4 className={cx('desc-text')}>{data.description}</h4>

                    <span className={cx('desc-price')}>${price}</span>

                    <div
                        className={
                            isInputQuantityOpen
                                ? cx('quantity-tippy-wrapper', 'quantity-tippy-hidden')
                                : cx('quantity-tippy-wrapper')
                        }
                    >
                        <Tippy
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
                        </Tippy>
                    </div>

                    {isInputQuantityOpen && (
                        <div className={cx('quantity-input-group')}>
                            <input type="number" value={cacheQuantity} onChange={(e) => handleQuantityChange(e)} />
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
                </div>
            </div>
        </Fragment>
    );
}

CheckoutItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default memo(CheckoutItem);
