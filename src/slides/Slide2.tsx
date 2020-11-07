import * as React from 'react';
// import version_url from '../version';
import CodePage from '../CodePage';
import KnownMount from '../KnownMount';
import { strip } from '../strip';

declare function require(path: string): string;
const version_url = require('../version');

interface Slide2State {
  version: string | null;
}
interface Slide2Props extends React.Props<Slide2> {};

class Slide2 extends KnownMount {
  state: Slide2State;

  constructor(props: Slide2Props) {
    super(props);
    this.state = { version: null };
    this.initialise();
  }
  async initialise(): Promise<any> {
    const response = await fetch(version_url);
    let version = await response.text();
    this.setState({ version: version.trim() });
  }
  render() {
    const codes = [
      `"${this.state.version}"`,
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
