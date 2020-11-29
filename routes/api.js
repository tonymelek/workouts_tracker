//Dependencies
const express = require('express');
const router = express.Router();
const db = require('../models/index')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


//Get all workouts
router.get('/workouts', (req, res) => {
    db.Workout.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err)
    });
})
//Add New Workout
router.post('/workouts', jsonParser, async (req, res) => {
    console.log(req.body);
    const data = await db.Workout.create({
        day: Date.now(),
        exercises: [{
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance
        }]
    })
    res.json(data)
});

//Add Exercise
router.put('/workouts/:id', jsonParser, async (req, res) => {
    console.log(req.body);
    const data = await db.Workout.findByIdAndUpdate({ _id: req.params.id }, {
        day: Date.now(),
        exercises: [{
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance
        }]
    })
    res.json(data)
})
//Get all workouts
router.get('/workouts/range', (req, res) => {
    db.Workout.find({}).then(data => {
        res.json(data);
        console.log(data);
    }).catch(err => {
        res.json(err)
    });
})




module.exports = router;