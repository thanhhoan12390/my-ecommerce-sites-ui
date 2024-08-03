import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; // headless Tippy

import styles from './NavFill.module.scss';
import { SearchIcon } from '~/components/Icons';
import MenuWrapper from '~/components/MenuWrapper';

const cx = classNames.bind(styles);

function NavFill() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* Div này để fix warning Tippy */}
                <div>
                    <Tippy
                        interactive
                        trigger="click"
                        offset={[73, -3]}
                        render={(attrs) => (
                            <div className={cx('select-result')} tabIndex="-1" {...attrs}>
                                <MenuWrapper className={cx('select-wrapper')}>
                                    <span className={cx('select-item')}>All</span>
                                    <span className={cx('select-item')}>All Department</span>
                                    <span className={cx('select-item')}>All Department</span>
                                    <span className={cx('select-item')}>All Department</span>
                                    <span className={cx('select-item')}>All Department</span>
                                    <span className={cx('select-item')}>All Department</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                    <span className={cx('select-item')}>Tool & Home Improvement</span>
                                </MenuWrapper>
                            </div>
                        )}
                    >
                        <button className={cx('search-select')}>
                            <span>
                                All
                                <i className={cx('search-select-icon')} />
                            </span>
                        </button>
                    </Tippy>
                </div>

                {/* Search fill */}
                <Tippy
                    interactive
                    visible={false}
                    offset={[-330, 0]}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <MenuWrapper className={cx('menu-wrapper')}>
                                <div className={cx('search-item')}>
                                    <SearchIcon width="1.9rem" height="1.9rem" />
                                    <span>Ket qua search 1</span>
                                </div>
                                <div className={cx('search-item')}>
                                    <SearchIcon width="1.9rem" height="1.9rem" />
                                    <span>Ket qua search 1</span>
                                </div>
                            </MenuWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search-fill')}>
                        <input type="text" placeholder="Search my sites" spellCheck={false} />
                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default NavFill;
