import { Routes, Route } from 'react-router-dom'
import './styles/App.css'
import TurboFate from './views/TurboFate'
import Home from './views/Home'
import "./styles/fonts.css"
import Navbar from './components/Navbar'

function App() {


  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/turbo-fate" element={<TurboFate/>}/>
    </Routes>

    </>
  )
}

export default App
