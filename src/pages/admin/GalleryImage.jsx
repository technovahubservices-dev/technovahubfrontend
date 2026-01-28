import React from 'react'
import AddGalleryImage from './AddGalleryImage'
import GalleryList from './adminlogin/GalleryList'

const GalleryImage = () => {
  return (
    <div className='bg-blue-50'>
        <AddGalleryImage/>
        <GalleryList/>
    </div>
  )
}

export default GalleryImage