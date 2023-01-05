import React, { useContext } from 'react'
import Card from '../components/Card/Card'
import AppContext from '../context'

const Home = ({ searchValue, setSearchValue }) => {
   const { items, addToCart, addToFavourites, isLoading } = useContext(AppContext)
   const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

   return (
      <div className="content">
         <div className="content_header">
            <h2>{searchValue ? `Search by: "${searchValue}"` : `All sneakers`}</h2>
            <div className="search_block">
               <img src="image/search.svg" alt="search" />
               <input 
                  type="text"
                  placeholder="Search ..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
               />
               {searchValue && 
                  <img 
                     className="clear_btn" 
                     src="image/btn-remove.svg" 
                     width={20} 
                     height={20} 
                     alt="clear" 
                     title="Clear"
                     onClick={() => setSearchValue("")}
                  />}  
            </div>
         </div>
         
         <div className="cards">
            {(isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
               <Card
                  key={index} 
                  addToCart={addToCart}
                  addToFavourites={addToFavourites}
                  {...item}
               /> 
            ))}
         </div>
      </div>
   )
}

export default Home