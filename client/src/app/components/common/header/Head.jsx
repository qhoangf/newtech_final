import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB school-name'>
          <div className="school-logo">
            <img src="/assets/images/hcmute/school_logo.png"/>
          </div>
          <div className='logo'>
            <h1 className="has-text-right">HCMUTE</h1>
            <p className="has-text-right">TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</p>
            <hr />
            <p className="has-text-right">HCMC University of Technology and Education</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
