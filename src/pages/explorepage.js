// ExplorePage.js (Parent Component)
import React, { useState } from 'react';
import NavbarFunc from './childs/landingpage/navbar';
import Footer from './childs/landingpage/footer';
import FilterSearch from './childs/explorepage/filtersearch';
import ExploreBody from './childs/explorepage/explorebody';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
      <NavbarFunc />
      <FilterSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} setRecipes={setRecipes}/>
      <ExploreBody  recipes={recipes} setRecipes={setRecipes} />
      <Footer />
    </div>
  );
};

export default ExplorePage;
