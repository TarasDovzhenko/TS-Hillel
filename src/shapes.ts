abstract class Shape {
    protected constructor(public readonly name: string, public readonly color: string) {}

    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;

    printInfo(): void {
        console.log(`Figure: ${this.name}`);
        console.log(`Color: ${this.color}`);
        console.log(`Area: ${this.calculateArea()}`);
        console.log(`Perimeter: ${this.calculatePerimeter()}`);
    }
}

abstract class EllipticalShape extends Shape {
    constructor(name: string, color: string, public readonly radius1: number, public readonly radius2: number) {
        super(name, color);
    }

    printDiameter(): void {
        console.log(`Diameter: ${this.radius1 * 2} and ${this.radius2 * 2}`);
    }
}

class Circle extends EllipticalShape {
    constructor(color: string, radius: number) {
        super("Circle", color, radius, radius);
    }

    calculateArea(): number {
        return Math.PI * this.radius1 ** 2;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius1;
    }
}

class Ellipse extends EllipticalShape {
    calculateArea(): number {
        return Math.PI * this.radius1 * this.radius2;
    }

    calculatePerimeter(): number {
        return Math.PI * (3 * (this.radius1 + this.radius2) - Math.sqrt((3 * this.radius1 + this.radius2) * (this.radius1 + 3 * this.radius2)));
    }
}

abstract class Polygon extends Shape {
    constructor(name: string, color: string, public readonly sides: number[]) {
        super(name, color);
    }

    getNumberOfSides(): number {
        return this.sides.length;
    }

    calculatePerimeter(): number {
        return this.sides.reduce((sum:number, side:number) => sum + side, 0);
    }

    abstract printAreaFormula(): void;
}

class Rectangle extends Polygon {
    constructor(color: string, public readonly width: number, public readonly height: number) {
        super("Rectangle", color, [width, height, width, height]);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    printAreaFormula(): void {
        console.log("formula: width × height");
    }
}

class Square extends Rectangle {
    constructor(color: string, sideLength: number) {
        super(color, sideLength, sideLength);
    }
}

class Triangle extends Polygon {
    constructor(color: string, public readonly a: number, public readonly b: number, public readonly c: number) {
        super("Triangle", color, [a, b, c]);
    }

    calculateArea(): number {
        const s = this.calculatePerimeter() / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    printAreaFormula(): void {
        console.log("Formula: √[s(s-a)(s-b)(s-c)]");
    }

    printTriangleType(): void {
        if (this.a === this.b && this.b === this.c) {
            console.log("Equilateral");
        } else if (this.a === this.b || this.b === this.c || this.a === this.c) {
            console.log("Isosceles");
        } else {
            console.log("Scalene");
        }
    }
}

const circle = new Circle("red", 33);
circle.printInfo();
circle.printDiameter();

const rectangle = new Rectangle("blue", 33, 22);
rectangle.printInfo();

const square = new Square("green", 55);
square.printInfo();

const triangle = new Triangle("yellow", 5, 5, 8);
triangle.printInfo();
triangle.printTriangleType();
