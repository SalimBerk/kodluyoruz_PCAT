const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');
const app = express();
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.post('/photos', photoController.createPhoto);
app.get('/photos/edit/:id', pageController.getEditPage);
app.put('/photos/:id', photoController.photoUpdate);
app.delete('/photos/:id', photoController.photoDelete);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} da çalışmaya başladı.`);
});
