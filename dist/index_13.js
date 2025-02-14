"use strict";
// 1. DeprecatedMethod
function DeprecatedMethod(reason, replacement) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.warn(`⚠️ Метод "${propertyKey}" устарел.${replacement ? ` Используйте "${replacement}" вместо него.` : ""}${reason ? ` Причина: ${reason}.` : ""}`);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
// 2. MinLength, MaxLength, Email
const validators = {};
function MinLength(length) {
    return function (target, propertyKey) {
        validators[propertyKey] = validators[propertyKey] || [];
        validators[propertyKey].push((value) => value.length < length ? `Минимальная длина ${length}` : null);
    };
}
function MaxLength(length) {
    return function (target, propertyKey) {
        validators[propertyKey] = validators[propertyKey] || [];
        validators[propertyKey].push((value) => value.length > length ? `Максимальная длина ${length}` : null);
    };
}
function Email(target, propertyKey) {
    validators[propertyKey] = validators[propertyKey] || [];
    validators[propertyKey].push((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Некорректный email");
}
function validate(obj) {
    const errors = {};
    for (const key in validators) {
        const value = obj[key];
        const messages = validators[key]
            .map((fn) => fn(value))
            .filter((msg) => msg !== null);
        if (messages.length)
            errors[key] = messages;
    }
    return errors;
}
const validatorsMap = new WeakMap();
function addValidator(target, propertyKey, fn) {
    if (!validatorsMap.has(target)) {
        validatorsMap.set(target, {});
    }
    const validators = validatorsMap.get(target);
    validators[propertyKey] = validators[propertyKey] || [];
    validators[propertyKey].push(fn);
}
function MinLengthExp(length) {
    return function (target, propertyKey) {
        addValidator(target, propertyKey, (value) => value.length < length ? `Минимальная длина ${length}` : null);
    };
}
function MaxLengthExp(length) {
    return function (target, propertyKey) {
        addValidator(target, propertyKey, (value) => value.length > length ? `Максимальная длина ${length}` : null);
    };
}
function EmailExp(target, propertyKey) {
    addValidator(target, propertyKey, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Некорректный email");
}
function validateExp(obj) {
    const errors = {};
    const validators = validatorsMap.get(obj);
    if (!validators)
        return errors;
    for (const key in validators) {
        const value = obj[key];
        const messages = validators[key]
            .map((fn) => fn(value))
            .filter((msg) => msg !== null);
        if (messages.length)
            errors[key] = messages;
    }
    return errors;
}
