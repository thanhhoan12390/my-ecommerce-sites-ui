import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './DeliverModal.module.scss';
import Divider from '~/components/Divider/Divider';
import MenuWrapper from '~/components/MenuWrapper';
import NationItem from './NationItem';
import { NationsZipCode } from '~/apiFakeData';

const cx = classNames.bind(styles);

function DeliverModal({ isOpen = false, onClose = () => {} }) {
    return (
        isOpen && (
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
                            <input className={cx('content-input')} type="text" placeholder="" maxLength="5" size="5" />
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
                                trigger="click"
                                offset={[14, -30]}
                                render={(attrs) => (
                                    <div className={cx('select-result')} tabIndex="-1" {...attrs}>
                                        <MenuWrapper className={cx('select-wrapper')}>
                                            {NationsZipCode.map((nation, index) => (
                                                <NationItem key={index} checked={nation.checked}>
                                                    {nation.content}
                                                </NationItem>
                                            ))}
                                        </MenuWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('content-select')}>
                                    <span>Vietnam</span>
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('content-select-icon')} />
                                </div>
                            </Tippy>
                        </div>

                        <div className={cx('modal-done-btn')}>
                            <button>Done</button>
                        </div>
                    </div>
                </MenuWrapper>
            </div>
        )
    );
}

DeliverModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

export default DeliverModal;
