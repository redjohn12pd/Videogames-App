require('dotenv').config();
const {Genre} = require('../db.js');
const axios = require('axios').default;
const {KEY} = process.env;
module.exports = {
    getGenres: async(req, res, next)=>{
        try{
            let genresDB = await Genre.findAll();
            if(genresDB.length<1){
            let genres = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
            await Promise.all(genres.data.results.map(async (genre)=>{
                await Genre.create({
                    name: genre.name
                });
            }));
            genresDB = await Genre.findAll();
            return res.status(200).json(genresDB);
        }else{
            return res.status(200).json(genresDB);
        }
        }catch(error){
            next(error);
        }

    }
}