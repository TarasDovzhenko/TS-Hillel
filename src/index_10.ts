// 1
function sortArray<T>(array: T[]): T[];
function sortArray<T, K extends keyof T>(array: T[], key: K): T[];
function sortArray<T, K extends keyof T>(array: T[], key?: K): T[] {
    if (key) {
        return array.sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
            if (aValue > bValue) return 1;
            if (aValue < bValue) return -1;
            return 0;
        });
    } else {
        return array.sort();
    }
}

// 2
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 3
type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};

// 4
type PartialByKeys<T, K extends keyof T> = {
    [Key in keyof T as Key extends K ? Key : never]?: T[Key];
} & {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

// 5
type ReadonlyByKeys<T, K extends keyof T> = {
    readonly [Key in keyof T as Key extends K ? Key : never]: T[Key];
} & {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

// #6
type MutableByKeys<T, K extends keyof T> = {
    -readonly [Key in keyof T as Key extends K ? Key : never]: T[Key];
} & {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

// 7
type UpperCaseKeys<T> = {
    [K in keyof T as Uppercase<string & K>]: T[K];
};

// 8
interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropertyDescriptor;
};
