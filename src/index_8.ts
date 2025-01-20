// ---------------- 1 ----------

type Result<T> =
    | { status: "success"; data: T }
    | { status: "error"; error: string };

function handleResult<T>(result: Result<T>): T {
    if (result.status === "success") {
        return result.data;
    } else {
        throw new Error(result.error);
    }
}

const successResult: Result<number> = { status: "success", data: 42 };
const errorResult: Result<number> = { status: "error", error: "error text" };

console.log(handleResult(successResult));
console.log(handleResult(errorResult))


// ---------------- 2 ----------

class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }
}

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.peek());
console.log(queue.dequeue());
console.log(queue.size());

// ---------------- 3 ----------

function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    return [...arr].sort(compareFn);
}

const numbers = [5, 3, 8, 1];
const sortedNumbers = sortArray(numbers, (a, b) => a - b);
console.log(sortedNumbers);

// ---------------- 4 ----------

function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 25 };
console.log(extractProperty(person, "name"));
console.log(extractProperty(person, "age"));

// ---------------- 5 ----------

interface Identifiable {
    id: number;
}

class Repository<T extends Identifiable> {
    private items: T[] = [];

    add(item: T): void {
        if (this.items.some(i => i.id === item.id)) {
            throw new Error(`Item with id ${item.id} already exists`);
        }
        this.items.push(item);
    }

    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    removeById(id: number): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    getAll(): T[] {
        return [...this.items];
    }
}

type User = { id: number; name: string };
type Product = { id: number; title: string };

const userRepository = new Repository<User>();
userRepository.add({ id: 1, name: "Taras" });
console.log(userRepository.getById(1));

const productRepository = new Repository<Product>();
productRepository.add({ id: 101, title: "Comp" });
console.log(productRepository.getAll());

