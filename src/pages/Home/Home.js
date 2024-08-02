import classNames from 'classnames/bind';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('grid', 'wrapper')}>
            {/* Banner */}
            <div className={cx('banner')}></div>

            {/* Home Content */}
            <div className={cx('row', 'content')}>
                <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                    <div className={cx('item')}></div>
                </div>
                <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                    <div className={cx('item')}></div>
                </div>
                <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                    <div className={cx('item')}></div>
                </div>
                <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                    <div className={cx('item')}></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
