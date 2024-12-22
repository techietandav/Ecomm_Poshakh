import { useGetProductsQuery } from '../slices/productApiSlice'
import React from 'react'
import {Row,Col} from 'react-bootstrap'
//import products from '../products'
import Products from '../Components/Products'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
const HomeScreens = () => {
  const {data:products,isLoading,error} =useGetProductsQuery();
  return (
    <>
{isLoading ? (<Loader/>) :error ? (<Message variant='danger'>
  {error?.data?.message || error.error}
</Message>):(<><h1>Latest Collections</h1>
  <Row>
      {products.map((product)=>(
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product}/>
          </Col>
      ))}
  </Row>
  </>)}
  </>
  )
}


export default HomeScreens

