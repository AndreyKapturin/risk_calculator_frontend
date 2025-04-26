const BASE_URL = 'http://localhost:3000/api-v1';

export const getObjectsGroupsList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups`);
    const objectsGroups = await response.json();
    return objectsGroups;
  } catch (error) {
    console.log('Fetch objects groups error: ', error);
    throw error;
  }
}
  
export const getObjectsGroupById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${id}`);
    const metrics = await response.json();
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ objectsGroup }),
    });
    const updatedObjectsGroup = await response.json();
    return updatedObjectsGroup;
  } catch (error) {
    console.log('Update objects group error: ', error);
    throw error;
  }
}

export const addMetricToObjectsGroup = async (objectsGroupId, metric) => {
  try {
    await fetch(`${BASE_URL}/objects-groups/${objectsGroupId}/metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ metric }),
    });
    return metric;
  } catch (error) {
    console.log('Update objects group error: ', error);
    throw error;
  }
}

export const getMetrics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/metrics`);
    const metrics = await response.json();
    return metrics;
  } catch (error) {
    console.log('Fetch metrics: ', error);
    throw error;
  }
}

export const getMetricById = async (metricId) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics/${metricId}`);
    const metric = await response.json();
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ metric }),
    });
    const createdMetric = await response.json();
    return createdMetric;
  } catch (error) {
    console.log('Create metric error: ', error);
    throw error;
  }
}

export const updateMetricIndicatorText = async (indicatorId, indicator) => {
  try {
    await fetch(`${BASE_URL}/indicators/${indicatorId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ indicator }),
    });
    
    return {id: indicatorId, text: indicator.text};
  } catch (error) {
    console.log('Create metric error: ', error);
    throw error;
  }
}

export const deleteIndicator = async (indicatorId) => {
  try {
    await fetch(`${BASE_URL}/indicators/${indicatorId}`, {
      method: 'DELETE',
    });
    
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
      },
      body: JSON.stringify({ metric: data })
    });
    const updatedMetric = await response.json();
    return updatedMetric;
  } catch (error) {
    console.log('Update metric error: ', error);
    throw error;
  }
}

export const deleteMetric = async (metricId) => {
  try {
    const response = await fetch(`${BASE_URL}/metrics/${metricId}`, { method: 'DELETE' });
    return response.ok
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ indicator }),
    });
    const createdIndicator = await response.json();
    return createdIndicator;
  } catch (error) {
    console.log('Add indicator in metric error: ', error);
    throw error;
  }
}