
const apartmentModel = require('../models/apartment.models');
const userModel = require('../models/users.models');

module.exports = {
    add: async(params)=>{
        console.log(params.images);
        const decoded = params.autori;
        const {city,district,rooms,toilet,price,stat,title,description,images,promoted} = params;

        const user = await userModel.findById(decoded);
        if(!user){
            return "No user exists by that ID"
        }
    

        const apartment = await apartmentModel.create({
            author:user._id,
            city,
            district,
            rooms,
            toilet,
            price,
            stat,
            title,
            description,
           images,
           promoted,
           



        })

        await apartmentModel.populate(apartment,{path:"author", select:"-password"})
        return apartment;

    },
 
    getAllApartments: async()=>{
      const result = await apartmentModel.find();
      return result;
      
    
    },
    findPromoted:async() =>{

        const result = await apartmentModel.find({promoted:"Po"}).limit(2).sort('-createdAt')
        return result;
    },
    createImage:async(id,file,index)=>{
        let fileName=null;
        console.log(index);
      
        if(file){
            fileName=`/images/${file.filename}`
        }
        const result = await apartmentModel.findById(id)
        const currentImages = result.images;
       
        console.log(currentImages[index]);
        if(currentImages[index]==""){
            
            currentImages.push(fileName)

        }else{
                        currentImages.splice(index,1,fileName);
                        console.log(currentImages)
        }

     
        const updated = await apartmentModel.findByIdAndUpdate(id,{images:currentImages}).exec();

        return updated;
    },
    createApartment:async(decoded,params)=>{
        const user = decoded;
        console.log(params);
        const userId = await userModel.findById(user);
        if(!userId){
            return "No user exists by that ID!"
        }
        const {city,district,toilet,price,stat,title,description,promoted,latitude,longitute} = params;

       console.log(params);
    

        const apartment = await apartmentModel.create({
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

        await apartmentModel.populate(apartment,{path:"author", select:"-password"})
        return apartment;

    },
    getSingleApartment: async(params,body)=>{
        const result = await apartmentModel.findById(params.id);
        if(!result){
            return "No apartment exists by that ID"
        }
        return result;
    },
    editApartment: async(decoded,params,body)=>{
        console.log(params);
        const apartmentId = await apartmentModel.findById(params.id);
        const {city,district,toilet,price,stat,title,description,promoted,latitude,longitute} = body;
        if(!apartmentId){
            return "No apartment exists by that ID."
        }
        const updatedApartment = await apartmentModel.findByIdAndUpdate(apartmentId,{
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
    getLatest: async() =>{
        const result = await apartmentModel.find().sort("-createdAt").limit(1);
        return result;
    }
}