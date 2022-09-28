import React, { createContext, useContext } from 'react';

type IContext = {
  name: string
  url: string
}

interface ProviderProps {
  children: React.ReactNode
}

const sample = {
  name: 'jack',
  url: 'https://google.com'
};

const TestContext = createContext<IContext | null>(null);

export const TestContextProvider: React.FC<ProviderProps> = ({ children }) => {
  return <TestContext.Provider value={sample}>{children}</TestContext.Provider>;
};

// in other component use import useTetContext for use context value
// ex:
// import useTestContext from '../UseContext'
// const value = useTestContext()
export default function useTestContext() {
  return useContext(TestContext);
}
