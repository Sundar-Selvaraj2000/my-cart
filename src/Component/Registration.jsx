import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Assets/Registration.css'
export default function Registration() {

    const [name, setName] = useState("");
    const [nameError1, setNameError1] = useState(false);
    const [nameError2, setNameError2] = useState(false);
    const [nameError3, setNameError3] = useState(false);
    const [nameError4, setNameError4] = useState(false);
    const [nameError5, setNameError5] = useState(false);
    const [nameError6, setNameError6] = useState(false);
    const [emailAdd, setMail] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setNum] = useState('')
    const [password, setCode] = useState('')
    const [confirmPassword, setConfirmCode] = useState('')
    const [checkBox, setBox] = useState(true)
    const navigation = useNavigate();
    const [userType, setUserType] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const countryOptions = ['Afghanistan', 'Bhutan', 'China', 'Denmark', 'Egypt',
        'Finland', 'Germany', 'Hungary', 'India', 'Japan', 'Kenya']
    const [randomId, setRandomId] = useState()



    const onChangeFuction = (e) => {
        setName(e.target.value)
        // console.log(name)
    }
    const onChangeFuctionMail = (m) => {
        setMail(m.target.value)
        // console.log(emailAdd)
    }

    const userFunction = (u) => {
        setUserType(u.target.value)
    }

    const onChangeFuctionCountry = (c) => {
        setCountry(c.target.value)
    }
    const onChangeFuctionPhone = (n) => {
        setNum(n.target.value)
    }
    const onChangeFuctionPassword = (p) => {
        setCode(p.target.value)
    }
    const onchangepassword = (cc) => {
        setConfirmCode(cc.target.value)
    }


    const loginFunction = () => {
        navigation('/login')
    }

    const uName = () => {
        if (!name) {
            setNameError1(true)
        }
        else {
            setNameError1(false);
        }
    }
    const handleButton = (value) => {
        setSelectedValue(value)
    }

    const eAddress = () => {
        if (!emailAdd) {
            setNameError2(true)
        }
        else {
            setNameError2(false)
        }
    }

    const countryy = () => {
        if (!country) {
            setNameError3(true)
        }
        else {
            setNameError3(false)
        }
    }
    const mobileNumber = () => {
        if (!phoneNumber) {
            setNameError4(true)
        }
        else {
            setNameError4(false)
        }
    }

    const passcode = () => {
        if (!password) {
            setNameError5(true)
        }
        else {
            setNameError5(false)
        }
    }

    const cPassword = () => {
        if (!confirmPassword) {
            setNameError6(true)
        }
        else if (password == confirmPassword) {
            setNameError6(false)
        }
        else {
            setNameError6(true)
            alert("Please enter the confirm password same as password")
        }
    }

    const check = (b) => {
        setBox(b.target.checked)
        if (!checkBox) {
            setBox(true)
        }
        else {
            setBox(false)
        }
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
            console.log(localStorage.clickcount)
        }
    }



    const firstFunction = () => {
        let arr = localStorage.getItem('userData')
        if (!arr) {
            arr = []
        }
        else {
            arr = JSON.parse(arr)
        }
        // console.log(localStorage.getItem('userData'))
        let result = arr.findIndex((item) => item.email === emailAdd);

        if (result !== -1) {
            alert("This email is already registered with other account")
        }
        else {
            let mathId =Number( Math.random());
            setRandomId(mathId)
            console.log('idd :' , randomId)
            let userData = {
                "name": name, "email": emailAdd, "userType": userType,
                "country": country, "Phone Number": phoneNumber, "password": password,
                'gender': selectedValue, "Confirm Password": confirmPassword, 'id': randomId
            }
            arr.push(userData)
            localStorage.setItem('userData', JSON.stringify(arr));
        }
        console.log("Your name is ", name)
        console.log("Mail ID you entered is " + emailAdd)
        console.log("Your country you entered is ", country)
        console.log("The mobile Number you entered is " + phoneNumber)
        console.log("Password you entered is " + password)
        console.log("Confoirm Password you entered is " + confirmPassword)
    }

    return (
        <div className="temp">
            <div className="form-container form-input">
                <h3>Registration Form </h3>
                <input className={"form-input " + (nameError1 ? 'error' : '')}
                    type="text" placeholder="Name" onBlur={uName}
                    onChange={onChangeFuction} />
                <input className={"form-input " + (nameError2 ? 'error' : '')}
                    type="text" placeholder="emailAddress" onBlur={eAddress}
                    onChange={onChangeFuctionMail}></input>
                <select className={"form-input " + (nameError3 ? 'error' : '')} type="text"
                    onChange={userFunction} >
                    <option >User type</option>
                    <option >Admin</option>
                    <option >User</option>

                </select>
                <select className={"form-input " + (nameError3 ? 'error' : '')}
                    type="text"
                    onChange={onChangeFuctionCountry} >
                    <option >Select your Country</option>
                    {
                        countryOptions.map((country, index) => {
                            return (
                                <option key={index} >
                                    {country}
                                </option>
                            )
                        })
                    }
                </select>
                <input className={"form-input " + (nameError4 ? 'error' : '')}
                    type="text" placeholder="Phone" onBlur={mobileNumber}
                    onChange={onChangeFuctionPhone}></input>
                <input className={"form-input " + (nameError5 ? 'error' : '')}
                    type="password" placeholder="password" onBlur={passcode}
                    onChange={onChangeFuctionPassword}></input>
                <input className={"form-input " + (nameError6 ? 'error' : '')}
                    type="password" placeholder="Confirm Password" onBlur={cPassword}
                    onChange={onchangepassword}></input>
                <div className="gender">
                    Gender :
                    <input type="radio" id="male" checked={selectedValue === 'male'} onChange={() => handleButton('male')}></input>
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" checked={selectedValue === 'female'} onChange={() => handleButton('female')}></input>
                    <label htmlFor="female">Female</label>
                </div>
                <div className="checkbox-div">
                    <input type="checkbox" name="" onChange={check}></input>
                    <span> I hereby accept the company policy</span>
                </div>
                <button className={"create-acc-btn "} type="button" onClick={firstFunction}
                    disabled={checkBox ? true : false} >CREATE ACCOUNT</button>
                <div>Already have an account? <span className="span" style={{ color: 'blue' }}
                    onClick={loginFunction}>Sign in</span></div>
            </div>
        </div>
    )

}