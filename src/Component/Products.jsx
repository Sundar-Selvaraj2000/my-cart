import React, { useEffect, useState } from 'react';
import '../Assets/Products.css';
import { productList } from '../Assets/constant';
import img from './Rog.jpg'
import { useNavigate } from "react-router-dom";



export default function Products() {
    const [mobile, setmobile] = useState([])
    const [productCount, setProductCount] = useState(' ')

    const mobileList = productList;

    // const [total ,setTotal] = useState('');

    // const []

    const navi = useNavigate();

    function MyCart() {
        navi('/MyCart')
    }

    useEffect(() => {
        setmobile(mobileList)
    }, [])

    // const productFunction = () => {
    //     let carts = localStorage.getItem('productList')
    //     carts = JSON.parse(carts)
    //     console.log("mobile list", carts)
    //     setmobile(carts)
    // }


    const cartFunction = (itemId) => {
        console.log(itemId) 

        let updatedDetail = mobile.map((product) => {
            if (product.id == itemId) {
                product.count--;
            }
            return product;
        })
        setmobile(updatedDetail);

        var arr = localStorage.getItem('product')
        arr = JSON.parse(arr)
        console.log("arr", arr)
        console.log("updated log", updatedDetail);
        if (!arr) {
            arr = []
        }

        if (arr.findIndex(x => x === itemId)) {
            console.log("To find the mobile")
            arr.push(updatedDetail[itemId])
        }
        else {
            console.log("not found")
        }

        localStorage.setItem('product', JSON.stringify(arr))
        console.log("updated array", arr)

    }



     const onChangeFunction = (e) => {
        setProductCount(e.target.value)


    }

    const addFunction = (itemId) => {
        console.log(itemId)
        let updatedDetail = mobile.map((product) => {
            if (product.id == itemId) {
                product.count = product.count - productCount;
            }
            return product;
        })

        console.log("id", itemId)
        setmobile(updatedDetail);
        var arr = localStorage.getItem('product')
        arr = JSON.parse(arr)
        console.log("arr", arr)
        console.log("updated log", updatedDetail);

        if (!arr) {
            arr = []
        }

        if (arr.findIndex(x => x === itemId)) {
            console.log("To find the mobile")
            arr.push(updatedDetail[itemId])
        }
        else {   
            console.log("not found")
        }

        localStorage.setItem('product', JSON.stringify(arr))

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
                                            <p >Available Count : {item.count} </p>
                                            <input type='number' onChange={onChangeFunction}></input>
                                            <button className={item.count === 0 ? 'outOfStock' : ''} onClick={() => addFunction(item.id)} disabled={item.count == 0 ? true : false}>add</button>
                                            <div>
                                                <button className={item.count === 0 ? 'outOfStock' : ''} onClick={() => cartFunction(item.id)} disabled={item.count === 0 ? true : false} > {item.count === 0 ? 'Out Of Stock' : 'Add To Cart'}</button>
                                            </div>
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