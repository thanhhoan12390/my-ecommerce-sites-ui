import classNames from 'classnames/bind';
import { Fragment, useMemo } from 'react';

import styles from './Home.module.scss';
import Carousel from '~/components/Carousel/Carousel';
import Card from '~/components/Card/Card';
import FeedCarousel from '~/components/FeedCarousel/FeedCarousel';
import RowBreak from '~/components/RowBreak/RowBreak';
import { carouselData, topicData1, topicData2, feedCarouselData1, feedCarouselData2 } from '~/apiFakeData';

const cx = classNames.bind(styles);

function Home() {
    const productLength1 = useMemo(() => topicData1.length, []);
    const productLength2 = useMemo(() => topicData2.length, []);

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
                        {topicData1.map((product, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                                        <div className={cx('cart-item')}>
                                            <Card data={product} />
                                        </div>
                                    </div>
                                    {index % 4 === 3 && !(index + 1 === productLength1) && <RowBreak />}
                                </Fragment>
                            );
                        })}

                        <RowBreak />

                        <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                            <div className={cx('feed-carousel')}>
                                <FeedCarousel feedCarouselData={feedCarouselData1} />
                            </div>
                        </div>

                        <RowBreak />

                        <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                            <div className={cx('feed-carousel')}>
                                <FeedCarousel feedCarouselData={feedCarouselData2} />
                            </div>
                        </div>

                        <RowBreak />

                        {topicData2.map((product, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                                        <div className={cx('cart-item')}>
                                            <Card data={product} />
                                        </div>
                                    </div>
                                    {index % 4 === 3 && !(index + 1 === productLength2) && <RowBreak />}
                                </Fragment>
                            );
                        })}

                        <RowBreak />

                        <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                            <div className={cx('feed-carousel')}>
                                <FeedCarousel feedCarouselData={feedCarouselData1} />
                            </div>
                        </div>

                        <RowBreak />

                        <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                            <div className={cx('feed-carousel')}>
                                <FeedCarousel feedCarouselData={feedCarouselData2} />
                            </div>
                        </div>

                        <RowBreak />

                        {topicData2.map((product, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                                        <div className={cx('cart-item')}>
                                            <Card data={product} />
                                        </div>
                                    </div>
                                    {index % 4 === 3 && !(index + 1 === productLength2) && <RowBreak />}
                                </Fragment>
                            );
                        })}
                        <RowBreak />

                        <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                            <div className={cx('feed-carousel')}>
                                <FeedCarousel feedCarouselData={feedCarouselData1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
