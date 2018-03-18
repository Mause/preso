import React, { Component } from 'react';
import './App.css';
import { Presentation, Slide } from 'react-presents';

// Automatically load all slides in the Slides folder
const slides = require
  .context('./slides/', false, /\.js$/)
  .keys()
  .map(filename => filename.replace('./', ''))
  .map(filename => require(`./slides/${filename}`).default);

class App extends Component {
  render() {
    return (
      <div>
        <Presentation>
          {slides.map((Component, index) => (
            <Slide component={Component} key={index} />
          ))}{' '}
        </Presentation>
      </div>
    );
  }
}

export default App;
