import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './StandardCard.module.scss';
import { deliverNationSelector } from '~/redux/selectors';
import StarRating from '~/components/StarRating';

const cx = classNames.bind(styles);

function StandardCard({
    id,
    bestSell = true,
    img,
    description,
    brand,
    rating,
    bought = 0,
    price,
    typicalPrice,
    deliveryDay,
}) {
    const deliverNation = useSelector(deliverNationSelector);

    return (
        <div className={cx('wrapper')}>
            <Link to={`/viewProduct/${id}`} className={cx('container')}>
                {/* Best seller tag */}
                {bestSell && (
                    <div className={cx('card-tag')}>
                        <span>Best Seller</span>
                    </div>
                )}

                {!bestSell && <div className={cx('card-space')}></div>}

                <div className={cx('card-img-wrapper')}>
                    <div className={cx('card-img')}>
                        <img src={img} alt="img" />
                    </div>
                </div>
                <div className={cx('card-content')}>
                    <span className={cx('card-description')}>{description}</span>

                    <div className={cx('card-brand')} onClick={(e) => e.preventDefault()}>
                        <span>{brand}</span>
                    </div>

                    <StarRating rating={rating} offsetLeft={-50} />

                    {!!bought && (
                        <div className={cx('card-bought')} onClick={(e) => e.preventDefault()}>
                            <span>{bought}K+ bought in past month</span>
                        </div>
                    )}

                    <div className={cx('card-price-group')}>
                        <div className={cx('card-price')}>
                            <span>$</span>
                            <span>{price}</span>
                        </div>

                        {!!typicalPrice && (
                            <div className={cx('card-original-price')}>
                                <span>List:</span>
                                <span>${typicalPrice}</span>
                            </div>
                        )}
                    </div>

                    <div className={cx('card-delivery')} onClick={(e) => e.preventDefault()}>
                        <span>Delivery</span>
                        <span>{deliveryDay}</span>
                    </div>

                    <span className={cx('card-ship')} onClick={(e) => e.preventDefault()}>
                        ship to {deliverNation}
                    </span>

                    <button
                        className={cx('card-btn')}
                        onClick={(e) => {
                            alert('added');
                            e.preventDefault();
                        }}
                    >
                        Add to cart
                    </button>
                </div>
            </Link>
        </div>
    );
}

StandardCard.propTypes = {
    id: PropTypes.number,
    bestSell: PropTypes.bool,
    img: PropTypes.any,
    description: PropTypes.string,
    brand: PropTypes.string,
    rating: PropTypes.number,
    bought: PropTypes.number,
    price: PropTypes.number,
    typicalPrice: PropTypes.number,
    deliveryDay: PropTypes.string,
};

export default StandardCard;
