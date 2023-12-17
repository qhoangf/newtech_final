import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Yêu cầu đăng ký tài khoản từ trường</h1>
            <span>Hãy gửi email để được đăng ký tài khoản</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Nhập email để tạo tài khoản' />
            <div className="is-cursor-pointer"><i className='fa fa-paper-plane'></i></div>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</h1>
            <p>
              <a href="https://www.facebook.com/dhspkt.hcmute/?locale=vi_VN" target="_blank">
                <i className='fab fa-facebook-f icon-index'></i>
              </a>
              &nbsp;Theo dõi các tin mới nhất của trường qua <a href="https://www.facebook.com/dhspkt.hcmute/?locale=vi_VN" target="_blank">Facebook</a>
            </p>
          </div>
          <div className='box last'>
            <h3>Thông tin liên hệ</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh.
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                (+84 - 028) 38968641 - (+84 -028) 38961333 - (+84 -028) 37221223
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                <a href="https://hcmute.edu.vn/" target="_blank">https://hcmute.edu.vn/</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright © 2013, Trường Đại Học Sư Phạm Kỹ Thuật - Tp.HCM
          <br />
          Website được phát triển bởi Nguyễn Quốc Hoàng (19110128) và Huỳnh Gia Kiện (19110152)
        </p>
      </div>
    </>
  )
}

export default Footer
