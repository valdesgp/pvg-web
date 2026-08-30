"use strict"

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next()
  }
  return res.redirect('/login')
}

module.exports = { requireAuth }
