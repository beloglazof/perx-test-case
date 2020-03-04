import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { fetchVehicles } from './features/vehicles/vehiclesSlice';
import { setCurrentPage } from './features/vehiclesDisplay/vehiclesDisplaySlice';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const { page, perPage } = useSelector(state => state.vehiclesDisplay);

  const goToPage = page => {
    dispatch(setCurrentPage(page));
  };

  const { dealersById } = useSelector(state => state.dealers);

  const {
    loading: vehiclesLoading,
    error: vehiclesError,
    totalCount,
    currentPageVehicles,
    vehiclesById,
  } = useSelector(state => state.vehicles);

  const vehicles = currentPageVehicles.map(
    vehicleId => vehiclesById[vehicleId]
  );

  useEffect(() => {
    dispatch(fetchVehicles(page, perPage));
  }, [dispatch, page, perPage]);

  if (vehiclesError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{vehiclesError.toString()}</div>
      </div>
    );
  }

  const columns = [
    {
      title: 'VIN',
      dataIndex: 'vin',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Model',
      dataIndex: 'model',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
    },
    {
      title: 'Dealer',
      dataIndex: 'dealerName',
    },
    {
      title: 'Office Address',
      key: 'officeAddress',
      render: (_, { dealer: dealerId, office_ids }) => {
        const dealer = dealersById[dealerId];
        if (!dealer) {
          return ''
        }
        
        const officeAddressList = office_ids.map(
          officeId => dealer.offices.find(({ id }) => officeId === id).address
        );
        return officeAddressList;
      },
    },
  ];

  const paginationProps = {
    current: page,
    total: totalCount,
    pageSize: perPage,
    onChange: goToPage,
  };

  return (
    <div>
      <Table
        tableLayout='fixed'
        loading={vehiclesLoading}
        dataSource={vehicles}
        columns={columns}
        rowKey='id'
        pagination={paginationProps}
      />
    </div>
  );
}

export default App;
