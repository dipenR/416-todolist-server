const { AuthenticationError } = require('apollo-server');
const Task = require('../../models/Task')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Query: {
        async getTasks() {
            try {
                const tasks = await Task.find();
                return tasks;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createTask(_, { title }, context) {
            const user = checkAuth(context);

            if(title.trim() === '') {
                throw new Error('Task title must not be empty');
            }

            const newTask = new Task({
                title,
                user: user.id,
                username: user.username
            })
            const task = await newTask.save();
            
            return task;
        },

        async deleteTask(_, { taskId }, context) {
            const user = checkAuth(context);
            try {
                const task = await Task.findById(taskId);
                if(user.username === task.username) {
                    task.delete();
                    return 'task deleted!'
                } else {
                    throw new AuthenticationError('Action not allowed!')
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}