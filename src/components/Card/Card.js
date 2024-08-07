import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Card.module.scss';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Card({ data, className }) {
    return (
        <Fragment>
            {data.length < 2 && (
                <div className={cx('wrapper', className)}>
                    {data.map((item, index) => (
                        <Fragment key={index}>
                            <header className={cx('card-header')}>
                                <h2 className={cx('card-header-text')}>{item.title}</h2>
                            </header>
                            <div className={cx('card-item')}>
                                <Link to="/" className={cx('card-group')}>
                                    <img src={item.src} alt={item.title} className={cx('card-img')} />
                                </Link>
                                <Link to="/" className={cx('card-link')}>
                                    Shop now
                                </Link>
                            </div>
                        </Fragment>
                    ))}
                </div>
            )}

            {data.length >= 2 && (
                <div className={cx('wrapper', className)}>
                    <header className={cx('card-header')}>
                        <h2 className={cx('card-header-text')}>{data[0].title}</h2>
                    </header>

                    <div className={cx('card-grid-content')}>
                        <div className={cx('card-grid-group', 'row')}>
                            {data.map((item, index) => (
                                <div key={index} className={cx('col', 'l-6', 'card-grid-item')}>
                                    <img
                                        src={item.src}
                                        alt={`${item.title + ' ' + index}`}
                                        className={cx('card-grid-img')}
                                    />
                                    <Link to="/" className={cx('card-item-footer')}>
                                        {item.footer}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <Link to="/" className={cx('card-link')}>
                            See more
                        </Link>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

Card.propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
};

export default Card;
