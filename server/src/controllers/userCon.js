const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  register: async (req, res) => {
    try {
      let { name, username, password, major, role, isLeader } = req.body;
      let hashedPassword = "";

      if (password) {
        const saltcode = await bcrypt.genSalt(10);
        const hashcode = await bcrypt.hash(req.body.password, saltcode);

        hashedPassword = hashcode;
        const newUser = new User({
          name: name,
          username: username,
          password: hashedPassword,
          major: major,
          role: role,
          isLeader: isLeader,
        });

        const result = await newUser.save();
        if (result) res.status(200).json({ result: "success", content: "Register successfully" });
      }
    } catch (error) {
      res.status(404).json({ result: "fail", content: "Register fail" });
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
      let { username, password } = req.body;

      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ result: "fail", content: "Username Invalid!" });
      }

      const result = bcrypt.compareSync(password, user.password);

      if (result) {
        res.cookie("userSession", user._id.toString(), {
          maxAge: 60 * 60 * 60 * 24,
          httpOnly: false,
          path: "/",
          secure: true,
          sameSite: "none",
        });
        return res.status(200).json({ result: "success", content: "Login successfully" });
      }
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Password Invalid!!!" });
    }
  },

  getAll: async (req, res) => {
    try {
      const role = req.body.role;
      let users = null;
      if (role) users = await User.find().select(["-password"]);
      else {
        users = await User.find({ role: role }).select(["-password"]);
      }
      return res.status(200).json({ result: "success", content: users });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  logout: async (req, res) => {
    try {
      console.log(req.headers?.cookie);
      const userId = req.headers?.cookie.split("userSession=")[1];
      res.cookie("userSession", userId, {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });
      return res.status(200).json({ result: "success", content: "Logout successfully" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Logout fail because user is not login" });
    }
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
  update: async (req, res) => {
    try {
      let { userId, name, username, password, major, role, isLeader } = req.body;
      let hashedPassword = null;
      let user = null;

      if (role == "student") {
        isLeader = false;
      }

      if (password) {
        const saltcode = await bcrypt.genSalt(10);
        const hashcode = await bcrypt.hash(req.body.password, saltcode);

        hashedPassword = hashcode;
        user = await User.findByIdAndUpdate(userId, { name, username, hashedPassword, major, role, isLeader });
      } else {
        user = await User.findByIdAndUpdate(userId, { name, username, major, role, isLeader });
      }

      if (!user) return res.status(404).json({ result: "fail", content: "User not found!" });
      else return res.status(200).json({ result: "success", content: "Update successfully!" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: error });
    }
  },

  checkAuthen: async (req, res) => {
    try {
      const userId = req.headers?.cookie.split("userSession=")[1];
      const result = await User.findById({ _id: userId });

      if (result) return res.status(200).json({ result: "success", content: result });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: null });
    }
  },

  getDetail: async (req, res) => {
    try {
      const userId = req.body.userId;

      const user = await User.findById({ _id: userId }).select(["-password"]);
      if (!user) return res.status(404).json({ result: "fail", content: "User not found!" });

      return res.status(200).json({ result: "success", content: user });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: error });
    }
  },

  delete: async (req, res) => {
    try {
      const userId = req.body.userId;

      const result = await User.findByIdAndDelete({ _id: userId });
      if (result) return res.status(200).json({ result: "success", content: "Delete account succesful" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Delete account fail" });
    }
  },
};

module.exports = userController;
