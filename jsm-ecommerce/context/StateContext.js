import React, { createContext, useContext, useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(null)
  const [totalQuantities, setTotalQuantities] = useState(null)
  const [qty, setQty] = useState(1)

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id )

    setTotalPrice(prevTotalPrice => prevTotalPrice + (product.price * quantity))
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity
          }
        }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity
      setCartItems([ ...cartItems, { ...product } ])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  const incQty = () => {
    // whenever updating state using the previous value in the state, must use a callback function
    setQty(prevQty => prevQty + 1)
  }
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty === 1) return 1;
      return prevQty - 1
    })
  }

  const value = {
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

// allows the use of the context as a hook
export const useStateContext = () => useContext(Context)
