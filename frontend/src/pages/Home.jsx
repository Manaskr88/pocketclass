import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
// import Banner from '../components/Banner'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      {/* <Banner/> */}
    </div>
  )
}

export default Home
