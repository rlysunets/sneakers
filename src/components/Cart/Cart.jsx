import React, { useState } from 'react'
import Info from '../Info/Info'
import styles from './Cart.module.scss'
import axios from 'axios'
import { useCart } from '../../hooks/useCart'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const Cart = ({ setCartOpened, removeFromCart, cartOpened }) => {
   const [isOrdered, setIsOrdered] = useState(false)
   const [orderId, setOrderId] = useState(null)
   const [isLoading, setIsloading] = useState(false)

   const { cartItems, setCartItems, totalPrice} = useCart()

   const onClickOrder = async () => {
      try {
         setIsloading(true)
         const { data } = await axios.post("https://63a87cd3f4962215b58355d9.mockapi.io/orders", {
            items: cartItems
         })
         setOrderId(data.id)
         
         for (let i = 0; i < cartItems.length; i++) {
            await axios.delete(`https://63a87cd3f4962215b58355d9.mockapi.io/cart/${cartItems[i].id}`)
            await delay(2000)
         }
         setIsOrdered(true)
         setCartItems([])
         
      } catch (e) {
         alert("An error occurred while placing the order.")
         console.log(e)
      } 
      setIsloading(false)
   }

   return (
      <div className={`${styles.overlay} ${cartOpened ? styles.visible : ""}`}>
         <div className={styles.cart}>
            <h2 className={styles.cart_header}>
               My Cart
               <img src="image/btn-remove.svg" alt="close" onClick={() => setCartOpened(false)} />  
            </h2>

            {cartItems.length ? 
                  (<>
                     <ul className={styles.cart_list}>
                        {cartItems.map(item => (
                           <li className={styles.cart_item} key={item.id}>
                              <img width={70} height={70} src={item.imageUrl} alt={item.title} />
                              <div>
                                 <p>{item.title}</p>
                                 <b>{item.price} $</b>
                              </div>
                              <div className={styles.remove} onClick={() => removeFromCart(item.id)}>
                                 <img src="image/btn-remove.svg" alt="remove" />
                              </div>
                           </li>
                        ))}
                     </ul>
                     <ul className={styles.cart_total}>
                        <li>
                           <span>Total price:</span>
                           <div className={styles.dashed}></div>
                           <b>{totalPrice} $</b>
                        </li>
                        <li>
                           <span>Tax 20%:</span>
                           <div className={styles.dashed}></div>
                           <b>{Math.trunc((totalPrice / 100 * 20) * 100) / 100} $</b>
                        </li>
                     </ul>

                     <button disabled={isLoading} className="btn" onClick={onClickOrder}>
                        Order now
                        <img src="image/arrow.svg" alt="arrow" />
                     </button>
                  </>
                  ) : (
                  <Info 
                     title={isOrdered ? "Your order is placed" : "Cart is Empty"} 
                     image={isOrdered ? "image/complete-order.jpg"  : "image/empty-cart.jpg"}
                     description={isOrdered ? `Your order number is #${orderId}. Wait for delivery by courier.` : "Add at least one product to place an order."}
                  />
               ) 
            }
         </div>
      </div>
   )
}

export default Cart