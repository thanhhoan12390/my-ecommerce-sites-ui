import classNames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './Recommend.module.scss';
import RecommendItem from './RecommendItem';

import { productsData } from '~/apiFakeData';

const cx = classNames.bind(styles);

function Recommend() {
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div className="col l-12 m-12 c-12">
            <div className={cx('wrapper')}>
                <header className={cx('header')}>
                    <h2>Top picks for you</h2>
                </header>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className="row no-gutters">
                            {productsData.map((item) => (
                                <div key={item.id} className="col l-2 m-3 c-4">
                                    <div className={cx('card-item')}>
                                        <RecommendItem data={item} />
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

export default Recommend;
