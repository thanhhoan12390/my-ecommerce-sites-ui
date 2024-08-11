import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, Fragment } from 'react';

import styles from './DeliverModal.module.scss';
import Divider from '~/components/Divider/Divider';
import MenuWrapper from '~/components/MenuWrapper';
import NationItem from './NationItem';
import { getNations, updateNation } from '~/layouts/components/Header/headerSlice';
import { nationsSelector } from '~/redux/selectors';
import OverLay from '~/components/OverLay/OverLay';

const cx = classNames.bind(styles);

function DeliverModal({ isOpen = false, onClose = () => {} }) {
    const [isNationCheckedId, setIsNationCheckedId] = useState(1);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const dispatch = useDispatch();

    const nationsList = useSelector(nationsSelector);

    const deliveredNation = useMemo(() => {
        if (nationsList.length > 0) {
            const checkedNation = nationsList.find((nation) => nation.id === isNationCheckedId);

            return checkedNation.content;
        }
    }, [nationsList, isNationCheckedId]);

    useEffect(() => {
        dispatch(getNations());

        // eslint-disable-next-line
    }, []);

    return (
        isOpen && (
            <Fragment>
                <div className={cx('modal')}>
                    <MenuWrapper className={cx('wrapper')}>
                        <header className={cx('modal-header')}>
                            <h4 className={cx('modal-heading')}>Choose your location</h4>
                            <FontAwesomeIcon icon={faXmark} className={cx('modal-header-icon')} onClick={onClose} />
                        </header>
                        <Divider />
                        <div className={cx('modal-content')}>
                            <span className={cx('content-text')}>
                                Delivery options and delivery speeds may vary for different locations
                            </span>
                            <a className={cx('content-address')} href="/">
                                Manage address book
                            </a>
                            <div className={cx('content-divider')}>
                                <Divider />
                                <span>or enter a US zip code</span>
                                <Divider />
                            </div>
                            <div className={cx('content-input-group')}>
                                <input
                                    className={cx('content-input')}
                                    type="text"
                                    placeholder=""
                                    maxLength="5"
                                    size="5"
                                />
                                <button className={cx('content-btn')}>Apply</button>
                            </div>
                            <div className={cx('content-divider')}>
                                <Divider />
                                <span>or</span>
                                <Divider />
                            </div>
                            <div className={cx('tippy-select-wrapper')}>
                                <Tippy
                                    interactive
                                    visible={isSelectOpen}
                                    onClickOutside={() => setIsSelectOpen(false)}
                                    offset={[14, -30]}
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <MenuWrapper className={cx('select-wrapper')}>
                                                {nationsList.map((nation, index) => (
                                                    <NationItem
                                                        key={index}
                                                        checked={nation.id === isNationCheckedId}
                                                        onClick={() => {
                                                            setIsNationCheckedId(nation.id);
                                                            setIsSelectOpen(false);
                                                        }}
                                                    >
                                                        {nation.content}
                                                    </NationItem>
                                                ))}
                                            </MenuWrapper>
                                        </div>
                                    )}
                                >
                                    <div className={cx('content-select')} onClick={() => setIsSelectOpen(true)}>
                                        <span>{deliveredNation}</span>
                                        <FontAwesomeIcon icon={faChevronDown} className={cx('content-select-icon')} />
                                    </div>
                                </Tippy>
                            </div>

                            <div className={cx('modal-done-btn')}>
                                <button
                                    onClick={() => {
                                        onClose();
                                        dispatch(updateNation(deliveredNation));
                                    }}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </MenuWrapper>
                </div>

                <OverLay className={cx('overlay')} onClick={onClose} />
            </Fragment>
        )
    );
}

DeliverModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

export default DeliverModal;
