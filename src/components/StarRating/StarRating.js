import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useRef, useEffect } from 'react';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './StarRating.module.scss';
import RatingPopover from '~/components/StarRating/RatingPopover';

const cx = classNames.bind(styles);

function StarRating({ rating, offsetLeft = 0, offsetRight = 0 }) {
    const ratingRef = useRef();

    useEffect(() => {
        if (!!rating) {
            const percentage = Math.round((rating / 5) * 100);

            ratingRef.current.style.width = `${100 - percentage}%`;
        }
    }, [rating]);

    return (
        <RatingPopover rating={rating} offsetLeft={offsetLeft} offsetRight={offsetRight}>
            <div className={cx('card-rating-wrapper')}>
                <span className={cx('card-rating')} onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <FontAwesomeIcon icon={faStar} className={cx('card-star-icon')} />
                    <div ref={ratingRef} className={cx('rating-overlay')}></div>
                    <FontAwesomeIcon icon={faChevronDown} className={cx('card-down-icon')} />
                </span>
            </div>
        </RatingPopover>
    );
}

StarRating.propTypes = {
    rating: PropTypes.number,
    offsetLeft: PropTypes.number,
    offsetRight: PropTypes.number,
};

export default StarRating;
