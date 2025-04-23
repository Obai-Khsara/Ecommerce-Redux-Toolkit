import React, { useEffect, useState } from 'react'
import "./cartStyle.css"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart , removeToCart , removeSingleIteams , emptyCartIteams} from '../redux/features/cartSlice'
import toast from 'react-hot-toast'
import Table from 'react-bootstrap/Table';


const CartDetails = () => {
  const { carts } = useSelector(state => state.allCart)
  const [totalPrice , setTotalPrice] = useState(0)
  const [totalQuantity,setTotalQuantity] = useState(0)
  const dispatch = useDispatch()
  const handleIncrement = (e) => {
    dispatch(addToCart(e))
  }
  const handleDecrement = (e)=>{
    dispatch(removeToCart(e))
    toast.success("Iteam Removed from Your Cart")
  }
  const handleSingleDecrement = (e)=>{
    dispatch(removeSingleIteams(e))
  }
  const emptyCart = ()=>{
    dispatch(emptyCartIteams())
    toast.success("Your Cart is Empty")
  }
  const total = ()=>{
    let total = 0
    carts.map((ele,index)=>{
      total = ele.price * ele.qnty + total
    })
    setTotalPrice(total)
  }
  const quantity = ()=>{
    let quantity = 0
    carts.map((ele,index)=>{
      quantity = ele.qnty + quantity
    })
    setTotalQuantity(quantity)
  }
  useEffect(() => {
    total()
    quantity()
  }, [carts])
  


  return (
    <div className='m-0 row justify-content-center'>
      <div className='col-md-8 mt-5 mb-5 cardsdetails'>
        <div className="card">

          <div className="card-header bg-dark p-3">
            <div className='card-header-flex'>
              <h5 className='text-white m-0'>Cart Items {carts.length > 0 ? `(${carts.length})` : ""}</h5>
              {
                carts.length > 0 ?
                  <button className='btn btn-danger btn-sm mt-0' onClick={emptyCart}>
                    <i className='fa fa-trash-alt mr-2'></i><span>Empty Cart</span>
                  </button>
                  : ""
              }
            </div>

          </div>

          <div className="card-body p-0">
            {
              carts.length === 0 ?
                <table className='table cart-table mb-0'>
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className='cart-empty'>
                          <i className='fa fa-shopping-cart'></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                :

                // <table className='table cart-table mb-0 table-responsive-sm'>
                //   <thead>
                //     <tr>
                //       <th>Action</th>
                //       <th>Product</th>
                //       <th>Name</th>
                //       <th>Price</th>
                //       <th>Qty</th>
                //       <th className='text-right'><span id='amount' className='amount'>Total Amount</span></th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     {
                //       carts.map((data, index) => {
                //         return (
                //           <>
                //             <tr>
                //               <td><button className='prdct-delete' onClick={()=>{handleDecrement(data.id)}}>
                //                     <i className='fa fa-trash-alt mr-2'></i>
                //                   </button>
                //               </td>
                //               <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                //               <td><div className='product-name'><p>{data.dish}</p></div></td>
                //               <td>{data.price}</td>
                //               <td>
                //                 <div className="prdct-qty-container">
                //                   <button className='prdct-qty-btn' type='button'
                //                   onClick={data.qnty == 1 ? ()=>{handleDecrement(data.id)} : ()=>{handleSingleDecrement(data)}}>
                //                     <i className='fa fa-minus'></i>
                //                   </button>
                //                   <input className='qty-input-box' value={data.qnty} disabled type="text" name="" id="" />
                //                   <button className='prdct-qty-btn' type='button'
                //                     onClick={() => { handleIncrement(data) }}> <i className='fa fa-plus'></i>
                //                   </button>
                //                 </div>
                //               </td>
                //               <td className='text-right'>{data.qnty * data.price}</td>
                //             </tr>
                //           </>
                //         )
                //       })
                //     }
                //   </tbody>

                  // <tfoot>
                  //   <tr>
                  //     <th>&nbsp;</th>
                  //     <th colSpan={3}>&nbsp;</th>
                  //     <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQuantity}</span></th>
                  //     <th className='text-right'>Total Price <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalPrice}</span></th>
                  //   </tr>
                  // </tfoot>
                // </table>
                <Table responsive bordered className='nowrap'>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className='text-right'><span id='amount' className='amount'>Total Amount</span></th>
                  </tr>
                </thead>
                <tbody>
                {
                carts.map((data, index) => {
                return (
                <>
                <tr>
                <td><button className='prdct-delete' onClick={()=>{handleDecrement(data.id)}}>
                <i className='fa fa-trash-alt mr-2'></i>
                </button>
                </td>
                <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                <td><div className='product-name'><p>{data.dish}</p></div></td>
                <td>{data.price}</td>
                <td>
                <div className="prdct-qty-container">
                <button className='prdct-qty-btn' type='button'
                onClick={data.qnty == 1 ? ()=>{handleDecrement(data.id)} : ()=>{handleSingleDecrement(data)}}>
                <i className='fa fa-minus'></i>
                </button>
                <input className='qty-input-box' value={data.qnty} disabled type="text" name="" id="" />
                <button className='prdct-qty-btn' type='button'
                onClick={() => { handleIncrement(data) }}> <i className='fa fa-plus'></i>
                </button>
                </div>
                </td>
                <td className='text-right'>{data.qnty * data.price}</td>
                </tr>
                </>
                )
                })
                }
                </tbody>
                <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQuantity}</span></th>
                      <th className='text-right'>Total Price <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalPrice}</span></th>
                    </tr>
                  </tfoot>
              </Table>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartDetails