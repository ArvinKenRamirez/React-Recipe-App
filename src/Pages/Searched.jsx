import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
gap: 3rem;
`;

const Card = styled.div`
position: relative;
min-height: 15rem;
border-radius: 2rem;
overflow: hidden;
  :hover{
    cursor: pointer;
  }

  :hover{
    img{
      scale: 1.1;
    }
  }

img{
  position: absoulute;
  border-radius: 2rem;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ease-in-out 250ms;
}

a{
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 10;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0%);
  color: #FFF;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
`;

const Gradient = styled.div`
position: absolute;
top: 0;
height: 100%;
width: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
z-index: 3;
`;

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();
  
      const getSearchedRecipes = async (name) => {
          const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
          const data = await api.json();
          setSearchedRecipes(data.results);
          console.log(data);
      };
  
    useEffect(()=>{
      getSearchedRecipes(params.search);
    }, [params.search]);
  
    return (
      <div>
        <h3 className='recipe__title'>{params.search}</h3>
        <Grid>
          {searchedRecipes.map((recipe) => {
            return(
              <Card key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <a href="#">{recipe.title}</a>
                <Gradient/>
              </Card>
            );
          })}
        </Grid>
      </div>
    );
}

export default Searched;