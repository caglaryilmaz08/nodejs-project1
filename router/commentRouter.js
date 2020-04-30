const express = require("express");
const Comment = require("../model/comment")
const router = express.Router();


router.get("/", (req,res)=>{


  res.redirect("/comment")
})


router.post("/createcomment", async (req, res)=>
{

const comment =new Comment({
        text: req.body.text, 
        author:req.body.author
    })
 await comment.save( (error, success)=>{
     if(error) {
         console.log(error);
   res.send(error.message) 
     }
   else
   res.redirect("/comment")
     
 } );
 


})
    

router.get("/comment", async (req, res) => {

const myComment = await Comment.find()

res.render("comment", {myComment});
}
)

router.get("/delete/:id", async (req, res)=>{
    console.log(req.params.id);
    await Comment
    .deleteOne({_id:req.params.id});
    res.redirect("/comment")
})


router.get("/update/:id", async (req, res)=>{


  const response= await Comment.findById({_id:req.params.id})
  console.log(response);
  

    res.render("edit", {response})
})

router.post("/update/:id", async(req, res)=>{


   await Comment.updateOne({_id:req.body._id},
    {$set: {text: req.body.text, author:req.body.author}}, {runValidators:true}) 
    res.redirect("/")


 })

 router.get("/comment/sorted", async (req, res) => {
    const tasks = 3;
    console.log(req.query);
    const page = req.query.page;
    const sorted= req.query.sort+1;
    const myComment = await Comment.find().sort({text: sorted}).skip((page-1)*tasks).limit(3);
   
   
  
  res.render("comment", {myComment});
  }
  )
  
 
module.exports = router;