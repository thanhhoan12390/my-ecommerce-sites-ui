import classNames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './OrderPage.module.scss';

const cx = classNames.bind(styles);

function OrderPage() {
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    return <div className={cx('wrapper')}>Order Page</div>;
}

export default OrderPage;
