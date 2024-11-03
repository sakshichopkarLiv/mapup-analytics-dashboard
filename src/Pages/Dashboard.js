import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Layout, Menu, Drawer, Button, Table, Spin } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import SearchComponent from '../components/SearchComponent';
import { parseCSV } from '../utils/csvParser';
import '../App.css';
import logo from '../assets/mapup-logo.png';

const { Header, Content, Sider } = Layout;

const CountyBarChart = React.lazy(() => import('../components/BarChartByCounty'));
const EVTypePieChart = React.lazy(() => import('../components/EVTypePieChart'));
const TopEVMakesBarChart = React.lazy(() => import('../components/TopEVMakesBarChart'));
const ModelYearChart = React.lazy(() => import('../components/ModelYearDistributionChart'));
const CAFVPieChart = React.lazy(() => import('../components/CAFVEligibilityPieChart'));


const Dashboard = () => {
  const [evData, setEVData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('charts');
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let parsedData = await parseCSV('/Electric_Vehicle_Population_Data.csv');
        parsedData = parsedData.map((item) => ({
          ...item,
          'Postal Code': item['Postal Code'] ? String(item['Postal Code']) : '',
          'Legislative District': item['Legislative District'] ? String(item['Legislative District']) : '',
          'DOL Vehicle ID': item['DOL Vehicle ID'] ? String(item['DOL Vehicle ID']) : '',
        }));
        setEVData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.error('Error fetching and parsing CSV:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const summaryData = useMemo(() => {
    if (!evData?.length) return { totalVehicles: 0, uniqueMakes: 0, uniqueModels: 0, uniqueCounties: 0 };

    return {
      totalVehicles: evData.length,
      uniqueMakes: new Set(evData.map(item => item.Make)).size,
      uniqueModels: new Set(evData.map(item => item.Model)).size,
      uniqueCounties: new Set(evData.map(item => item.County)).size,
    };
  }, [evData]);

  const handleSearch = (searchResults) => {
    setFilteredData(searchResults);
  };

  const columns = [
    {
      title: 'VIN',
      dataIndex: 'VIN (1-10)',
      key: 'VIN',
    },
    {
      title: 'Make',
      dataIndex: 'Make',
      key: 'Make',
      filters: evData ? [...new Set(evData.map(item => item.Make))].map(make => ({ text: make, value: make })) : [],
      onFilter: (value, record) => record.Make === value,
    },
    {
      title: 'Model',
      dataIndex: 'Model',
      key: 'Model',
      filters: evData ? [...new Set(evData.map(item => item.Model))].map(model => ({ text: model, value: model })) : [],
      onFilter: (value, record) => record.Model === value,
    },
    {
      title: 'Model Year',
      dataIndex: 'Model Year',
      key: 'Model Year',
      filters: evData ? [...new Set(evData.map(item => item['Model Year']))].map(year => ({ text: year, value: year })) : [],
      onFilter: (value, record) => record['Model Year'] === value,
    },
    {
      title: 'Electric Vehicle Type',
      dataIndex: 'Electric Vehicle Type',
      key: 'EVType',
      filters: evData ? [...new Set(evData.map(item => item['Electric Vehicle Type']))].map(type => ({ text: type, value: type })) : [],
      onFilter: (value, record) => record['Electric Vehicle Type'] === value,
    },
    {
      title: 'CAFV Eligibility',
      dataIndex: 'Clean Alternative Fuel Vehicle (CAFV) Eligibility',
      key: 'CAFVEligibility',
      filters: evData ? [...new Set(evData.map(item => item['Clean Alternative Fuel Vehicle (CAFV) Eligibility']))].map(status => ({ text: status, value: status })) : [],
      onFilter: (value, record) => record['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === value,
    },
    {
      title: 'Electric Range',
      dataIndex: 'Electric Range',
      key: 'Range',
    },
    {
      title: 'Base MSRP',
      dataIndex: 'Base MSRP',
      key: 'MSRP',
    },
    {
      title: 'County',
      dataIndex: 'County',
      key: 'County',
      filters: evData ? [...new Set(evData.map(item => item.County))].map(county => ({ text: county, value: county })) : [],
      onFilter: (value, record) => record.County === value,
    },
    {
      title: 'City',
      dataIndex: 'City',
      key: 'City',
      filters: evData ? [...new Set(evData.map(item => item.City))].map(city => ({ text: city, value: city })) : [],
      onFilter: (value, record) => record.City === value,
    },
  ];

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      <Sider
        collapsible
        collapsedWidth="0"
        trigger={null}
        breakpoint="lg"
        collapsed={drawerVisible}
        width={250}
        style={{ background: '#001f3f' }}
        className="lg:block hidden"
      >
        <div className="flex justify-center items-center p-4">
          <img src={logo} alt="MapUp Dashboard Logo" className="w-24 h-12 object-contain" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[viewMode]}
          onClick={({ key }) => setViewMode(key)}
          style={{ height: '100%', borderRight: 0, color: 'white', backgroundColor: '#001f3f' }}
          theme="dark"
        >
          <Menu.Item key="charts">Charts</Menu.Item>
          <Menu.Item key="table">Table</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center' }}>
          <div className="lg:hidden">
            <Button icon={<MenuOutlined />} onClick={showDrawer} />
          </div>
          <Drawer
            title={
              <div className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
              </div>
            }
            placement="left"
            onClose={closeDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            style={{ background: '#001f3f' }}
            className="lg:hidden"
          >
            <Menu
              mode="inline"
              selectedKeys={[viewMode]}
              onClick={({ key }) => {
                setViewMode(key);
                closeDrawer();
              }}
              style={{ backgroundColor: '#001f3f', color: 'white' }}
              theme="dark"
            >
              <Menu.Item key="charts">Charts</Menu.Item>
              <Menu.Item key="table">Table</Menu.Item>
            </Menu>
          </Drawer>
          <div className="flex items-center w-full lg:justify-center">
            <div className="font-bold text-lg hidden lg:block flex justify-center items-center">Electric Vehicle Dashboard</div>
          </div>
        </Header>
        <Content style={{ margin: '16px', backgroundColor: '#f8f8f8' }}>
          <div className="p-5 max-w-screen-xl mx-auto">
            <Spin spinning={loading} tip="Loading data...">
              <div className="ag-format-container">
                <div className="ag-courses_box">
                  {Object.entries(summaryData).map(([key, value]) => (
                    <div className="ag-courses_item" key={key}>
                      <div className="ag-courses-item_title text-black-400">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        <p className="numbers">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <SearchComponent data={evData} onSearch={handleSearch} />

              {viewMode === 'charts' ? (
                <Suspense fallback={<Spin size="large" tip="Loading charts..." />}>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <CountyBarChart filteredData={filteredData || []} />
                    <EVTypePieChart data={filteredData || []} />
                    <TopEVMakesBarChart data={filteredData || []} />
                    <ModelYearChart data={filteredData || []} />
                    <CAFVPieChart data={filteredData || []} />
                  </div>
                </Suspense>
              ) : (
                <div className="mt-5">
                  <h2 className="text-2xl font-bold mb-4">Electric Vehicle Data Table</h2>
                  <Table
                    columns={columns}
                    dataSource={filteredData || []}
                    rowKey={(record) => record['VIN (1-10)']}
                    pagination={{ pageSize: 10 }}
                  />
                </div>
              )}
            </Spin>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
