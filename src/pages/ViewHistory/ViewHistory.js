import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import styles from './ViewHistory.module.scss';
import ViewHistoryItem from './ViewHistoryItem';
import { viewHistorySelector } from '~/redux/selectors';
import { getViewHistory } from './viewHistorySlice';

import { productsData } from '~/apiFakeData';
import { useEffect, useMemo } from 'react';

const cx = classNames.bind(styles);

function ViewHistory() {
    const viewHistoryData = useSelector(viewHistorySelector);

    const dispatch = useDispatch();

    const viewHistoryItems = useMemo(() => {
        if (!!viewHistoryData && viewHistoryData.length !== 0) {
            return viewHistoryData.map((id) => productsData.find((item) => item.id === id));
        }
    }, [viewHistoryData]);

    useEffect(() => {
        dispatch(getViewHistory());
    }, [dispatch]);

    return (
        <div className="col l-12 m-12 c-12">
            <div className={cx('wrapper')}>
                <header className={cx('header')}>
                    <h2>Your Browsing History</h2>
                    <span>These items were viewed recently. We use them to personalize recommendations.</span>
                </header>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className="row no-gutters">
                            {!!viewHistoryItems &&
                                viewHistoryItems.map((item) => (
                                    <div key={item.id} className="col l-2 m-3 c-4">
                                        <div className={cx('card-item')}>
                                            <ViewHistoryItem data={item} />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewHistory;
