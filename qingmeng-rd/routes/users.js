let db = require("./db");
const jwt = require("jsonwebtoken");
let mySecretKey = "asdklfjs892r792r34%^$%^&*(O";

module.exports = (router) => {
  router.post("/login", async (ctx) => {
    // 从请求中获取前端传递过来的参数
    let { username, password } = ctx.request.body;

    // 连接数据库

    let sql = "SELECT * FROM user WHERE username=? AND password=?";
    let result = await db.query(sql, [username, password]);

    if (result.length > 0) {
      //生成 token
      let payload = {
        userId: result[0].id,
      };

      let token = jwt.sign(payload, mySecretKey, { expiresIn: "2d" });

      ctx.body = {
        code: 2200, //操作成功，一切正常
        data: {
          state: "success",
          token,
          userId: result[0].id,
        },
      };
    } else {
      ctx.body = {
        code: 2200, //操作成功，一切正常
        data: {
          state: "fail",
        },
      };
    }
  });

  router.get("/getUserInfo", async (ctx) => {
    try {
      let token = ctx.header.authorization;
      let decoded = jwt.verify(token, mySecretKey);

      let sql = "SELECT username, avatar, is_publisher FROM user WHERE id=?";
      let result = await db.query(sql, [decoded.userId]);

      if (result.length > 0) {
        ctx.body = {
          code: 2200,
          data: {
            userInfo: result[0],
          },
        };
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/register", async (ctx) => {
    // 1. 接收数据
    let { identity, username, password, phone } = ctx.request.body;

    // 2. 验证信息是否填写
    // 此处省略一万行。。。
    // 验证用户是否存在
    let sql = "SELECT * FROM user WHERE username=?";
    let result = await db.query(sql, [username]);
    if (result.length > 0) {
      ctx.body = {
        code: 2200,
        data: {
          state: "error_user_exists",
        },
      };
    } else {
      // 3. 将用户信息插入数据库
      let sql2 =
        "insert into user(username, password, phone, is_publisher) values(?,?,?,?)";
      let result2 = await db.query(sql2, [username, password, phone, identity]);
      if (result2.affectedRows > 0) {
        ctx.body = {
          code: 2200,
          data: {
            state: "success",
          },
        };
      } else {
        ctx.body = {
          code: 2500,
          data: {
            state: "error_insert_fail",
          },
        };
      }
    }
  });
};
