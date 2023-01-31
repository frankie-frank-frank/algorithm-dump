let Task = function(name, description, finished, dueDate) {
    this.name = name;
    this.description = description;
    this.finished = finished;
    this.dueDate = dueDate;
}

let TaskBuilder = function () {

    let name = '';
    let description = '';
    let isFinished = false;
    let dueDate = new Date().toUTCString();

    return {
        setName: function (name) {
            this.name = name;
            return this;
        },
        setDescription: function (description) {
            this.description = description;
            return this;
        },
        setFinished: function (finished) {
            this.finished = finished;
            return this;
        },
        setDueDate: function (dueDate) {
            this.dueDate = dueDate.toUTCString();
            return this;
        },
        build: function () {
            return new Task(this.name || name, this.description || description, this.isFinished || isFinished, this.dueDate || dueDate);
        }
    };
};

let task = new TaskBuilder().setName('Task A').setDescription('finish book')
    .setDueDate(new Date(2019, 5, 12)).build();
console.log(task);

let emptyTask = new TaskBuilder().build()
console.log(emptyTask)