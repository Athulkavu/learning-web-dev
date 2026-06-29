const numbers = [1, 2, 3, 4, 5, 2, 3, 6, 3];

function findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set(); // Using a Set prevents listing the same duplicate multiple times

    for (const item of arr) {
        if (seen.has(item)) {
            duplicates.add(item);
        } else {
            seen.add(item);
        }
    }
    return Array.from(duplicates);
}

console.log(findDuplicates(numbers)); 
// Output: [2, 3]
