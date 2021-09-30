import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useUser } from '../../redux/user/selectors';
import routesTemplates from '../../routes';
import { fetchUser } from '../../redux/user/actions';
import Loading from './Loading';

function Routes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [, isFetching] = useUser();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
