import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import RelateView from '~/layouts/components/RelatedView';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('relate-item-view')}>
                <RelateView />
            </div>

            <div className={cx('nav-back-to-top')}></div>

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
