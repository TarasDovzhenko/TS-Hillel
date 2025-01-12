type Person = {
    name: string;
    age: number;
};

function fetchData(): unknown {
    return { name: "Alice", age: 25 };
}

function printPersonInfo(person: { name: string; age: number }): void {
    console.log(`Name: ${person.name}, Age: ${person.age}`);
}

const data = fetchData() as Person;
printPersonInfo(data);
