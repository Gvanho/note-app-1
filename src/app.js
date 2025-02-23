import { Flex, Layout } from 'antd';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const { Content, Header, Sider } = Layout;
const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
};
const headerStyle = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '20px',
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#223c55'
};
const siderStyle = {
  padding: '10px',
  textAlign: 'center',
  lineHeight: '120px',
  color: '#000',
  backgroundColor: '#fff',
  overflow: 'auto'
};
const contentStyle = {
  padding: '10px',
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#000',
  backgroundColor: '#fff'
};

function App() {
  return (
    <div className="App">
      <Flex gap='middle'></Flex>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>NOTE APP</Header>
        <Layout>
          <Sider width='20%' style={siderStyle}><Sidebar /></Sider>
          <Content style={contentStyle}><Outlet/></Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
