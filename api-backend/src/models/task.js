import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Relación: un usuario tiene muchas tareas
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

export default Task;
