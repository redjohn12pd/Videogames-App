require('dotenv').config();
const axios = require('axios').default;
const {Videogame, Platform} = require('../db.js');
const {KEY} = process.env;
module.exports = {
    getPlatforms: async (req, res, next)=>{
        try{
            let platformsDB = await Platform.findAll();
            if(platformsDB.length<1){
            let platforms = await axios.get(`https://api.rawg.io/api/platforms?key=${KEY}`);
            await Promise.all(platforms.data.results.map(async (platform)=>{
                await Platform.create({
                    name: platform.name
                });
            }));
            platformsDB = await Genre.findAll();
            return res.status(200).json(platformsDB);
        }else{
            return res.status(200).json(platformsDB);
        }
        }catch(error){
            next(error);
        }

    }

}