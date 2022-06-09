const User = require("../models/User");


const userController = {
    async me(req, res, next) {
        const { id } = req.params;
        let me
        try {
            me = await User.findById({ _id: id })
        } catch (err) {
            next(err);
        }
        res.json(me);
    },
    async users(req, res, next) {
        let users;
        try {
            users = await User.find().select('-__v');
        } catch (err) {
            next(err);
        }

        res.json(users);
    },
    async blockMe(req, res, next) {
        try {
            await User.updateOne({ _id: req.params.id }, { $set: { status: "block" } });
        } catch (error) {
            next(error);
        }
        res.json({ status: 1 });
    }
}

module.exports = userController;