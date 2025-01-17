type Person = {
    name: string;
    age: number;
};

function fetchData(): unknown {
    return { name: "Alice", age: 25 };
}

function printPersonInfo(person: unknown): asserts person is Person {
    if (
        typeof person !== "object" ||
        person === null ||
        typeof (person as any).name !== "string" ||
        typeof (person as any).age !== "number"
    ) {
        throw new Error("Error");
    }
}

const data = fetchData();

printPersonInfo(data);

console.log(`Name: ${(data as Person).name}, Age: ${(data as Person).age}`);
