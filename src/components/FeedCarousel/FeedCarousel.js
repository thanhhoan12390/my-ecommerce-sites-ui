import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './FeedCarousel.module.scss';
import { Link } from 'react-router-dom';
import { useCallback, useState, useRef } from 'react';

const cx = classNames.bind(styles);

function FeedCarousel({ feedCarouselData }) {
    const [disabledLeftArrow, setDisabledLeftArrow] = useState('disabled-arrow');
    const [disabledRightArrow, setDisabledRightArrow] = useState('');

    const carouselRef = useRef();

    const getScrollLeftWidth = useCallback(() => {
        //ul width = 1420px, min-width = 145px, max-width = 270px
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
                scrollWidth = element.offsetLeft - currScrollLeft; // Vì offsetLeft tính cả lề
                break;
            }
        }

        return scrollWidth;
    }, []);

    const handleScrollLeft = () => {
        const scrollWidth = getScrollLeftWidth();
        setDisabledRightArrow('');

        carouselRef.current.scrollLeft -= scrollWidth;

        if (carouselRef.current.scrollLeft - scrollWidth === 0) {
            setDisabledLeftArrow('disabled-arrow');
        }
    };

    const handleScrollRight = () => {
        const scrollWidth = getScrollRightWidth();
        setDisabledLeftArrow('');

        carouselRef.current.scrollLeft += scrollWidth;

        if (Math.ceil(carouselRef.current.scrollLeft) + scrollWidth >= 4073) {
            setDisabledRightArrow('disabled-arrow');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('feed-carousel-header')}>
                <h2 className={cx('feed-carousel-header-text')}>{feedCarouselData.title}</h2>
            </header>

            <div className={cx('feed-carousel-container')}>
                <div ref={carouselRef} className={cx('feed-carousel-content')}>
                    <ul className={cx('feed-carousel-list')}>
                        {feedCarouselData.data.map((image, index) => (
                            <li key={index} className={cx('feed-carousel-item')}>
                                <Link to="/" draggable={false}>
                                    <img
                                        src={image}
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
            </div>
        </div>
    );
}

FeedCarousel.propTypes = {
    data: PropTypes.object,
};

export default FeedCarousel;
