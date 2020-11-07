import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

export default function Slide3() {
  return <CodePage codes={[
    strip`
        import js
        dir(js)`,
    strip`
        import js
        import json

        request = js.new(js.globals.XMLHttpRequest);
        request.open('GET', 'https://api.portal.energy-tec.com.au/graphql?query={version}', False)
        request.send(None);

        [request.status, json.loads(str(request.responseText))]`,
  ]} />;
}
