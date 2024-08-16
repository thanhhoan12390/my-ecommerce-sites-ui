import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './TodayDeal.module.scss';
import TodayDealCard from './TodayDealCard';
import { addPriceFilter, addDiscountFilter } from './todayDealSlice';
import { priceFilterSelector, discountFilterSelector } from '~/redux/selectors';
import BannerCard from '~/components/BannerCard';

import { productsData, bannerCardData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function TodayDeal() {
    const [todayDealData, setTodayDealData] = useState(productsData);

    const dispatch = useDispatch();

    const priceFilter = useSelector(priceFilterSelector);
    const discountFilter = useSelector(discountFilterSelector);

    const handlePriceFilter = (e) => {
        if (e.target.checked) {
            switch (e.target.value) {
                case '1':
                    dispatch(
                        addPriceFilter({
                            from: 0,
                            to: 25,
                        }),
                    );
                    break;
                case '2':
                    dispatch(
                        addPriceFilter({
                            from: 25,
                            to: 50,
                        }),
                    );
                    break;
                case '3':
                    dispatch(
                        addPriceFilter({
                            from: 50,
                            to: 100,
                        }),
                    );
                    break;
                case '4':
                    dispatch(
                        addPriceFilter({
                            from: 100,
                            to: 200,
                        }),
                    );
                    break;
                case '5':
                    dispatch(
                        addPriceFilter({
                            from: 200,
                            to: Infinity,
                        }),
                    );
                    break;

                default:
                    // all
                    dispatch(
                        addPriceFilter({
                            from: 0,
                            to: Infinity,
                        }),
                    );
                    break;
            }
        }
    };

    const handleDiscountFilter = (e) => {
        if (e.target.checked) {
            switch (e.target.value) {
                case '1':
                    dispatch(addDiscountFilter(10));
                    break;
                case '2':
                    dispatch(addDiscountFilter(25));
                    break;
                case '3':
                    dispatch(addDiscountFilter(50));
                    break;
                case '4':
                    dispatch(addDiscountFilter(75));
                    break;
                default:
                    //all
                    dispatch(addDiscountFilter(0));
                    break;
            }
        }
    };

    useEffect(() => {
        setTodayDealData(() => {
            const newData = productsData.filter((item) => {
                const price = (item.typicalPrice - (item.typicalPrice * item.saleOff) / 100).toFixed(2);

                return price >= priceFilter.from && price < priceFilter.to && item.saleOff >= discountFilter;
            });

            return newData;
        });
    }, [discountFilter, priceFilter]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className="row">
                    <div className="col l-12 m-12 c-12">
                        <h1 className={cx('header')}>Today's Deal</h1>
                    </div>
                    <div className="col l-2 m-2 c-0">
                        <div className={cx('sidebar')}>
                            <div className={cx('price-filter')}>
                                <span className={cx('price-title')}>Price</span>
                                <div className={cx('price-group')}>
                                    <label className={cx('price-item')}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value="all"
                                            onChange={(e) => handlePriceFilter(e)}
                                            checked={priceFilter.from === 0 && priceFilter.to === Infinity}
                                        />
                                        <span>All</span>
                                    </label>
                                    <label className={cx('price-item')}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value="1"
                                            onChange={(e) => handlePriceFilter(e)}
                                            checked={priceFilter.from === 0 && priceFilter.to === 25}
                                        />
                                        <span>Under $25</span>
                                    </label>
                                    <label className={cx('price-item')}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value="2"
                                            onChange={(e) => handlePriceFilter(e)}
                                            checked={priceFilter.from === 25 && priceFilter.to === 50}
                                        />
                                        <span>$25 to $50</span>
                                    </label>
                                    <label className={cx('price-item')}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value="3"
                                            onChange={(e) => handlePriceFilter(e)}
                                            checked={priceFilter.from === 50 && priceFilter.to === 100}
                                        />
                                        <span>$50 to $100</span>
                                    </label>
                                    <label className={cx('price-item')}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value="4"
                                            onChange={(e) => handlePriceFilter(e)}
                                            checked={priceFilter.from === 100 && priceFilter.to === 200}
                                        />
                                        <span>$100 to $200</span>
                                    </label>
                                    <label className={cx('price-item')}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value="5"
                                            onChange={(e) => handlePriceFilter(e)}
                                            checked={priceFilter.from === 200 && priceFilter.to === Infinity}
                                        />
                                        <span>$200 & Above</span>
                                    </label>
                                </div>
                            </div>

                            <div className={cx('discount-filter')}>
                                <span className={cx('discount-title')}>Discount</span>
                                <div className={cx('discount-group')}>
                                    <label className={cx('discount-item')}>
                                        <input
                                            type="radio"
                                            name="discount"
                                            value="all"
                                            onChange={(e) => handleDiscountFilter(e)}
                                            checked={discountFilter === 0}
                                        />
                                        <span>All</span>
                                    </label>
                                    <label className={cx('discount-item')}>
                                        <input
                                            type="radio"
                                            name="discount"
                                            value="1"
                                            onChange={(e) => handleDiscountFilter(e)}
                                            checked={discountFilter === 10}
                                        />
                                        <span>10% off or more</span>
                                    </label>
                                    <label className={cx('discount-item')}>
                                        <input
                                            type="radio"
                                            name="discount"
                                            value="2"
                                            onChange={(e) => handleDiscountFilter(e)}
                                            checked={discountFilter === 25}
                                        />
                                        <span>25% off or more</span>
                                    </label>
                                    <label className={cx('discount-item')}>
                                        <input
                                            type="radio"
                                            name="discount"
                                            value="3"
                                            onChange={(e) => handleDiscountFilter(e)}
                                            checked={discountFilter === 50}
                                        />
                                        <span>50% off or more</span>
                                    </label>
                                    <label className={cx('discount-item')}>
                                        <input
                                            type="radio"
                                            name="discount"
                                            value="4"
                                            onChange={(e) => handleDiscountFilter(e)}
                                            checked={discountFilter === 75}
                                        />
                                        <span>70% off or more</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Banner card */}
                        <div className={cx('banner-card-group')}>
                            <div className={cx('banner-card-content')}>
                                <div className={cx('banner-card-header')}>
                                    <h3>Pair with your cart</h3>
                                </div>
                                {bannerCardData.map((item) => (
                                    <BannerCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col l-10 m-10 c-12">
                        <div className="row">
                            {!!todayDealData &&
                                todayDealData.map((item) => (
                                    <div key={item.id} className="col l-2 m-4 c-6">
                                        <TodayDealCard data={item} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TodayDeal;
