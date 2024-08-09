import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';

import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ img, description, rating, saleOff = 0, price, originalPrice, ship }) {
    const ratingRef = useRef();

    useEffect(() => {
        const percentage = Math.round((rating / 5) * 100);

        ratingRef.current.style.width = `${100 - percentage}%`;
    }, [rating]);

    return (
        <div className={cx('wrapper')}>
            <Link to="/" className={cx('container')}>
                <div className={cx('card-img')}>
                    <img src={img} alt="img" />
                </div>

                <span className={cx('card-description')}>{description}</span>
                <div className={cx('card-rating')}>
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <div ref={ratingRef} className={cx('rating-overlay')}></div>
                </div>
                {saleOff !== 0 && (
                    <div className={cx('card-sale-off')}>
                        <span>{saleOff}% off</span>
                        <span>Limited time deal</span>
                    </div>
                )}

                <div className={cx('card-price')}>
                    <span>$</span>
                    <span>{price}</span>
                </div>

                {saleOff !== 0 && (
                    <div className={cx('card-original-price')}>
                        <span>List:</span>
                        <span>${originalPrice}</span>
                    </div>
                )}

                <span className={cx('card-ship')}>${ship} shipping</span>
            </Link>
        </div>
    );
}

ProductCard.propTypes = {
    img: PropTypes.any,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    saleOff: PropTypes.number,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    ship: PropTypes.number.isRequired,
};

export default ProductCard;
