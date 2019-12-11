"use strict";

const Task = use("App/Models/Task");
const { validateAll } = use("Validator");

class TaskController {
  async index({ view }) {
    const tasks = await Task.all();

    return view.render("tasks", {
      title: "Latest tasks",
      tasks: tasks.toJSON()
    });
  }

  async store({ request, response, session }) {
    const message = {
      "title.required": "Required",
      "title.min": "min 5",
      "title.max": "max 140",
      "body.required": "Required",
      "body.min": "min 10"
    };

    const validationRules = await validateAll(
      request.all(),
      {
        title: "required|min:5|max:140",
        body: "required|min:10"
      },
      message
    );

    if (validationRules.fails()) {
      session.withErrors(validationRules.messages()).flashAll();
      return response.redirect("back");
    }

    const task = new Task();
    task.title = request.input("title");
    task.body = request.input("body");

    await task.save();

    session.flash({ notification: "Task added !" });

    return response.redirect("/tasks");
  }

  async detail({ params, view }) {
    const task = await Task.find(params.id);
    return view.render("detail", {
      task: task
    });
  }

  async remove({ params, response, session }) {
    const task = await Task.find(params.id);
    await task.delete();
    session.flash({ notification: "Task removed !" });
    return response.redirect("/tasks");
  }
}

module.exports = TaskController;
