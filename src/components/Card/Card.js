import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

// Topic: refreshSpace, decor, fashion, beauty, toy, kitchen
function Card({ data, className }) {
    return (
        <Fragment>
            {data.products.length < 2 && (
                <div className={cx('wrapper', className)}>
                    {data.products.map((item, index) => (
                        <div key={index} className={cx('card-no-grid')}>
                            <header className={cx('card-header')}>
                                <h2 className={cx('card-header-text')}>{data.title}</h2>
                            </header>
                            <div className={cx('card-item')}>
                                <Link to={`/search/${data.topic}`} className={cx('card-group')}>
                                    <img src={item.src} alt={data.title} className={cx('card-img')} />
                                </Link>
                                <Link to={`/search/${data.topic}`} className={cx('card-link')}>
                                    Shop now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {data.products.length >= 2 && (
                <div className={cx('card-grid-wrapper', className)}>
                    <header className={cx('card-header')}>
                        <h2 className={cx('card-header-text')}>{data.title}</h2>
                    </header>

                    <div className={cx('card-grid-content')}>
                        <div className={cx('card-grid-group', 'row')}>
                            {data.products.map((item, index) => (
                                <div key={index} className={cx('col', 'l-6', 'm-6', 'c-6', 'card-grid-item')}>
                                    <Link to={`/search/${data.topic}`}>
                                        <img src={item.src} alt={item.footer} className={cx('card-grid-img')} />
                                    </Link>
                                    <Link to={`/search/${data.topic}`} className={cx('card-item-footer')}>
                                        {item.footer}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <Link to={`/search/${data.topic}`} className={cx('card-link')}>
                            See more
                        </Link>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

Card.propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
};

export default Card;
