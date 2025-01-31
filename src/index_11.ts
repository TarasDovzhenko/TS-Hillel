// 1
type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// 2
type PickByValueType<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

// 3
type OmitByValueType<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? never : K]: T[K];
};

// 4
type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;

// 5
type ExtendedCustomReturnType<T extends (...args: any) => any> = T extends (...args: infer P) => infer R ? [R, P] : never;
