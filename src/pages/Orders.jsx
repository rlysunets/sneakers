import { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import axios from 'axios'
import Info from '../components/Info/Info'

const Orders = () => {
   const [orders, setOrders] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      try {
         (async () => {
            setIsLoading(true)
            const ordersResp = await axios.get("https://63a87cd3f4962215b58355d9.mockapi.io/orders")
            setOrders(ordersResp.data)
         }) ()
      } catch (e) {
         alert("Error while rendering orders")
         console.log(e)
      }
      setIsLoading(false)
   }, [])
   
   return (
      <>
         {(orders.length ? 
               (<div className="content">
                  <div className="content_header">
                     <h2>My Orders</h2>
                  </div>
                  
                  {orders.map((item, index) => (
                     <div key={index} className="orders">
                        <h2>Order #{item.id}</h2>
                        <div className="cards">
                           {(isLoading ? [...Array(8)] : item.items).map((el, idx) => (
                              <Card 
                                 key={idx}
                                 {...el}
                              />
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
               ) : (
               <Info 
                  title="Your have no orders yet ;)" 
                  image="image/orders-empty.jpg"
                  description="Buy at least one product."
               />
            )
         )}
      </>
   )
}

export default Orders