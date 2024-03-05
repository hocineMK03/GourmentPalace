import React from 'react'
import FilterSearch from './childs/explorepage/filtersearch'
import NavbarFunc from './childs/landingpage/navbar'
import Footer from './childs/landingpage/footer'
import ExploreBody from './childs/explorepage/explorebody'

const ExplorePage = () => {
  return (
    <div>
      <NavbarFunc />
      <FilterSearch />
      <ExploreBody />
    </div>
  )
}

export default ExplorePage
