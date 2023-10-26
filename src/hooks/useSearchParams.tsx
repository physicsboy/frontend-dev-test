// Renamed imported hook as I've unfortunately called this one the same
import {useSearchParams as rrdSearchParams} from "react-router-dom";
import {useCallback} from "react";

type SearchParamType = {
  [key: string]: string;
};

type UseSearchParamsType = {
  updateSearchParams: (newSearchParams: SearchParamType) => void;
  searchParams: URLSearchParams;
  getSearchParam: (key: string) => string | null;
};

const useSearchParams = (): UseSearchParamsType => {
  let [searchParams, setSearchParams] = rrdSearchParams();

  const updateSearchParams = useCallback((newSearchParams: SearchParamType): void => {
    const [key, val] = Object.entries(newSearchParams)[0];

    setSearchParams(params => {
      params.set(key, val);
      return params;
    });
  }, [setSearchParams]);

  const getSearchParam = (key: string): string | null => searchParams.get(key);

  return {updateSearchParams, searchParams, getSearchParam};
}

export default useSearchParams;
