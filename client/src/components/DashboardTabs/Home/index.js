import React, { Component } from "react";
import { Layout,
  Menu } from 'antd';
import { AppstoreAddOutlined,
  LaptopOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Routes from './HomeOptions/route'


const { Sider } = Layout;

class Home extends Component {
  render() {

    const { location } = this.props;
    
    return (
        
        <Layout style={{ height: '87vh' }}>
            <Sider width={200} className="sidebar">
                <Menu
                    mode="inline"
                    // defaultSelectedKeys={"manage"}
                    defaultSelectedKeys={[location.pathname.split('/')[3]]}
                    defaultOpenKeys={[location.pathname.split('/')[2]]}
                    style={{ height: '100%', borderRight: 0 }}>   
                    <Menu.Item
                        key="candidates" 
                        icon={<LaptopOutlined />}
                    >
                        <Link to='/dashboard/home/candidates'/>
                        Candidates
                    </Menu.Item>    
                </Menu>
            </Sider>                    
            <Routes/>
        </Layout>

        
    )
}
}
export default Home;
