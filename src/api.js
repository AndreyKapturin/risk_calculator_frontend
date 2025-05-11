import { BASE_URL } from "./constants";
const getAuthorizationHeader = () => `Bearer ${localStorage.getItem('accessToken')}`;

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
  
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export const authenticate = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: userData }),
    });    
    const authData = await handleResponse(response);
    return authData;
  } catch (error) {
    console.log('Authenticate error: ', error);
    throw error;
  }
}

export const getObjectsGroupsList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups`);
    const objectsGroups = await handleResponse(response);
    return objectsGroups;
  } catch (error) {
    console.log('Fetch objects groups error: ', error);
    throw error;
  }
}
  
export const getObjectsGroupById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${id}`);
    const metrics = await handleResponse(response);
    return metrics;
  } catch (error) {
    console.log('Fetch metrics: ', error);
    throw error;
  }
}

export const updateObjectsGroup = async (id, objectsGroup) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ objectsGroup }),
    });
    const updatedObjectsGroup = await handleResponse(response);
    return updatedObjectsGroup;
  } catch (error) {
    console.log('Update objects group error: ', error);
    throw error;
  }
}

export const addMetricToObjectsGroup = async (objectsGroupId, metric) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${objectsGroupId}/metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ metric }),
    });
    await handleResponse(response);
    return metric;
  } catch (error) {
    console.log('Update objects group error: ', error);
    throw error;
  }
}

export const removeMetricFromObjectsGroup = async (objectsGroupId, metricId) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${objectsGroupId}/metrics/${metricId}`, {
      method: 'DELETE',
      headers: {
        authorization: getAuthorizationHeader(),
      }
    });
    const removedMetric = await handleResponse(response)
    return removedMetric;
  } catch (error) {
    console.log('Update objects group error: ', error);
    throw error;
  }
}

export const updateIndicatorsValues = async (objectsGroupId, indicators) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${objectsGroupId}/values`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ indicators }),
    });

    const updatedIndicators = await handleResponse(response);
    return updatedIndicators;
  } catch (error) {
    console.log('Update objects group error: ', error);
    throw error;
  }
}

export const getMetrics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/metrics`);
    const metrics = await handleResponse(response);
    return metrics;
  } catch (error) {
    console.log('Fetch metrics: ', error);
    throw error;
  }
}

export const getMetricById = async (metricId) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics/${metricId}`);
    const metric = await handleResponse(response);
    return metric;
  } catch (error) {
    console.log('Fetch metric error', error);
    throw error;
  }
}

export const createMetric = async (metric) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ metric }),
    });
    const createdMetric = await handleResponse(response);
    return createdMetric;
  } catch (error) {
    console.log('Create metric error: ', error);
    throw error;
  }
}

export const updateMetricIndicatorText = async (indicatorId, indicator) => {
  try {
    const response = await fetch(`${BASE_URL}/indicators/${indicatorId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ indicator }),
    });
    await handleResponse(response);
    return { id: indicatorId, text: indicator.text };
  } catch (error) {
    console.log('Create metric error: ', error);
    throw error;
  }
}

export const deleteIndicator = async (indicatorId) => {
  try {
    const response = await fetch(`${BASE_URL}/indicators/${indicatorId}`, {
      method: 'DELETE',
      headers: {
        authorization: getAuthorizationHeader(),
      }
    });
    await handleResponse(response);
    return { id: indicatorId };
  } catch (error) {
    console.log('Create metric error: ', error);
    throw error;
  }
}

export const updateMetric = async (metricId, data) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics/${metricId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ metric: data })
    });
    const updatedMetric = await handleResponse(response);
    return updatedMetric;
  } catch (error) {
    console.log('Update metric error: ', error);
    throw error;
  }
}

export const deleteMetric = async (metricId) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics/${metricId}`, {
      method: 'DELETE',
      headers: {
        authorization: getAuthorizationHeader(),
      }
    });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.log('Create metric error: ', error);
    throw error;
  }
}

export const addIndicator = async (metricId, indicator) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics/${metricId}/indicators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getAuthorizationHeader(),
      },
      body: JSON.stringify({ indicator }),
    });
    const createdIndicator = await handleResponse(response);
    return createdIndicator;
  } catch (error) {
    console.log('Add indicator in metric error: ', error);
    throw error;
  }
}