import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import styles from './RecommendItem.module.scss';
import StarRating from '~/components/StarRating';

const cx = classNames.bind(styles);

function RecommendItem({ data }) {
    const price = useMemo(() => (data.typicalPrice - (data.typicalPrice * data.saleOff) / 100).toFixed(2), [data]);

    return (
        <Link to={`/viewProduct/${data.id}`} className={cx('wrapper')}>
            <div className={cx('card-img')}>
                <img src={data.image} alt="img" />
            </div>

            <span className={cx('card-desc')}>{data.description}</span>

            <StarRating rating={data.rating} />

            <span className={cx('card-price')}>${price}</span>
        </Link>
    );
}

RecommendItem.propTypes = {
    data: PropTypes.object,
};

export default RecommendItem;
