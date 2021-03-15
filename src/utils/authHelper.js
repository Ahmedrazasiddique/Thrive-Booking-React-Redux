import { USER_TYPES } from "../routes/private";
import jwt_decode from "jwt-decode";
import CryptoJS from "crypto-js";
import { USER_TYPE_PREFIX } from "../utils/prefixes";

/**
 * Get initial link for user based on user type after login
 * @param String userType
 * @returns String
 */
export const getUserDashboardLink = (userType) => {
  switch (userType) {
    case USER_TYPES.admin:
      return "/admin/dashboard";

    case USER_TYPES.customer:
      return "/customer/dashboard";

    case USER_TYPES.staff:
      return "/staff/dashboard";

    case USER_TYPES.superAdmin:
      return "/super-admin/dashboard";

    default:
      return "/admin/dashboard";
  }
};

/**
 * Get List of user roles
 * @returns Mixed
 */
export const getUserRoles = () => {
  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    return decoded.roles;
  }
  return null;
};

/**
 * Get list of admin businesses
 * @returns Mixed
 */
export const getUserBusinesses = () => {
  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    return decoded.businesses;
  }
  return null;
};

/**
 * encrypt user role
 * @param String role
 */
export const encryptUserRole = (role) => {
  return CryptoJS.SHA256(USER_TYPE_PREFIX + role);
};

/**
 * get business id
 * @return mixed
 */
export const getAdminBusinessId = () => {
  if (localStorage.businessId) {
    return localStorage.businessId;
  }
  return null;
};

/**
 * get logged in user id
 * @return mixed
 */
export const getLoggedInUserId = () => {
  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    return decoded.user.id;
  }
  return null;
};
