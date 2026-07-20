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

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return handle422(res, { error: 'Name, email, and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handle422(res, { email: 'Email is already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'creator'
        });

        const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

        return handle201(res, {
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        }, 'Registration successful');
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
    register,
    getProfile
};
