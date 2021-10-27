// require('dotenv').config();
// const axios = require('axios').default;
// const { key } = process.env;
// class ModelCrud {
//     constructor(model) {
//         this.model = model;
//     }
//     getAll = async (req, res, next) => {
//         const { name } = req.query;
//         let resultPromiseApi;
//         let resultPromiseDB;
//         if (name) {
//             resultPromiseDB = await this.model.findAll({
//                 where: {
//                     name: name
//                 }
//             });
//             resultPromiseApi = axios.get(`https://api.rawg.io/api/games?search={game}?key=${key}`);
//         } else {
//             resultPromiseDB = await this.model.findAll();
//             resultPromiseApi = axios.get(`https://api.rawg.io/api/games?key=${key}`);
//         }
//         Promise.all([resultPromiseDB, resultPromiseApi])
//             .then(response => {
//                 let [resultPromiseDB, resultPromiseApi] = response;
//                 console.log(resultPromiseApi);
//                 resultPromiseApi = resultPromiseApi.data.results.map(obj => {
//                     return {
//                         name: obj.name,
//                         description: obj.description,
//                         launchDate: obj.released,
//                         rating: obj.rating,
//                         platforms: obj.platforms,
//                         backgroundImage: obj.background_image
//                     }
//                 });

//                 return res.status(200).json(resultPromiseDB.concat(resultPromiseApi));
//             })
//             .catch(error => next(error));
//     }
//     getById = async (req, res, next) => {
//         try {
//             const id = req.params.id;
//             if (id.length < 8) {
//                 axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
//                     .then(result => res.status(200).json(result))
//                     .catch(error => next(error));
//             } else {
//                 const result = await this.model.findAll({
//                     where: {
//                         id
//                     },
//                     include:{

//                     }
//                 });
//                 res.status(200).json(result);
//             }
//         } catch (error) {
//             next(error);
//         }

//     }
//     insert = (req, res, next) => {
//         const object = {
//             ...req.body
//         }
//         return this.model.create({
//             ...object
//         })
//             .then(object => res.status(200).json(object))
//             .catch(error => next(error));
//     }
// }
// module.exports = ModelCrud;
