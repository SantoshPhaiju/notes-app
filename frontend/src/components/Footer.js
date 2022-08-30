import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div>
      <footer className='bg-black sm:py-4 text-white text-center sm:text-xl font-mono text-sm py-2'>
        Copyright &copy; Santosh Phaiju {year}
      </footer>
    </div>
  )
}

export default Footer
