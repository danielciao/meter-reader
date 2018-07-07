import React, { PureComponent } from 'react';
import App from './App';

import { getReadings } from './services/meter-reader-service';
import { toMonthlyReading } from './lib/data-transformer';

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
          data: toMonthlyReading(readings)
        });
      }
    });
  }

  render() {
    return <App data={this.state.data} />;
  }
}
