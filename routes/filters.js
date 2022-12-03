const filterOffer = (offer) => {
    return {
        id:offer.id,
        investor: offer.investor,
        amount: offer.ammount,
        equity: offer.equity,
        comment: offer.comment
    }
}

const filterOffers = (offers) => {
    return offers.map(filterOffer)
}

const filterPitch = (pitch) => {
    return {
        id: pitch.id,
        entrepreneur: pitch.entrepreneur,
        pitchTitle: pitch.pitchTitle,
        pitchIdea: pitch.pitchIdea,
        askAmount:pitch.equity,
        equity:pitch.equity,
        offers:filterOffers(pitch.offers)
    }
}

const filterPitches = (pitches) => {
    return pitches.map(filterPitch)
}

module.exports = {filterPitch,filterPitches}