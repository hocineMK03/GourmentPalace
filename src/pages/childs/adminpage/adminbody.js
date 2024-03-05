import React, { useState } from 'react';
import { Tabs, Tab, NavDropdown } from 'react-bootstrap';
import CreateRecipe from './createrecipe';
import CreateIngredient from './createingredient';
const AdminBody = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
const [whichdisplay,setWhichdisplay]=useState(1)
  const handleTabClick = (eventKey) => {
    setOpenDropdown(eventKey);
  };

  const handleDropdownItemClick = (eventKey) => {
    // Handle the click event for each dropdown item
    console.log(`Dropdown item clicked: ${eventKey}`);
    // You can add your logic or navigation here
    if(eventKey==="recipe-1"){
        setWhichdisplay(1)
    }
    else if(eventKey==="ingredient-1"){
        setWhichdisplay(5)
    }
    else{
        setWhichdisplay(1)
    }
  };
  const handleDisplay=()=>{
    if(whichdisplay===1){
        return <CreateRecipe />
    }
    else if(whichdisplay===5){
      return <CreateIngredient />
    }
    else{

    }
  }
  return (
    <div>
      <div className='tabs'>
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="recipe" title="recipe">
            <NavDropdown title="Recipe Operations" id="nav-dropdown" onSelect={handleDropdownItemClick}>
              <NavDropdown.Item eventKey="recipe-1">Create Recipe</NavDropdown.Item>
              <NavDropdown.Item eventKey="recipe-3">Edit Recipe</NavDropdown.Item>
              <NavDropdown.Item eventKey="recipe-4">Display Recipes</NavDropdown.Item>
            </NavDropdown>
          </Tab>
          <Tab eventKey="ingredient" title="ingredient">
            <NavDropdown title="Ingredient Operations" id="nav-dropdown" onSelect={handleDropdownItemClick}>
              <NavDropdown.Item eventKey="ingredient-1">Create Ingredient</NavDropdown.Item>
              <NavDropdown.Item eventKey="ingredient-3">Edit Ingredient</NavDropdown.Item>
              <NavDropdown.Item eventKey="ingredient-4">Display Ingredients</NavDropdown.Item>
            </NavDropdown>
          </Tab>
          <Tab eventKey="User" title="user">
            <NavDropdown title="User Operations" id="nav-dropdown" onSelect={handleDropdownItemClick}>
              <NavDropdown.Item eventKey="user-1">Display Users</NavDropdown.Item>
              <NavDropdown.Item eventKey="user-2">Check Logs</NavDropdown.Item>
            </NavDropdown>
          </Tab>
        </Tabs>
      </div>
      <div className='dashboard'>
{handleDisplay()}
      </div>
    </div>
  );
};

export default AdminBody;
