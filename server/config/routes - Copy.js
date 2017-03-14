
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var userController = require('../db/user/userController.js');
var achievmentsController = require('../db/achievments/achievmentsController.js');
var commentController = require('../db/comment/commentController.js');
var quastionController = require('../db/faq/quastionController.js');
var projectsController = require('../db/projects/projectsController.js');
var galleryController = require('../db/gallery/galleryController.js');

var utils = require('./utils.js');

module.exports = function (app, express) {


app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email', 'public_repo' ] }));

app.get('/auth/github/callback', passport.authenticate ('github', {
     successRedirect: '/signup',
     failureRedirect: '/'
   }));

app.get('/api/logout', function(req, res){
  req.logout();
  res.status(200).send();
});

app.get('/api/isLogged',utils.isLogged);

//insert and get all the images from the gellary 
app.get('/api/gallery', galleryController.getAllImages );
app.post('/api/gallery', galleryController.insertImage);

// getting all quastions , and adding new quastions 
app.get('/api/faq',quastionController.getAllQuastions);
app.get('/api/faq/:id',quastionController.getOne);
app.post('/api/faq',quastionController.insertQuastion);

//getting all comments on a specific question ;
app.get('/api/comment',commentController.getAllComments);
app.post('/api/comment',commentController.insertComment);

// getting all the projects and insert new ones
app.get('/api/projects',projectsController.getAllProjects);
app.post('/api/projects',projectsController.insertProject);


app.all('*', (req, res) => {
  console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
  res.status(200).sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.use(utils.errorLogger);
app.use(utils.errorHandler);
};
