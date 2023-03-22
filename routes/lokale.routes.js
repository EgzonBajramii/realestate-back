const express = require('express')
const router = express.Router();
const {jsonResponse} = require('../lib/helper')
const lokaleController = require('../controller/lokale.controller');


const upload = require('../services/upload.service')
const {verifyToken} = require('../middlewares/auth.middleware')
router.post('/createLokal', verifyToken, async(req,res)=>{
    try{
        const result = await lokaleController.createLokal(req.decoded,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
    
})
router.post('/add-image/:id/:index', upload.single('lokale-image'), async(req,res)=>{
    try{
        console.log(req.file);
        const result = await lokaleController.createImage(req.params.id,req.file,req.params.index);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/allLokale', async(req,res)=>{
    
    try{
        const result = await lokaleController.getAllLokale();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/singleLokal/:id', async(req,res)=>{
    try{
        const result = await lokaleController.getSingleLokale(req.params.id);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/edit/:id',verifyToken, async(req,res)=>{
    try{ console.log(req.body)
        const result = await lokaleController.editLokale(req.decoded,req.params,req.body);
       
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/promotedLokal', async(req,res)=>{
    try{
        const result = await lokaleController.findPromoted();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false))
    }
})

module.exports = router;