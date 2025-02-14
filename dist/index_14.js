"use strict";
class TodoList {
    constructor() {
        this.todos = [];
        this.idCounter = 1;
    }
    addTodo(title, content, type = "default") {
        const newTodo = {
            id: this.idCounter++,
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
            completed: false,
            type,
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            if (this.todos[index].type === "confirm-required") {
                return false;
            }
            this.todos.splice(index, 1);
            return true;
        }
        return false;
    }
    editTodo(id, title, content) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            if (todo.type === "confirm-required") {
                return false;
            }
            todo.title = title;
            todo.content = content;
            todo.updatedAt = new Date();
            return true;
        }
        return false;
    }
    markCompleted(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            todo.updatedAt = new Date();
            return true;
        }
        return false;
    }
    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }
    getAllTodos() {
        return this.todos;
    }
    getStats() {
        const total = this.todos.length;
        const remaining = this.todos.filter(todo => !todo.completed).length;
        return { total, remaining };
    }
    searchTodos(query) {
        return this.todos.filter(todo => todo.title.includes(query) || todo.content.includes(query));
    }
    sortTodos(by) {
        return [...this.todos].sort((a, b) => {
            if (by === "status") {
                return Number(a.completed) - Number(b.completed);
            }
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
    }
}
