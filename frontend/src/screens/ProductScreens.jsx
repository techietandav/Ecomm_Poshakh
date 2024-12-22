import { useState } from 'react';
import {Link } from 'react-router-dom';
import {Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
const ProductScreens = () => {

  const { id: productId } = useParams();

  const dispatch =useDispatch();
  const navigate =useNavigate();
  const [qty, setQty]=useState(1);
 
  const {data:product,isLoading,error} =useGetProductDetailsQuery(productId);
  const addToCartHandler = ()=>{
    dispatch(addToCart({...product, qty}))
    navigate('/cart')
  }
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading?(<Loader/>):error?(<div>{error?.data?.message ||error.error}</div>):( <Row>
        <Col md={3}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <strong>Rs.{product.price}</strong>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                </Row>
              </ListGroup.Item>
              {product.countInStock>0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                    <Form.Control as='select' value={qty} 
                    onChange={(e)=>setQty(Number(e.target.value))}>
                      {[...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1}>
                          {x+1}
                        </option>
                      ))}
                      </Form.Control>
                      </Col></Row></ListGroup.Item>)}
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>)}
     
    </>
  );
};

export default ProductScreens;
