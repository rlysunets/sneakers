import { NavLink } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import styles from "./Header.module.scss"

const Header = ({ setCartOpened }) => {
   const { totalPrice } = useCart()

   return (
      <header>
         <NavLink to="/">
            <div className={styles.header_left}>
               <img width={40} height={40} src="image/logo.png" alt="logo" />   
               <div>
                  <h3>React Sneakers</h3>
                  <p>The best sneakers`s shop</p>
               </div>
            </div>
         </NavLink>
         <ul className={styles.header_right}>
            <li>
               <NavLink to="/">
                  <img width={18} height={18} src="image/home.svg" alt="home" />
               </NavLink>
            </li>
            <li>
               <NavLink to="/favourites">
                  <img width={18} height={18} src="image/heart.svg" alt="heart" />
               </NavLink>
            </li>
            <li>
               <NavLink to="/orders">
                  <img width={18} height={18} src="image/user.svg" alt="orders" />
               </NavLink>
            </li>
            <li onClick={() => setCartOpened(true)}>
               <img width={18} height={18} src="image/cart.svg" alt="cart" />
               <span>{totalPrice} $</span>
            </li>
         </ul>
      </header>
   )
}

export default Header