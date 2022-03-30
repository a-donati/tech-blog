const router = require('express').Router();
const { valid } = require('semver');
const { User, Post } = require('../../models');

// create new user route
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
})
// login route 
router.post('/login', async (req, res) => {
    try {
        // find user where email matches email input
        const userData = User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ msg: 'Incorrect login info, please try again' })
            return;
        }

        const validPassword = await UserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ msg: 'Incorrect login info, please try again' })
            return;
        }
        // save session data of user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Now logged in' })
        });

    } catch (err) {
        res.status(200).json(userData)
    }
});
// user logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // end session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;