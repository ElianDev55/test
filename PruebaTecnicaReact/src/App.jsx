import { Developers } from "./components/CrudDevelopers/Developers"
import { Platforms } from "./components/CrudPlatform/Platforms"
import { Videogames } from "./components/CrudVideoGames/Videogames"
import {  NavbarP } from "./components/navbar"

function App() {

  return (
    <>
    <NavbarP />
    <Developers />
    <Platforms />
    <Videogames />
    </>
  )
}

export default App
