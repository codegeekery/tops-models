const BASE_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/Blog/' : 'https://tops-models.vercel.app/Blog/'
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://tops-models.vercel.app/api'
const ORIGIN_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tops-models.vercel.app'

export { BASE_PATH, API_URL, ORIGIN_PATH}