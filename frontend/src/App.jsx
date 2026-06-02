
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Urls from './pages/Urls'

function App() {
  return (
     <Routes>
      <Route path="/" element={<Layout />}>
         <Route index element={<Home/>} />
         <Route path="/urls" element={<Urls />} />
      </Route>
     </Routes>
  )
}

export default App
