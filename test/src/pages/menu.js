// import React,{useEffect,useState} from "react";
// import Axios from "axios";
// import {useLocation} from "react-router-dom";

// function Menu() {

// 	const[list,setlist] = useState([]);
// 	const location = useLocation();
// 	const c_id = location.state.ccid;

// 	useEffect(()=>{
		
// 		Axios.get('http://localhost:1337/api/menu_data',
// 			{params:{ cid:c_id}}).then((response)=>{
// 				console.log(response.data);
// 			setlist(response.data);
// 		    });
// 	    },[]);

//     function data_check(bid){
// 		let user=JSON.parse(localStorage.getItem("mydata"));

// 		if(localStorage.getItem("mydata")==null)
// 		{
	
	
// 	     alert("please first login");
// 		 window.location='/login';
			
// 		}
// 		else{

// 			var uid=user.uid;
// 			alert(uid);

// 			Axios.post('http://localhost:1337/api/addingcart',
//                 {userid:uid,burgerid:bid}).then((response)=>{
// 					if(response.data.message)
// 					{
// 						console.log(response.data);
// 						alert(response.data.message);
// 						window.location = '/cart';
// 					}
// 				});

// 		}


// 	}

// 	function checkinimage(val) {
//         if (val.b_image) {
//             return (<img src={`http://localhost:1337/public/`+val.b_image} alt=" " className="img-fluid" />);
//         } else {
//             return (<img src="/assests/images/blog1.jpg" alt=" " className="img-fluid" />);
//         }
//     }

//     return(
//         <>
//         <div class="main-banner-2">
        
//             </div>
        
// 			<div class="breadcrumb-agile bg-light py-2">
// 		<ol class="breadcrumb bg-light m-0">
// 			<li class="breadcrumb-item">
// 				<a href="index.html">Home</a>
// 			</li>
// 			<li class="breadcrumb-item active" aria-current="page">Menu</li>
// 		</ol>
// 	</div>

//             <section class="portfolio py-5">
// 		<div class="container py-xl-5 py-lg-3">
// 		<div class="title-section text-center mb-md-5 mb-4">
// 				<h3 class="w3ls-title mb-3">Our <span>Menu</span></h3>
// 	<p class="titile-para-text mx-auto">Inventore veritatis et quasi architecto beatae vitae dicta suntexplicabo.Nemoenim totam rem aperiam.</p>
// 			</div>
// 			<div class="row mt-4">	
	
// 		{list.map((val)=>{
// return(

// 			  <div class="col-md-4">
// 					<div class="gallery-demo">
// 						<a>
// 							{checkinimage(val)}
// 							{/* <img src={val.b_image ? `http://localhost:1337/public/${val.b_image}` : "/assests/images/blog1.jpg"} alt=" " className="img-fluid" /> */}
							
// 							<h4 class="p-mask">{val.b_name}-<span>Rs.{val.b_price}</span>
// 							<button type="submit" class="btn submit mb-4" onClick={()=>data_check(val.burger_id)}>CART</button>
// 							</h4>
						
// 						</a>
// 					</div>
// 				</div>
				
// )
			  
// 			 }
// 			)
// 		} 
// 		</div>
// 		</div>
// 	</section>
// </>
// );

// }

// export default Menu;


















import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function Menu() {
    const [list, setlist] = useState([]);
    const location = useLocation();
    const c_id = location.state.ccid;

    const user = JSON.parse(localStorage.getItem("mydata"));

    useEffect(() => {
        if (localStorage.getItem("mydata") == null) {
            Axios.get('http://localhost:1337/api/menu_data', { params: { cid: c_id } })
                .then((response) => {
                    console.log(response.data);
                    setlist(response.data);
                });
        } else {
            const uuid = user.uid;

            Axios.post('http://localhost:1337/api/purchasedburger', { userid: uuid })
                .then((response) => {
                    console.log(response.data);
                    alert(response.data.message);
                });
        }
    }, []);

    function data_check(bid) {
        if (localStorage.getItem("mydata") == null) {
            alert("please first login");
            window.location = '/login';
        } else {
            const uid = user.uid;
            alert(uid);

            Axios.post('http://localhost:1337/api/addingcart', { userid: uid, burgerid: bid })
                .then((response) => {
                    if (response.data.message) {
                        console.log(response.data);
                        alert(response.data.message);
                        window.location = '/cart';
                    }
                });
        }
    }

    function checkinimage(val) {
        if (val.b_image) {
            return (<img src={`http://localhost:1337/public/` + val.b_image} alt=" " className="img-fluid" />);
        } else {
            return (<img src="/assests/images/blog1.jpg" alt=" " className="img-fluid" />);
        }
    }

    return (
        <>
            <div className="main-banner-2"></div>
            <div className="breadcrumb-agile bg-light py-2">
                <ol className="breadcrumb bg-light m-0">
                    <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Menu</li>
                </ol>
            </div>
            <section className="portfolio py-5">
                <div className="container py-xl-5 py-lg-3">
                    <div className="title-section text-center mb-md-5 mb-4">
                        <h3 className="w3ls-title mb-3">Our <span>Menu</span></h3>
                        <p className="titile-para-text mx-auto">Inventore veritatis et quasi architecto beatae vitae dicta suntexplicabo.Nemoenim totam rem aperiam.</p>
                    </div>
                    <div className="row mt-4">
                        {list.map((val) => {
                            return (
                                <div className="col-md-4">
                                    <div className="gallery-demo">
                                        <a>
                                            {checkinimage(val)}
                                            <h4 className="p-mask">{val.b_name}-<span>Rs.{val.b_price}</span>
                                                <button type="submit" className="btn submit mb-4" onClick={() => data_check(val.burger_id)}>CART</button>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Menu;
