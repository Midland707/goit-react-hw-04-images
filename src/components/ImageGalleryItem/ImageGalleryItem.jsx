import PropTypes from 'prop-types';
import { ImgGalleryItem, ImgGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <ImgGalleryItem>
      <ImgGalleryItemImage
        onClick={() => onClickImage({ largeImageURL, tags })}
        src={webformatURL}
        alt={tags}
      />
    </ImgGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
