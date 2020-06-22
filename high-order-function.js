const apply1 = f => f(1);
const add2 = a => a + 2;

console.log(apply1(add2)); // 3

const times = (f, n) => {
  let i = -1;
  while (i++ < n) f(i);
};

times(console.log, 3);
// 1
// 2
// 3

const addMaker = a => b => a + b;
const add10 = addMaker(10);
console.log(add10(5));