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
  // TODO: сделать нормальный ендпоинт на бекенде 
  try {
    const response = await fetch(`${BASE_URL}/objects-groups/${id}`);
    const metrics = await response.json();
    return metrics;
  } catch (error) {
    console.log('Fetch metrics: ', error);
    throw error;
  }
}

export const getAllMetricsWithIndicators = async () => {
  try {
    const response = await fetch(`${BASE_URL}/metrics`);
    const metrics = await response.json();
    return metrics;
  } catch (error) {
    console.log('Fetch metrics: ', error);
    throw error;
  }
}

export const getMetricWithIndicatorsById = async (metricId) => {
  try {
    const metrics = await getAllMetricsWithIndicators();
    const metric = metrics.find(metric => metric.id == metricId);
    return metric;
  } catch (error) {
    console.log('Fetch metrics: ', error);
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
    const data = await response.json();
    return data;
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
    await fetch(`${BASE_URL}/metrics/${metricId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metric: data })
    });
    
    return { id: metricId, ...data };
  } catch (error) {
    console.log('Create metric error: ', error);
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Add indicator in metric error: ', error);
    throw error;
  }
}