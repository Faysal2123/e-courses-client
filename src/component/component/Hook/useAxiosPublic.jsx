import axios from 'axios';
import React from 'react';



const axiosPublic=axios.create({
    baseURL:"https://e-courses-server-gamma.vercel.app"

})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;