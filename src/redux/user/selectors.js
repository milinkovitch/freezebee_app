/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';

export const useUser = () => useSelector((state) => state.user);
export const useRoles = () => useSelector((state) => state.user.roles);
