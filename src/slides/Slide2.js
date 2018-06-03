import React from 'react';
import version_url from '../version';
import CodePage from '../CodePage';
import KnownMount from '../KnownMount';
import { strip } from '../strip';

class Slide2 extends KnownMount {
  constructor(props) {
    super(props);
    this.state = { version: null };
    this.initialise();
  }
  async initialise() {
    const response = await fetch(version_url);
    let version = await response.text();
    if (this.mounted) {
      this.setState({ version: version.trim() });
    }
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
