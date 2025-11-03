const User = require('../models/user');
const AuthController = {

  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
      }

      const newUser = await User.create({ email, password, name });
      
      const userResponse = newUser.get({ plain: true });
      delete userResponse.password; 

      const token = newUser.generateAuthToken(); 


      res.status(201).json({ message: 'Usuario registrado exitosamente', user: userResponse, token });
    } catch (error) {
      console.error('Error en register:', error);
      res.status(400).json({ error: 'Error al registrar el usuario', details: error.message });
    }
  },


  async login(req, res) {
    try {
      console.log('Login request body:', req.body);
      const { email, password } = req.body;


      const allusers = await User.findAll();


      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }

      const isMatch = await user.validPassword(password); 

      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }

      const token = user.generateAuthToken(); 

      res.json({ 
        message: 'Inicio de sesión exitoso', 
        token, 
        user: { id: user.id, email: user.email, name: user.name } // Información mínima del usuario
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor durante el inicio de sesión' });
    }
  },

  async me(req, res) {
    try {
      const user = req.user; 
      
      if (!user) {
        return res.status(401).json({ error: 'No autenticado.' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Error en me:', error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AuthController;