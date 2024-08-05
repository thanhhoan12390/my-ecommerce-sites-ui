import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './OverLay.module.scss';

const cx = classNames.bind(styles);

// Cách dùng lớp overlay: truyền className và dùng className để "display: block" lớp overlay trong file SCSS
// Lớp Overlay ngang cấp với component ví dụ:
/**
 * <OverLay />
 * <Component>
 *   .....
 * </Component>
 */
function OverLay({ className, onClick, ...passProps }) {
    return <div className={cx('overlay', className)} onClick={onClick} {...passProps}></div>;
}

OverLay.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    passProps: PropTypes.any,
};

export default OverLay;
