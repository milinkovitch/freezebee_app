import React from 'react';

import ModelsList from '../pages/Models/List';
import CreateOrdUpdateModel from '../pages/Models/CreateOrUpdate';
import IngredientsList from '../pages/Ingredients/List';
import CreateOrdUpdateIngredient from '../pages/Ingredients/CreateOrUpdate';
import ProcessesList from '../pages/Processes/List';
import CreateOrdUpdateProcess from '../pages/Processes/CreateOrUpdate';

const routes = [
  {
    component: null,
    exact: true,
    path: '/',
    from: [],
  },
  {
    component: <ModelsList />,
    exact: true,
    path: '/models',
    from: [
      { href: '/models', name: 'Modèles' },
      { href: '/models', name: 'Liste' },
    ],
  },
  {
    component: <CreateOrdUpdateModel />,
    exact: true,
    path: '/models/manage',
    from: [
      { href: '/models', name: 'Modèles' },
      { href: '/models/manage', name: 'Gérer' },
    ],
  },
  {
    component: <IngredientsList />,
    exact: true,
    path: '/ingredients',
    from: [
      { href: '/ingredients', name: 'Ingrédients' },
      { href: '/ingredients', name: 'Liste' },
    ],
  },
  {
    component: <CreateOrdUpdateIngredient />,
    exact: true,
    path: '/ingredients/manage',
    from: [
      { href: '/ingredients', name: 'Ingrédients' },
      { href: '/ingredients/manage', name: 'Gérer' },
    ],
  },
  {
    component: <ProcessesList />,
    exact: true,
    path: '/processes',
    from: [
      { href: '/processes', name: 'Processus' },
      { href: '/processes', name: 'Liste' },
    ],
  },
  {
    component: <CreateOrdUpdateProcess />,
    exact: true,
    path: '/processes/manage',
    from: [
      { href: '/processes', name: 'Processus' },
      { href: '/processes/manage', name: 'Gérer' },
    ],
  },
];

export default routes;
