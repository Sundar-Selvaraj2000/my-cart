import React, { useEffect, useState } from "react";
import '../Assets/MyCart.css';
import Products, { addCart } from './Products';
import { useNavigate } from "react-router-dom";


export default function MyCart() {
    const [cart, addMyCart] = useState([]);
    const [orginalCart, setOrginalCart] = useState([])
    const [mobileList, setMobileList] = useState([]);
    const navigation = useNavigate();


    useEffect(() => {
        let products = (localStorage.getItem('cart'))
        console.log('pp', products)
        if (!products) {
            products = []
        }
        else {
            products = JSON.parse(products)
        }
        setOrginalCart(products)
        console.log('set', products)
    }, [])

    useEffect(() => {
        let arr = (JSON.parse(localStorage.getItem('productList')))
        setMobileList(arr)
        let loggedDetails = (localStorage.getItem('loggedInUserData'))
        if (!loggedDetails) {
            loggedDetails = []
        }
        else {
            loggedDetails = JSON.parse(loggedDetails)
        }
        let userId = loggedDetails.id
        if (orginalCart.length) {
            let productArray = [...orginalCart]
            let updatedDetails = productArray.filter((updatedMobile) => {
                if (updatedMobile.userId === userId) {
                    return updatedMobile
                }
            })
            addMyCart(updatedDetails ?? [])
        }
    }, [orginalCart])


    const firstPageFunction = () =>{
        console.log(cart[1])
    }       

    const productFunction = () => {
        navigation('/')
    }

    const deleteFucntion = (itemId, deleteCount, userId) => {


        let tempCart = [...orginalCart]
        let temp = [...mobileList]


        console.log("id", itemId)
        console.log("tempcart", tempCart)
        console.log("tempCart[itemId].count", tempCart[itemId])

        console.log("deleteCount", deleteCount)

        let loggedInDetails = localStorage.getItem('loggedInUserData')
        if (!loggedInDetails) {
            loggedInDetails = {}
        }
        else {
            loggedInDetails = JSON.parse(loggedInDetails)
        }

        let uniqueId = loggedInDetails.id




        let result = tempCart.filter((mobile) => {
            console.log(mobile, uniqueId, 'uniqueId')
            if (mobile.id !== itemId) {
                console.log("cart", mobile)
                return mobile
            }
            else {
                console.log('else console')
            }
        })

        let result1 = temp.map((mobile) => {
            if (mobile.id == itemId) {
                console.log("type of deletecount", typeof (deleteCount))
                mobile.count = Number(mobile.count) + Number(deleteCount)
            }
            return mobile
        })
        setOrginalCart(result)
        addMyCart(result)
        setMobileList(result1)
        localStorage.setItem('cart', JSON.stringify(result))
        localStorage.setItem('productList', JSON.stringify(result1))
    }

    return (
        <div >
            {/* <button onClick={deleteFucntion}>Try Me </button> */}
            <button onClick={productFunction} >Products</button>
            <table border={"1"} className="table">
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
                    {cart.map((item, i) => (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => deleteFucntion(item.id, item.count, item.userId)}>delete</button>
                            </td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div class="pagination">
                <a href="#">&laquo;</a>
                <a href="#" onClick={firstPageFunction}>1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">&raquo;</a>
            </div>
        </div>
    )
}
