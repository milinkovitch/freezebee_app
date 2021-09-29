/* eslint-disable camelcase */
export const findRole = (roleName) => (roles) => roles.find((r) => r.name === roleName);

export const isSuperAdmin = findRole('Super Admin');
export const isAdmin = findRole('Admin');
export const isPatient = findRole('Patient');
export const isLocalCoordinator = findRole('Local Coordinator');
export const isLocalDoctor = findRole('Local Doctor');
export const isHubDoctor = findRole('Hub Doctor');
export const isExpertCoordinator = findRole('Expert Coordinator');
export const isExpertDoctor = findRole('Expert Doctor');
export const isClinicCoordinator = findRole('Clinic Coordinator');
export const isIntermediateCoordinator = findRole('Intermediate Coordinator');

export const isInterlocutor = (roles) =>
  isLocalCoordinator(roles) ||
  isLocalDoctor(roles) ||
  isHubDoctor(roles) ||
  isExpertCoordinator(roles) ||
  isExpertDoctor(roles);

export const isDoctor = (roles) =>
  isLocalDoctor(roles) || isHubDoctor(roles) || isExpertDoctor(roles);
export const isCoordinator = (roles) =>
  isLocalCoordinator(roles) || isExpertCoordinator(roles) || isIntermediateCoordinator(roles);

export const hasRole = (userRoles, stepRoles) =>
  userRoles.find((ur) => stepRoles.find((sr) => ur.name === sr));
