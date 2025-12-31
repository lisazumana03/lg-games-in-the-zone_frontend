import { axiosInstance } from './axiosConfig';

const API_URL = 'http://localhost:4515/api/review';

const reviewService = {
  submitReview: async (payload) => {
    // payload: { rating:number, comments:string, userId?:string, userName?:string, email?:string }
    const res = await axiosInstance.post(API_URL, payload);
    return res.data;
  },
};

export default reviewService;