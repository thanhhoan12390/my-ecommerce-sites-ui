import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useMemo } from 'react';

import styles from './BannerCard.module.scss';
import StarRating from '~/components/StarRating';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BannerCard({ data }) {
    const price = useMemo(
        () => (data.typicalPrice - (data.typicalPrice * data.saleOff) / 100).toFixed(2),
        [data.typicalPrice, data.saleOff],
    );

    return (
        <div className={cx('wrapper')}>
            <Link to={`/viewProduct/${data.id}`} className={cx('banner-link-wrapper')}>
                <div className={cx('banner-img')}>
                    <img src={data.image} alt="img" />
                </div>

                <div className={cx('banner-content')}>
                    <div className={cx('banner-description')}>{data.description}</div>
                    <StarRating rating={data.rating} />
                    <span className={cx('banner-rating-count')} onClick={(e) => e.preventDefault()}>
                        19,347
                    </span>
                    <span className={cx('banner-price')}>${price}</span>
                </div>
            </Link>
        </div>
    );
}

BannerCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BannerCard;
