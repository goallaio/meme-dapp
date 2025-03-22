'use client'
import { fetchDashboardBrief } from '@/request/dashboard';
import { Layout, Button, Table, Spin } from 'antd';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(0);

  const [briefInfo, setBriefInfo] = useState({});

  const columns = [
    {
      dataIndex: 'token',
      title: 'Token'
    },
    {
      dataIndex: 'sellTransactions',
      title: 'Sell Transactions'
    },
    {
      dataIndex: 'buyTransactions',
      title: 'Buy Transactions'
    },
    {
      dataIndex: 'sellVolume',
      title: 'Sell Volume'
    },
    {
      dataIndex: 'buyVolume',
      title: 'Buy Volume'
    }
  ];

  const fetchBriefInfo = async () => {
    try {
      setLoading((prev) => prev + 1);
      const res = await fetchDashboardBrief();
      console.log(res);
      setBriefInfo(res?.data || {});
    } finally {
      setLoading((prev) => prev - 1);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  useEffect(() => {
    fetchBriefInfo();
  }, []);

  if (loading > 0) {
    return (
      <div
        className='flex items-center justify-center h-full bg-black'
      >
        <Spin
        >
        </Spin>
      </div>
    );
  }

  return (
    <Layout
      className='h-full flex flex-col'
    >
      <header className='flex items-center justify-between p-4 border-b shadow'>
        <h1
          className='font-medium text-xl'
        >
          Admin Dashboard
        </h1>
        <Button
          onClick={logOut}
        >
          Logout
        </Button>
      </header>
      <div className='flex-1 p-4 flex flex-col gap-4'>
        <div className='flex gap-4'>
          <SingleInfoCard
            label='Total Users'
            value={briefInfo?.userAmount}
          />
          <SingleInfoCard
            label='Total Tokens'
            value={briefInfo?.tokenAmount}
          />
        </div>
        <div className='flex-1'>
          <Table
            columns={columns}
            size='middle'
          />
        </div>
      </div>
    </Layout>
  )
}

const SingleInfoCard = ({label, value}) => {
  return (
    <div className='border border-white p-4 rounded-xl flex-1 space-y-2'>
      <div className='text-sm font-medium'>
        {label}
      </div>
      <div className='text-2xl font-bold'>
        {value || '--'}
      </div>
    </div>
  );
};

export default AdminDashboard;
