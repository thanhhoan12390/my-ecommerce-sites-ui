import classNames from 'classnames/bind';

import styles from './RowBreak.module.scss';

const cx = classNames.bind(styles);

function RowBreak() {
    return <hr className={cx('wrapper')} />;
}

export default RowBreak;
