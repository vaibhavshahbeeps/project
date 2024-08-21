var mysql=require("mysql");
var express=require("express");
var app=express();
var cors =require("cors");
const multer = require('multer');
var path = require('path');

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cors());

var con=mysql.createConnection(
    {
        host: "localhost",
        user:"root",
        password:"",
        database:"company",
    }
);

const storage=multer.diskStorage({
    destination:path.join('./public/'),filename: function(req, file, callback) { callback(null,  Date.now() + '-' + path.extname(file.originalname))
}
})

app.post("/newapi/data",(req,resp)=>{
    var emailu = req.body.lemail;
    var passu = req.body.lpass;
   // console.log(passu);

    const query="select * from registration WHERE customer_email = ? AND customer_password = ?";
    con.query(query,[emailu,passu],(err,result)=>{
        if(result.length > 0)
        {
            console.log(result);    
            resp.send(result);
        }
        else
        {
            resp.send({message:"wrong email id and password"});
        }
    });
    // resp.json("");
});

app.post("/api/insert",(req,resp)=>{
    
    var username = req.body.name;
    var useremail = req.body.email;
    var usernumber = req.body.rnumber;
    var userpass = req.body.pass;
    console.log(username) ;       

            const query1="Insert into registration (customer_name,customer_email,customer_number,customer_password) values(?,?,?,?)";
            con.query(query1,[username,useremail,usernumber,userpass]);
            resp.json("");
});

app.post("/api/checkemail",(req,resp)=>{
    var emailu = req.body.email;
   

    const query="select * from registration WHERE customer_email = ? ";
    con.query(query,[emailu],(err,result)=>{
        if(result.length > 0)
        {
             
            resp.send({message:"Already Registered"});
        }
        
    });
    
});

app.post("/api/insertburger", (req, resp) => {
    let upload=multer({storage:storage}).single('filename');

    upload(req, resp, function (err)
      {
        if (!req.file) {
            console.log("Not found");
        }

        else{
            const catid = req.body.cat_id;
            const sbimage = req.file.filename;
            const sbname = req.body.bname;
            const sbprice = req.body.bprice;
            console.log(sbimage);

            const query = "INSERT INTO add_burger (category_id, b_image, b_name, b_price) VALUES (?, ?, ?, ?)";
            con.query(query, [catid, sbimage, sbname, sbprice]);
        }
    });
});





app.get('/api/menu_data',(req,resp)=>{
    var ct_id=req.query.cid;

    const ins = "SELECT * FROM add_burger where category_id=?";
    con.query(ins,[ct_id],(err,result)=>{
        console.log(result);
        resp.send(result);
    });
});



app.get('/api/purchasedburger',(req,resp)=>{

    var ct_id=req.query.cid;

    const ins = "SELECT ";
    con.query(ins,[ct_id],(err,result)=>{
        console.log(result);
        resp.send(result);
    });
});





app.post('/api/cart', (req, resp) => {
    var userId = req.body.userid;
    var burgerId = req.body.burgerid;      

    const query="select * from cart WHERE userid = ? AND bid = ? ";
    con.query(query,[userId,burgerId],(err,result)=>{
        if(result.length > 0 )
        {
            console.log(result);  
            resp.send({message:"This id is already registered."});  
           // resp.send(result);
        }
        else{
            const query="Insert into cart (userid,bid) values(?,?)";
            con.query(query,[userId,burgerId]);
            resp.send({message:"Burger Added."}); 
        }
    });
});

app.post("/api/category",(req,resp)=>{
    
    var cate_name = req.body.cat_name;
    // console.log(sbimage) ;       

    const query="Insert into add_category (cat_name) values(?)";
    con.query(query,[cate_name]);
    resp.json("");
        
});

app.get('/api/cat_data',(req,resp)=>{
    const ins = "SELECT * FROM add_category";
    con.query(ins,(err,result)=>{
      //  console.log(result);
        resp.send(result);
    });
});

app.get('/api/usercategory',(req,resp)=>{
    const ins = "SELECT * FROM add_category";
    con.query(ins,(err,result)=>{
      //  console.log(result);
        resp.send(result);
    });
});

app.post('/api/addingCart',(req,resp)=>{

    const{userid,burgerid} = req.body;
    const query = "select * from orders where u_id = ? and bg_id = ?";
    con.query(query,[userid,burgerid],(err,result)=>{
        if(result.length > 0)
        {
            console.log(result);
            resp.send({message:"already exist"});
        }
        else{
            var qty = 1;
            const query = "INSERT INTO orders (u_id,bg_id,quantity) VALUES (?,?,?)";
            con.query(query,[userid,burgerid,qty]);
            resp.send({message:"Burger added to orders"});
        }
    });
});


app.get('/api/getCart',(req,resp)=>{
    const userid = req.query.uuid;
    console.log(userid);
    const query = "SELECT o.order_id, o.quantity, c.b_name, c.b_price FROM orders o INNER JOIN add_burger c ON o.bg_id = c.burger_id WHERE o.u_id = ?";
    con.query(query,[userid],(err,result)=>{
      if(err){
        console.error(err);
        resp.send('Server error');
       } 
       else{
            resp.send(result);
        }
    });
});


app.post('/api/cartplus', (req, resp) => {
    const { order_id,quantity } = req.body;
    var qty=quantity+1;

    //console.log(quantity);

    const query = "Update orders set quantity=? where order_id=?";
    con.query(query, [qty, order_id], (err, result) => {
        if (err) {
            console.error(err);
            resp.send({ message: "Error adding to orders" });
        } else {
            resp.send({ message: "Quantity Updated!!!!" });
        }
    });
});


app.post('/api/cartminus', (req, resp) => {
    const { order_id,quantity } = req.body;
    var qty=quantity-1 ;

    //console.log(quantity);

    const query = "Update orders set quantity=? where order_id=?";
    con.query(query, [qty, order_id], (err, result) => {
        if (err) {
            console.error(err);
            resp.send({ message: "Error adding to orders" });
        } else {
            resp.send({ message: "Quantity Updated!!!!" });
        }
    });
});

app.post('/api/cartremove', (req, resp) => {
    const {order_id} = req.body;
    //console.log(quantity);

    const query = "Delete from orders where order_id=?";
    con.query(query, [order_id], (err, result) => {
        if (err) {
            console.error(err);
            resp.send({ message: "Error to remove" });
        } else {
            resp.send({ message: "Removed" });
        }
    });
});




app.post('/api/checkout', (req, resp) => {
    // const { userId, paymentMode } = req.body;
    var userid = req.body.userId;
    var pm = req.body.mode;

   // console.log( userid,paymentMode);

 // Generate a dynamic 6-digit transaction ID
  function generateTransactionId() {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min ) + min);
  }
    const selectQuery = "SELECT * from orders where u_id = ?";

    con.query(selectQuery, [userid], (err, result) => {
        if (result.length > 0) 
            {
                const a=result.length;
                for(i=0;i<a;i++){
                    const tran_id = generateTransactionId();
                    // var tran_id=1;
                    var bur_id=result[i].bg_id;
                    var qtyy=result[i].quantity;
                    
                    const insertQuery = "INSERT INTO purchased (user_id,burger_id,quantity,payment_mode,tran_id) VALUES (?,?,?,?,?)";
                             con.query(insertQuery,[userid,bur_id,qtyy,pm,tran_id]);
                }
        }
});


            const deleteQuery = `DELETE FROM orders WHERE u_id = ?`;
            con.query(deleteQuery, [userid], (err) => {
                if (err) {
                    console.error("Error deleting from orders:", err);
                     resp.send({ message: "Server error" });
                     return;
                }
                else {   
                resp.send({ message: "Order placed successfully" });
            }
            });
        
    });










// app.get('/api/displayingOrders', (req, resp) => {
//     const query = "SELECT * FROM purchased";
//     con.query(query, (err, result) => {
//         resp.send(result);
//     });
// });


// app.get('/api/viewingOrders', (req, resp) => {
//     const query = "SELECT * FROM purchased where burger_id =?";
//     con.query(query, (err, result) => {
//         resp.send(result);
//     });
// });





// app.get('/api/displayingOrders', (req, resp) => {
//     const userid = req.query.userid;
//     const query = "SELECT * FROM purchased WHERE user_id=?";
//     con.query(query,[userid], (err, result) => {
//         resp.send(result);
//             //console.log(result);
//     });
// });

// app.get('/api/displayingOrders', (req, resp) => {
//     const userid = req.query.userid;
//     const fromDate = req.query.from;
//     const toDate = req.query.to;

//     let query;
//     let queryParams;

//     if (fromDate && toDate) 
//     {
//         query = "SELECT * FROM purchased WHERE user_id = ? AND time BETWEEN ? AND ?";
//         queryParams = [userid, fromDate, toDate];
//     }
//     else 
//     {
//         query = "SELECT * FROM purchased WHERE user_id = ?";
//         queryParams = [userid];
//     }
//     con.query(query, queryParams, (err, result) => {
//             resp.send(result);
//     });
// });





app.get('/api/displayingOrders', (req, resp) => {
    const userid = req.query.userid;
    const fromDate = req.query.from;
    const toDate = req.query.to;

    let query;
    let queryParams;

    if (fromDate && toDate) 
    {
        query = "SELECT * FROM purchased WHERE user_id = ? AND time > ? AND time < ?";
        queryParams = [userid, fromDate, toDate];
    }
    else 
    {
        query = "SELECT * FROM purchased WHERE user_id = ?";
        queryParams = [userid];
    }
    con.query(query, queryParams, (err, result) => {
            resp.send(result);
    });
});













app.get('/api/viewingOrders', (req, resp) => {
    const purchased_id = req.query.purchased_id;
    // const query = "SELECT * FROM purchased WHERE purchased_id=?";
    const query = " SELECT p.*, b.b_name  FROM purchased p INNER JOIN add_burger b ON p.burger_id = b.burger_id  WHERE p.purchased_id = ?";
    con.query(query, [purchased_id], (err, result) => {
            resp.send(result);
            console.log(result);
    });
});



app.post('/api/removeorders', (req, resp) => {
    const {purchased_id} = req.body;

    const query = "Delete from purchased where purchased_id=?";
    con.query(query, [purchased_id], (err, result) => {
        resp.send({message: 'Order deleted successfully',result});
    });
});



// app.post('/api/removeorders', (req, resp) => {
//     const { purchased_id } = req.body;


//     const query = "DELETE FROM purchased WHERE purchased_id=?";
//     con.query(query, [purchased_id], (err, result) => {
//         if (err) {
//             console.error('Error deleting order:', err);
//             resp.status(500).send({ error: 'Failed to delete order' });
//         } else {
//             resp.send({ message: 'Order deleted successfully', result });
//         }
//     });
// });






// app.get('/api/countingorders', (req, resp) => {
//     const burgerid = req.query.burgerid;
//     const fromDate = req.query.from;
//     const toDate = req.query.to;

//     let query;
//     let queryParams;

//     if (fromDate && toDate) 
//     {
        
//         query = "SELECT COUNT(burger_id),burger_id FROM purchased WHERE burger_id = ? AND time > ? AND time < ?";
//         queryParams = [burgerid, fromDate, toDate];
        
        
//     }
//     else 
//     {
//         query = "SELECT COUNT(quantity) FROM purchased WHERE user_id = ?";
//         queryParams = [burgerid];
//     }
//     con.query(query, queryParams, (err, result) => {
//             resp.send(result);
//             console.log(result);
//     });
// });








app.get('/api/countingorders', (req, resp) => {
    //const burgerid = req.query.burgerid;
    const fromDate = req.query.from;
    const toDate = req.query.to;

    let query;
    let queryParams;

    if (fromDate && toDate) {
        query =" SELECT burger_id, COUNT(burger_id) AS quantity FROM purchased WHERE time > ? AND time < ? GROUP BY burger_id";
        queryParams = [fromDate, toDate];
    } else {
        query = "SELECT burger_id, COUNT(burger_id) AS quantity FROM purchased GROUP BY burger_id ";
    }

    con.query(query, queryParams, (err, result) => {
            resp.send(result);
        //console.log(result);
    });
});








con.connect(function(err)

{
    if(err) throw err;
    console.log("db connected");
});

var port=1337;

app.listen(port,()=>{
    console.log("Connected");
});

