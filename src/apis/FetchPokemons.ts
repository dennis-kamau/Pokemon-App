import axios from "axios";
import ParseAxiosError from "@Pokemon/utils/ParseAxiosError";

const FetchPokemons = ({ limit, offset } : {limit: number, offset: number }) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        })

};

export default FetchPokemons;