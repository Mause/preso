import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

class Slide2 extends React.Component {
  render() {
    const codes = [
      strip`
        from datetime import date
        date.today().isoformat()`,
      strip`
        import urlparse
        repr(urlparse.urlparse('https://parkd.mause.me/index.json'))
        `,
    ];
    return <CodePage codes={codes} />;
  }
}

export default Slide2;
