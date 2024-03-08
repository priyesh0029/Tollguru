import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const updateData = (newData) => {
    setData(newData);
  };

  const removeData = ()=>{
    setData([])
  }

  return (
    <DataContext.Provider value={{ data, updateData ,removeData }}>
      {children}
    </DataContext.Provider>
  );
};
