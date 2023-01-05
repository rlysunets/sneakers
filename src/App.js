import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import axios from "axios"
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";
import AppContext from "./context"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favourites, setFavourites] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      (async () => {
        try {
          setIsLoading(true)

          const [itemsResp, cartItemsResp, favouritesResp] = await Promise.all([
            axios.get("https://63a87cd3f4962215b58355d9.mockapi.io/items"),
            axios.get("https://63a87cd3f4962215b58355d9.mockapi.io/cart"),
            axios.get("https://63a87cd3f4962215b58355d9.mockapi.io/favourites")
          ])
          
          setIsLoading(false)
          
          setCartItems(cartItemsResp.data)
          setFavourites(favouritesResp.data)
          setItems(itemsResp.data)
        } catch (e) {
          alert("Error while fetching data.")
          console.error(e)
        }
      }) ()
  }, [])

  const addToCart = async (item) => {
    try {
      const findItem = cartItems.find(el => Number(el.parentId) === Number(item.id))
      if (findItem) {
        setCartItems(prev => prev.filter(el => Number(el.parentId) !== Number(item.id)))
        await axios.delete(`https://63a87cd3f4962215b58355d9.mockapi.io/cart/${findItem.id}`)
      } else {
        const { data } = await axios.post("https://63a87cd3f4962215b58355d9.mockapi.io/cart", item)
        setCartItems(prev => [...prev, data])
      }
    } catch (e) {
      alert("Error while adding product to the cart.")
      console.error(e)
    }
  }

  const removeFromCart = (id) => {
    try {
      setCartItems(prev => prev.filter(el => Number(el.id) !== Number(id)))
      axios.delete(`https://63a87cd3f4962215b58355d9.mockapi.io/cart/${id}`)
    } catch (e) {
      alert("Error while removing product from the cart.")
      console.error(e)
    }
  }

  const addToFavourites = async (item) => {
    try {
      if (favourites.find(el => Number(el.id) === Number(item.id))) {
        axios.delete(`https://63a87cd3f4962215b58355d9.mockapi.io/favourites/${item.id}`)
        setFavourites(prev => prev.filter(el => Number(el.id) !== Number(item.id)))
      } else {
        const { data } = await axios.post("https://63a87cd3f4962215b58355d9.mockapi.io/favourites", item)
        setFavourites(prev => [...prev, data])
      }
    } catch (e) {
      alert("Error while adding to favourites")
      console.error(e)
    }
  }
  
  const isItemAdded = (id) => {
    return cartItems.some(el => Number(el.parentId) === Number(id));
  }

  return (
    <AppContext.Provider 
      value={{
        items, 
        cartItems, 
        setCartItems,
        favourites,
        addToFavourites,
        isItemAdded,
        setCartOpened,
        isLoading,
        addToCart
      }}>
      <Cart 
        cartItems={cartItems} 
        cartOpened={cartOpened}
        setCartOpened={setCartOpened} 
        removeFromCart={removeFromCart}
      />

      <Routes>
        <Route path="/" element={<Layout setCartOpened={setCartOpened} />}>
          <Route index element={
            <Home 
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          }/>
          <Route path="favourites" element={
            <Favourites />
          }/>
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  )
}

export default App
