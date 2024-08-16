import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './TodayDealCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TodayDealCard({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/viewProduct/${data.id}`} className={cx('container')}>
                <div className={cx('card-img')}>
                    <img src={data.image} alt="img" />
                </div>

                <div className={cx('card-sale-off')}>
                    <span className={cx('sale-off-text')}>
                        <span>{data.saleOff}% off</span>Limited time deal
                    </span>
                </div>

                <div className={cx('card-desc')}>
                    <span className={cx('desc-text')}>{data.description}</span>
                </div>
            </Link>
        </div>
    );
}

TodayDealCard.propTypes = {
    data: PropTypes.object,
};

export default memo(TodayDealCard);
