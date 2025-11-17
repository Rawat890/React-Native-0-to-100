import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
   console.log('Error is - ', e);
  }
};

export const storeObjectData = async (key: any, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
       console.log('Error is - ', e);
  }
};