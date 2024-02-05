
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_d1E0uR7NA54Kyr4jD55xjZ52d4Q1TIqGLA4NHdpk7TY4hD5lcYtie2k1ZmWIoMza";

export const fetchBreeds = () => {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching breeds:", error);
            throw error;
        });
};

export const fetchCatByBreed = (breedId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data[0])
        .catch(error => {
            console.error("Error fetching cat by breed:", error);
            throw error;
        });
};
