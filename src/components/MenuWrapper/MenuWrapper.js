import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './MenuWrapper.module.scss';

const cx = classNames.bind(styles);

function MenuWrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

MenuWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default MenuWrapper;
