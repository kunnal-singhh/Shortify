
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Urls from './pages/Urls'

function App() {
  return (
     <Routes>
      <Route path="/" element={<Layout />}>
         <Route index element={<Home/>} />
         <Route path="/urls" element={<Urls />} />
         <Route path="/about" element={<About />} />
      </Route>
     </Routes>
  )
}

export default App
