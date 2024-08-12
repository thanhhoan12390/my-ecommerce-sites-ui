import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';

import styles from './RelatedView.module.scss';
import ProductCard from '~/components/ProductCard/ProductCard';

const cx = classNames.bind(styles);

function RelateView({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [slideDirection, setSlideDirection] = useState('');

    const maxPage = useMemo(() => data.length, [data.length]);

    const handleLeftBtn = () => {
        setCurrentPage((curr) => (curr === 1 ? maxPage : curr - 1));
        setSlideDirection('carousel-slide-left');
    };

    const handleRightBtn = () => {
        setCurrentPage((curr) => (curr === maxPage ? 1 : curr + 1));
        setSlideDirection('carousel-slide-right');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <header className={cx('header')}>
                        <h2 className={cx('header-text')}>
                            Customers who viewed items in your browsing history also viewed
                        </h2>
                        <span className={cx('header-pagination')}>
                            Page {currentPage} of {maxPage}
                        </span>
                    </header>

                    <div className={cx('carousel-wrapper')}>
                        <button className={cx('arrow-left-btn', 'arrow-btn')} onClick={handleLeftBtn}>
                            <FontAwesomeIcon icon={faChevronLeft} className={cx('arrow-left-icon')} />
                        </button>

                        <div className={cx('carousel-group')}>
                            {data.map((page, index) => (
                                <ul
                                    key={index}
                                    className={
                                        currentPage === page.pageNum
                                            ? cx('carousel-content', slideDirection)
                                            : cx('carousel-content', 'carousel-content-hidden')
                                    }
                                >
                                    {page.items.map((item, index) => (
                                        <li key={index}>
                                            <ProductCard
                                                id={item.id}
                                                img={item.image}
                                                description={item.description}
                                                rating={item.rating}
                                                saleOff={item.saleOff}
                                                typicalPrice={item.typicalPrice}
                                                price={item.price}
                                                ship={item.ship}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>

                        <button className={cx('arrow-right-btn', 'arrow-btn')} onClick={handleRightBtn}>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-right-icon')} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelateView;
