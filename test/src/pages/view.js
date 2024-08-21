// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import './myorder.css'; 

// function View() {
//     const [list,setlist] = useState([]);

//     useEffect(() => {
//         let user = JSON.parse(localStorage.getItem("mydata"));
//         if (user) {
//             Axios.get('http://localhost:1337/api/viewingOrders')
//                 .then((response) => {
//                     setlist(response.data);
//                 })
//                 .catch((error) => {
//                     console.error("Error", error);
//                 });
//         }
//     }, []);

//     function submit_data(){
//         window.location='/myorders';
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
//                         <th>BURGER ID</th>
//                         <th>QUANTITY</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {list.map((item) => (
//                         <tr key={item.user_id}>
                            
//                             <td>{item.burger_id}</td>
//                             <td>{item.quantity}</td>
//                             <td><button type="submit" onClick={submit_data}>BACK</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
    
// }

// export default View;







import React, { useEffect, useState } from "react";
import Axios from "axios";
import './myorder.css';

function View() {
    const [list, setList] = useState([]);

    // useEffect(() => {
    //     let purchased_id = localStorage.getItem('selectedOrder');
    //     if (purchased_id) {
    //         Axios.get(`http://localhost:1337/api/viewingOrders?purchased_id=${purchased_id}`)
    //             .then((response) => {
    //                 setList(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error("Error", error);
    //             });
    //     }
    // }, []);




    useEffect(() => {   
        let purchased_id = localStorage.getItem('selectedOrder');
        if (purchased_id) {
            Axios.get('http://localhost:1337/api/viewingOrders', {params: {purchased_id: purchased_id}
            })
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error("Error", error);
            });
        }
    }, []);



    function goBack() {
        window.location = '/myorders';
    }

    return (
        <>
            <div className="main-banner-2"></div>
            <div className="cart-container">
                <h2>Order Details</h2>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>BURGER NAME(ID)</th>
                            <th>QUANTITY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.b_name}({item.burger_id})</td>
                                <td>{item.quantity}</td>
                                <td><button type="submit" onClick={goBack}>BACK</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default View;












// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import './myorder.css';

// function View() {
//     const [list, setList] = useState([]);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const purchased_id = location.state?.purchased_id;

//     useEffect(() => {
//         if (purchased_id) {
//             Axios.get(`http://localhost:1337/api/viewingOrders?purchased_id=${purchased_id}`)
//                 .then((response) => {
//                     setList(response.data);
//                 })
//                 .catch((error) => {
//                     console.error("Error", error);
//                 });
//         }
//     }, [purchased_id]);

//     function goBack() {
//         navigate('/myorders');
//     }

//     return (
//         <>
//             <div className="main-banner-2"></div>
//             <div className="cart-container">
//                 <h2>Order Details</h2>
//                 <table className="cart-table">
//                     <thead>
//                         <tr>
//                             <th>Sr.No</th>
//                             <th>BURGER ID</th>
//                             <th>QUANTITY</th>
//                             <th>ACTION</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {list.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{index+1}</td>
//                                 <td>{item.burger_id}</td>
//                                 <td>{item.quantity}</td>
//                                 <td><button type="submit" onClick={goBack}>BACK</button></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }

// export default View;




