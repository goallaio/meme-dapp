import { Layout, Button } from 'antd';

const AdminDashboard = () => {
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
        <Button>
          Logout
        </Button>
      </header>
      <div className='flex-1'>
        <div></div>
      </div>
    </Layout>
  )
}

export default AdminDashboard;
