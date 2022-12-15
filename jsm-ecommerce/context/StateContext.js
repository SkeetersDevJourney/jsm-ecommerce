import React, { createContext, useContext, useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct, index

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

  const onRemove = product => {
    foundProduct = cartItems.find(item => item._id === product._id)
    index = cartItems.findIndex(item => item._id === product._id)
    const newCartItems = cartItems.filter(item => item._id !== product._id)

    setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }


  // REVIEW ////////////////////////
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find(item => item._id === id)
    index = cartItems.findIndex(product => product._id === id)
    const newCartItems = cartItems.filter(item => item._id !== id)
    
    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])

      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price) 

      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {

      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
  
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price) 
  
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)

      }
    }
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
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

// allows the use of the context as a hook
export const useStateContext = () => useContext(Context)
