/* eslint-disable react/prop-types */
import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
// import Header from './Header';
// import Sider from './Sider';

function LayoutPrivate({ children }) {
  const [user] = useSelector((state) => state.user);

  if (!user) return <Redirect to="/login" />;

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header />
      <Content className="content">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        {children}
      </Content>
    </Layout>
  );
}

export default LayoutPrivate;
