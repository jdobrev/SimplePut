import {useEffect, useState} from 'react';

import {storage} from './storage';

const getApiInitialValue = (): API => {
  const ID = Math.random();
  return {
    id: ID,
    title: 'new endpoint title',
    url: '',
    data: {
      metric_name: '',
      metric_value: '',
    },
  };
};

export type API = {
  title: string;
  url: string;
  id: number;
  data: {
    metric_name: string;
    metric_value: string;
  };
};

export const useAPIs = () => {
  const [apis, setApis] = useState<API[]>([]);

  const updateAllApis = (newApis: API[]) => {
    setApis(newApis);
    storage.put(newApis);
  };

  const createNewApi = () => {
    const newApi = getApiInitialValue();
    updateAllApis([...apis, newApi]);
  };

  const updateApi = (id: number, newData: API) => {
    const newApis = apis.map(a => {
      if (a.id === id) return newData;
      return a;
    });
    updateAllApis(newApis);
  };

  const deleteApi = (id: number) => {
    const newApis = apis.filter(a => a.id !== id);
    updateAllApis(newApis);
  };

  const clearApiData = (id: number) => {
    const newApis = apis.map(a => {
      if (a.id === id) return {...a, data: {metric_name: '', metric_value: ''}};
      return a;
    });
    updateAllApis(newApis);
  };

  useEffect(() => {
    storage.get().then(apisData => {
      const screens = apisData ? JSON.parse(apisData) : [];
      setApis(screens);
      console.log('got screens from storage', screens);
    });
  }, []);
  return {
    apis,
    apiFuncs: {
      update: updateApi,
      delete: deleteApi,
      add: createNewApi,
      clearData: clearApiData,
    },
  };
};
