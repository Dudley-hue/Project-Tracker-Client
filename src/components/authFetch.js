// src/components/authFetch.js

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Define headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // Add Authorization header only if token exists
    ...options.headers // Include any additional headers passed
  };

  try {
    // Perform fetch request
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Request failed');
    }

    // Parse and return the response data
    return await response.json();
  } catch (error) {
    // Log error to the console and rethrow it
    console.error('Fetch error:', error);
    throw error;
  }
};
