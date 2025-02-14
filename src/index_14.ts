interface Todo {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    type: "default" | "confirm-required";
}

class TodoList {
    private todos: Todo[] = [];
    private idCounter = 1;

    addTodo(title: string, content: string, type: "default" | "confirm-required" = "default"): Todo {
        const newTodo: Todo = {
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

    deleteTodo(id: number): boolean {
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

    editTodo(id: number, title: string, content: string): boolean {
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

    markCompleted(id: number): boolean {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            todo.updatedAt = new Date();
            return true;
        }
        return false;
    }

    getTodo(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    getAllTodos(): Todo[] {
        return this.todos;
    }

    getStats(): { total: number; remaining: number } {
        const total = this.todos.length;
        const remaining = this.todos.filter(todo => !todo.completed).length;
        return { total, remaining };
    }

    searchTodos(query: string): Todo[] {
        return this.todos.filter(todo =>
            todo.title.includes(query) || todo.content.includes(query)
        );
    }

    sortTodos(by: "status" | "date"): Todo[] {
        return [...this.todos].sort((a, b) => {
            if (by === "status") {
                return Number(a.completed) - Number(b.completed);
            }
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
    }
}
