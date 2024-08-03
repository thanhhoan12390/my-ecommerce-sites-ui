import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './OverLay.module.scss';

const cx = classNames.bind(styles);

// Cách dùng lớp overlay: truyền className và dùng className để "display: block" lớp overlay trong file SCSS
function OverLay({ className }) {
    return <div className={cx('overlay', className)}></div>;
}

OverLay.propTypes = {
    className: PropTypes.string.isRequired,
};

export default OverLay;
