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
 router.get('/posts/:id', withAuth, async (req, res) => {
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

        //  const postUserId = post.user_id
        //  const current_user = req.session.user_id
         var isUsersPost;

         function checkUsersPost(postUser, currentUser) {
          if(postUser === currentUser){
            isUsersPost = true;
          } else {
            isUsersPost = false;
          }
         }
        //  returns true or false  - data passed in renders Edit post button in handlebars if true
         checkUsersPost(post.user_id, req.session.user_id)

         res.render('post', {
            ...post,
            // pass in below data to handlebars
            // check if logged in 
            logged_in: req.session.logged_in,
            // get current user id from session
            current_user: req.session.user_id,
            // get true/false value of isUsersPost
            current_users_post: isUsersPost
          }); 
     }catch(err){
         res.json
     }
 })


 router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: [{model: Post}],
    })
    const user = userData.get({plain: true});

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  }catch(err){
    res.status(500).json(err);
  }
 });

 router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});



module.exports = router;
