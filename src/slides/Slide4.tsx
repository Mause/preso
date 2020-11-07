import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

export default function Slide4() {
  return <CodePage codes={[
    strip`
        import js
        fetch = js.globals.fetch
        console = js.globals.console

        url = 'https://api.portal.energy-tec.com.au/graphql?query={version}'

        fetch(url).then(js.Function(lambda res: res.json()))
        `
  ]} />;
}
