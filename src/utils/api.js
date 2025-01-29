import axios from "axios";

export default axios.create({
    baseURL: "https://text-translator2.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': 'be4ee6d2aamsh8e352997640caa9p1e01fdjsn74eaa483ad5e',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
});