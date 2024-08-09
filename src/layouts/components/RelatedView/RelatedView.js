import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useRef, useState } from 'react';

import styles from './RelatedView.module.scss';
import ProductCard from '~/components/ProductCard/ProductCard';

import { relatedViewData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function RelateView() {
    const [currentPage, setCurrentPage] = useState(1);

    const carouselRef = useRef();

    const maxPage = useMemo(() => Math.ceil(relatedViewData.length / 7), []);

    const maxWidth = useMemo(() => 1372, []);

    const handleLeftBtn = () => {
        setCurrentPage((curr) => {
            if (curr === 1) return maxPage;
            else return curr - 1;
        });

        if (carouselRef.current.scrollLeft - maxWidth < 0) {
            carouselRef.current.scrollLeft = maxWidth;
        } else {
            carouselRef.current.scrollLeft -= maxWidth;
        }
    };

    const handleRightBtn = () => {
        setCurrentPage((curr) => {
            if (curr === maxPage) return 1;
            else return curr + 1;
        });

        if (carouselRef.current.scrollLeft + maxWidth >= maxWidth * maxPage) {
            carouselRef.current.scrollLeft = 0;
        } else {
            carouselRef.current.scrollLeft += maxWidth;
        }
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

                        <div ref={carouselRef} className={cx('carousel-group')}>
                            <ul className={cx('carousel-content')} style={{ width: `${maxPage * maxWidth}px` }}>
                                {relatedViewData.map((item, index) => (
                                    <li key={index}>
                                        <ProductCard
                                            img={item.image}
                                            description={item.description}
                                            rating={item.rating}
                                            saleOff={item.saleOff}
                                            originalPrice={item.originalPrice}
                                            price={item.price}
                                            ship={item.ship}
                                        />
                                    </li>
                                ))}
                            </ul>
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
