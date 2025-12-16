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
    thumb7: String,
    thumb8: String,
    thumb9: String,
    thumb10: String,
    thumb11: String
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
  },
  gallery: {
    img1: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img2: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img3: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img4: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img5: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img6: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img7: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img8: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img9: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img10: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img11: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img12: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img13: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img14: {
    link: String,
    date: String,
    project: String,
    desc: String
    },
    img15: {
    link: String,
    date: String,
    project: String,
    desc: String
    }
  }
}, {
  timestamps: {createdAt: true, updatedAt: true},
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
