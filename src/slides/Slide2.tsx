import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

export default function Slide2() {
  return <CodePage codes={[
    strip`
        from datetime import date
        date.today().isoformat()`,
    strip`
        from urllib.parse import urlparse
        repr(urlparse('https://parkd.mause.me/index.json'))
        `,
  ]} />;
}
