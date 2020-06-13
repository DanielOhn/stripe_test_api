import React, { useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"

import axios from "axios"

const Products = ({ match }) => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data.data)
      console.log(res.data.data)
    })
  }, [])

  const listProducts = Object.keys(products).map((i) => {
    let product = products[i]
    let name = product.name
    let slug = product.metadata.slug

    return (
      <li key={product.id}>
        <Link to={`${match.url}/${slug}`}>{name}</Link>
      </li>
    )
  })

  return (
    <div>
      <ul>{products && listProducts}</ul>
    </div>
  )
}

export default Products