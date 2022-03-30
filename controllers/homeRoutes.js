const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage get route
router.get('/', async (req, res) => {
    try {
      // findall post data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      
  
      // Serialize data for template
      const posts = postData.map((post) => post.get({ plain: true }));

      // Pass serialized data into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// render individual post 
 router.get('/post/:id', withAuth, async (req, res) => {
     try {
         const postData = await Post.findByPk(req.params.id, {
             include: [
                 {
                     model: User,
                     attributes: ['name', 'id'],
                 },
                 {
                     model: Comment,
                     attributes: ['content', 'user_id', 'date_created'],
                     include: {
                         model: User,
                         attributes: ['name']
                     }
                 }
             ]
         });
         const post = postData.get({ plain: true });

         res.render('post', {
            ...post,
            // user,
            logged_in: req.session.logged_in,
            current_user: req.session.user_id,
          }); 
     }catch(err){
         res.json
     }
 })


module.exports = router;
