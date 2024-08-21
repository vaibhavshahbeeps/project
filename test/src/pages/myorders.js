// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import './myorder.css'; 

// function Myorder() {
//     const [order, setOrder] = useState([]);

//     useEffect(() => {
//         let user = JSON.parse(localStorage.getItem("mydata"));
//         if (user) {
//             Axios.get('http://localhost:1337/api/displayingOrders')
//                 .then((response) => {
//                     setOrder(response.data);
//                 })
//                 .catch((error) => {
//                     console.error("Error", error);
//                 });
//         }
//     }, []);

//     function submit_data(){
//         window.location='/view';
//     }

//     return (
//         <>
//         <div className="main-banner-2"></div>
//         <div className="cart-container">
//             <h2>Your Orders</h2>
            
//             <table className="cart-table">
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         <th>User</th>
//                         <th>Transaction ID</th>
//                         <th>DATE & TIME</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {order.map((item) => (
//                         <tr key={item.user_id}>
//                             <td>{item.purchased_id}</td>
//                             <td>{item.user_id}</td>
//                             <td>{item.tran_id}</td>
//                             <td>{item.time}</td>
//                             <td><button type="submit" onClick={submit_data}>VIEW</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
    
// }

// export default Myorder;







// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import './myorder.css'; 

// function Myorder() {
//     const [order, setOrder] = useState([]);

//     useEffect(() => {
//         let user = JSON.parse(localStorage.getItem("mydata"));
//         if (user) {
//             Axios.get('http://localhost:1337/api/displayingOrders')
//                 .then((response) => {
//                     setOrder(response.data);
//                 })
//                 .catch((error) => {
//                     console.error("Error", error);
//                 });
//         }
//     }, []);

//     function submit_data(purchased_id){
//         window.location='/view';
//     }

//     return (
//         <>
//         <div className="main-banner-2"></div>
//         <div className="cart-container">
//             <h2>Your Orders</h2>
            
//             <table className="cart-table">
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         <th>User</th>
//                         <th>Transaction ID</th>
//                         <th>DATE & TIME</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {order.map((item) => (
//                         <tr key={item.purchased_id}>
//                             <td>{item.purchased_id}</td>
//                             <td>{item.user_id}</td>
//                             <td>{item.tran_id}</td>
//                             <td>{item.time}</td>
//                             <td><button type="submit" onClick={() => submit_data(item.purchased_id)}>VIEW</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
    
// }

// export default Myorder;


























// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import './myorder.css'; 

// function Myorder() {
//     const [order, setOrder] = useState([]);

//     useEffect(() => {
//         let user = JSON.parse(localStorage.getItem("mydata"));
//         if (user) {
//             Axios.get('http://localhost:1337/api/displayingOrders',{params : {userid:user.uid}})
//                 .then((response) => {
//                     setOrder(response.data);
//                 })
//         }
//     }, []);

//     function submit_data(purchased_id){
//         localStorage.setItem('selectedOrder', purchased_id);
//         window.location = '/view';
//     }


//     function formatDateTime(timestamp) {
//         const date = new Date(timestamp);
//         const formattedDate = date.toLocaleDateString(); // Format date
//         const formattedTime = date.toLocaleTimeString(); // Format time
//         return `${formattedDate} ${formattedTime}`;
//     }

//     function remove(purchased_id){
//         Axios.post('http://localhost:1337/api/removeorders', { purchased_id})
//             .then((response) => {
//                 if(response.data.message === 'Order deleted successfully'){
//                     setOrder(order.filter(item => item.purchased_id !== purchased_id));
//                 }
//                 console.log(response.data);
//             });
//     };


//     return (
//         <>
        
//         <div className="main-banner-2"></div>
      
//         <div className="cart-container">
//             <h2>Your Orders</h2>
//             <center> <div class="">
// 							<label>From : </label>
// 							<input type="date" class=""  id="from"  required/>
                            
//                             <label>To : </label>
// 							<input type="date" class=""  id="to"  required/>

//                             <button type="">GO</button>
// 						</div></center>
//             <table className="cart-table">
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         <th>Transaction ID</th>
//                         <th>DATE & TIME</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {order.map((item, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{item.tran_id}</td>
//                             <td>{formatDateTime(item.time)}</td>
//                             <td><button type="submit" onClick={() => submit_data(item.purchased_id)}>VIEW</button>
//                                 <button className="clear-history-btn" onClick={() => remove(item.purchased_id)}>DELETE</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
// }

// export default Myorder;


















import React, { useEffect, useState } from "react";
import Axios from "axios";
import './myorder.css'; 

function Myorder() {
    const [order, setOrder] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');


    useEffect(() => {
        fetchOrders();
    }, []);
    const fetchOrders = () => {
        let user = JSON.parse(localStorage.getItem("mydata"));
        if (user) {
            Axios.get('http://localhost:1337/api/displayingOrders', { params: { userid: user.uid, from: fromDate, to: toDate } })
                .then((response) => {
                    setOrder(response.data);
                })
                .catch(error => {
                    console.error("Error fetching orders:", error);
                });
        }
    };

    const handleFilter = () => {
        fetchOrders();
    };

    function submit_data(purchased_id) {
        localStorage.setItem('selectedOrder', purchased_id);
        window.location = '/view';
    }

    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
    }

    function remove(purchased_id) {
        Axios.post('http://localhost:1337/api/removeorders', { purchased_id })
            .then((response) => {
                if (response.data.message === 'Order deleted successfully') {
                    setOrder(order.filter(item => item.purchased_id !== purchased_id));
                }
                console.log(response.data);
            });
    };

    return (
        <>
            <div className="main-banner-2"></div>
            <div className="cart-container">
                <h2>Your Orders</h2>
                <center>
                    <div className="filter-container">
                        <label>From: </label>
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                        <label>To: </label>
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                        <button type="button" className="filter-button" onClick={handleFilter}>GO</button>
                    </div>
                </center>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>User ID</th>
                            <th>Transaction ID</th>
                            <th>DATE & TIME</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user_id}</td>
                                <td>{item.tran_id}</td>
                                <td>{formatDateTime(item.time)}</td>
                                <td>
                                    <button type="submit" onClick={() => submit_data(item.purchased_id)}>VIEW</button>
                                    <button className="clear-history-btn" onClick={() => remove(item.purchased_id)}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Myorder;









































































































































































// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './myorder.css';

// function Myorder() {
//     const [order, setOrder] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         let user = JSON.parse(localStorage.getItem("mydata"));
//         if (user) {
//             Axios.get('http://localhost:1337/api/displayingOrders')
//                 .then((response) => {
//                     setOrder(response.data);
//                 })
//                 .catch((error) => {
//                     console.error("Error", error);
//                 });
//         }
//     }, []);

//     function submit_data(purchased_id){
//         navigate('/view', { state: { purchased_id } });
//     }

//     return (
//         <>
//         <div className="main-banner-2"></div>
//         <div className="cart-container">
//             <h2>Your Orders</h2>
            
//             <table className="cart-table">
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         <th>Transaction ID</th>
//                         <th>DATE & TIME</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {order.map((item, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{item.tran_id}</td>
//                             <td>{item.time}</td> 
//                             <td><button type="submit" onClick={() => submit_data(item.purchased_id)}>VIEW</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
// }

// export default Myorder;

