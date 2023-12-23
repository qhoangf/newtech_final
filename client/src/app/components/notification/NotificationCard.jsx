import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"

const homeAbout = [
  {
    id: 1,
    title: "Hạn chót nộp đề tài",
    desc: "Hạn chót nộp đề tài Khóa luận tốt nghiệp của các nhóm đến hết ngày 26/12/2023",
  },
  {
    id: 2,
    title: "Thông báo mở đăng ký",
    desc: "Mở đợt đăng ký đề tài Khóa luận tốt nghiệp từ ngày 26/10/2023",
  },
  {
    id: 3,
    title: "Hạn chót nộp đề tài",
    desc: "Hạn chót nộp đề tài Kỹ thuật lập trình của các nhóm đến hết ngày 20/12/2023",
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
