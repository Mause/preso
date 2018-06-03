import React, { Component } from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

class Slide3 extends Component {
  render() {
    const codes = [
      // strip`
      //   import js
      //   dir(js)`,
      strip`
        import js
        import json

        request = js.new(js.globals.XMLHttpRequest);
        request.open('GET', 'https://api.dev.portal.energy-tec.com.au/graphql?query={version}', False)
        request.send(None);

        [request.status, json.loads(str(request.responseText))]`,
    ];
    return <CodePage codes={codes} />;
  }
}

export default Slide3;
