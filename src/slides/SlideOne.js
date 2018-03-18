import React, { Component } from 'react';
import { ContentSlide, Slide, Step } from 'react-presents';
import * as _ from 'underscore';

import Highlight from 'react-highlight';
import 'highlight.js/styles/ocean.css';

function strip(lines) {
  lines = lines[0].split('\n');
  let min = _.min(
    lines.filter(line => line.trim()).map(line => /^ */.exec(line)[0].length),
  );
  return lines
    .map(line => line.substring(min))
    .join('\n')
    .trim();
}

class SlideOne extends Component {
  render() {
    const code = strip`
        def foo():
            pass
        `;
    return (
      <ContentSlide>
        <Step index={0}>
          <Highlight style={{ fontSize: '30px' }}>{code}</Highlight>
        </Step>
      </ContentSlide>
    );
  }
}

export default SlideOne;
