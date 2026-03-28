import './App.css'
import Hero from './components/Hero'
import Surprise from './components/Surprise'
import Gallery from './components/Gallery'
import Wishes from './components/Wishes'
import MusicPlayer from './components/MusicPlayer'
import Cake from './components/Cake'
import ScratchCard from './components/ScratchCard'
import GiftCatcher from './components/GiftCatcher'
import ARPartyHat from './components/ARPartyHat'
import AbdulBot from './components/AbdulBot'

function App() {
  return (
    <>
      <div className="bg-pattern"></div>
      <div className="App">
        <Hero />
        <Surprise />
        <ARPartyHat />
        <Gallery />
        <ScratchCard />
        <Cake />
        <GiftCatcher />
        <Wishes />
      </div>
      <AbdulBot />
      <MusicPlayer />
    </>
  )
}

export default App
