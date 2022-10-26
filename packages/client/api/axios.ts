import Axios from 'axios'
const host=process.env.NEXT_PUBLIC_HOST

export const axios=Axios.create({baseURL:host})
