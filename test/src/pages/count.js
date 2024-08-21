// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import './myorder.css'; 

// function Counting() {
//     const [order, setOrder] = useState([]);
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');


//     useEffect(() => {
//         fetchOrders();
//     }, [fromDate, toDate]);
//     const fetchOrders = () => {
//         let burger_id = localStorage.getItem('selectedOrder');
//         if (burger_id) {
//             Axios.get('http://localhost:1337/api/countingorders', { params: { burgerid: burger_id, from: fromDate, to: toDate } })
//                 .then((response) => {
//                     setOrder(response.data);
//                 })
//         }
//     };

//     const handleFilter = () => {
//         fetchOrders();
//     };


//     return (
//         <>
//             <div className="main-banner-2"></div>
//             <div className="cart-container">
//                 <h2>Most Ordered</h2>
//                 <center>
//                     <div className="filter-container">
//                         <label>From: </label>
//                         <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
//                         <label>To: </label>
//                         <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
//                         <button type="button" className="filter-button" onClick={handleFilter}>GO</button>
//                     </div>
//                 </center>
//                 <table className="cart-table">
//                     <thead>
//                         <tr>
//                             <th>Sr.No</th>
//                             <th>Burger ID</th>
//                             <th>Quantity</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {order.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.burger_id}</td>
//                                 <td>{item.quantity}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }

// export default Counting;








import React, { useEffect, useState } from "react";
import Axios from "axios";
import './myorder.css'; 

function Counting() {
    const [order, setOrder] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [fromDate, toDate]);

    const fetchOrders = () => {
        let burger_id = localStorage.getItem('selectedOrder');
        Axios.get('http://localhost:1337/api/countingorders', { params: { burger_id, from: fromDate, to: toDate } })
            .then((response) => {
                setOrder(response.data);
            })
    };

    const handleFilter = () => {
        fetchOrders();
    };

    return (
        <>
            <div className="main-banner-2"></div>
            <div className="cart-container">
                <h2>Most Ordered</h2>
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
                            <th>Burger ID</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user_id}</td>
                                <td>{item.burger_id}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Counting;
