// src/controllers/user.controller.js
import { UserModel } from '../models/user.model.js'

export const UserController = {
  async getProfile(req, res) {
    try {
      const profile = await UserModel.getProfile(req.user.id)
      res.json(profile)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async updateProfile(req, res) {
    try {
      const updated = await UserModel.updateProfile(req.user.id, req.body)
      res.json(updated)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
