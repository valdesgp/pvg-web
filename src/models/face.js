const mongoose = require('mongoose')

const faceSchema = new mongoose.Schema({
  original_id: Number,
  name: String,
  biography: {
    fullName: String,
    nationality: String,
    position: String,
    poscolor: String
  },
  images: {
    sm: String,
    lg: String
  },
  teams: {
    club: String,
    national: String,
    league: String
  },
  links: {
    download: String,
    pesmaster: String
  },
  facetype: String,
}, {
  timestamps: {createdAt: true, updatedAt: true},
})

const Face = mongoose.model('Face', faceSchema)

module.exports = Face
