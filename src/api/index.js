const axios = require('axios').default;

const baseApi = 'https://jlrc.dev.perx.ru/carstock/api/v1/';

export async function getVehicles(page = 1, perPage = 10) {
  const pageParam = page - 1
  const url = new URL(
    `vehicles/?state=active&hidden=false&group=new&page=${pageParam}&per_page=${perPage}`,
    baseApi
  );

  const vehiclesResponse = await axios.get(url, {
    headers: {
      'x-cs-dealer-id-only': 1,
    },
  });
  const totalCount = Number(vehiclesResponse.headers['x-total-count']);

  return { totalCount, vehicles: vehiclesResponse.data };
}

export async function getDealers(idList = []) {
  const url = new URL(`dealers/?id__in=${idList.toString()}`, baseApi);

  const { data } = await axios.get(url);

  return data;
}
