const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  original_id: Number,
  name: String,
  company: String,
  images: {
    thumb1: String,
    thumb2: String,
    thumb3: String,
    thumb4: String,
    thumb5: String,
    thumb6: String,
    thumb7: String
  },
  lang: {
    a: String,
    b: String,
    c: String,
    d: String,
    e: String,
    f: String,
    g: String,
    h: String
  },
  links: {
    demo: String,
    repo: String
  },
  info: {
    about: String,
    desc: String,
    desc1: String,
    desc2: String,
    desc3: String,
    desc4: String,
    desc5: String,
    desc6: String,
    desc7: String
  },
  attribs: {
    types: String,
    typesb: String,
    link: String
  },
  role: {
    rolename: String,
    roledesc: String
  },
  timeline: {
    duration: String,
    period: String
  }
}, {
  timestamps: {createdAt: true, updatedAt: true},
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
