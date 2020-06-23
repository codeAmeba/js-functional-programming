const arr = [1, 2, 3];

const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) console.log(a);

console.log(arr[Symbol.iterator]);
console.log(set[Symbol.iterator]);
console.log(map[Symbol.iterator]);

// arr[Symbol.iterator] = null; 
for (const a of arr) console.log(a);

let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());