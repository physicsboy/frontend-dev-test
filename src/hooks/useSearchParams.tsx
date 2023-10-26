import {useSearchParams as rrdSearchParams} from "react-router-dom";

type SearchParamType = {
  [key: string]: string;
};

const useSearchParams = () => {
  let [searchParams, setSearchParams] = rrdSearchParams();

  const updateSearchParams = (newSearchParams: SearchParamType): void => {
    const [key, val] = Object.entries(newSearchParams)[0];

    setSearchParams(params => {
      params.set(key, val);
      return params;
    });
  }

  const getSearchParam = (key: string): string | null => searchParams.get(key);

  return {updateSearchParams, searchParams, getSearchParam};
}

export default useSearchParams;
