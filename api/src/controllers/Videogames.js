require('dotenv').config();
const axios = require('axios').default;
const { key } = process.env;
const { Videogame, Genre } = require('../db.js');
//const controllerCrud = new ModelCrud({Videogame, Genre});
module.exports = {
    getVideogames: async (req, res, next) => {
        const { name } = req.query;
        let resultPromiseApi
        let resultPromiseA;
        let resultPromiseB;
        let resultPromiseC;
        let resultPromiseDB;
        if (name) {
            resultPromiseDB = await Videogame.findAll({
                where: {
                    name: name
                },
                limit: 15
            });
            resultPromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${key}`);
            Promise.all([resultPromiseDB, resultPromiseApi])
                .then(response => {
                    let [resultPromiseDB, resultPromiseApi] = response;
                    resultPromiseApi = resultPromiseApi.data.results.map(obj=>{
                        return {
                            name: obj.name,
                            description: obj.description,
                            launchDate: obj.released,
                            rating: obj.rating,
                            platforms: obj.platforms,
                            backgroundImage: obj.background_image
                        }
                    });
                    return res.status(200).json(resultPromiseDB.concat(resultPromiseApi).slice(0, 15));
                })
                .catch(error=>next(error));
        }
        else {
            try{
                resultPromiseDB = await Videogame.findAll();
            resultPromiseA = axios.get(`https://api.rawg.io/api/games?key=${key}&page_size=40&page=1`);
            resultPromiseB = axios.get(`https://api.rawg.io/api/games?key=${key}&page_size=40&page=2`);
            resultPromiseC = axios.get(`https://api.rawg.io/api/games?key=${key}&page_size=20&page=3`);
            resultPromiseApi = await Promise.all([resultPromiseDB, resultPromiseA, resultPromiseB, resultPromiseC]);
            [resultPromiseDB, resultPromiseA, resultPromiseB, resultPromiseC] = resultPromiseApi;
            resultPromiseApi = [...resultPromiseA.data.results, ...resultPromiseB.data.results, ...resultPromiseC.data.results]
            resultPromiseApi = resultPromiseApi.map(obj=>{
                return {
                    name: obj.name,
                    description: obj.description,
                    launchDate: obj.released,
                    rating: obj.rating,
                    platforms: obj.platforms,
                    backgroundImage: obj.background_image
                }
            })
            return res.status(200).json(resultPromiseDB.concat(resultPromiseApi));
            }catch(error){
                next(error);
            }
        }
    },
    getVideogame: async (req, res, next) => {
        try {
            const id = req.params.id;
            if (id.length < 8) {
                axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
                    .then(result => result.data)
                    .then(data => {
                        const videoGame = {
                            name: data.name,
                            description: data.description,
                            launchDate: data.released,
                            rating: data.rating,
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
                    include: {
                        model: Genre
                    }
                });
                return res.status(200).json(result);
            }
        } catch (error) {
            next(error);
        }

    },
    insertVideogame: (req, res, next) => {
        const object = {
            ...req.body
        }
        return Videogame.create({
            ...object
        })
            .then(object => res.status(200).json(object))
            .catch(error => next(error));
    }

};


