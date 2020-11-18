const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const app = express();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file ,callback){
      callback(null, "./public/Upload")
  },
  filename: function(req, file, callback){
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + "-" + Date.now() + extension);
  }
})
const upload = multer({
  storage: storage
})

app.use('/image', express.static('./public/Upload'));

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/Shoplist', function(req, res, next) {
  models.shopInfo.findAll().then( result => {
    return res.json({ data: result });
  });
});

app.post('/api/shopInfo', function(req, res, next) {
  console.log(req.body.id)
  models.shopInfo.findOne({where:{id:req.body.id}}).then( result => {
    return res.send(result);
  });
});

app.post('/api/descriptionImg', upload.fields([{ name: 'descriptionImage' }]), function(req, res, next) {
  console.log(req.files)
  console.log(req.files.descriptionImage[0].filename)
  return res.json({ filename: req.files.descriptionImage[0].filename });
});

app.post('/api/addProduct', upload.fields([{ name: 'mainImage' }, { name: 'addImage' }, { name: 'image' }]), function(req, res, next) {
  var body = req.body;
  var data = JSON.parse(body.data)
  var addImageNameArr = [];
  var miFileName = '';
  if(req.files.mainImage === undefined) {
    miFileName = 'default.gif';
  } else {
    miFileName = req.files.mainImage[0].filename;
  }
  if(req.files.addImage === undefined) {
    addImageNameArr.push('default.gif')
  } else {
    for(var i=0;i<req.files.addImage.length;i++) {
      addImageNameArr.push(req.files.addImage[i].filename)
    }
  }
  models.sequelize.sync().then( () => {
    models.shopInfo.create({
      product_name: data.product_name,
      product_price: data.product_price,
      supply_price: data.supply_price,
      user_price: data.user_price,
      summary_desc: data.summary_desc,
      product_description: data.product_description,
      miFileName : miFileName,
      aiFileName : addImageNameArr.toString(),
      exhibition : data.exhibition,
      deliveryWay : data.deliveryWay,
      deliveryCost : data.deliveryCost,
      deliveryPrice : data.deliveryPrice,
      sale : data.sale,
    })
    .then( result => {
      console.log("데이터 추가 완료");
      return res.json({ code: 'success' });
    })
    .catch( err => {
      console.log(err);
    })
  }).catch(err => {
    console.log(err);
  })
});

router.post('/board', function(req, res, next) {
  let body = req.body;

  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter
  })
  .then( result => {
    console.log("데이터 추가 완료");
    return res.json({ seccess: true });
  })
  .catch( err => {
    console.log("데이터 추가 실패");
  })
});

module.exports = router;

app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express Web Server~ => ' + app.get('port'));
});