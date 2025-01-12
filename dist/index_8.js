"use strict";
// ---------------- 1 ----------
function handleResult(result) {
    if (result.status === "success") {
        return result.data;
    }
    else {
        throw new Error(result.error);
    }
}
const successResult = { status: "success", data: 42 };
const errorResult = { status: "error", error: "error text" };
console.log(handleResult(successResult));
console.log(handleResult(errorResult));
// ---------------- 2 ----------
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    size() {
        return this.items.length;
    }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.peek());
console.log(queue.dequeue());
console.log(queue.size());
// ---------------- 3 ----------
function sortArray(arr, compareFn) {
    return [...arr].sort(compareFn);
}
const numbers = [5, 3, 8, 1];
const sortedNumbers = sortArray(numbers, (a, b) => a - b);
console.log(sortedNumbers);
// ---------------- 4 ----------
function extractProperty(obj, key) {
    return obj[key];
}
const person = { name: "Alice", age: 25 };
console.log(extractProperty(person, "name"));
console.log(extractProperty(person, "age"));
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        if (this.items.some(i => i.id === item.id)) {
            throw new Error(`Item with id ${item.id} already exists`);
        }
        this.items.push(item);
    }
    getById(id) {
        return this.items.find(item => item.id === id);
    }
    removeById(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    getAll() {
        return [...this.items];
    }
}
const userRepository = new Repository();
userRepository.add({ id: 1, name: "John Doe" });
console.log(userRepository.getById(1));
const productRepository = new Repository();
productRepository.add({ id: 101, title: "Laptop" });
console.log(productRepository.getAll());
