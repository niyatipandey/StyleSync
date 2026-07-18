//export const BASE_URL = "https://layrd-backend.onrender.com";
export const BASE_URL = "http://localhost:3000";


export const getJsonRequest = ()=>({
    'Content-Type':'application/json'
})

export const getAuthHeader = ()=>({
    'Content-Type':'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})