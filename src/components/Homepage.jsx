import React from 'react'
import "../css/Homepage.css"
import Navbar from './navbar'
import heroImage from "../assets/images/heroImage.png"

export default function Homepage(props) {
  // Theme Color Setter
  const background_2 = props.isCheckedTheme ? "darkBG2" : "lightBG2"
  const textColor_1 = props.isCheckedTheme ? "darkText1" : "lightText1"

  return (
    <>
      <Navbar
        theme_toggle = {props.theme_toggle}
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* Hero Content  */}
      <div className={`homePageContainer ${background_2}`}>

        <div className='container everyContainerWidth'>

          <div className='heroDetails'>
            <p className={`title ${textColor_1}`}>Empowering your financial future with cryptocurrency</p>
            <p className='description'>Discover the future of finance with our comprehensive crypto currency platform, offering cutting-edge technology and expert insights.</p>
            <button>
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Learn More</span>
            </button>
          </div>

          <img src={heroImage} alt='Hero Image'/>

        </div>

      </div>
    </>
  )
}