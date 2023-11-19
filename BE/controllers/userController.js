let User = require("../models/User");
let bcrypt = require("bcrypt");
let jsonWebToken = require("jsonwebtoken");

let refreshTokenArr = [];
let userController = {
    //Tạo tài khoản
    registerUser: async(req,res) => {
        try {
            let saltcode = await bcrypt.genSalt(10);
            let hashcode = await bcrypt.hash(req.body.password, saltcode);
            
            //Tạo NewUser
            let newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashcode,
            });

            //Lưu vào Database
            let user = await newUser.save();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Khởi tạo AccessToken
    generateAccessToken: (user) =>{
        return jsonWebToken.sign({
            id: user.id,
            role: user.role,
        },
        "secretKeyAccessToken",
        {expiresIn: "1d"}
        )
    },
    
    //Khởi tạo RefreshToken
    generateRefreshToken: (user) =>{
        return jsonWebToken.sign({
            id: user.id,
            role: user.role,
        },
        "secretKeyRefreshToken",
        {expiresIn: "365d"}
        )
    },

    //Đăng nhập
    loginUser: async(req,res) =>{
        try {
            let user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("Username Invalid!");
            }
            let validPassword = await bcrypt.compare(req.body.password,user.password)
            if(!validPassword){
                return res.status(404).json("Password Invalid!!!");
            }
            if(user && validPassword){
            //Tạo Token
            let accessSessionToken = userController.generateAccessToken(user);
            let refreshSessionToken = userController.generateRefreshToken(user);
            refreshTokenArr.push(refreshSessionToken);
            res.cookie("refreshSessionToken", refreshSessionToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict",
            })
            return res.status(200).json({user,accessSessionToken});
            }  
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Làm mới và lưu Cookie
    requestRefreshToken: async(req,res) =>{
        //Lấy token từ user
        let refreshSessionToken = req.cookies.refreshSessionToken;
        if(!refreshSessionToken) return res.status(401).json("Authentication failed!");
        if(!refreshTokenArr.includes(refreshSessionToken)){
            return res.status(403).json("Refresh token is invalid!");
        }
        jsonWebToken.verify(refreshSessionToken,"secretKeyRefreshToken",(err,user)=>{
            if(err)
            {
                console.log(err);
            }else{
                refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshSessionToken);
                //Tạo mới accessSessionToken và refreshSessionToken
                let newAccessSessionToken = userController.generateAccessToken;
                let newRefreshSessionToken = userController.generateRefreshToken;
                refreshTokenArr.push(newRefreshSessionToken);
                res.cookie("refreshSessionToken", newRefreshSessionToken,{
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite:"strict",
                });
                return res.status(200).json({accessSessionToken: newAccessSessionToken});
            }
        })
    },

    getAllUser: async(req,res) =>{
        try {
            let user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Xóa User
    deleteUser: async (req,res) =>{
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Delete Successfully")
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Đăng xuất
    logOutUser: async (req,res) =>{
        return res.clearCookie("refreshSessionToken");
    },

    //Lấy UserProfile 
    getUserProfile : async (req,res) =>{
        try {
            let user = await User.findById(req.params.id);
            if (!user) {
              return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json({ user });
          } catch (error) {
            res.status(500).json({ message: 'Error while getting user profile!' });
          }
    },

    //Cập nhật User
    updateUser : async (req,res) =>{
        try {
            let user = await User.findById(req.params.id);
            if(!user) return res.status(404).json("User not found!")
            if(req.body.email){
                user.email = req.body.email;
            }
            await user.save();
            return res.status(200).json("Update successfully!")
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}


module.exports = userController;