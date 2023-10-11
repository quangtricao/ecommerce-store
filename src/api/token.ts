const TOKEN_KEY = "authorizedToken";

export const saveTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = (): string | null => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  return token ? token : null;
};

export const clearTokenFromLocalStorage = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};
