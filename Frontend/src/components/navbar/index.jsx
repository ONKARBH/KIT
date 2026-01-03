import React, { useState, useEffect } from 'react'
import './style.scss'
import collegeLogo from '../../assets/images/CLGlogo.png'
import malk from '../../assets/images/malk.png'
import NavList from '../navlist'

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='nav-container'>
      <div className='navbar-content'>
        <a href="/" className='nav-ancor'>
          <div className='college-logo'>
            <img src={collegeLogo} alt="collegeLogo" />
          </div>
          <div className='main-title'>
            <span className='college-title'>Shri Pandurang Pratishthan Pandharpur</span>
            <span className='college-title kit-title'>Karmayogi Institute of Technology</span>
          </div>
        </a>
        {!isMobile && (
          <div className='profile-img'>
            <img src={malk} alt="SudhakarPant Paricharak" />
          </div>
        )}
      </div>
      <NavList />
    </div>
  )
}

export default Navbar;
