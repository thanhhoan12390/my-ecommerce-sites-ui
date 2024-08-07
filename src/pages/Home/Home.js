import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Carousel from '~/components/Carousel/Carousel';
import Card from '~/components/Card/Card';
import images from '~/assets/images';
import { carouselData } from '~/apiFakeData';

const cx = classNames.bind(styles);

function Home() {
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
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}>
                                <Card data={[{ title: 'Day la header', src: images.bannerImage2 }]} />
                            </div>
                        </div>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}>
                                <Card
                                    data={[
                                        { title: 'Day la header', src: images.bannerImage2, footer: 'Dining' },
                                        { title: 'Day la header', src: images.bannerImage2, footer: 'Home' },
                                        { title: 'Day la header', src: images.bannerImage2, footer: 'Kitchen' },
                                        {
                                            title: 'Day la header',
                                            src: images.bannerImage2,
                                            footer: 'Health and Beauty',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}></div>
                        </div>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}></div>
                        </div>

                        <hr className={cx('cart-row-break')} />

                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}>
                                <Card data={[{ title: 'Day la header', src: images.bannerImage2 }]} />
                            </div>
                        </div>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}>
                                <Card
                                    data={[
                                        { title: 'Day la header', src: images.bannerImage2, footer: 'Dining' },
                                        { title: 'Day la header', src: images.bannerImage2, footer: 'Home' },
                                        { title: 'Day la header', src: images.bannerImage2, footer: 'Kitchen' },
                                        {
                                            title: 'Day la header',
                                            src: images.bannerImage2,
                                            footer: 'Health and Beauty',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}></div>
                        </div>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('cart-item')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
