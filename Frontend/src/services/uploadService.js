import { Api } from '../components/common/Api/api';

const BASE_SERVER_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000" : window.location.origin);

export const uploadService = {
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await Api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const media = response.data?.data || response.data;
      let rawPath = media?.file_path || media?.url || media?.path || "";

      if (rawPath && !rawPath.startsWith("http://") && !rawPath.startsWith("https://")) {
        const cleanPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
        return `${BASE_SERVER_URL}${cleanPath}`;
      }

      return rawPath;
    } catch (err) {
      console.error("Media upload failed:", err);
      return "";
    }
  }
};

