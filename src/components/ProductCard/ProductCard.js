import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react';

import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ img, description, rating, saleOff = 0, price, originalPrice, ship }) {
    const ratingRef = useRef();

    useEffect(() => {
        if (!!rating) {
            const percentage = Math.round((rating / 5) * 100);

            ratingRef.current.style.width = `${100 - percentage}%`;
        }
    }, [rating]);

    return (
        <div className={cx('wrapper')}>
            <Link to="/" className={cx('container')}>
                {!!img && (
                    <button className={cx('card-img')}>
                        <img src={img} alt="img" />
                    </button>
                )}

                <span className={cx('card-description')}>{description}</span>

                {!!rating && (
                    <Tippy
                        delay={[400, 0]}
                        offset={[40, 8]}
                        content={
                            <div className={cx('rating-tooltip')}>
                                <span>{rating} out of 5 stars</span>{' '}
                            </div>
                        }
                        placement="bottom"
                    >
                        <div className={cx('card-rating')}>
                            <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                            <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                            <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                            <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                            <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                            <div ref={ratingRef} className={cx('rating-overlay')}></div>
                        </div>
                    </Tippy>
                )}

                {!!saleOff && (
                    <div className={cx('card-sale-off')}>
                        <span>{saleOff}% off</span>
                        <span>Limited time deal</span>
                    </div>
                )}

                {!!price && (
                    <div className={cx('card-price')}>
                        <span>$</span>
                        <span>{price}</span>
                    </div>
                )}

                {!!saleOff && (
                    <div className={cx('card-original-price')}>
                        <span>List:</span>
                        <span>${originalPrice}</span>
                    </div>
                )}
                {!!ship && <span className={cx('card-ship')}>${ship} shipping</span>}
            </Link>
        </div>
    );
}

ProductCard.propTypes = {
    img: PropTypes.any,
    description: PropTypes.string,
    rating: PropTypes.any,
    saleOff: PropTypes.any,
    price: PropTypes.any,
    originalPrice: PropTypes.any,
    ship: PropTypes.any,
};

export default ProductCard;
