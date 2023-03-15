import { useState, useEffect } from 'react';
import { Wrapper } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import * as ImageApi from 'components/ImageApi/ImageApi';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', onKeyEscPress, false);
    return () => {
      document.removeEventListener('keydown', onKeyEscPress, false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    ImageApi.getImages(query, page)
      .then(data => {
        if (!data.hits.length) {
          setIsLoading(false);
          setShowBtn(false);
          return;
        }
        // console.log('data =', data);
        if (!images.length) {
          setImages([...data.hits]);
          setShowBtn(true);
          // } else setImages(prevImages => [...prevImages, ...data.hits]);
        } else setImages([...images, ...data.hits]);
        setShowBtn(true);
        if (data.totalHits <= images.length + 12) setShowBtn(false);
      })
      .catch(error => setError(error.message))
      .finally(setTimeout(() => setIsLoading(false), 1000));
  }, [query, page]);

  const onSubmitForm = word => {
    setQuery(word);
    setImages([]);
    setPage(1);
  };

  const onClickButton = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  };

  const onClickClose = () => setShowModal(false);

  const onClickImage = ({ largeImageURL, tags }) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const onKeyEscPress = event => {
    if (event.keyCode === 27) setShowModal(false);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={onSubmitForm} />
      <ImageGallery images={images} onClickImage={onClickImage} />
      {isLoading && <Loader />}
      {showBtn && <Button onClickButton={onClickButton} />}
      {showModal && (
        <Modal image={largeImageURL} tags={tags} onClickClose={onClickClose} />
      )}
    </Wrapper>
  );
}
