const mongoose  = require('mongoose')
const { Schema, model} = mongoose

const pitchSchema = new Schema({
    id : {type :String  ,required:true},
    entrepreneur:{type : String, required:true},
    pitchTitle: {type:String, required:true},
    pitchIdea: {type:String, required:true},
    askAmount: {type:Number ,required:true, min:0,max:100},
    createdAt:Date,
    offers:[{
        type:Schema.Types.ObjectId,
        ref:'Offer'
    }]
})

const Pitch = model('Pitch', pitchSchema);
module.exports = Pitch