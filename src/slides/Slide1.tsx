import * as React from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

export default function Slide1() {
	return (
		<CodePage
			codes={[
				strip`
      def foo():
          return 'world'
  
      foo()
      `,
				strip`
      def intersect(a, b):
          return list(set(a) & set(b))
  
      intersect([1, 2, 3], [2, 5, 7])
      `,
				'hex(4 + 5)',
			]}
		/>
	);
}
