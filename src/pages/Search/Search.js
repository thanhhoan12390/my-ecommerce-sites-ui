import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Search.module.scss';
import StandardCard from '~/components/StandardCard';
import Pagination from '~/components/Pagination';
import { getSearchPageBrands } from '~/utils/commonFuncs';
import { addBrandFilter, deleteBrandFilter, clearBrandFilter } from './searchSlice'; // actions
import { brandFilterSelector } from '~/redux/selectors';
import config from '~/config';

import {
    computerTopicData,
    refreshSpaceTopicData,
    decorTopicData,
    fashionTopicData,
    beautyTopicData,
    toyTopicData,
    kitchenTopicData,
} from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function Search() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesData, setPagesData] = useState([]);

    const dispatch = useDispatch();

    const { searchTopic } = useParams();

    const checkedValueList = useSelector(brandFilterSelector);

    const searchTopicData = useMemo(() => {
        switch (searchTopic) {
            case config.constant.BEAUTY_TOPIC:
                return beautyTopicData;
            case config.constant.COMPUTER_TOPIC:
                return computerTopicData;
            case config.constant.DECOR_TOPIC:
                return decorTopicData;
            case config.constant.FASHION_TOPIC:
                return fashionTopicData;
            case config.constant.KITCHEN_TOPIC:
                return kitchenTopicData;
            case config.constant.REFRESH_SPACE_TOPIC:
                return refreshSpaceTopicData;
            case config.constant.TOY_TOPIC:
                return toyTopicData;
            default:
                let newPagesData = [];
                let filteredList = [];
                let pageIndex = 1;
                let maxPageItem = 0;

                const combineAllData = [
                    ...computerTopicData,
                    ...beautyTopicData,
                    ...decorTopicData,
                    ...fashionTopicData,
                    ...kitchenTopicData,
                    ...toyTopicData,
                    ...refreshSpaceTopicData,
                ];

                combineAllData.forEach((page) => {
                    maxPageItem = page.maxItem;

                    page.items.forEach((item) => {
                        filteredList.push(item);

                        // Nếu số item filter được vượt quá max page item
                        if (filteredList.length === page.maxItem) {
                            newPagesData = [
                                ...newPagesData,
                                {
                                    pageNum: pageIndex,
                                    maxItem: page.maxItem,
                                    items: filteredList,
                                },
                            ];
                            pageIndex++;
                            filteredList = [];
                        }
                    });
                });

                // Số item filter còn sót lại vì số lượng không bằng max page item nên không được thêm ở trước đó
                if (filteredList.length > 0) {
                    newPagesData = [
                        ...newPagesData,
                        {
                            pageNum: pageIndex,
                            maxItem: maxPageItem,
                            items: filteredList,
                        },
                    ];
                }

                return newPagesData;
        }
    }, [searchTopic]);

    const maxPage = useMemo(() => pagesData.length, [pagesData]);
    const brandArray = useMemo(() => getSearchPageBrands(searchTopicData), [searchTopicData]);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [currentPage]);

    useEffect(() => {
        if (checkedValueList.length !== 0) {
            let newPagesData = [];
            let filteredList = [];
            let pageIndex = 1;
            let maxPageItem = 0;

            searchTopicData.forEach((page) => {
                maxPageItem = page.maxItem;

                page.items.forEach((item) => {
                    if (checkedValueList.includes(item.brand)) {
                        filteredList.push(item);
                    }
                    // Nếu số item filter được vượt quá max page item
                    if (filteredList.length === page.maxItem) {
                        newPagesData = [
                            ...newPagesData,
                            {
                                pageNum: pageIndex,
                                maxItem: page.maxItem,
                                items: filteredList,
                            },
                        ];
                        pageIndex++;
                        filteredList = [];
                    }
                });
            });
            // Số item filter còn sót lại vì số lượng không bằng max page item nên không được thêm ở trước đó
            if (filteredList.length > 0) {
                newPagesData = [
                    ...newPagesData,
                    {
                        pageNum: pageIndex,
                        maxItem: maxPageItem,
                        items: filteredList,
                    },
                ];
            }

            setPagesData(newPagesData);
            if (currentPage > newPagesData.length) {
                setCurrentPage(newPagesData.length);
            }
            // Vì nếu không đưa current page về đúng với số lượng page được filter,
            // thì khi ở đang số page lớn hơn số lượng page do filter thay đổi sẽ xảy ra lỗi
        } else {
            setPagesData(searchTopicData);
        }
    }, [checkedValueList, currentPage, searchTopicData]);

    const handleCheckboxChange = (e) => {
        if (e.target.checked === true) {
            dispatch(addBrandFilter(e.target.value));
        } else {
            dispatch(deleteBrandFilter(e.target.value));
        }
    };

    return (
        <div className={cx('col', 'l-12', 'm-12', 'c-6')}>
            <div className={cx('wrapper')}>
                <div className={cx('row', 'sm-gutter')}>
                    {/* Sidebar */}
                    <div className={cx('col', 'l-2', 'm-0', 'c-0')}>
                        <div className={cx('sidebar')}>
                            <div className={cx('brand-filter')}>
                                <h4 className={cx('brand-header')}>Brand filter</h4>
                                {checkedValueList.length > 0 && (
                                    <div
                                        className={cx('brand-filter-clear')}
                                        onClick={() => {
                                            dispatch(clearBrandFilter());
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronLeft}
                                            className={cx('brand-filter-clear-icon')}
                                        />
                                        <span>Clear</span>
                                    </div>
                                )}
                                <ul className={cx('brand-filter-group')}>
                                    {brandArray.map((brand, index) => (
                                        <li key={index} className={cx('filter-item')}>
                                            <input
                                                type="checkbox"
                                                checked={checkedValueList.includes(brand)}
                                                value={brand}
                                                id={`brand-filter-${brand}`}
                                                onChange={(e) => handleCheckboxChange(e)}
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
                        <div className={cx('result-title')}>
                            <h2 className={cx('result-title-heading')}>Results</h2>
                            <span className={cx('result-title-text')}>
                                Check each product page for other buying options.
                            </span>
                        </div>

                        {/* Main Search Page Content */}
                        <div className={cx('row')}>
                            {pagesData.length > 0 &&
                                pagesData[currentPage - 1].items.map((item, index) => (
                                    <div key={index} className={cx('col', 'l-2-4', 'm-3', 'c-3')}>
                                        <div className={cx('card-item')}>
                                            <StandardCard
                                                bestSell={item.bestSell}
                                                img={item.image}
                                                description={item.description}
                                                brand={item.brand}
                                                rating={item.rating}
                                                bought={item.bought}
                                                price={item.price}
                                                typicalPrice={item.typicalPrice}
                                                deliveryDay={item.deliveryDay}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Pagination */}
                        <Pagination currPage={currentPage} maxPage={maxPage} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
