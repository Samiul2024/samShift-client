import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://sam-shift-server.vercel.app`
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;