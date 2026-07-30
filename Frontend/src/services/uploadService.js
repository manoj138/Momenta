import { Api } from '../components/common/Api/api';

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
      return media?.file_path || media?.url || media?.path || "";
    } catch (err) {
      console.warn("Media upload failed, using direct object URL fallback:", err.message);
      return "";
    }
  }
};
