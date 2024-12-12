import React, { useState } from "react";
import '../Assets/MyCart.css';
import { addCart } from './Products';


export default function MyCart(
) {
    // const { productInfo } = props
    // props.cartData
    const [cart, addMyCart] = useState([]);
    

    function getProduct() {
        let productArray = (JSON.parse(localStorage.getItem('product')))
        console.log("Cart" , productArray)
        
        addMyCart(productArray)
    }
        //    let arr = (JSON.parse(localStorage.getItem('product')))
        //    console.log("arr" , arr)

        //    if(!arr){
        //     arr=[];
        //     alert('No items found in your cart')
        //    }
        //    else{
        //     arr.push([productArray])
        //     localStorage.setItem('product',)
        //    }
        //    let arr = localStorage.getItem('product')
        //         if (!arr) {
        //             arr = []
        //         }
        //         else {
        //             arr = JSON.parse(arr)
        //         }

        //         let result = arr.findIndex((item) => item.email === emailAdd);
        //         if (result !== -1) {
        //             alert("no items found in your Cart")
        //         }
        //         else {
        //             arr.push(userData)
        //             localStorage.setItem('userData', JSON.stringify(arr));
        //         }

    

    const deleteFucntion=(itemId)=>{
        console.log("id", itemId)
        // addUpdatedCart(cart)
         let tempCart = [...cart]
         console.log("tempcart" , tempCart)
         let result  = tempCart.filter((mobile)=>{
            console.log("mobile ID " , mobile.id)
            if(mobile.id != itemId){
                console.log("cart" , mobile)
                // localStorage.clickcount = Number(localStorage.clickcount) + 1;
                // console.log("localStorage" , localStorage.clickcount)
                // addMyCart(UpdatedCart)
                return mobile
            }
            else{
                mobile.count--
                console.log("count" , mobile.count)                
            }
            
            // addUpdatedCart(updatedLog)
            
        })
        console.log("updated Log", result)
        addMyCart(result)
        localStorage.setItem('product', JSON.stringify(result))
        // localStorage.setItem('productList', JSON.stringify())
        
    }

    return (
        <div>
            <button onClick={getProduct}>Click </button>
            {/* <button onClick={deleteFucntion}>Try Me </button> */}
            <table border={"1"}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item,i)=>(
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td> 
                                <button onClick={() => deleteFucntion(item.id)}>delete</button>
                            </td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
