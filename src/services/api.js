// import queryString from 'query-string';
import request from './request';

export const fetchAll = async (url) => {
  const first = await request(url);
  const lastPage = first.meta?.last_page || first.last_page;
  if (lastPage > 1) {
    const promises = [];
    for (let i = 2; i <= lastPage; i += 1) {
      promises.push(request(`${url}?page=${i}`));
    }
    (await Promise.all(promises)).forEach((f) => first.data.push(...f.data));
  }
  return first.data;
};

const cleanObject = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));

// USERS
export const fetchUser = (userId) => request(`/users/${userId}`);
export const createUser = (values) => request('/users', 'POST', values);
export const updateUser = (userId, values) => request(`/users/${userId}`, 'PUT', values);
export const deleteUser = (userId) => request(`/users/${userId}`, 'DELETE');

export const fetchAllUsers = () => fetchAll('/users');
export const fetchAllPatients = (user) => {
  if (user.roles[0].name === 'Expert Doctor') {
    return fetchAll(`/users/${user.id}/patientsCreate`);
  }
  return fetchAll(`/users/${user.id}/patients`);
};

// MODELS
export const fetchModels = (page = 1, order) => request(`/models`);
export const fetchAllModels = () => fetchAll('/models');
export const searchModels = (search = '', ingredient) =>
  request(`/models?search=${search}${ingredient ? `&ingredient=${ingredient}` : ''}`);
export const createModel = (values) => request(`/models`, 'POST', values);
export const updateModel = (id, values) => request(`/models/${id}`, 'PUT', values);
export const deleteModel = (id) => request(`/models/${id}`, 'DELETE');

// INGREDIENTS
export const fetchIngredients = (page = 1, order) =>
  request(
    `/ingredients?page=${page}${
      order ? `&sort=${order.property}&direction=${order.direction}` : ''
    }`
  );
export const fetchAllIngredients = () => fetchAll('/ingredients');
export const searchIngredients = (search = '') => request(`/models?search=${search}`);
export const createIngredient = (values) => request(`/ingredients`, 'POST', values);
export const updateIngredient = (id, values) => request(`/ingredients/${id}`, 'PUT', values);
export const deleteIngredient = (id) => request(`/ingredients/${id}`, 'DELETE');

// PROCESSES
export const fetchProcesses = (page = 1, order) => request(`/processes`);
export const fetchAllProcesses = () => fetchAll('/processes');
export const searchProcesses = (search = '') => request(`/procesesses?search=${search}`);
export const createProcess = (values) => request(`/processes`, 'POST', values);
export const updateProcess = (id, values) => request(`/processes/${id}`, 'PUT', values);
export const deleteProcess = (id) => request(`/processes/${id}`, 'DELETE');

// ROLES
export const fetchAllRoles = () => fetchAll('/roles');
