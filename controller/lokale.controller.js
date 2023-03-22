const lokaleModel = require('../models/lokale.models')
const userModel = require('../models/users.models');

module.exports ={
    createLokal:async(decoded,params)=>{
        const user = decoded;
        console.log(decoded);
        const userId = await userModel.findById(user);
        if(!userId){
            return "No user exists by that ID!"
        }
        const {city,district,toilet,price,stat,title,description,promoted,latitude,longitute} = params;

       console.log(params);
    

        const lokal = await lokaleModel.create({
            author:userId._id,
            city,
            district,
            rooms:params.room,
            toilet,
            price,
            status:params.status,
            title,
            description,
          
           promoted,
           latitude,
           longitute



        })

        await lokaleModel.populate(lokal,{path:"author", select:"-password"})
        return lokal;

    },
    createImage:async(id,file,index)=>{
        let fileName=null;
        console.log(index);
      
        if(file){
            fileName=`/images/${file.filename}`
        }
        const result = await lokaleModel.findById(id)
        const currentImages = result.images;
       
        console.log(currentImages[index]);
        if(currentImages[index]==""){
            
            currentImages.push(fileName)

        }else{
                        currentImages.splice(index,1,fileName);
                        console.log(currentImages)
        }

     
        const updated = await lokaleModel.findByIdAndUpdate(id,{images:currentImages}).exec();

        return updated;
    },
    getAllLokale: async() =>{
        const result = await lokaleModel.find();
        return result;
    },
    getSingleLokale: async(params)=>{
        const result = await lokaleModel.findById(params);
        return result;
    },
    editLokale: async(decoded,params,body)=>{
        console.log(params);
        const apartmentId = await lokaleModel.findById(params.id);
        const {city,district,toilet,price,stat,title,description,promoted,latitude,longitute} = body;
        if(!apartmentId){
            return "No apartment exists by that ID."
        }
        const updatedApartment = await lokaleModel.findByIdAndUpdate(apartmentId,{
            city,
            district,
            rooms:body.room,
            toilet,
            price,
            status:body.status,
            title,
            description,
          
           promoted,
           latitude,
           longitute
        })
        return updatedApartment;
        
    },
    findPromoted:async() =>{

        const result = await lokaleModel.find({promoted:"Po"}).limit(2).sort('-createdAt')
        return result;
    },

}