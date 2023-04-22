const PROD_API_URL = 'https://sdi-samy.jumpingcrab.com/api';
const DEV_API_URL = 'http://127.0.0.1:8000/api';

export const API_URL = process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL;

