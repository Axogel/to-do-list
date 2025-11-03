import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
    if(!title || !description) return res.status(400).json({message: 'Faltan datos obligatorios'});

  const task = await Task.create({ title,description,  userId: req.user.id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  // const { title, description } = req.body;
  // if(!title || !description) return res.status(400).json({message: 'Faltan datos obligatorios'});
  const task = await Task.findByPk(id);
  if (!task || task.userId !== req.user.id)
    return res.status(403).json({ message: "No autorizado" });

  await task.update(req.body);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task || task.userId !== req.user.id)
    return res.status(403).json({ message: "No autorizado" });

  await task.destroy();
  res.json({ message: "Tarea eliminada" });
};
