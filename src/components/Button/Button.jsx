import PropTypes from 'prop-types';
import { LoadButton } from './Button.styled';

export const Button = ({ onClickButton }) => {
  return (
    <LoadButton type="button" onClick={onClickButton}>
      Load more
    </LoadButton>
  );
};

Button.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};
