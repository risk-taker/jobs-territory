const Joi = require('joi');
const User = require('../../models/User');
const RefreshToken = require('../../models/refreshToken');
const CustomErrorHandler = require('../../services/customErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../services/jwtService');
const { REFRESH_SECRET } = require('../../config');

const registerController = {
    async register(req, res, next) {

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        // check if user is in the database already
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
            }
        } catch (err) {
            return next(err);
        }
        const { name, email, password, role, status } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // prepare the model

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            status
        });

        let access_token;
        let refresh_token;
        try {
            const result = await user.save();

            // Token
            access_token = JwtService.sign({ _id: result._id, role: result.role });
            refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);
            // database whitelist
            await RefreshToken.create({ token: refresh_token });
        } catch (err) {
            return next(err);
        }
        res.cookie('refreshToken', refresh_token);
        res.cookie('accessToken', access_token, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        // res.cookie('refreshToken', refresh_token, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });

        res.json(user);
    }
}

module.exports = registerController;