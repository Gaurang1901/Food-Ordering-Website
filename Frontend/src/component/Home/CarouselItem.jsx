import React from 'react'

export const CarouselItem = ({image,title,handleSubmit}) => {
  
  return (
    <div  className='flex flex-col justify-center items-center'>
        <img className ='w-[10rem] h-[10rem] lg:w-[14rem] lg:h-[14rem] rounded-full object-cover object-center' src={image} alt="" />

        <span className='py-5 font-semibold text-xl text-gray-400'>{title}</span>

    </div>
  )
}
