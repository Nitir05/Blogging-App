const jwt = require("jsonwebtoken");

const secret = "$uperman@1234";

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };

    const token = jwt.sign(payload, secret);

    return token;
};

const validateToken = (token) => {
    const paylod = jwt.verify(token, secret);
    return paylod;
};

module.exports = {
    createTokenForUser,
    validateToken,
};
