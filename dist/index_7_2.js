"use strict";
function fetchData() {
    return { name: "Tara", age: 25 };
}
function printPersonInfo(person) {
    if (typeof person !== "object" ||
        person === null ||
        typeof person.name !== "string" ||
        typeof person.age !== "number") {
        throw new Error("Error");
    }
}
const data = fetchData();
printPersonInfo(data);
console.log(`Name: ${data.name}, Age: ${data.age}`);
