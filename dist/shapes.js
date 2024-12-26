"use strict";
class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    printInfo() {
        console.log(`Figure: ${this.name}`);
        console.log(`Color: ${this.color}`);
        console.log(`Area: ${this.calculateArea()}`);
        console.log(`Perimeter: ${this.calculatePerimeter()}`);
    }
}
class EllipticalShape extends Shape {
    constructor(name, color, radius1, radius2) {
        super(name, color);
        this.radius1 = radius1;
        this.radius2 = radius2;
    }
    printDiameter() {
        console.log(`Diameter: ${this.radius1 * 2} and ${this.radius2 * 2}`);
    }
}
class Circle extends EllipticalShape {
    constructor(color, radius) {
        super("Circle", color, radius, radius);
    }
    calculateArea() {
        return Math.PI * Math.pow(this.radius1, 2);
    }
    calculatePerimeter() {
        return 2 * Math.PI * this.radius1;
    }
}
class Ellipse extends EllipticalShape {
    calculateArea() {
        return Math.PI * this.radius1 * this.radius2;
    }
    calculatePerimeter() {
        return Math.PI * (3 * (this.radius1 + this.radius2) - Math.sqrt((3 * this.radius1 + this.radius2) * (this.radius1 + 3 * this.radius2)));
    }
}
class Polygon extends Shape {
    constructor(name, color, sides) {
        super(name, color);
        this.sides = sides;
    }
    getNumberOfSides() {
        return this.sides.length;
    }
    calculatePerimeter() {
        return this.sides.reduce((sum, side) => sum + side, 0);
    }
}
class Rectangle extends Polygon {
    constructor(color, width, height) {
        super("Rectangle", color, [width, height, width, height]);
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
    printAreaFormula() {
        console.log("formula: width × height");
    }
}
class Square extends Rectangle {
    constructor(color, sideLength) {
        super(color, sideLength, sideLength);
    }
}
class Triangle extends Polygon {
    constructor(color, a, b, c) {
        super("Triangle", color, [a, b, c]);
        this.a = a;
        this.b = b;
        this.c = c;
    }
    calculateArea() {
        const s = this.calculatePerimeter() / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    printAreaFormula() {
        console.log("Formula: √[s(s-a)(s-b)(s-c)]");
    }
    printTriangleType() {
        if (this.a === this.b && this.b === this.c) {
            console.log("Equilateral");
        }
        else if (this.a === this.b || this.b === this.c || this.a === this.c) {
            console.log("Isosceles");
        }
        else {
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
