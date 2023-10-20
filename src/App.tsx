import { useState, createContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import router from "./config/router";
import { getThemeFromLocalStorage, saveThemeToLocalStorage } from "./api/localStorage";

type AppContextProps = {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextProps>({
  theme: true,
  setTheme: function () {},
});

const App = () => {
  const [theme, setTheme] = useState<boolean>(true);

  useEffect(() => {
    let themeInLocalStorage = getThemeFromLocalStorage();

    if (themeInLocalStorage && themeInLocalStorage === "dark") {
      setTheme(false);
    }
  }, []);

  useEffect(() => {
    saveThemeToLocalStorage(`${theme ? "light" : "dark"}`);
  }, [theme]);

  const darkTheme = createTheme({
    palette: {
      mode: `${theme ? "light" : "dark"}`,
    },
  });

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
