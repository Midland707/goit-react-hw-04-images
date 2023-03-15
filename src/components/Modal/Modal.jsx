import PropTypes from 'prop-types';
import { ModalOverlay, ModalWindow } from './Modal.styled';

export const Modal = ({ image, tags, onClickClose }) => {
  return (
    <ModalOverlay onClick={onClickClose}>
      <ModalWindow>
        <img src={image} alt={tags} />
      </ModalWindow>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
};
