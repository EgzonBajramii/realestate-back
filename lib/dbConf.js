const mongoose = require('mongoose');

module.exports = {
    connect:() =>{
        mongoose.connect('mongodb+srv://egzonbajrami:xoni1234@cluster0.bb5w9vb.mongodb.net/EBRealEstate',(err)=>{
            if(err){
                console.log(err)
            }
            console.log('connected to db');
        })
    }
}
