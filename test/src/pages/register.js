import React from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';

function Register(){
	
	const {
        register,       
        handleSubmit,
        formState: { errors },
      } = useForm();
    
        const onSubmit = (data) => {
        var uname=document.getElementById('nm').value;
        var uemail=document.getElementById('email').value;
		var unumber=document.getElementById('rnumber').value;
		var upsw=document.getElementById('password').value;
		alert(unumber);
        
		Axios.post('http://localhost:1337/api/insert',
			{name:uname,email:uemail,rnumber:unumber,pass:upsw}).then((response)=>{
				if(response.data.message)
				{
					console.log(response);
					alert(response.data.message);
					window.location = "/register"; 
				}
				else{
				
		console.log(response);
		alert('Success');
		window.location = "/login";
				}
		
			});
		}

	// function check_email(){
	// 	var uemail=document.getElementById('email').value;
	// 	//alert(uemail);
	// 	//window.location.reload();


	// 	Axios.post('http://localhost:1337/api/checkemail',
	// 		{email:uemail}).then((response)=>{
	// 			if(response.data.message)
	// 			{
	// 				console.log(response);
	// 				alert(response.data.message);
	// 				window.location.reload();
					
	// 			}
		
	// 		});
	// }

	
    function register_data(){
        var uname=document.getElementById('nm').value;
        var uemail=document.getElementById('email').value;
		var unumber=document.getElementById('rnumber').value;
		var upsw=document.getElementById('password').value;
		alert(unumber);
        
		Axios.post('http://localhost:1337/api/insert',
			{name:uname,email:uemail,rnumber:unumber,pass:upsw}).then((response)=>{
				if(response.data.message)
				{
					console.log(response);
					alert(response.data.message);
					window.location = "/register"; 
				}
				else{
				
		console.log(response);
		alert('Success');
		window.location = "/login";
				}
		
			});
    }

    return(
        <>

<div class="main-banner-2">

	</div>

	<div class="breadcrumb-agile bg-light py-2">
		<ol class="breadcrumb bg-light m-0">
			<li class="breadcrumb-item">
				<a href="/">Home</a>
			</li>
			<li class="breadcrumb-item active" aria-current="page">Register Page</li>
		</ol>
	</div>

        	<div class="login-contect py-5">
		<div class="container py-xl-5 py-3">
			<div class="login-body">
				<div class="login p-4 mx-auto">
					<h5 class="text-center mb-4">Register Now</h5>

				
						<div class="form-group">
							<label>Your Name</label>
							<input type="text" class="form-control" name="name1" id="nm"  {...register("name1", { required: "user name is mandatory",})} />
							{/* {errors.name1 && <span className="error" >{errors.name1?.message}</span>} */}
							{errors.name1 && (<div style={{ color: "red" }}>{errors.name1.message}</div>)}
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="email" class="form-control" name="email1" id="email" {...register("email1", { required: "Email is mandatory",
								pattern: {value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									message: `This email is not valid email address`}
							})} />
							{/* {errors.email1 && <span className="error" >{errors.email1?.message}</span>} */}
							{errors.email1 && (<div style={{ color: "red" }}>{errors.email1.message}</div>)}
						</div>
                        <div class="form-group">
							<label>Mobile Number</label>
							<input type="number" class="form-control" name="number1" id="rnumber" {...register("number1", { required: "Mobile number is mandatory",
								pattern: {value: /^[7-9][0-9]{9}$/,
									message: `Invalid mobile number`}
							})} />
							{/* {errors.number1 && <span className="error" >{errors.number1?.message}</span>} */}
							{errors.number1 && (<div style={{ color: "red" }}>{errors.number1.message}</div>)}
						</div>
						<div class="form-group">
							<label class="mb-2">Password</label>
							{/* <input type="password" class="form-control" name="password1" id="password" 
								 {...register("password1", { required: "Password is mandatory" ,
									pattern:{value:/^(?=.[A-Z])(?=.[!@#$%^&*])(?=.{8,})/,message:`Password must be at least 8 characters long \n include an uppercase letter \n a special character.`}})}/>
									{errors.password1 && <span className="error" >{errors.password1?.message}</span>} */}
							<input type="password" className="form-control" name="password1" id="password"
        					{...register("password1", { required: "Password is mandatory",
          					pattern: {value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
           					message: `Password must be at least 8 characters long\ninclude an uppercase letter\na special character.`}
        					})}/>
      						{errors.password1 && (<div style={{ whiteSpace: "pre-line", color: "red" }}>{errors.password1.message}</div>)}
						</div>


					 
						{/* <button type="submit" class="btn submit mb-4" onClick={register_data}>Register</button> */}
						<button type="submit" className="btn submit mb-4" onClick={handleSubmit(onSubmit)}><i className="fa fa-user-md"></i> Register</button>
						<p class="text-center">
							<a href="#" class="text-da">By clicking Register, I agree to your terms</a>
						</p>
					
				</div>
			</div>
		</div>
	</div>
        </>
    );
}

export default Register;