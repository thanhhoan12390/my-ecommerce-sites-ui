import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useRef, useMemo } from 'react';

import styles from './RatingPopover.module.scss';
import MenuWrapper from '~/components/MenuWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RatingPopover({ children, rating }) {
    const ratingRef = useRef();

    const percentageStar = useMemo(() => Math.round((rating / 5) * 100), [rating]);

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                delay={[300, 400]}
                offset={[-60, 0]}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('rating-popover')} tabIndex="-1" {...attrs}>
                        <MenuWrapper className={cx('popover-wrapper')}>
                            <div className={cx('star-group')}>
                                <span className={cx('star-rating')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                                    <div
                                        ref={ratingRef}
                                        style={{ width: `${100 - percentageStar}%` }}
                                        className={cx('rating-overlay')}
                                    ></div>
                                </span>
                                <span>{rating} out of 5</span>
                            </div>

                            <span className={cx('total-review-count')}>19,347 global ratings</span>

                            <ul className={cx('histogram-rating')}>
                                <li className={cx('histogram-row')}>
                                    <span>5 star</span>

                                    <div className={cx('progress-bar')}>
                                        <div className={cx('progress-fill')} style={{ width: '86%' }}></div>
                                    </div>

                                    <span>86%</span>
                                </li>

                                <li className={cx('histogram-row')}>
                                    <span>4 star</span>

                                    <div className={cx('progress-bar')}>
                                        <div className={cx('progress-fill')} style={{ width: '8%' }}></div>
                                    </div>

                                    <span>8%</span>
                                </li>

                                <li className={cx('histogram-row')}>
                                    <span>3 star</span>

                                    <div className={cx('progress-bar')}>
                                        <div className={cx('progress-fill')} style={{ width: '2%' }}></div>
                                    </div>

                                    <span>2%</span>
                                </li>

                                <li className={cx('histogram-row')}>
                                    <span>2 star</span>

                                    <div className={cx('progress-bar')}>
                                        <div className={cx('progress-fill')} style={{ width: '1%' }}></div>
                                    </div>

                                    <span>1%</span>
                                </li>

                                <li className={cx('histogram-row')}>
                                    <span>1 star</span>

                                    <div className={cx('progress-bar')}>
                                        <div className={cx('progress-fill')} style={{ width: '3%' }}></div>
                                    </div>

                                    <span>3%</span>
                                </li>
                            </ul>
                        </MenuWrapper>

                        <div className={cx('arrow-border')}></div>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

RatingPopover.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RatingPopover;
