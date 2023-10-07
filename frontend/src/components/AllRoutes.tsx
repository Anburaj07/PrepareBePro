import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Courses from '../pages/Courses'
import { CourseDiv } from '../pages/CourseDiv'
import Interview from '../pages/Interview'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/roles' element={<Courses/>}/>
        <Route path='/role/:title' element={<CourseDiv/>}/>
        <Route path='/interview' element={<Interview/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
