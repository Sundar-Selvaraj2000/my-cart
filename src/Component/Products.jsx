import React, { useEffect, useState } from 'react';
import '../Assets/Products.css';
import { productList } from '../Assets/constant';
import img from './Rog.jpg'
import { useNavigate } from "react-router-dom";



export default function Products() {
    const [mobile, setmobile] = useState([])
    const [productCount, setProductCount] = useState()
    const [productData, setProductData] = useState({})

    const navi = useNavigate();

    function MyCart() {
        navi('/MyCart')
    }

    const onChangeFunction = (e, itemId) => {
        let count = e.target.value
        let mobileId = itemId
        if (count > 0) {
            // setProductCount(e.target.value)
            setProductData({ ...productData, [mobileId]: count })
            console.log({ ...productData, [mobileId]: count })
        }
    }

    useEffect(() => {
        var array = localStorage.getItem('productList')
        array = JSON.parse(array)
        console.log("useeffect", array)
        setmobile(array ?? [])
    }, [])


    const cartFunction = (productItem, itemcount) => {

        let loggedInDetails = localStorage.getItem('loggedInUserData')
        if(!loggedInDetails){
            loggedInDetails={}
        }
        else{
            loggedInDetails = JSON.parse(loggedInDetails)
        }

        let uniqueId =  loggedInDetails.id

        console.log('user unique ID : ' , uniqueId)

        const itemId = productItem.id
        console.log("itemId" , itemId)

        // console.log("productData. mobileId" ,productData.mobileId)
        // console.log("prodData" , productData[itemId])
        let updatedDetail = mobile.map((product) => {
            if ((product.id == itemId) && (productData[itemId] < product.count)) {
                product.count = Number(product.count) - Number(productData[itemId]);
            }
            return product;
        })
        setmobile(updatedDetail);
        localStorage.setItem('productList', JSON.stringify(updatedDetail))


        var cartItems = localStorage.getItem('cart');
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
        }
        else {
            cartItems = []
        }

        var cartIndex = cartItems.findIndex(x => (x.id === itemId && x.userId === uniqueId))
        console.log('cartIndex' , cartIndex)

        console.log("cartIndex", cartIndex)
        if (cartIndex === -1) {
            const newCart = {
                id: productItem.id, brand: productItem.brand, count: productData[itemId], price: productItem.price , userId: uniqueId
            }
            cartItems.push(newCart)
        }
        else {
            cartItems[cartIndex].count = Number(cartItems[cartIndex].count) + Number(productData[itemId])
        }
        if (productData[itemId] > itemcount)  {
            alert("availabe products are :" + itemcount)
        }
        if(productData[itemId] == null){
            alert ('Cannot be null')
        }
        else {

            localStorage.setItem('cart', JSON.stringify(cartItems))

        }
        console.log("updated array", cartItems)

    }
    return (
        <div>
            <h1 className="header">Products</h1>
            <button onClick={MyCart}>MyCart</button>
            <div className="base">
                {
                    mobile.map((item, ind) => {
                        return (
                            <div className="container" key={ind}>
                                <div>
                                    <div>
                                        <img className="image" src={img} />
                                    </div>
                                    <div>
                                        {item.brand}
                                        <p>Available Count : {item.count} </p>
                                        <p>{item.price}</p>
                                        <input type='number' value={productData?.[item.id]} onChange={(e) => onChangeFunction(e, item.id)}></input>
                                        <button className={item.count <= 0 ? 'outOfStock' : ''}
                                            onClick={() => cartFunction(item, item.count)} disabled={(productCount < 0) ? true : false}
                                        >
                                            {item.count <= 0 ? 'Out Of Stock' : 'Add To Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}   