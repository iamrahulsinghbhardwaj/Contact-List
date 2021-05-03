const express=require('express');
const path=require('path');
const port=8000;

const app=express(); //to fire express

app.set('view engine','ejs'); //setting the value for property
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true })) //act as a middleware
app.use(express.static('assets'));
//middleware1
// app.use(function(req,res,next){
//     req.myName="Rahul";
//     // console.log("Middleware 1 is called");
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
//     console.log("Middleware 2 is called");
//     next();
// });

var contactlist=[
    {
        name:'Rahul',
        phonenumber:'7232235442'
    },
    {
        name:'singh',
        phonenumber:'723456789'
    },
    {
        name:'bhardwaj',
        phonenumber:'454512121'
    }

]

app.get('/',function(req,res){
    console.log(req.myName);
    return res.render('home',{
        title:'Contact List',
        contact_list:contactlist
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'practice section'
    });
});

//for deleting a contact
app.get('/delete-contact',function(req,res){
   
  //  console.log(req.query);

    //get query from url
    let phone=req.query.phone;
    //find index of contact
    let contactindex=contactlist.findIndex(contact => contact.phone==phone);
    //remove it 
    if(contactindex!=-1){
        contactlist.splice(contactindex,1);
    }

    return res.redirect('back');
    
});

app.post('/create-contact',function(req,res){
    contactlist.push({
        name:req.body.name,
        phonenumber:req.body.phone
    });

  //  contactlist.push(req.body);

    return res.redirect('/'); //back is altenative to / or the pravious page
});

app.listen(port,function(err){
    if(err){
        console.log('Error',err);
    }

    console.log('Yup here we go server is running on port',port);
});