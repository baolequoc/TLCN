/* eslint-disable max-len */
const taskService = require('../services/task.service');
const commentService = require('../services/comment.service');

const listTaskByTopic = async (req, res, next) => {
  try {
    const {
      topicId, studentId, statusTask,
    } = req.query;
    const task = await taskService.listTaskByTopic(topicId, studentId, statusTask);
    return res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
};

const createNewTask = async (req, res, next) => {
  try {
    const {
      topicId, code, title, description, status, process, startTime, endTime, createdBy, assignTo,
    } = req.body;
    const task = await taskService.createNewTask(topicId, code, title, description, status, process, startTime, endTime, createdBy, assignTo);
    return res.status(201).send(task);
  } catch (err) {
    return next(err);
  }
};

const getOneTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getOneTask(id);
    return res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
};

const updateProcess = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { process } = req.body;
    await taskService.updateProcess(taskId, process);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateStatusTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    await taskService.updateStatusTask(taskId, status);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateAssignTo = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { assignTo } = req.body;
    await taskService.updateAssignTo(taskId, assignTo);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateStartTime = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { startTime } = req.body;
    await taskService.updateStartTime(taskId, startTime);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateEndTime = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { endTime } = req.body;
    await taskService.updateEndTime(taskId, endTime);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, code, description } = req.body;
    await taskService.updateInfo(id, title, code, description);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const addCommentTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const comment = await commentService.createComment(message, req.user.id);
    await taskService.addCommentToTask(id, comment._id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getOneTask(id);
    await commentService.deleteMany(task.comment);
    await taskService.deleteTask(id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  listTaskByTopic,
  createNewTask,
  getOneTask,
  updateProcess,
  updateStatusTask,
  updateAssignTo,
  updateStartTime,
  updateEndTime,
  updateInfo,
  addCommentTask,
  deleteTask,
};
