// 순수 함수
function add(a, b) {
  return a + b;
}

console.log(add(4, 7));

// 변하는 리턴 값
var c = 10;

function add2(a, b) {
  return a + b * c;
}

console.log(add2(3, 6));

c = 5;

console.log(add2(3, 6));

// 부수 효과
var c = 20;
function add3(a, b) {
  c = b;
  return a + c;
}

console.log(add3(5, 6));
console.log(add3(5, 6));

console.log(c);