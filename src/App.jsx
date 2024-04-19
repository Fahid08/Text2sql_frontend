import React from 'react'
import LayoutContainer from '../src/components/Layout'
import Guide from '../src/components/Guide'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LayoutContainer/>}/>
        <Route path='/how-to-use' element={<Guide/>}/>
      </Routes>
    </div>
  )
}
export default App
