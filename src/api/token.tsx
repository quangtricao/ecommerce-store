const STORAGE_KEY = "authorizedToken";

export const saveTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem(STORAGE_KEY, token);
};

export const getTokenFromLocalStorage = (): string | null => {
  const token = window.localStorage.getItem(STORAGE_KEY);
  return token ? token : null;
};

export const clearTokenFromLocalStorage = () => {
  window.localStorage.clear();
};
