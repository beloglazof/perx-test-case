const axios = require('axios').default;

const baseApi = 'https://jlrc.dev.perx.ru/carstock/api/v1/';

export async function getVehicles() {
  const url = new URL('vehicles/?state=active&hidden=false&group=new', baseApi);

  try {
    const vehiclesResponse = await axios.get(url, {
      headers: {
        'X-CS-Dealer-Id-Only': 1,
      },
    });
    const pageCount = vehiclesResponse.headers['X-Total-Count'];

    return { pageCount, vehicles: vehiclesResponse.data };
  } catch (err) {
    throw err;
  }
}
