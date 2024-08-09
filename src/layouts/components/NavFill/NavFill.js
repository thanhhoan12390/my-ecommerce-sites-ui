import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; // headless Tippy
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './NavFill.module.scss';
import { SearchIcon } from '~/components/Icons';
import MenuWrapper from '~/components/MenuWrapper';
import OverLay from '~/components/OverLay';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchService';
import { searchTypeSelector } from '~/redux/selectors';
import { getSearchType } from '~/layouts/components/Header/headerSlice'; // action creator

const cx = classNames.bind(styles);

function NavFill() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [searchTypeValue, setSearchTypeValue] = useState('All');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const dispatch = useDispatch();

    const searchTypes = useSelector(searchTypeSelector);
    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        dispatch(getSearchType());
    }, [dispatch]);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchSearch = async () => {
            const result = await searchServices.search(debounceValue);

            setSearchResult(result);
        };

        fetchSearch();
    }, [debounceValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('tippy-select-wrapper')}>
                    <Tippy
                        interactive
                        visible={isDropDownOpen}
                        onClickOutside={() => setIsDropDownOpen(false)}
                        offset={[0, 0]}
                        render={(attrs) => (
                            <div className={cx('select-result')} tabIndex="-1" {...attrs}>
                                <MenuWrapper className={cx('select-wrapper')}>
                                    {searchTypes.map((item, index) => (
                                        <span
                                            className={cx('select-item')}
                                            key={index}
                                            onClick={() => {
                                                setSearchTypeValue(item.content);
                                                setIsDropDownOpen(false);
                                            }}
                                        >
                                            {item.content}
                                        </span>
                                    ))}
                                </MenuWrapper>
                            </div>
                        )}
                    >
                        <div></div>
                    </Tippy>
                </div>

                {/* Tippy control */}
                <button className={cx('search-select')} onClick={() => setIsDropDownOpen(true)}>
                    <span>
                        {searchTypeValue}
                        <i className={cx('search-select-icon')} />
                    </span>
                </button>

                {/* Search fill */}
                <div className={cx('search-tippy-wrapper')}>
                    <Tippy
                        interactive
                        visible={showResult && searchResult.length > 0}
                        offset={[-1, -2]}
                        onClickOutside={() => setShowResult(false)}
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <MenuWrapper className={cx('menu-wrapper')}>
                                    {searchResult.map((item, index) => (
                                        <div key={index} className={cx('search-item')}>
                                            <SearchIcon width="1.9rem" height="1.9rem" />
                                            <span>{item.full_name}</span>
                                        </div>
                                    ))}
                                </MenuWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search-fill')}>
                            <input
                                value={searchValue}
                                type="text"
                                placeholder="Search my sites"
                                spellCheck={false}
                                onChange={handleChange}
                                onFocus={() => setShowResult(true)}
                            />
                            <button className={cx('search-btn')}>
                                <SearchIcon />
                            </button>
                        </div>
                    </Tippy>
                </div>
            </div>

            {/* Tạo lớp overlay */}
            <OverLay className={cx('nav-overlay')} />
        </div>
    );
}

export default NavFill;
