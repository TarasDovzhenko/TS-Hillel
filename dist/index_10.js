"use strict";
function sortArray(array, key) {
    if (key) {
        return array.sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
            if (aValue > bValue)
                return 1;
            if (aValue < bValue)
                return -1;
            return 0;
        });
    }
    else {
        return array.sort();
    }
}
