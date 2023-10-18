const TOKEN_KEY = "authorizedToken";
const THEME_KEY = "themeMode"

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

export const saveThemeToLocalStorage = (theme: string) => {
  window.localStorage.setItem(THEME_KEY, theme);
};

export const getThemeFromLocalStorage = (): string | null => {
  const theme = window.localStorage.getItem(THEME_KEY);
  return theme ? theme : null;
};