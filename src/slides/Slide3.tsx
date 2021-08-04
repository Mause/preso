import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

export default function Slide3() {
	return (
		<CodePage
			codes={[
				strip`
        import js
        import json

        request = js.XMLHttpRequest.new()
        request.open('GET', 'https://jsonip.com', False)
        request.send(None)

        [request.status, json.loads(str(request.responseText))]`,
			]}
		/>
	);
}
