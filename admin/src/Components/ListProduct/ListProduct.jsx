import React, { useEffect, useState } from 'react'
import cross_icon from '../../Assets/cross_icon.png'
import "./ListProduct.css"
export const ListProduct = () => {
  
  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async () =>{
      await fetch('http://localhost:4000/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)});
  }
   useEffect(()=>{
    fetchInfo();
   },[])

    // to remove product
    const remove_product =  async (id) =>{
         await fetch ('http://localhost:4000/removeproduct',{
            method:'POST',
            headers : {
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
         })

         await fetchInfo();
    } 

  return (
    <div className='list-product'>
      <p className='heading'>All Product List</p>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old_Price</p>
        <p>New_Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
                    return <>
                     <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className='listproduct-product-icon'/>
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img className='listproduct-remove' onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" />
                    </div>
                    <hr />
          </>
        })}
        
      </div>

    </div>
  )
}
export default ListProduct

