import { Component } from 'react';
import { Wrapper } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import * as ImageApi from 'components/ImageApi/ImageApi';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showModal: false,
    largeImageURL: '',
    tags: '',
    showBtn: false,
    isLoading: false,
    error: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyEscPress, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { images, query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({
        isLoading: true,
      });
    }

    if (
      query !== prevState.query ||
      page !== prevState.page ||
      !images.length
    ) {
      ImageApi.getImages(query, page)
        .then(data => {
          if (!data.hits.length) {
            this.setState({
              showBtn: false,
            });
            return;
          }
          // console.log('data =', data);
          if (!images.length) {
            this.setState(prevState => ({
              images: [...data.hits],
              showBtn: true,
            }));
          } else
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              showBtn: true,
            }));
          if (data.totalHits <= this.state.images.length + 12)
            this.setState({
              showBtn: false,
            });
        })
        .catch(error => {
          this.setState({
            error: error.message,
          });
        })
        .finally(
          setTimeout(() => {
            this.setState({ isLoading: false });
          }, 1000)
        );
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyEscPress, false);
  }

  onSubmitForm = word => {
    this.setState({
      query: word,
      images: [],
      page: 1,
    });
  };

  onClickButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    scroll.scrollToBottom();
  };

  onClickClose = () => {
    this.setState({
      showModal: false,
    });
  };

  onClickImage = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  onKeyEscPress = event => {
    if (event.keyCode === 27)
      this.setState({
        showModal: false,
      });
  };

  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery
          images={this.state.images}
          onClickImage={this.onClickImage}
        />
        {this.state.isLoading && <Loader />}
        {this.state.showBtn && <Button onClickButton={this.onClickButton} />}
        {this.state.showModal && (
          <Modal
            image={this.state.largeImageURL}
            tags={this.state.tags}
            onClickClose={this.onClickClose}
          />
        )}
      </Wrapper>
    );
  }
}
