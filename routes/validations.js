const Pitch = require('../model/pitch')

const validatePitchId = (req, res, next) => {
    Pitch.findOne({"id": req.params.pitchId}, {err, pitch} => {
        if(err) {
            return res.status(404).send("Pitch id Invalid")
        } else if( pitch == null){
            return res.status(404).send("Pitch Not Found")
        }else{
            next()
        }
    })
}

module.exports = validatePitchId