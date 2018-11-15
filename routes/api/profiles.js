// Express
const express = require('express');
const router = express.Router();
// Profiles model
const Profile = require('../../models/profiles');

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Public (no authentication yet)
router.get('/', (req, res) => {
    // Fetch all the profiles from the DB
    Profile.find()
        // Sort by descending date of entry
        .sort({ date: -1})
        .then(profiles => res.json(profiles))
});

// @route   POST api/profiles
// @desc    Create a profile
// @access  Public (no authentication yet)
router.post('/', (req, res) => {
    // Construct an object to be inserted into the DB
     const newProfile = new Profile({
         // The name will be within the body of the request (using body-parser)
         // The date will be automatically calculated
         name: req.body.name,
         desc: req.body.desc
     });

     // Save to the DB
     newProfile.save().then(profile => res.json(profile));
});

// @route   DELETE api/profiles/:id
// @desc    Delete a profile
// @access  Public (no authentication yet)
router.delete('/:id', (req, res) => {
    // Find the profile using the ID (from uri)
    Profile.findById(req.params.id)
        // Remove the profile and return success
        .then(profile => profile.remove().then(() => res.json({success: true})))
        // If invalid ID send error 404 not found response
        .catch(err => res.status(404).json({success: false}));
});

// @route   PATCH api/profiles/:id
// @desc    Modify a profile
// @access  Public (no authentication yet)
router.put('/:id', (req, res) => {
    Profile.updateOne({ _id: req.params.id }, req.body)
        .then(res.json(req.body))
});

// Export router
module.exports = router;