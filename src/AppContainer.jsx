import React, { PureComponent } from 'react';
import App from './App';

import { getReadings } from './services/meter-reader-service';
import { toMonthlyUsage, toInterpolatedMonthlyUsage } from './lib/data-transformer';

export default class AppContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    getReadings().then(readings => {
      if (!readings.err) {
        this.setState({
          data: {
            actual: toMonthlyUsage(readings),
            interpolated: toInterpolatedMonthlyUsage(readings)
          }
        });
      }
    });
  }

  render() {
    return <App data={this.state.data} />;
  }
}
