import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react';

import styles from './StandardCard.module.scss';

const cx = classNames.bind(styles);

function StandardCard({ bestSell = true, img, description, rating, bought = 0, price, originalPrice, deliveryDay }) {
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
                {/* Best seller tag */}
                {bestSell && (
                    <div className={cx('card-tag')}>
                        <span>Best Seller</span>
                    </div>
                )}

                <div className={cx('card-img')}>
                    <img src={img} alt="img" />
                </div>

                <div className={cx('card-content')}>
                    <span className={cx('card-description')}>{description}</span>

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
                            <FontAwesomeIcon icon={faChevronDown} className={cx('card-down-icon')} />
                            <div ref={ratingRef} className={cx('rating-overlay')}></div>
                        </div>
                    </Tippy>

                    {/* bought */}
                    {!!bought && (
                        <div className={cx('card-bought')}>
                            <span>{bought}K+ bought in past month</span>
                        </div>
                    )}

                    <div className={cx('card-price-group')}>
                        <div className={cx('card-price')}>
                            <span>$</span>
                            <span>{price}</span>
                        </div>

                        {!!originalPrice && (
                            <div className={cx('card-original-price')}>
                                <span>List:</span>
                                <span>${originalPrice}</span>
                            </div>
                        )}
                    </div>

                    <div className={cx('card-delivery')}>
                        <span>Delivery</span>
                        <span>{deliveryDay}</span>
                    </div>

                    <span className={cx('card-ship')}>ship to Vietnam</span>

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
    bestSell: PropTypes.bool,
    img: PropTypes.any,
    description: PropTypes.string,
    rating: PropTypes.any,
    bought: PropTypes.any,
    price: PropTypes.any,
    originalPrice: PropTypes.any,
    deliveryDay: PropTypes.string,
};

export default StandardCard;
