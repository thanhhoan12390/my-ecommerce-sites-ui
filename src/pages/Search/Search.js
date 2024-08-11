import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Search.module.scss';
import StandardCard from '~/components/StandardCard';
import Pagination from '~/components/Pagination';
import { getSearchPageBrands } from '~/utils/commonFuncs';
import { addBrandFilter, deleteBrandFilter, clearBrandFilter } from './searchSlice'; // actions
import { brandFilterSelector } from '~/redux/selectors';

import { searchPageData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function Search() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesData, setPagesData] = useState(searchPageData);

    const dispatch = useDispatch();

    const checkedValueList = useSelector(brandFilterSelector);

    const maxPage = useMemo(() => pagesData.length, [pagesData]);
    const brandArray = useMemo(() => getSearchPageBrands(searchPageData), []);

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

            searchPageData.forEach((page) => {
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
            setPagesData(searchPageData);
        }
    }, [checkedValueList, currentPage]);

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
                <div className={cx('row')}>
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
                                                originalPrice={item.originalPrice}
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
