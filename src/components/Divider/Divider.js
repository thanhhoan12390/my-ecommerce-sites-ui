import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Divider.module.scss';

const cx = classNames.bind(styles);

function Divider({ className }) {
    return <div className={cx('wrapper', className)}></div>;
}

Divider.propTypes = {
    className: PropTypes.string,
};

export default Divider;
