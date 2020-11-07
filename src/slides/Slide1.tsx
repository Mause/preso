import * as React from 'react';
import { Component } from 'react';
import CodePage from '../CodePage';
import { strip } from '../strip';

const CODES: Array<string> = [
  strip`
    def foo():
        return 'world'

    foo()
    `,
  strip`
    def intersect(a, b) :
        return list(set(a) & set(b))

    intersect([1, 2, 3], [2, 5, 7])
    `,
  'hex(4 + 5)'
];

class Slide1 extends Component {
  render() {
    return <CodePage codes={CODES} />;
  }
}

export default Slide1;
