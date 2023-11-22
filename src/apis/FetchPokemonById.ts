import axios from "axios";
import ParseAxiosError from "@Pokemon/utils/ParseAxiosError";
import IApiResult from "@Pokemon/models/IApiResult";

const FetchPokemonById = async (pokemonIndex: string) : Promise<IApiResult> => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`)
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

export default FetchPokemonById;