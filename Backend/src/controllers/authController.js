const { User } = require('../models');
const { hashPassword, comparePassword, generateToken } = require('../helper/authHelper');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle401, handle404, handle500, handle422 } = require('../helper/errorHandler');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return handle422(res, { email: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return handle401(res, 'Invalid email or password');
        }

        if (user.status !== 'active') {
            return handle401(res, 'Your account is deactivated. Please contact Super Admin.');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return handle401(res, 'Invalid email or password');
        }

        const token = generateToken({ id: user.id, email: user.email, role: user.role });

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            category_permissions: user.category_permissions
        };

        return handle200(res, { token, user: userData }, 'Login successful');
    } catch (error) {
        return handle500(res, error);
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return handle404(res, 'User not found');
        }
        return handle200(res, user);
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    login,
    getProfile
};
