import classNames from 'classnames/bind';

import styles from './NavFill.module.scss';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function NavFill() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <button className={cx('search-select')}>
                    <span>
                        All
                        <i className={cx('search-select-icon')} />
                    </span>
                </button>
                <div className={cx('search-fill')}>
                    <input type="text" placeholder="Search my sites" spellCheck={false} />
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavFill;
