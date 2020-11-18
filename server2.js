const fs = require('fs');
const path = require('path');
const http = require('http');
const fsextra = require("fs-extra");
const express = require('express');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser');
const pg = require("pg");
const session = require('express-session');
var localStorage = require('localStorage');

const app = express();
var Queue = require('better-queue');

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
 
// ====== postgreSQL 설정
const config = {
  user: 'postgres',
  database: 'databiz', 
  password: '0000', 
  port: 5432, 
  max: 10, // max number of connection can be open to database
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ====== 드라이브 데이터
var hddSpace = require('hdd-space');

function drive() {
  hddSpace({ format: 'auto' }, function (info) {
    return info;
  });
}
app.get('/api/driver', (req, res) => {
  hddSpace({ format: 'auto' }, function (info) {
    res.send(info)
  });
});

// 크기 변환 함수
function formatSizeUnits(bytes){
  if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(0)+' GB';}
  else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(0)+' MB';}
  else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(0)+' KB';}
  else if (bytes>1)           {bytes=bytes+' bytes';}
  else if (bytes==1)          {bytes=bytes+' byte';}
  else                        {bytes='0 byte';}
  return bytes;
}


// 파일 데이터 가져오기
function getFilesFromDir(currentPath) {
  var filesToReturn = [];
  var foldersToReturn = [];

    var files = fs.readdirSync(currentPath);

    for (var i in files) {
      try {
        var curFile = path.join(currentPath, files[i]);
        var curStat = fs.statSync(curFile);
        var byte, date;
        
        // 파일이름 앞에 $표시가 있는지 체크
        if(files[i].startsWith('$')) {
          continue;
        }

        // 파일 구분
        if (curStat.isFile()) {
          //filesToReturn.push(curFile.replace(dir, ''));
          var type = "F";
          byte = formatSizeUnits(curStat.size);
          date = dateFormat(curStat.mtime, 'yyyy-mm-dd HH:MM');

          filesToReturn.push({name:files[i], dissize:byte, bytesize:curStat.size, date:date, type:type, path:currentPath, isChecked:false});
        } else if(curStat.isDirectory()) {
            var type = "D";
            byte = formatSizeUnits(curStat.size);
            date = dateFormat(curStat.mtime, 'yyyy-mm-dd HH:MM');
            foldersToReturn.push({name:files[i], dissize:byte, bytesize:curStat.size, date:date, type:type, path:currentPath, isChecked:false});
        } else {
          continue;
        }
      } catch(e){
        continue;
      }
    }

  var data = foldersToReturn.concat(filesToReturn);
  return data; 
}

app.get('/api/nextfile', (req, res) => {
  var path = req.query.file;
  var jsonData = JSON.stringify(getFilesFromDir(path));

  res.send(jsonData);
});

app.get('/api/nextfileD', (req, res) => {
  var path = req.query.file;

  var jsonData = JSON.stringify(getFilesFromDir(path));

  res.send(jsonData);
});

app.get('/api/backfile', (req, res) => {
  var path = req.query.path;

  var jsonData = JSON.stringify(getFilesFromDir(path));

  res.send(jsonData);
});

app.get('/api/backfileD', (req, res) => {
  var path = req.query.path;
  var jsonData = JSON.stringify(getFilesFromDir(path));

  res.send(jsonData);
});

app.get('/api/copy', (req, res) => {
  filepath = req.query.filepath.split(','); // 문자열로 넘어온 데이터를 잘라내어 배열로 변경
  file = req.query.file.split(','); // 문자열로 넘어온 데이터를 잘라내어 배열로 변경
  copypath = req.query.copypath;
   
  var counter = new Queue(function (file, cb) {
    console.log("filepath :  %s, copypath :  %s, file : %s.", file.filepath, file.copypath, file.file);
    console.log('counter',cb.toString)
    copyfilespath(file.filepath, file.copypath, file.file);
    cb();
  })
  counter.on('task_finish', function(taskId, result) {
    console.log('taskId',taskId);
    console.log('result',result);
  
    res.send('success')
  })
  counter.on('task_failed', function (taskId, errorMessage) {
    // Handle error
    console.log('errorMessage',errorMessage);
  })
  counter.on('task_progress', function (taskId, completed, total) {
    console.log('completed',completed);
    console.log('total',total);
    // Handle task progress
  })

  for(var i=0;i < filepath.length;i++) {
    try {
      counter.push({ filepath: filepath[i], copypath: copypath + '/' + file[i], file : file[i] })
      .on('finish', function (result) {
        // Handle upload result
        console.log('result',result)
      })
      .on('progress', function (progress) {
        console.log('progress.eta',progress.eta)
        // progress.eta - human readable string estimating time remaining
        // progress.pct - % complete (out of 100)
        // progress.complete - # completed so far
        // progress.total - # for completion
        // progress.message - status message
      })
    } catch(e) {
      continue;
    }
  }
});

// 복사할 대상의 파일,폴더 분류 후 복사(경로, 파일명)
function copyfilespath(filepath, copypath, file) {
  fs.lstat(filepath, (err, stats) => { // 해당 경로의 타입 구분
    if(stats.isDirectory()) { // 폴더 
      fsextra.copy(filepath, copypath, function(err) {
        if(err) {
          return console.error(err);
        }
        console.log('success!');
      })
    } else if(stats.isFile()) { // 파일
      fsextra.copy(filepath, copypath, function(err) {
        if(err) {
          return console.error(err);
        }
        console.log('success!');
      })
    }
  }) 
}

var router = express.Router();
var loginid = null;
var loginInfo = null;
// router.route('/api/login').post(function(req, res) {
//   pool.connect(function(err,client,done) {
//     let sql = 'SELECT * from member where id = $1 and pw = $2';
//     var id = req.body.id;
//     var pw = req.body.pw;

//     let params = [id, pw];
//     if(req.session.user) {
//       console.log('세션 저장 : ', req.session.user)
//     } else {
//       client.query(sql, params ,function(err,result) {
//         done(); 
//         if(err){
//             console.log(err);
//             res.status(400).send(err);
//         }
//         if(result.rows.length === 0) {
//           res.status(200).send('fail');
//         } else {
//           req.session.user = {
//             id:id,
//             name:id,
//             authorized:true
//           };
//           loginid =  req.session.user;
//           console.log(req.session.user);
//           localStorage.setItem('id');
//           res.status(200).send(result.rows[0].id);
//           localStorage.getItem('users')
//           // res.redirect('http://localhost:3000/#/dashboard');
//           res.end();
//         }
//     });
//   }
//     if(err){
//         console.log("not able to get connection "+ err);
//         res.status(400).send(err);
//     } 
//  });
// });
router.route('/api/idCheck').post(function(req,res) {
  var loginData = req.body.loginData;
  var id = loginData.id;

  pool.connect(function(err,client,done) {
    let idCheckSql = 'SELECT * from member where id = $1';
    let params = [id];

    client.query(idCheckSql, params, function(err, result) {
      if(result.rows.length === 0) {
        console.log("사용가능");
        return res.json({
          idCheck: true
        })
      } else {
        console.log("사용불가");
        return res.status(401).json({
          error: "ID IS DUPLICATION",
          code: 1
      });
      }
    });
  })
});
router.route('/api/login').post(function(req,res) {
  var loginData = req.body.loginData;
  var id = loginData.id;
  var pw = loginData.pw;
  pool.connect(function(err,client,done) {
    if(typeof pw !== "string") {
      console.log('문자아님');
      return res.status(401).json({
          error: "PASSWORD IS NOT STRING",
          code: 1
      });
    } else {
      let idCheckSql = 'SELECT * from member where id = $1';
      let params = [id];

      client.query(idCheckSql, params, function(err, result) {
        if(result.rows.length === 0) {
          console.log("THERE IS NO USER");
          return res.status(401).json({
              error: "THERE IS NO USER",
              code: 2
            });
        } else {
          if(result.rows[0].pw === pw) {
            console.log("Login Success");
            let session = req.session;
            session.loginInfo = {
              _id : result.rows[0].id,
              id : result.rows[0].id
            };
            loginInfo =  session.loginInfo;
            return res.json({
              success: true
            })
          } else {
            console.log("PASSWORD IS NOT CORRECT");
            return res.status(401).json({
              error: "PASSWORD IS NOT CORRECT",
              code: 3
            });
          }
        }
      })
    }
  })
});
router.route('/api/getinfo').get(function(req,res) {
  console.log(req.session);
  if(typeof loginInfo === "undefined") {
    return res.status(401).json({
        error: "THERE IS NO LOGIN DATA",
        code: 1
    });
  }
  res.json({ info: loginInfo });
});

router.route('/api/logout').post(function(req, res) {
  console.log(req.session)
  loginInfo = null;
  // req.session.destroy() 메소드로 세션을 파괴
  req.session.destroy(err => { if(err) throw err; });
  return res.json({ sucess: true });
});

// router.route('/api/logout').get(function(req, res) {
//   console.log(req.session.user);
//   if(req.session.user) {
//       console.log("로그아웃합니다.");
//       req.session.destroy(function(err) {
//           if(err) {
//               console.log("세션 삭제시 에러 발생");
//               return;
//           } else {
//               loginid = null;
//               console.log('세션 삭제 성공');
//               res.redirect('http://localhost:3000/#/login');
//           }
//       });
//   } else {
//       console.log('로그인되어 있지 않습니다.');
//   }
// })

// router.route('/api/loginCheck').get(function(req, res) {
//   if(loginid) {
//     console.log('login',loginid);
//     console.log("로그아웃합니다.");
//     res.send({loginid, check:true})
//   } else {
//     console.log('login',loginid);
//     console.log('로그인되어 있지 않습니다.');
//     res.send({check:false})
//   }
// })

app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express Web Server~ => ' + app.get('port'));
});