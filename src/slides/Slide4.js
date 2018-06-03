import React, { Component } from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

class Slide4 extends Component {
  render() {
    const codes = [
      strip`
        import js
        fetch = js.globals.fetch
        console = js.globals.console

        url = 'https://api.dev.portal.energy-tec.com.au/graphql?query={version}'

        fetch(url).then(js.Function(lambda res: res.json()))
        `
    ];
    return <CodePage codes={codes} />;
  }
}

export default Slide4;
