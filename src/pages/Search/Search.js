import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const brandArr = ['Amazon Basics', 'Logitech', 'JanSport', 'SAMSUNG', 'SanDisk', 'HP', 'MATEIN'];

function Search() {
    const [checkedValueList, setCheckedValueList] = useState([]);

    const handleInputChange = (e) => {
        setCheckedValueList((pre) => {
            if (e.target.checked === true) {
                return [...pre, e.target.value];
            } else {
                return checkedValueList.filter((value) => value !== e.target.value);
            }
        });
    };

    return (
        <div className={cx('col', 'l-12', 'm-12', 'c-6')}>
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    {/* Sidebar */}
                    <div className={cx('col', 'l-2', 'm-0', 'c-0')}>
                        <div className={cx('sidebar')}>
                            <div className={cx('brand-filter')}>
                                <h4 className={cx('brand-header')}>Brand filter</h4>
                                {checkedValueList.length > 0 && (
                                    <div className={cx('brand-filter-clear')} onClick={() => setCheckedValueList([])}>
                                        <FontAwesomeIcon
                                            icon={faChevronLeft}
                                            className={cx('brand-filter-clear-icon')}
                                        />
                                        <span>Clear</span>
                                    </div>
                                )}
                                <ul className={cx('brand-filter-group')}>
                                    {brandArr.map((brand, index) => (
                                        <li key={index} className={cx('filter-item')}>
                                            <input
                                                type="checkbox"
                                                checked={checkedValueList.includes(brand)}
                                                value={brand}
                                                id={`brand-filter-${brand}`}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            <label htmlFor={`brand-filter-${brand}`}>{brand}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={cx('sidebar-filter')}>
                                <h4 className={cx('sidebar-filter-header')}>Sustainability Features</h4>
                                <ul className={cx('sidebar-filter-group')}>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>View All</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Carbon Impact</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Energy Efficiency</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Manufacturing Practices</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Pre-Owned</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Recycled Materials</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Safer Chemicals</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Worker Wellbeing</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={cx('sidebar-filter')}>
                                <h4 className={cx('sidebar-filter-header')}>Deals & Discounts</h4>
                                <ul className={cx('sidebar-filter-group')}>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>All Discounts</span>
                                    </li>
                                    <li className={cx('sidebar-filter-item')}>
                                        <span>Today's Deals</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={cx('col', 'l-10', 'm-12', 'c-12')}>
                        <div className={cx('row', 'sm-gutter', 'content')}>
                            <div className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                <div className={cx('card-item')}> </div>
                            </div>

                            <div className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                <div className={cx('card-item')}> </div>
                            </div>

                            <div className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                <div className={cx('card-item')}> </div>
                            </div>

                            <div className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                <div className={cx('card-item')}> </div>
                            </div>

                            <div className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                <div className={cx('card-item')}> </div>
                            </div>

                            <div className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                <div className={cx('card-item')}> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
