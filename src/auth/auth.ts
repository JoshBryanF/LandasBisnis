// auth.ts

export type UserType = {
  _id: { $oid: string };
  Name: string;
  Email: string;
  Password: string;
  id: string;
  _t: string[];
  // Optional properties
  CanManageAdmins?: boolean;
  CanManageUsers?: boolean;
  CanManageEvents?: boolean;
  CanManageStatus?: boolean;
  CompanyName?: string;
  CompanyAddress?: string;
  CompanyEmail?: string;
  PhoneNumber?: string;
  Role?: string;
  OrganizationName?: string;
  OrganizationAddress?: string;
  OrganizationPhoneNumber?: string;
  OrganizationEmail?: string;
  PersonalPhoneNumber?: string;
  PersonalAddress?: string;
  Age?: string;
  Goal?:string;
  Desccription?:string;
  Sponsored?: string;
};

type AuthData = {
  token: string;
  expiresAt: string;
  user: UserType;
};

const STORAGE_KEY = 'auth';

// --- Utility ---
const setAuthData = (data: AuthData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getAuthData = (): AuthData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// --- Hooks ---
export const useSignIn = () => {
  return (data: AuthData) => {
    setAuthData(data);
    return true;
  };
};

export const useSignOut = () => {
  return () => {
    clearAuthData();
  };
};

export const useIsAuthenticated = () => {
  const auth = getAuthData();
  if (!auth) return false;
  const now = new Date();
  const expires = new Date(auth.expiresAt);
  return now < expires;
};

export const useAuthUser = () => {
  const auth = getAuthData();
  return auth?.user ?? null;
};
