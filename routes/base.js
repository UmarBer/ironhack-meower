'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const Publication = require('./../models/publication');

router.get('/', (req, res, next) => {
  Publication.find()
    .sort({ createdAt: -1 })
    // Telling mongoose to populate the creator property
    // tells it to fetch documents from the User collection
    // (since the ref property for creator refers to the User model
    // in the Publication schema)
    // and it replaces the value in the creator id with the values from the user publication
    .populate('creator')
    .then((publications) => {
      res.render('home', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
