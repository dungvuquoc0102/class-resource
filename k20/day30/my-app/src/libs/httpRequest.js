const baseUrl = import.meta.env.VITE_API_BASE_URL;

const httpRequest = {
  get: async (path) => {
    try {
      const response = await fetch(`${baseUrl}${path}`);
      return await response.json();
    } catch (err) {
      console.error("Error:", err);
    }
  },
  post: async (path, data) => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (err) {
      console.error("Error:", err);
    }
  },
};

export { httpRequest };
