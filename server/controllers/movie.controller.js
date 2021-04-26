const Axios = require('axios');
const User = require("../models/user.model");
const apiKey = process.env.API_KEY;

module.exports = {
    index: (req,res) => {
        User.find()
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors:err.errors}));
    },
    create: (req,res) => {
        User.create(req.body)
        .then(data => res.json({results:data}))
        .catch(err => res.status(404).json({errors:err.errors}));
    },
    show: (req,res) => {
        User.find({_id:req.params.id})
        .then(data => res.json({results:data}))
        .catch(err => res.status(404).json({errors:err.errors}));
    },
    update: (req,res) => {
        User.updateOne({_id:req.params.id}, req.body, {runValidators:true})
        .then(data => res.json({results:data}))
        .catch(err => res.status(404).json({errors:err.errors}));
    },
    destroy: (req,res) => {
        User.deleteOne({_id:req.params.id})
        .then(data => res.json({results:data}))
        .catch(err => res.status(404).json({errors:err.errors}));
    },
    randomMovie: (req,res) => {
        var output = {
            movie: null,
            trailer:null
        }
        const randomPage = Math.floor(Math.random() * 500)+1; 
        const random20 = Math.floor(Math.random() * 20);
        Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${randomPage}&primary_release_year=&with_genres=&with_original_language=en`)
        .then(data => {
            output.movie= data.data.results[random20]
            console.log(output)
            Axios.get(`https://api.themoviedb.org/3/movie/${output.movie.id}/videos?api_key=${apiKey}&language=en-US`)
                .then( data => {
                    console.log(data.data.results.filter(function (item) {return item.type.includes("Trailer")})[0])
                    output.trailer = data.data.results.filter(function (item) {return item.type.includes("Trailer")})[0]
                    res.json(output)
                })
                .catch(err => console.log(err))
        })
        .catch(err => res.status(404).json({errors:err.errors}));
    },
    // addToWatchList: (req,res) => {
    //     Movie.updateOne({_id:"60651a6fa795155344154741"}, req.body, {runValidators:true})
    //         .then
    // }
}