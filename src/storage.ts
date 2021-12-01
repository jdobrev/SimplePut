import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'qwroqwrGlobal';

const put = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
    console.log('saved ', value);
  } catch (e) {
    console.log('error saving value in storage ', e);
  }
};

const get = async () => {
  try {
    return await AsyncStorage.getItem(storageKey);
  } catch (e) {
    console.log('error reading value from storage ', e);
  }
};

export const storage = {get, put};
