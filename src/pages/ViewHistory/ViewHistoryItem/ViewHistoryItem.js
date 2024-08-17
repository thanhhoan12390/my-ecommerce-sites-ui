import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import styles from './ViewHistoryItem.module.scss';
import StarRating from '~/components/StarRating';
import { deleteViewHistory } from '~/pages/ViewHistory/viewHistorySlice';

const cx = classNames.bind(styles);

function ViewHistoryItem({ data }) {
    const price = useMemo(() => (data.typicalPrice - (data.typicalPrice * data.saleOff) / 100).toFixed(2), [data]);

    const dispatch = useDispatch();

    const handleRemoveBtn = (e) => {
        e.preventDefault();
        dispatch(deleteViewHistory(data.id));
    };

    return (
        <Link to={`/viewProduct/${data.id}`} className={cx('wrapper')}>
            <div className={cx('card-img')}>
                <img src={data.image} alt="img" />
            </div>

            <span className={cx('card-desc')}>{data.description}</span>

            <StarRating rating={data.rating} />

            <span className={cx('card-price')}>${price}</span>

            <button className={cx('card-btn')} onClick={(e) => handleRemoveBtn(e)}>
                Remove from view
            </button>
        </Link>
    );
}

ViewHistoryItem.propTypes = {
    data: PropTypes.object,
};

export default ViewHistoryItem;
