import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Pagination({ currPage = 1, onPageChange = () => {}, maxPage }) {
    const [disablePrevBtn, setDisablePrevBtn] = useState('');
    const [disableNextBtn, setDisableNextBtn] = useState('');

    const pagesNum = useMemo(() => {
        let pageList = [];

        for (let index = 0; index < maxPage; index++) {
            pageList.push(index + 1);
        }

        return pageList;
    }, [maxPage]);

    useEffect(() => {
        if (currPage === 1) {
            setDisablePrevBtn('disable-prev-btn');
        } else {
            setDisablePrevBtn('');
        }

        if (currPage === maxPage) {
            setDisableNextBtn('disable-next-btn');
        } else {
            setDisableNextBtn('');
        }
    }, [currPage, maxPage]);

    const handlePrevPage = () => {
        if (currPage === 1) {
            onPageChange(1);
        } else {
            onPageChange(currPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currPage === maxPage) {
            onPageChange(maxPage);
        } else {
            onPageChange(currPage + 1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('container')}>
                <button
                    className={cx('pagination-prev-btn', disablePrevBtn)}
                    onClick={handlePrevPage}
                    disabled={currPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className={cx('pagination-prev-icon')} />
                    Previous
                </button>

                <div className={cx('pagination-group')}>
                    {pagesNum.map((num) => (
                        <span
                            key={num}
                            className={num === currPage ? cx('pagination-num', 'current-page') : cx('pagination-num')}
                            onClick={() => onPageChange(num)}
                        >
                            {num}
                        </span>
                    ))}
                </div>

                <button
                    className={cx('pagination-next-btn', disableNextBtn)}
                    onClick={handleNextPage}
                    disabled={currPage === maxPage}
                >
                    Next
                    <FontAwesomeIcon icon={faChevronRight} className={cx('pagination-next-icon')} />
                </button>
            </span>
        </div>
    );
}

Pagination.propTypes = {
    currPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    maxPage: PropTypes.number.isRequired,
};

export default Pagination;
