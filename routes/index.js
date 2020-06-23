var express = require('express');
var router = express.Router();
const models = require('../models'); // 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.post('/', async (req, res) => {
    // 사용자가 입력한 인자(req.body)를 불러온다
    const web_id = req.body.id;
    const web_pw = req.body.pw;
    
    // 아이디와 패스워드를 비교
    // const user = await models.user_info.findOne({
    const user = await models.user.findOne({
      where: {
        user_id: web_id,
        user_pw: web_pw
      }
    });

    // 로그인 실패
    if(user == null){
      res.render("login_fail"); // login_fail 화면으로 렌더링
    }

    // 로그인 성공
    else{
      // 쿠키를 이용하여 로그인 정보 유지
      if (req.cookies) {
        console.log("쿠키", req.cookies);
      }

      res.cookie("user", user.user_id, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      });

      // 유저정보 출력
      try {
        // const users = await models.user_info.findAll();
        const users = await models.user.findAll();
        res.render("ejs_main", { 'users' : users });
      } catch (err) {
        console.log(errMsg);
      }
    }
});

router.post('/change_pw', async(req, res) =>{

  // 입력한 비밀번호와 no를 불러옴
    const new_pw1 = req.body.new_pw1;
    const user_no = req.body.user_no;

    // 비밀번호 변경
    const user = await models.user.findOne({
      where: {
        id: user_no
      }
    });
    user.user_pw = new_pw1;
    await user.save();
    res.json({ 'msg' : 'changing passowrd!', 'data' : user}); // 뷰(화면)에 json 데이터 전송
})

module.exports = router;
