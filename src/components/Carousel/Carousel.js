import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

function Carousel({ data }) {
    const [slideId, setSlideId] = useState(0);
    const [slideDirection, setSlideDirection] = useState('');

    const handleNextSlide = () => {
        setSlideId(slideId === data.length - 1 ? 0 : slideId + 1);
        setSlideDirection('slide-right');
    };

    const handlePrevSlide = () => {
        setSlideId(slideId === 0 ? data.length - 1 : slideId - 1);
        setSlideDirection('slide-left');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('arrow-btn-group')}>
                <button className={cx('arrow-btn', 'arrow-left-btn')} onClick={handlePrevSlide}>
                    <FontAwesomeIcon icon={faChevronLeft} className={cx('arrow-left-icon')} />
                </button>
                <button className={cx('arrow-btn', 'arrow-right-btn')} onClick={handleNextSlide}>
                    <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-right-icon')} />
                </button>
            </div>
            {data.map((item, index) => (
                <Link key={index} className={cx('slide-link')}>
                    <img
                        src={item.src}
                        alt={item.alt}
                        className={slideId === index ? cx('slide', slideDirection) : cx('slide', 'slide-hidden')}
                    />
                </Link>
            ))}
        </div>
    );
}

Carousel.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Carousel;
