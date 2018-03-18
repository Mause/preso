import React, { Component } from 'react';

import Highlight from 'react-highlight';
import 'highlight.js/styles/ocean.css';

class SlideTwo extends Component {
  render() {
    return <Highlight>{'def foo():\npass'}</Highlight>;
  }
}

export default SlideTwo;
