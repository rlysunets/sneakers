import React, { useContext, useState } from 'react'
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from '../../context'

const Card = ({ id, title, price,  imageUrl, addToCart, addToFavourites, favorited = false }) => {
   const { isItemAdded, isLoading } = useContext(AppContext)
   const [isFavorite, setIsFavorite] = useState(favorited)

   const item = {id, parentId: id, title, price,  imageUrl}

   const onClickFavorite = () => {
      addToFavourites(item)
      setIsFavorite(!isFavorite)
   }

   return (
      <div className={styles.card}>
         {isLoading ? (
            <ContentLoader 
               speed={2}
               width={210}
               height={260}
               viewBox="0 0 170 220"
               backgroundColor="#E5E5E5"
               foregroundColor="#ecebeb"
            >
               <rect x="0" y="0" rx="10" ry="10" width="155" height="120" />
               <rect x="0" y="130" rx="5" ry="5" width="155" height="15" />
               <rect x="0" y="155" rx="5" ry="5" width="100" height="15" />
               <rect x="0" y="190" rx="5" ry="5" width="80" height="25" />
               <rect x="124" y="185" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
         ) : (
            <>
               {addToFavourites && 
                  <button className={`${styles.favourite} ${styles.btn}`} onClick={onClickFavorite}>
                     {<img 
                        src={isFavorite ? "image/liked.svg" : "image/unliked.svg"} 
                        alt="like"
                     />}
                  </button>}
                  <img width="100%" height={135} src={imageUrl} alt={title} />
                  <h5>{title}</h5>                
                  <div className={styles.card_info}>
                     <div className={styles.price}>
                        <span>Price:</span>
                        <b>{price} $</b>
                     </div>

               {addToCart &&
                  <button className={styles.btn} onClick={() => addToCart(item)}>
                     <img 
                        width={11} 
                        height={11} 
                        src={isItemAdded(id) ? "image/btn-checked.svg" : "image/btn-plus.svg"} 
                        alt="plus"
                     />
                  </button>}
               </div>
            </>
         )}
      </div>
   )
}

export default Card