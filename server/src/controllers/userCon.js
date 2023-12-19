const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  register: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const major = req.body.major;
      const role = req.body.role;
      let hashedPassword = "";

      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          res.status(200).json({ result: "false", content: "There is an error while register account" });
          return console.log("Cannot encrypt");
        }

        hashedPassword = hash;

        const newUser = new User({
          username: username,
          password: hashedPassword,
          major: major,
          role: role,
        });

        const result = await newUser.save();
        if (result) {
          res.status(200).json({ result: "true", content: "Register successfully" });
        } else {
          res.status(404).json({ result: "false", content: "Register fail" });
        }
      });
    } catch (error) {
      return res.status(404).json(error);
    }
  },

  // //Khởi tạo AccessToken
  // generateAccessToken: (user) => {
  //   return jsonWebToken.sign(
  //     {
  //       id: user.id,
  //       role: user.role,
  //     },
  //     "secretKeyAccessToken",
  //     { expiresIn: "1d" }
  //   );
  // },

  // //Khởi tạo RefreshToken
  // generateRefreshToken: (user) => {
  //   return jsonWebToken.sign(
  //     {
  //       id: user.id,
  //       role: user.role,
  //     },
  //     "secretKeyRefreshToken",
  //     { expiresIn: "365d" }
  //   );
  // },

  // //Đăng nhập
  login: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ result: "false", content: "Username Invalid!" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.status(200).json({ content: "There is an error while checking account" });
          return console.log("Cannot encrypt");
        }

        if (result) {
          res.cookie("userSession", user._id.toString(), {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
          });
          return res.status(200).json({ content: "Login successfully" });
        } else {
          return res.status(404).json({ content: "Password Invalid!!!" });
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  logout: async (req, res) => {
    return res.clearCookie("userSession");
  },

  // //Xóa User
  // deconsteUser: async (req, res) => {
  //   try {
  //     await User.findByIdAndDeconste(req.params.id);
  //     return res.status(200).json("Deconste Successfully");
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // },

  // //Đăng xuất

  // //Lấy UserProfile
  // getUserProfile: async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     if (!user) {
  //       return res.status(404).json({ content: "User not found!" });
  //     }
  //     res.status(200).json({ user });
  //   } catch (error) {
  //     res.status(500).json({ content: "Error while getting user profile!" });
  //   }
  // },

  // //Cập nhật User
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json("User not found!");
      if (req.body.email) {
        user.email = req.body.email;
      }

      if (req.body.password) {
        const saltcode = await bcrypt.genSalt(10);
        const hashcode = await bcrypt.hash(req.body.password, saltcode);

        user.password = hashcode;
      }

      await user.save();
      return res.status(200).json("Update successfully!");
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  checkAuthen: async (req, res) => {
    try {
      console.log(req.headers?.cookie.split("userSession=")[1]);
      return res.status(200).json("Test!");
    } catch (error) {
      return res.status(500).json({ content: "Not lau" });
    }
  },
};

module.exports = userController;
