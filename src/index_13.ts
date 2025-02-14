// 1. DeprecatedMethod
function DeprecatedMethod(reason?: string, replacement?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.warn(
                `⚠️ Метод "${propertyKey}" устарел.${replacement ? ` Используйте "${replacement}" вместо него.` : ""}${reason ? ` Причина: ${reason}.` : ""}`
            );
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

// 2. MinLength, MaxLength, Email
const validators: Record<string, ((value: any) => string | null)[]> = {};

function MinLength(length: number) {
    return function (target: any, propertyKey: string) {
        validators[propertyKey] = validators[propertyKey] || [];
        validators[propertyKey].push((value) =>
            value.length < length ? `Минимальная длина ${length}` : null
        );
    };
}

function MaxLength(length: number) {
    return function (target: any, propertyKey: string) {
        validators[propertyKey] = validators[propertyKey] || [];
        validators[propertyKey].push((value) =>
            value.length > length ? `Максимальная длина ${length}` : null
        );
    };
}

function Email(target: any, propertyKey: string) {
    validators[propertyKey] = validators[propertyKey] || [];
    validators[propertyKey].push((value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Некорректный email"
    );
}

function validate(obj: any) {
    const errors: Record<string, string[]> = {};
    for (const key in validators) {
        const value = obj[key];
        const messages = validators[key]
            .map((fn) => fn(value))
            .filter((msg): msg is string => msg !== null);
        if (messages.length) errors[key] = messages;
    }
    return errors;
}

// 3. Experimental decorators
type ValidatorFn = (value: any) => string | null;
const validatorsMap = new WeakMap<object, Record<string, ValidatorFn[]>>();

function addValidator(target: any, propertyKey: string, fn: ValidatorFn) {
    if (!validatorsMap.has(target)) {
        validatorsMap.set(target, {});
    }
    const validators = validatorsMap.get(target)!;
    validators[propertyKey] = validators[propertyKey] || [];
    validators[propertyKey].push(fn);
}

function MinLengthExp(length: number) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, (value) =>
            value.length < length ? `Минимальная длина ${length}` : null
        );
    };
}

function MaxLengthExp(length: number) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, (value) =>
            value.length > length ? `Максимальная длина ${length}` : null
        );
    };
}

function EmailExp(target: any, propertyKey: string) {
    addValidator(target, propertyKey, (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Некорректный email"
    );
}

function validateExp(obj: any) {
    const errors: Record<string, string[]> = {};
    const validators = validatorsMap.get(obj);
    if (!validators) return errors;

    for (const key in validators) {
        const value = obj[key];
        const messages = validators[key]
            .map((fn) => fn(value))
            .filter((msg): msg is string => msg !== null);
        if (messages.length) errors[key] = messages;
    }
    return errors;
}
