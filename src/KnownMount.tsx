import {Component} from 'react';

class KnownMount<Props> extends Component<Props> {
  mounted: Boolean;

  constructor(props: Props) {
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
