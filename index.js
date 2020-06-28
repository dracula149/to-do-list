const express=require("express")
const bodyparser=require("body-parser")
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
var items=[];//array of items
var workitems=[];
app.set('view engine','ejs');//set up ejs view engine

const date=require(__dirname+"/date.js");//requiring local date module

app.get("/",function(req,res){
  var day=date();
  res.render('list', {listtitle: "daily",it:items,today:day });//today var in index.ejs is rendered to value of day also it var in ejs form is given items value
});


app.post("/",function(req,res){
  var  item=req.body.ip1;
  if(req.body.button==="daily"){//req for daily list
  items.push(item)//pusing item value to array items
res.redirect("/");
}
else{
  workitems.push(item);//req for work list
  res.redirect("/work");
  }
});


//code for work items page
app.get("/work",function(req,res){
  var day=date();
  res.render('list',{listtitle:"Work List",it:workitems, today:day});
});

//code ends

app.get("/about",function(rew,res){
  res.render("about");
});

app.listen(3000,function(req,res){
  console.log("server started at 3000")
})
