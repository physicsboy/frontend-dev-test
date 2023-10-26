import {createContext, ReactNode, useContext, useState} from "react";

type ContextType = {
  showDrawer: boolean;
  errorMessage: string | null;
  setShowDrawer: (showDrawer: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
};

const initialContext: ContextType = {
  showDrawer: false,
  errorMessage: null,
  setShowDrawer: () => {},
  setErrorMessage: () => {}
};

const UiContext = createContext(initialContext);

// Could be moved to hooks directory
export const useUiContext = () => useContext(UiContext);

export const UiProvider = ({children}: {children: ReactNode}): JSX.Element => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return <UiContext.Provider value={{showDrawer, errorMessage, setShowDrawer, setErrorMessage}}>
    {children}
  </UiContext.Provider>;
}
