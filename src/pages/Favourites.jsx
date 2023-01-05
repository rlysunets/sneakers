import React, { useContext } from 'react'
import AppContext from '../context'
import Card from '../components/Card/Card'
import Info from '../components/Info/Info'

const Favourites = () => {
   const { favourites, isLoading, addToCart, addToFavourites } = useContext(AppContext)

   return (
      <>
         {favourites.length ? (  
            <div className="content">
               <div className="content_header">
                  <h2>My Favourites</h2>
               </div>

               <div className="cards">
                  {(isLoading ? [...Array(8)] : favourites).map((item, index) => (
                     <Card 
                        key={index} 
                        addToCart={addToCart}
                        addToFavourites={addToFavourites}
                        favorited={true}
                        {...item}
                     />
                  ))}
               </div>
            </div> ) : (
               <Info 
                  title="Your have no favourites yet ;)" 
                  image="image/fav-empty.jpg"
                  description="Add at least one product."
               />
            )
         }
      </>
   )
}

export default Favourites