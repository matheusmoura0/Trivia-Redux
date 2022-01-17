import React, { Component } from 'react';
import Header from './Header';

export default class Feedback extends Component {
  render() {
    return (
      <div
        data-testid="feedback-text"
      >
        FeedBack
        <Header />
      </div>
    );
  }
}
