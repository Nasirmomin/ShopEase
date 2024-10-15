import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../Assets/upload_area.svg"
export const AddProduct = () => {
  
  const [image,setImage]=useState(false);
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"mens",
    new_price:"",
    old_price:""
  })

  const imageHandler= (e) =>{
      setImage(e.target.files[0]);
  }
  const changeHandler =(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_Product = async ()=>{
    console.log(productDetails)

    // addding product to mongodb databases
    let responseData;
    let product= productDetails;
    
    let formData=new FormData();
    formData.append('product',image);

    await fetch("http://localhost:4000/upload",{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image =responseData.image_url;
       console.log(product);

      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failded")
      })
     }
  }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" value={productDetails.name} onChange={changeHandler} name='name'  placeholder='Type Here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='old price' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='new price' />
            </div>
        </div>
        <div className='addproduct-itemfield'>
            <p>Product Category</p>
            <select name="category" value={productDetails.category} onChange={changeHandler} className='add-product-selector'>
                <option value="men">mens</option>
                <option value="women">women</option>
                <option value="kid">Kids</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumbnail-img" alt="" />
            </label>
            <input type="file" onChange={imageHandler} name="image"  id='file-input' hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}
export default AddProduct;