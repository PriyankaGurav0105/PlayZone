import Game from "./Components/Game"
import Lobby from "./Components/Lobby"
import { Routes,Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby/>} />
        <Route path="/game/:roomCode" element={<Game/>} />
      </Routes>
    </div>
  )
}

export default App
