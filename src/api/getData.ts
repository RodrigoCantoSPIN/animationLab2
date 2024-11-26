import {useCallback} from 'react';
import {GET_DATA_URL} from '../utils/constants';

export default function useGetData(): any {
  const data = useCallback(async (callback: Function) => {
    console.log({GET_DATA_URL});
    try {
      const response = await fetch(GET_DATA_URL);
      console.log({response});
      const formattedResponse = await response.json();

      const err = false;
      if (callback) {
        callback(formattedResponse, err);
      }
    } catch (error) {
      console.log({error});
      const err = true;
      if (callback) {
        callback(error, err);
      }
    }
  }, []);

  return data;
}
