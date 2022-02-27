import axios from "axios";

const key = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const secret = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

export const pinJSONToIPFS = async (json) => {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    return axios
        .post(url, json, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,                
            },
        })
        .then((response) => {
            return response.data.IpfsHash;
        })
        .catch((error) => {
            console.log(error);
        })
}

export const pinFileToIPFS = async (file, pinataMetaData) => {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    let data = new FormData();
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify(pinataMetaData));

    return axios
        .post(url, data, {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`, // Boundary is so the server knows how to split the data/parameters it recieves
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        })
        .then((response) => {
            return response.data.IpfsHash;
        })
        .catch((error) => {
            console.log(error);
        })
}