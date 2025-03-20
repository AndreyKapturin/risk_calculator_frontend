import type { IObjectsGroup, IObjectsGroupForList } from "../types";

const BASE_URL = 'http://localhost:3000/api-v1';

export const getObjectsGroupsList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups`);
    const objectsGroups: IObjectsGroupForList[] = await response.json();
    return objectsGroups;
  } catch (error) {
    console.log('Fetch objects groups error: ', error);
    throw error;
  }
}
  
export const getObjectsGroupById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${id}`);
    const metrics: IObjectsGroup = await response.json();
    return metrics;
  } catch (error) {
    console.log('Fetch metrics: ', error);
    throw error;
  }
}