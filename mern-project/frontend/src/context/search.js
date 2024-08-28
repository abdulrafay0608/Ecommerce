import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [value, setValue] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[value, setValue]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook

export const useSearch = () => useContext(SearchContext);
