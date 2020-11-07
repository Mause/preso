import {Component} from 'react';

class KnownMount extends Component {
  mounted: Boolean;

  constructor(props: any) {
    super(props);
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
}
export default KnownMount;
