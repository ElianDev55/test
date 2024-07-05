import { UseGetVideogames } from "../../hooks/useGetVideogames";
import { TableVideogames } from "./TableVideogames";




export const Videogames = () => {
    const { videogames, isLoading, error } = UseGetVideogames();
   
    return (
        <>
        <TableVideogames data = {videogames} />
        </>
    )
};