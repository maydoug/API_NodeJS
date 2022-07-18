const mongoose = require('mongoose')

const Lead = mongoose.model('Lead', {
    email: String,
})


module.exports = Lead ;