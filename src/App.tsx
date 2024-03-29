/// <reference path="types/react-presents.d.ts" />
/// <reference path="types/react-highlight.d.ts" />
import * as React from 'react';
import './App.css';
import 'highlight.js/styles/ocean.css';
import { Oval } from 'react-loader-spinner';
import { Presentation, Slide } from 'react-presents';
import { pyodide } from './CodePage';
import { Container } from 'react-bulma-components';

// Automatically load all slides in the Slides folder
const slides: React.Component[] = Array.from(
  require.context('./slides/', false, /\.tsx$/).keys(),
)
  .map((filename) => filename.replace('./', ''))
  .map((filename) => require(`./slides/${filename}`).default);

interface AppState {
  ready: Boolean;
}

class App extends React.Component<{}> {
  state: AppState;
  constructor(props: {}) {
    super(props);
    this.state = { ready: false };
  }
  async componentDidMount() {
    await pyodide;
    this.setState({ ready: true });
  }

  render() {
    return (
      <Container style={{ minHeight: '100%', minWidth: '100%' }}>
        {this.state.ready ? undefined : <Oval />}
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
