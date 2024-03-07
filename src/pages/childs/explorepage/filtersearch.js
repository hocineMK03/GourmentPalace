import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import '../../../styles/filtersearch.css'
import datahanding from '../../../services/datahanding';
import authservice from '../../../services/authservice';

const FilterSearch = ({searchQuery, setSearchQuery,setRecipes }) => {
  
  const handleInput = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    console.log(inputValue);
  };

  const handleSearch =async () => {

const result=await datahanding.retrieveSearchedRecipes(searchQuery)
setRecipes(result)
  };
  const handleSearch1 =async (e) => {
    if(e.key ==='Enter'){
      const result=await datahanding.retrieveSearchedRecipes(searchQuery)
      setRecipes(result)
    }
      };

  return (
    <div className='bar-container'>
      <div className='bar-searchbar'>
        <input type='text'  onChange={handleInput} onKeyUp={handleSearch1}/>
        <button onClick={handleSearch}><FaSearch /></button>
      </div>
      <Dropdown className='bar-filter'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">By Name</Dropdown.Item>
          <Dropdown.Item href="#/action-2">By Time</Dropdown.Item>
          <Dropdown.Item href="#/action-3">By Calories</Dropdown.Item>
          <Dropdown.Item href="#/action-3">By Rating</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className='bar-planner'>
        <button>Meal Planning</button>
      </div>
    </div>
  )
}

export default FilterSearch
