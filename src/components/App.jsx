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
  const [reQuery, setReQuery] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', onKeyEscPress, false);
    return () => {
      document.removeEventListener('keydown', onKeyEscPress, false);
    };
  }, []);

  useEffect(() => {
    if (query !== '') {
      setIsLoading(true);
      ImageApi.getImages(query, page)
        .then(data => {
          if (!data.hits.length) {
            setIsLoading(false);
            setShowBtn(false);
            return;
          }
          setShowBtn(true);
          // console.log('data =', data);
          setShowBtn(page < Math.ceil(data.totalHits / 12));
          if (!reQuery) setImages(prevImages => [...prevImages, ...data.hits]);
          setReQuery(false);
        })
        .catch(error => console.log(error.message))
        .finally(setTimeout(() => setIsLoading(false), 1000));
    }
  }, [query, page, reQuery]);

  const onSubmitForm = word => {
    setQuery(word);
    setImages([]);
    setPage(1);
    if (word === query) setReQuery(true);
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
