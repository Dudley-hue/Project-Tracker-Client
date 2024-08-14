// src/components/authFetch.js

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Only add Authorization header if token exists
    ...options.headers // Include any additional headers passed
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: headers,
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
