import React from 'react'
import "../../css/HomePage.css"
import HeroContent from './HeroContent';
import CardContent from './CardContent';
import Navbar from '../Navbar'
import MarketContent from './MarketContent';
import HowItWorksContent from './HowItWorksContent';
import WhatIsCoinsavvyContent from './WhatIsCoinsavvyContent';
import PromotionContent from './PromotionContent';
import Footer from '../Footer';


export default function Homepage(props) {
  return (
    <>
      {/* Navbar Content */}
      <Navbar
        theme_toggle = {props.theme_toggle}
        isCheckedTheme = {props.isCheckedTheme}
        activePage = {'HomePage'}
      />

      {/* Hero Content */}
      <HeroContent
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* Card Content */}
      <CardContent
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* Market Content */}
      <MarketContent
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* How It Works Content */}
      <HowItWorksContent
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* What Is Coinsavvy Content */}
      <WhatIsCoinsavvyContent
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* Promotion Content */}
      <PromotionContent
        isCheckedTheme = {props.isCheckedTheme}
      />

      {/* Footer */}
      <Footer
        isCheckedTheme = {props.isCheckedTheme}
      />
    </>
  )
}
