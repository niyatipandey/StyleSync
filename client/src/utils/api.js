export const BASE_URL = "https://layrd-backend.onrender.com";

export const getJsonRequest = ()=>({
    'Content-Type':'application/json'
})

export const getAuthHeader = ()=>({
    'Content-Type':'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})