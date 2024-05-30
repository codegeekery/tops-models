const BASE_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/Blog/' : 'https://codegeekery.com/Blog/'
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://www.codegeekery.com/api'
const ORIGIN_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.codegeekery.com'

export { BASE_PATH, API_URL, ORIGIN_PATH}