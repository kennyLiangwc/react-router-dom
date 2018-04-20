import { Component } from 'react'

export default class Bundle extends Component {
  constructor(props) {
      super(props);
      this.state = {
          mod: null
      };
  }

  componentWillMount() {
      console.log('props',this.props)
      this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
      console.log('nextProps',nextProps)
      if (nextProps.load !== this.props.load) {
          this.load(nextProps)
      }
  }

  load(props) {
      this.setState({
          mod: null
      });
      // props.load((mod) => {
      //     this.setState({
      //         mod: mod.default ? mod.default : mod
      //     });
      // });
      props.load().then((mod) => {
        this.setState({
            mod: mod.default ? mod.default : mod
        });
      });
  }

  render() {
      return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}