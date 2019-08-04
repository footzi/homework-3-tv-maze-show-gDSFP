import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: {
      name: '',
      genres: [],
      image: {},
      summary: ''
    }
  };

  static getDerivedStateFromProps(props, state) {
    return props.showId !== state.showId
      ? {
          showId: props.showId
        }
      : null;
  }

  async componentDidUpdate() {
    this.setState({
      data: await getShowInfo(this.props.showId)
    });
  }

  render() {
    const { name, image, genres, summary } = this.state.data;

    return (
      <div className="show">
        <img className="show-image" src={image.original} alt={name} />
        <h2 className="show-label t-show-name">{name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр </b>
          {genres.join(', ')}
        </p>
        <p
          className="show-text t-show-summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </div>
    );
  }
}

export default Show;
