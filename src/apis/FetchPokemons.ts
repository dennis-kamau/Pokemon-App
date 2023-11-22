import axios from "axios";
import ParseAxiosError from "@Pokemon/utils/ParseAxiosError";
import IApiResult from "@Pokemon/models/IApiResult";

const FetchPokemons = ({ limit, offset } : {limit: number, offset: number }) : Promise<IApiResult> => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
        .then((res) => {
            return {
                status: true,
                data: res.data
            };
        })
        .catch((err) => {
            return {
                status: false,
                error: ParseAxiosError(err)
            }
        })

};

export default FetchPokemons;