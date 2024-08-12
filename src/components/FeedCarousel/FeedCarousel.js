import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './FeedCarousel.module.scss';
import { Link } from 'react-router-dom';
import { useCallback, useState, useRef } from 'react';

const cx = classNames.bind(styles);

function FeedCarousel({ feedCarouselData }) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [disableBarTransition, setDisableBarTransition] = useState('');
    const [disabledLeftArrow, setDisabledLeftArrow] = useState('disabled-arrow');
    const [disabledRightArrow, setDisabledRightArrow] = useState('');

    const carouselRef = useRef();
    const scrollbarRef = useRef();

    const updateScrollBarWidth = useCallback(() => {
        const scrollbarWidth = (1420 / carouselRef.current.scrollWidth) * 100;
        scrollbarRef.current.style.width = `${scrollbarWidth}%`;
    }, []);

    const updateScroll = (scrollWidth) => {
        // contentWidth = 1420
        // max scrollLeft = carouselRef.current.scrollWidth - 1420
        const maxScrollLeft = carouselRef.current.scrollWidth - 1420;

        let currScrollLeft =
            scrollWidth + carouselRef.current.scrollLeft <= maxScrollLeft
                ? scrollWidth + carouselRef.current.scrollLeft
                : maxScrollLeft;

        currScrollLeft = currScrollLeft < 0 ? 0 : currScrollLeft;

        if (currScrollLeft === 0) {
            setDisabledLeftArrow('disabled-arrow');
        } else if (Math.ceil(currScrollLeft) >= 4073) {
            setDisabledRightArrow('disabled-arrow');
        } else {
            setDisabledLeftArrow('');
            setDisabledRightArrow('');
        }

        const scrollbarPos = (currScrollLeft / carouselRef.current.scrollWidth) * 100;

        carouselRef.current.scrollLeft += scrollWidth;
        scrollbarRef.current.style.left = `${scrollbarPos}%`;
    };

    const getScrollLeftWidth = useCallback(() => {
        let scrollWidth = 0;

        const currScrollLeft = carouselRef.current.scrollLeft;

        const ulElement = carouselRef.current.querySelector('ul');
        const ulChildList = ulElement.children;

        let hiddenElementList = [];

        const childListLength = ulChildList.length;
        for (let index = 0; index < childListLength; index++) {
            const element = ulChildList[index];

            if (element.offsetLeft + element.offsetWidth + 10 - currScrollLeft <= element.offsetWidth) {
                hiddenElementList.push(element);
            } else break;
        }

        const hiddenListLength = hiddenElementList.length;
        for (let index = 0; index < hiddenListLength; index++) {
            const element = hiddenElementList[index];

            if (currScrollLeft - element.offsetLeft <= 1420) {
                if (index !== 0) {
                    scrollWidth = currScrollLeft - hiddenElementList[index + 1].offsetLeft;
                } else scrollWidth = currScrollLeft - hiddenElementList[index].offsetLeft;

                break;
            }
        }

        return scrollWidth;
    }, []);

    const getScrollRightWidth = useCallback(() => {
        //ul width = 1420px, min-width = 145px, max-width = 270px
        let scrollWidth = 0;

        const currScrollLeft = carouselRef.current.scrollLeft;

        const ulElement = carouselRef.current.querySelector('ul');
        const ulChildList = ulElement.children;

        for (const element of ulChildList) {
            if (element.offsetLeft + element.offsetWidth - currScrollLeft > 1420) {
                scrollWidth = element.offsetLeft - currScrollLeft;
                break;
            }
        }

        return scrollWidth;
    }, []);

    const handleScrollLeft = () => {
        const scrollWidth = getScrollLeftWidth();

        updateScroll(-scrollWidth);
    };

    const handleScrollRight = () => {
        const scrollWidth = getScrollRightWidth();

        updateScroll(scrollWidth);
    };

    const dragStart = (e) => {
        setIsDragging(true);
        setDisableBarTransition('disable-scrollbar-transition');
        setStartX(e.pageX);
    };

    const dragStop = () => {
        setIsDragging(false);
        setDisableBarTransition('');
    };

    const handleDragBar = (e) => {
        if (!isDragging) return;

        const scrollWidth = ((e.pageX - startX) / 1420) * carouselRef.current.scrollWidth;
        updateScroll(scrollWidth);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('feed-carousel-header')}>
                <h2 className={cx('feed-carousel-header-text')}>{feedCarouselData.title}</h2>
            </header>

            <div className={cx('feed-carousel-container')} onMouseEnter={updateScrollBarWidth}>
                <div ref={carouselRef} className={cx('feed-carousel-content')}>
                    <ul className={cx('feed-carousel-list')}>
                        {feedCarouselData.data.map((item, index) => (
                            <li key={index} className={cx('feed-carousel-item')}>
                                <Link to={`viewProduct/${item.id}`}>
                                    <img
                                        src={item.src}
                                        alt={`Carousel img ${index}`}
                                        className={cx('feed-carousel-img')}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className={cx('feed-carousel-arrow-left', 'feed-carousel-arrow', disabledLeftArrow)}
                    onClick={handleScrollLeft}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className={cx('feed-carousel-left-icon')} />
                </button>
                <button
                    className={cx('feed-carousel-arrow-right', 'feed-carousel-arrow', disabledRightArrow)}
                    onClick={handleScrollRight}
                >
                    <FontAwesomeIcon icon={faChevronRight} className={cx('feed-carousel-right-icon')} />
                </button>

                <span className={cx('feed-scrollbar')}>
                    <span className={cx('feed-scrollbar-track')}>
                        <span
                            ref={scrollbarRef}
                            className={cx('feed-scrollbar-thumb', disableBarTransition)}
                            onMouseMove={(e) => handleDragBar(e)}
                            onMouseDown={(e) => dragStart(e)}
                            onMouseLeave={dragStop}
                            onMouseUp={dragStop}
                        ></span>
                    </span>
                </span>
            </div>
        </div>
    );
}

FeedCarousel.propTypes = {
    feedCarouselData: PropTypes.object,
};

export default FeedCarousel;
