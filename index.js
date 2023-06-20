var express = require('express');
var router = express.Router();

var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res){
  var duplicate = [];
  fs.readdir("./uploads",{withFileTypes:true},function(err,files){
    files.forEach(function(dirent){
      duplicate.push({name:dirent.name , isFolder: dirent.isDirectory()})
    })
    res.render('index',{files:duplicate})
  })
});

router.get('/createfile',function(req,res){
  fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
    if(err) console.log(error)
    else res.redirect('/');
  })
})

router.get('/createfolder',function(req,res){
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
    if(err) console.log(error)
    else res.redirect('/');
  })
})

router.get('/file/:filename',function(req,res){
  var duplicate = [];
  fs.readdir("./uploads",{withFileTypes:true},function(err,files){
    files.forEach(function(dirent){
      duplicate.push({name:dirent.name , isFolder: dirent.isDirectory()})
    })
    fs.readFile(`./uploads/${req.params.filename}`,"utf8",function(err,data){
      res.render("fileexist",{files:duplicate,filename:req.params.filename,filedata:data});
    })  
    
  })
})

module.exports = router;
