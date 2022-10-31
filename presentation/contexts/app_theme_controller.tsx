import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  retrieveFromLocalStorage,
  saveInLocalStorage,
} from "../../data/services/local_storage_services";
import { isBrowser } from "../utils/helper_functions";

const IsDarkThemeContext = React.createContext<ThemeContextInterface>({
  thememode: "",
  toggleTheme: () => {},
  allowSound: true,
  setAllowSound: () => {},
});
function AppThemeProvider(props: PropsWithChildren<{}>) {
  const [thememode, setThememode] = useState("light");
  const [allowSound, setAllowSound] = useState(true);
  useEffect(() => {
    if (isBrowser()) {
      if (retrieveFromLocalStorage("isDarkMode") == null) {
      } else {
        const root = window.document.documentElement;
        root.classList.add(retrieveFromLocalStorage("isDarkMode") ?? "");

        setThememode(retrieveFromLocalStorage("isDarkMode") ?? "light");
      }
    }
  }, []);

  function toggleTheme(isdark = false) {
    const root = window.document.documentElement;
    if (isdark) {
      root.classList.add("dark");
      setThememode("dark");
      if (isBrowser()) {
        saveInLocalStorage("isDarkMode", "dark");
      }
      return;
    }
    if (thememode === "light") {
      root.classList.remove("light");
      root.classList.add("dark");
      setThememode("dark");
      if (isBrowser()) {
        saveInLocalStorage("isDarkMode", "dark");
      }
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      setThememode("light");
      if (isBrowser()) {
        saveInLocalStorage("isDarkMode", "light");
      }
    }
  }

  return (
    <IsDarkThemeContext.Provider
      value={{ thememode, toggleTheme, allowSound, setAllowSound }}
    >
      <audio className="audio-element-notification-sound">
        <source
        //   src={`${productionUrl}/rentalsapi/file/profilePhotos/notification.mp3`}
        ></source>
      </audio>
      {props.children}
    </IsDarkThemeContext.Provider>
  );
}

export { AppThemeProvider, IsDarkThemeContext };

interface ThemeContextInterface {
  thememode: string;
  toggleTheme: () => void;
  allowSound: boolean;
  setAllowSound: (v: boolean) => void;
}
