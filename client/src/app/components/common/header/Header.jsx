import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Trang chủ</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button' onClick={() => window.location.pathname = "/session/signin"}>ĐĂNG NHẬP</div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
