require('dotenv').config();
const axios = require('axios').default;
const { KEY } = process.env;
const { Videogame, Genre, Platform, Op} = require('../db.js');
//const controllerCrud = new ModelCrud({Videogame, Genre});
const filterVideogames = (videogames, genre)=>{
    const filter = [];
    videogames.forEach(game=>{
        game.genres.forEach(gen=>{
            if(gen.name===genre)
            filter.push(game)
        })
    })
    return filter;
}
module.exports = {
    getVideogames: async (req, res, next) => {
        const { name, genre } = req.query;
        let resultPromiseApi
        let resultPromiseA;
        let resultPromiseB;
        let resultPromiseC;
        let resultPromiseDB;
        let allVideogames;
        if (name) {
            resultPromiseDB = await Videogame.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name.toUpperCase()}%`
                      }
                },
                include:{
                    model: Genre
                },
                limit: 15
            });
            resultPromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`);
            Promise.all([resultPromiseDB, resultPromiseApi])
                .then(response => {
                    let [resultPromiseDB, resultPromiseApi] = response;
                    resultPromiseApi = resultPromiseApi.data.results.map(obj=>{
                        return {
                            id: obj.id,
                            name: obj.name,
                            description: obj.description,
                            launchDate: obj.released,
                            rating: obj.rating,
                            platforms: obj.platforms,
                            genres: obj.genres,
                            backgroundImage: obj.background_image
                        }
                    });
                    allVideogames = resultPromiseDB.concat(resultPromiseApi).slice(0,15);
                    return res.status(200).json(allVideogames);
                })
                .catch(error=>next(error));
        }
        else {
            try{
                resultPromiseDB = await Videogame.findAll({
                    include:{
                        model: Genre
                    }
                });
            resultPromiseA = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=1`);
            resultPromiseB = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=2`);
            resultPromiseC = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=20&page=3`);
            resultPromiseApi = await Promise.all([resultPromiseDB, resultPromiseA, resultPromiseB, resultPromiseC]);
            [resultPromiseDB, resultPromiseA, resultPromiseB, resultPromiseC] = resultPromiseApi;
            resultPromiseApi = [...resultPromiseA.data.results, ...resultPromiseB.data.results, ...resultPromiseC.data.results]
            resultPromiseApi = resultPromiseApi.map(obj=>{
                return {
                    id: obj.id,
                    name: obj.name,
                    description: obj.description,
                    launchDate: obj.released,
                    rating: obj.rating,
                    platforms: obj.platforms,
                    genres: obj.genres,
                    backgroundImage: obj.background_image
                }
            })
            allVideogames = resultPromiseDB.concat(resultPromiseApi);
                    if(genre && genre !== 'All'){
                        allVideogames = filterVideogames(allVideogames, genre);
                       
                    }
             return res.status(200).json(allVideogames);
            }catch(error){
                next(error);
            }
        }
    },
    getVideogame: async (req, res, next) => {
        try {
            const id = req.params.id;
            if (id.length < 8) {
                axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)
                    .then(result => result.data)
                    .then(data => {
                        const videoGame = {
                            id: data.id,
                            name: data.name,
                            description: data.description,
                            launchDate: data.released,
                            rating: data.rating,
                            genres: data.genres,
                            platforms: data.platforms,
                            backgroundImage: data.background_image
                        }
                        return res.status(200).send(videoGame)
                    })
                    .catch(error => next(error))
            } else {
                const result = await Videogame.findAll({
                    where: {
                        id: id
                    },
                    include: [
                        {model:Genre},
                        {model:Platform}
                      ]
                });
                return res.status(200).json(result);
            }
        } catch (error) {
            next(error);
        }

    },
    insertVideogame: async (req, res, next) => {
        const {name, description, genres, launchDate, rating, platforms,backgroundImage} = req.body;
        const object = {
            name:name.toUpperCase(),
            description,
            launchDate,
            rating,
            backgroundImage
        }
        return Videogame.create({
            ...object
        })
            .then(async (object) =>{
                 await Promise.all(
                 genres.map(async(genre)=>{
                       const result = await Genre.findOne({
                           where:{
                               id: genre
                           }
                       })
                       if(result)
                       await object.addGenre(result.id);
                   }),
                   platforms.map(async(platform)=>{
                    const result = await Platform.findOne({
                        where:{
                            id: platform
                        }
                    })
                    if(result)
                    await object.addPlatform(result.id);
                }) 
                 );
                
                res.status(200).json(object)
            })
            .catch(error => next(error));
    }

};


