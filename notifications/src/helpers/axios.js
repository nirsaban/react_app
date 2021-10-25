import axios from 'axios';
let url = window.location.origin
if(url.includes("local")){
    url = "http://localhost:5000"

}
const baseURL = url
console.log(baseURL)
let headers = {
    'Content-Type': 'application/json'
};
const Axios = axios.create({
    baseURL:baseURL,
    headers:headers
})




export default Axios