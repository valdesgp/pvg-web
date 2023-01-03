const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
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

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
