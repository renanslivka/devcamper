const express = require('express');

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

const courseRouter = require('./courses');
const reviewsRouter = require('./reviews');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth')

router
    .use('/:bootcampId/:courses', courseRouter)
    .use('/:bootcampId/:reviews', reviewsRouter)

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

router
    .route('/:id/photo')
    .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, createBootcamp)

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router;
