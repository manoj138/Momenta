const { User } = require('../models');
const { hashPassword } = require('../helper/authHelper');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError, handle422 } = require('../helper/errorHandler');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        return handle200(res, users);
    } catch (error) {
        return handle500(res, error);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role, category_permissions } = req.body;
        if (!name || !email || !password) {
            return handle422(res, { error: 'Name, email, and password are required' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return handle422(res, { email: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'creator',
            category_permissions: category_permissions || []
        });

        const userRes = user.toJSON();
        delete userRes.password;
        return handle201(res, userRes, 'User account created successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return handle404(res, 'User not found');

        const { name, email, role, status, category_permissions, password } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (status) user.status = status;
        if (category_permissions) user.category_permissions = category_permissions;
        if (password) user.password = await hashPassword(password);

        await user.save();

        const userRes = user.toJSON();
        delete userRes.password;
        return handle200(res, userRes, 'User updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return handle404(res, 'User not found');
        await user.destroy();
        return handle200(res, null, 'User deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
