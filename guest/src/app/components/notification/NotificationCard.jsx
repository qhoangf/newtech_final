import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"

const homeAbout = [
  {
    id: 1,
    title: "Thông báo 1",
    desc: "Nội dung",
  },
  {
    id: 1,
    title: "Thông báo 2",
    desc: "Nội dung",
  },
  {
    id: 1,
    title: "Thông báo 3",
    desc: "Nội dung",
  },
]

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='row'>
            <Heading subtitle='Thông báo' title='Thông báo gần nhất' />
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutCard
