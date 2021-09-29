/* eslint-disable react/prop-types */
import React from 'react';

const Auth = ({ appRoute, Template, route }) => {
  const Layout = appRoute.template ? appRoute.template : Template;
  return <Layout Component={appRoute.component} route={route} />;
};

export default Auth;
