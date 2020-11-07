/// <reference path="types/react-presents.d.ts" />
/// <reference path="types/react-highlight.d.ts" />
import * as React from 'react';
import './App.css';
import 'highlight.js/styles/ocean.css';
import Loader from 'react-loader';
import { Presentation, Slide } from 'react-presents';
import { Container } from 'bloomer';
import KnownMount from './KnownMount';

// Automatically load all slides in the Slides folder
// const slides: Component[] = Array.from(
//   require.context('./slides/', false, /\.js$/).keys(),
// )
//   .map(filename => filename.replace('./', ''))
//   .map(filename => require(`./slides/${filename}`).default);
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
const slides = [Slide1, Slide2, Slide3, Slide4];

interface AppState {
  ready: Boolean;
}

class App extends KnownMount<{}> {
  state: AppState;
  constructor(props: {}) {
    super(props);
    this.state = { ready: false };
  }
  async componentDidMount() {
    super.componentDidMount();
    await (window as any).pypyjs.ready();
    console.log(this.mounted);
    if (this.mounted) {
      this.setState({ ready: true });
    }
  }

  render() {
    return (
      <Container style={{ minHeight: '100%', minWidth: '100%' }}>
        <Loader
          loaded={Boolean(this.state.ready)}
          options={{}}
          className="spinner"
        />
        <Presentation>
          {slides.map((Component, index) => (
            <Slide component={Component} key={index} />
          ))}
        </Presentation>
      </Container>
    );
  }
}

export default App;
