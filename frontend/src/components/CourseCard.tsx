import React from 'react'
import { useNavigate } from "react-router-dom";
const CourseCard = ({ title, description,image}:{
    title: String;
    description: String;
    image: any;
}) => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate(`/role/${title}`)
    }
  return (
    <div className='shadow-lg text-center bg-white rounded p-4' onClick={handleClick}>
      <div className='flex items-center justify-center p-5'>
      <img className=' h-40' src={image} alt="" />
      {/* border border-gray-300 */}
      </div>
      <h2 className='text-[#5d8de9] md:text-3xl sm:text-2xl text-1xl font-bold'>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default CourseCard
