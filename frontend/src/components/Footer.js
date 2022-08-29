import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div>
      <footer className='bg-black py-4 text-white text-center text-xl font-mono'>
        Copyright &copy; Santosh Phaiju {year}
      </footer>
    </div>
  )
}

export default Footer
