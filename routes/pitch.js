const express = require('express')
const router = express.Router()

//importing tables
const Pitch = require('../model/pitch')
const Offer = require('../model/offer')

//importing helper func
const validatePitchId = require('./validations')
const {filterPitch, filterPitches} = require('./filters')

//1------
router.post('/', async (req,res) => {
    let id = await Pitch.count({}) + 1
    const newPitch = new Pitch({
        id : id,
        entrepreneur : req.body.entrepreneur,
        pitchTitle : req.body.pitchTitle,
        pitchIdea : req.body.pitchIdea,
        askAmount : req.body.askAmount,
        equity : req.body.equity,
        createdAt : Date.now(),
        comment : []
    })

    await newPitch.save((err, pitch) => {
        if(err){
            return res.status(400).send("Invalid request body")
        } else{
            return res.status(201).send({id : pitch.id})
        }
    })
})

//2---
router.post('/:pitcheId/makeOffer', validatePitchId, asysnc (req, res) => {
    const pitch = await Pitch.findOne({id : req.params.pitchId})
    const id = pitch.offers.length + 1

    const newOffer = new Offer({
        id : id,
        investor:req.body.investor,
        amount: req.body.amount,
        equity: req.body.equity,
        comment : req.body.comment,
    })
      
    await newOffer.save(async (err,offer) => {
        if(err){
            return res.status(400).send("Invalid Request Body")
        } else{
            console.log(req.params.pitchId)
            Pitch.findOne({id:req.params.pitchId}, async (err,pitch) =>{
                if(err) console.log(err)
                else{
                    await pitch.offers.push(offer)
                    await pitch.save()
                }
            })

            return res.status(201).send({id: newOffer.id})
        }
    });
})

//3--endpoint
router.get('/', async (req,res) => {
    await pitch.find().sort({createdAt: 'desc'}).populate("offers").exec((err,pitches)=>{
        if(err) console.log(err)
        else {
            return res.status(200).send(JSON.stringify(filterPitches(pitches)))
        }
    })
})


//4------
router.get('/:pitchId', validatePitchId,async (req,res) => {
    await Pitch.findOne({id: req.params.pitchId}).populate("offers").exec((err,pitch) =>{
        if(err) console.log(err)
        else{
            return res.status(200).send(JSON.stringify(filterPitch(pitch)))
        }
    })
})

module.exports = router