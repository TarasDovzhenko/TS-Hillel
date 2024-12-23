interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    percent(value: number, total: number): number;
    calculate(operation: string, ...args: number[]): number;
}

class Calculator implements ICalculator {
    calculate(operation: "add" | "subtract" | "multiply" | "divide", a: number, b: number): number;
    calculate(operation: "percent", value: number, total: number): number;

    calculate(operation: string, ...args: number[]): number | never {
        switch (operation) {
            case "add":
                return this.add(args[0], args[1]);
            case "subtract":
                return this.subtract(args[0], args[1]);
            case "multiply":
                return this.multiply(args[0], args[1]);
            case "divide":
                return this.divide(args[0], args[1]);
            case "percent":
                return this.percent(args[0], args[1]);
            default:
                throw new Error("Error");
        }
    }

    add(a: number, b: number): number {
        return a + b;
    }
    subtract(a: number, b: number): number {
        return a - b;
    }
    multiply(a: number, b: number): number {
        return a * b;
    }
    divide(a: number, b: number): number {
        return a / b;
    }
    percent(value: number, total: number): number {
        return (value / total) * 100;
    }
}

const calculator = new Calculator();

console.log(calculator.calculate("add", 10, 5));
console.log(calculator.calculate("divide", 20, 4));


// console.log(calculator.add(5, 5));
// console.log(calculator.subtract(10, 3));
// console.log(calculator.multiply(4, 6))
// console.log(calculator.divide(20, 5));
// console.log(calculator.percent(25, 100));
// console.log(calculator.calculate("add", 10, 20));
// console.log(calculator.calculate("percent", 50, 200));
