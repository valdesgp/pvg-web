const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  original_id: Number,
  name: String,
  company: String,
  client: String,
  sector: String,
  images: {
    thumb: String,
    thumb1: {
        link: String,
        desc: String
    },
    thumb2: {
        link: String,
        desc: String
    },
    thumb3: {
        link: String,
        desc: String
    },
    thumb4: {
        link: String,
        desc: String
    },
  },
  lang: {
    a: String,
    b: String,
    c: String,
    d: String,
    e: String,
    f: String,
    g: String,
    h: String,
    i: String
  },
  links: {
    demo: String,
    repo: String
  },
  info: {
    about: String,
    challenge: String,
    desc1: String,
    desc2: String,
    desc3: String,
    desc4: String,
  },
  role: {
    rolename: String,
    roledesc: String
  },
  timeline: {
    duration: String,
    period: String,
    timeframe: String
  },
    stack: {
    dev: String,
    design: String,
    SEO: String
  },
 
}, {
  timestamps: {createdAt: true, updatedAt: true},
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
