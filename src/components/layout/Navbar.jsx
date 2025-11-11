import React from 'react'

import { FiGithub } from "react-icons/fi";
import { GrArchlinux } from "react-icons/gr";

function Navbar() {
  return (
    <div
    className='flex items-center justify-center text-2xl py-4 w-full
    fixed top-0 left-1/2 -translate-x-1/2 z-50'>

      <div className='max-w-4xl w-full flex items-center justify-between'>

        <p className='font-Moonrising flex gap-3 items-center'>
          <GrArchlinux className='text-blue-500'/>
          Komorebi
        </p>

        <div className='flex items-center'>

          <FiGithub className='cursor-pointer' onClick={()=>{window.open("https://github.com/dashboard")}} />

        </div>

      </div>

    </div>
  )
}

export default Navbar
