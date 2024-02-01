import React from 'react'
import "./ErrorPageStyle.scss"
import { GiSplash } from "react-icons/gi"

export const ErrorPage = () => {
  return (
    <div className='errorCont'>
      <div className='imgCont'>
        <h2 className='textErrorPage'><GiSplash className='mb-3 fs-1'/>  Upps.. Houston tenemos un problema!! </h2>
        <img src="/dashboard_images/error_image.avif" alt="Error image" className='errorImg'/>
      </div>
    </div>
  )
}
