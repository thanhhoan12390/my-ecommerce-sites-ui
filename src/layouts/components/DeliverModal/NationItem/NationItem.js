import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './NationItem.module.scss';

const cx = classNames.bind(styles);

function NationItem({ children, className, checked = false, onClick, ...passProps }) {
    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('wrapper', {
        [className]: className,
        checked,
    });

    return (
        <div className={classes} {...props}>
            <span>{children}</span>
        </div>
    );
}

NationItem.propTypes = {
    children: PropTypes.node,
    classNames: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
};

export default NationItem;
