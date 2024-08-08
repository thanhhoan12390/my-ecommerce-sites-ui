import classNames from 'classnames/bind';
import { Fragment, useMemo } from 'react';

import styles from './Home.module.scss';
import Carousel from '~/components/Carousel/Carousel';
import Card from '~/components/Card/Card';
import { carouselData, productsData } from '~/apiFakeData';

const cx = classNames.bind(styles);

function Home() {
    const productLength = useMemo(() => productsData.length, []);

    return (
        <div className={cx('col', 'l-12', 'm-12', 'c-6', 'wrapper')}>
            {/* Banner */}
            <div className={cx('banner')}>
                <Carousel data={carouselData} />
            </div>

            {/* Home Content */}
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('row', 'cart-layout')}>
                        {productsData.map((product, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                                        <div className={cx('cart-item')}>
                                            <Card data={product} />
                                        </div>
                                    </div>
                                    {index % 4 === 3 && !(index + 1 === productLength) && (
                                        <hr className={cx('cart-row-break')} />
                                    )}
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
