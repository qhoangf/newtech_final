let jsonWebToken = require("jsonwebtoken");
let hashMiddlewareController = {

    // Kiểm tra Token sử dụng
    verifyToken: (req, res, callback) => {
        let tokenHeader = req.headers.token;
        if (tokenHeader) {
            let accessToken = tokenHeader.split(" ")[1];
            jsonWebToken.verify(accessToken, "secretKeyAccessToken", (error, user) => {
                if (error) {
                    return res.status(403).json("Token is not valid");
                } else {
                    req.user = user;
                    callback();
                }
            });
        }
        else {
            return res.status(401).json("You are not authenticated!")
        }
    },

    // Kiểm tra Token Admin
    verifyTokenAndAdminAuth: (req, res, callback) => {
        hashMiddlewareController.verifyToken(req, res, () => {
            if (req.user.role == "admin") {
                callback();
            } else {
                return res.status(403).json("You do not have permission!!");
            }
        })
    },

    // Kiểm tra Token giảng viên
    verifyTokenAndLecturerAuth: (req, res, callback) => {
        hashMiddlewareController.verifyToken(req, res, () => {
            if (req.user.role == "instructor") {
                callback();
            } else {
                return res.status(403).json("You do not have permission!!");
            }
        })
    },

    // Kiểm tra Token học sinh
    verifyTokenAndStudentAuth: (req, res, callback) => {
        hashMiddlewareController.verifyToken(req, res, () => {
            if (req.user.role == "student") {
                callback();
            } else {
                return res.status(403).json("You do not have permission!!");
            }
        })
    },
}

module.exports = hashMiddlewareController;