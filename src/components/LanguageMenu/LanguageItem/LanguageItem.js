import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import styles from './LanguageItem.module.scss';

const cx = classNames.bind(styles);

function LanguageItem({ children, className, checked = false, onClick, ...passProps }) {
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
            <FontAwesomeIcon icon={faCircle} className={cx('language-radio-icon')} />
            <span>{children}</span>
        </div>
    );
}

LanguageItem.propTypes = {
    children: PropTypes.node,
    classNames: PropTypes.string,
    checked: PropTypes.bool,
};

export default LanguageItem;
