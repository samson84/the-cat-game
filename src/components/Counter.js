import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Counter extends Component {
  timer
  constructor(props) {
    super(props)
    this.state = {
      counter: this.props.timeMs,
    }
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.tick()
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  tick() {
    const {counter} = this.state;
    const {intervalMs, onFinished} = this.props;

    const remaining = Math.max(counter - intervalMs, 0);
    
    this.setState({counter: remaining})

    if (remaining === 0) {            
      onFinished()
      return
    }

    this.timer = setTimeout(this.tick, intervalMs)    
  }
  render() {
    const {counter} = this.state;
    return (
      <span>
        {(counter / 1000).toFixed(1) }
      </span>
    )
  }
}

Counter.propTypes = {
  timeMs: PropTypes.number.isRequired,
  onFinished: PropTypes.func.isRequired,
  intervalMs: PropTypes.number,
}

Counter.defaultProps = {
  intervalMs: 100
}

export default Counter;