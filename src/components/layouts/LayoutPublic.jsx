import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes/public';
import Footer from './Footer';
import Header from './Header';

// eslint-disable-next-line react/prop-types
function LayoutPublic({ children }) {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header />
      <Content className="content" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Switch>
            {routes.map((route) => (
              <Route
                exact={route.exact}
                path={route.path}
                key={route.path}
                render={(r) => (
                  <>
                    {route.from && route.from.length > 0 && (
                      <Breadcrumb.Item href="/">Freezebee</Breadcrumb.Item>
                    )}
                    {route.from &&
                      route.from.map((f) => (
                        <Breadcrumb.Item href={f.href}>{f.name}</Breadcrumb.Item>
                      ))}
                  </>
                )}
              />
            ))}
          </Switch>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default LayoutPublic;
