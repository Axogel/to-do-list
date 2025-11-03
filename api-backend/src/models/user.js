const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET || 'token'; 
const TOKEN_EXPIRATION = '7d';

console.log(sequelize)
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10); 
                user.password = await bcrypt.hash(user.password, salt); 
            }
        },
    },
    tableName: 'users', 
    timestamps: true,  
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

User.prototype.generateAuthToken = function() {
    const payload = {
        id: this.id, 
        email: this.email,
    };

    const token = jwt.sign(
        payload, 
        JWT_SECRET, 
        { expiresIn: TOKEN_EXPIRATION } 
    );
    
    return token;
};

module.exports = User;
