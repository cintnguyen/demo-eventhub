const { sendText } = require("../helpers/twilio.js")
const chatGPT = require("../utils/chatGPT")
const Event = require("../models/Event")
const Task = require("../models/Task")

module.exports = {
    getToDoList: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            res.render("todos.ejs", { 
                eventID: event._id, 
                toDosItems: event.tasks,
            });
        } catch (err) {
            console.log(err);
        }
    },
    postToDoList: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            let toDosItems = [];
            if (req.body && req.body.eventName){
                const eventName = req.body.eventName.trim();
                if (eventName.length > 0) {
                    toDosItems = await chatGPT.fetch(eventName);
                    if (toDosItems.length > 0) {
                        event.tasks = toDosItems.map(item => {
                            return new Task({
                                taskName: item,
                                eventID: event._id,
                            });
                        }) 
                        event.markModified("tasks")
                        await event.save()
                    }
                }
            }
            res.render("todos.ejs", { 
                eventID: event._id, 
                toDosItems: event.tasks,
            });
            
        } catch (err) {
            console.log(err);
        }
    },
    clearToDoList: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            event.tasks = []
            event.markModified("tasks")
            await event.save()
            res.render("todos.ejs", { 
                eventID: event._id, 
                toDosItems: [],
            });
        } catch (err) {
            console.log(err);
        }
    },
    deleteTask: async (req, res) => {
        try {
          const event = await Event.findById(req.params.id);
          const taskIndex = Number(req.body.task)
          event.tasks.splice(taskIndex, 1);
          event.markModified('tasks'); // method for mongoose to recognize that we made changes to the guest array 
          await event.save()
          res.redirect(`/todos/${event.id}`);
        } catch (err) {
          console.log(err);
        }
      },
};
