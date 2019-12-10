"use strict";

class TaskController {
  index({ view }) {
    const tasks = [
      { title: "Task One", body: "This is task one" },
      { title: "Task Two", body: "this is task two" }
    ];

    return view.render("tasks", {
      title: "Latest tasks",
      tasks: tasks
    });
  }
}

module.exports = TaskController;
