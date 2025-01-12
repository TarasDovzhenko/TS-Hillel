"use strict";
function fetchData() {
    return { name: "Alice", age: 25 };
}
function printPersonInfo(person) {
    console.log(`Name: ${person.name}, Age: ${person.age}`);
}
const data = fetchData();
printPersonInfo(data);
