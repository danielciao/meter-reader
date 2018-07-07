import config from '../config';

function getReadings() {
  const {
    base,
    get: { path }
  } = config.meterReaderApi;

  return fetch(`${base}/${path}`)
    .then(response => response.json())
    .catch(err => ({
      err
    }));
}

export { getReadings };
