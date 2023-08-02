import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./Registrer"

const Navigation = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/register' element={<Register/>}  />
   </Routes>
   </BrowserRouter>
  )
}

export default Navigation