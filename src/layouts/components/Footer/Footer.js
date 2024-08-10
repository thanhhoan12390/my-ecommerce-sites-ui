import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import RelateView from '~/layouts/components/RelatedView';
import { virtualProductItem } from '~/utils/commonFuncs';

import { relatedViewData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function Footer() {
    const handleBackToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('relate-item-view')}>
                <RelateView data={virtualProductItem(relatedViewData)} />
                <div className={cx('nav-footer-line')}></div>
                <br />
            </div>

            <div className={cx('nav-back-to-top')} onClick={handleBackToTop}>
                <span>Back to top</span>
            </div>

            <div className={cx('nav-accessibility', 'grid')}>
                <div className={cx('nav-accessibility-content', 'row')}></div>
            </div>

            <div className={cx('nav-footer-line')}></div>

            <div className={cx('nav-pad-item-line')}></div>

            <div className={cx('nav-desc-line', 'grid')}>
                <div className={cx('nav-desc-line-content', 'row')}></div>
            </div>

            <div className={cx('nav-copyright')}></div>
        </div>
    );
}

export default Footer;
