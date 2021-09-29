import { Button, Result } from 'antd';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import routesTemplates from '../../routes';
import Loading from './Loading';

function Routes() {
  const history = useHistory();

  const isFetching = false;
  if (isFetching) return <Loading />;
  return (
    <Switch>
      {routesTemplates.map((routesTemplate) => {
        const { routes, template: Layout } = routesTemplate;
        return routes.map((route) => (
          <Route
            exact={route.exact}
            path={route.path}
            key={route.path}
            render={(r) => <Layout>{route.component}</Layout>}
          />
        ));
      })}
      <Route>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => history.replace('/')}>
              Back Home
            </Button>
          }
        />
      </Route>
    </Switch>
  );
}

export default Routes;
