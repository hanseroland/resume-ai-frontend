import axios from "axios";


export const axiosInstance = async (method, url, payload) => {

    const api_url = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";
    try {
         const response = await axios({
            method,
            url: `${api_url}${url}`,
            data: payload,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          },
        ); 
        return response.data 
    } catch (error) {
        return error;
    }
}  

export const axiosInstanceUploade = async (method, url, payload) => {

    const api_url = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";
    try {
        const response = await axios({
            method,
            url: `${api_url}${url}`,
            data: payload,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data",
            }

        },


        );
        return response.data
    } catch (error) {
        return error;
    }
} 