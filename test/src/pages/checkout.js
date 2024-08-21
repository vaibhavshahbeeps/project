// import React from "react";
// import { useLocation } from "react-router-dom";

// import './checkout.css';

// function Checkout() {
//     const location = useLocation();
//     const totalPrice = location.state?.totalPrice || 0;
//   return (
//     <>
//       <div className="main-banner-2"></div>

//       <div className="breadcrumb-agile bg-light py-2">
//         <ol className="breadcrumb bg-light m-0">
//           <li className="breadcrumb-item">
//             <a href="index.html">Home</a>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Checkout Page
//           </li>
//         </ol>
//       </div>

//       <div className="payment-container">
//         <h2>Choose Payment Mode :</h2>
//         <p className="total-price">Total Price: Rs.{totalPrice}</p>
//         <div className="radio-group">
          
//           <input type="radio" id="upi" name="payment" value="UPI" />
//           <label htmlFor="upi">UPI</label>

//           <input type="radio" id="debit-card" name="payment" value="Debit Card" />
//           <label htmlFor="debit-card">Debit Card or Credit Card</label>

//           <input type="radio" id="netbanking" name="payment" value="Netbanking" />
//           <label htmlFor="netbanking">Netbanking</label>

//           <input type="radio" id="cod" name="payment" value="COD" />
//           <label htmlFor="cod">Cash on Delivery</label>
//         </div>
//         <button type="submit">Place Your Order</button>
//         <p className="additional-options">Want to order anything more?</p>
//       </div>
//     </>
//   );
// }

// export default Checkout;












import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './checkout.css';

function Checkout() {
    const location = useLocation();
    const [paymentMode, setPaymentMode] = useState("");
    const totalPrice = location.state?.totalPrice || 0;

    function handleOrderPlacement(){
        if (!paymentMode) {
            alert("Please select a payment mode");
            return;
        }
        const user = JSON.parse(localStorage.getItem("mydata"));
        console.log(user.uid, paymentMode);

        axios.post('http://localhost:1337/api/checkout', { userId: user.uid,mode: paymentMode})
            .then(response => {
                if(response.data.message){
                    alert(response.data.message);
                    window.location="/";
                }
                else {
                    console.log(response.data);
                    window.location="/checkout";

                }
            })
    };

    return (
        <>
        <div class="main-banner-2"></div>
            <div className="payment-container">
                <h2>Choose Payment Mode :</h2>
                <p className="total-price">Total Price: Rs.{totalPrice}</p>
                <div className="radio-group">
                    <input type="radio" id="upi" name="payment" value="UPI" onChange={(e) => setPaymentMode(e.target.value)} />
                    <label htmlFor="upi">UPI</label>

                    <input type="radio" id="debit-card" name="payment" value="Debit Card" onChange={(e) => setPaymentMode(e.target.value)} />
                    <label htmlFor="debit-card">Debit Card or Credit Card</label>

                    <input type="radio" id="netbanking" name="payment" value="Netbanking" onChange={(e) => setPaymentMode(e.target.value)} />
                    <label htmlFor="netbanking">Netbanking</label>

                    <input type="radio" id="cod" name="payment" value="COD" onChange={(e) => setPaymentMode(e.target.value)} />
                    <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <button type="button" onClick={handleOrderPlacement}>Pay now</button>
                <a href="category"><p className="additional-options" >Want to order anything more?</p></a>
            </div>
        </>
    );
}

export default Checkout;


















// import React, { useState ,useEffect } from "react";
// import axios from "axios";
// import './checkout.css';

// function Checkout() {
//     const [paymentMode, setPaymentMode] = useState("");

//     const [list,setlist] = useState([]);

// 	useEffect(()=>{

// 		axios.get('http://localhost:1337/api/totalprice',
//         ).then((response)=>{
// 			setlist(response.data);
// 		});
// 	},[]);


//     const calculateTotal = () => {
//         let total = 0;
//         list.map((val) => (total = total + val.quantity * val.b_price));
//         return total;
//     };

//     const handleOrderPlacement = () => {
//         if (!paymentMode) {
//             alert("Please select a payment mode");
//         }
//         const user = JSON.parse(localStorage.getItem("mydata"));
//         console.log(user.uid, paymentMode);

//         axios.post('http://localhost:1337/api/checkout', { userId: user.uid, paymentMode })
//             .then(response => {
//                 alert(response.data.message);
//                 console.log(response.data);
//             })
//     };

//     return (
//         <>
//         <div class="main-banner-2"></div>
//             <div className="payment-container">
//                 <h2>Choose Payment Mode :</h2>
        
//                 <p className="total-price">Total Price: Rs.{calculateTotal()}</p>
//                 <div className="radio-group">
//                     <input type="radio" id="upi" name="payment" value="UPI" onChange={(e) => setPaymentMode(e.target.value)} />
//                     <label htmlFor="upi">UPI</label>

//                     <input type="radio" id="debit-card" name="payment" value="Debit Card" onChange={(e) => setPaymentMode(e.target.value)} />
//                     <label htmlFor="debit-card">Debit Card or Credit Card</label>

//                     <input type="radio" id="netbanking" name="payment" value="Netbanking" onChange={(e) => setPaymentMode(e.target.value)} />
//                     <label htmlFor="netbanking">Netbanking</label>

//                     <input type="radio" id="cod" name="payment" value="COD" onChange={(e) => setPaymentMode(e.target.value)} />
//                     <label htmlFor="cod">Cash on Delivery</label>
//                 </div>
//                 <button type="button" onClick={handleOrderPlacement}>Pay now</button>
//                 <a href="category"><p className="additional-options" >Want to order anything more?</p></a>
//             </div>
//         </>
//     );
// }

// export default Checkout;