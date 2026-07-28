import api from "../api/axios";

export const predictWaste = async (image) => {
    const formData = new FormData();

    formData.append("file", image);

    const response = await api.post("/predict", formData);

    return response.data;
};