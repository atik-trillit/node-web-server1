const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port =process.env.PORT || 3000;




var app=express();
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

app.use((req,res,next)=>{
  var now=new Date().toString();

  console.log(now);
fs.appendFile('server.log',now+'\n',(err)=>{
  if(err){
    console.log('Unable to creare file');
  }
})
  next();
})

hbs.registerHelper('scream',(text)=>{
  return text.toUpperCase();
})
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.send('Hello Express');

});

app.get('/about',(req,res)=>{
  res.send({
    name:'Atik Shaikh',
    about_me:['live in malad','mumbai']
  });

});

app.get('/info',(req,res)=>{
  res.render('info.hbs',{
    pageTitle:'Info Page',
    currentYear:new Date().getFullYear()
  });
});


app.get('/contactUs',(req,res)=>{
  res.render('contactUs.hbs',{
    pageTitle:'Contact Page',
    currentYear:new Date().getFullYear()
  });
});

app.listen(port,()=>{
  console.log(`Server running on port no. ${port}`);

});
