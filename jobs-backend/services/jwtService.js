const { JWT_SECRET, REFRESH_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

class JwtService {
    // payload means kya save krna hai jwtToken me
    static sign(payload, expiry = '1y', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token, secret = JWT_SECRET) {
        return jwt.verify(token, secret);
    }
}

module.exports = JwtService;