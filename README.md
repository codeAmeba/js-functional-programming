# js-functional-programming
유인동님의 함수형 프로그래밍과 자바스크립트 강의를 보고 정리하는 레포

***

## 함수형 프로그래밍과 순수함수
### 성공적인 프로그래밍
- 성공적인 프로그래밍은 좋은 프로그램을 만드는 것이다.
- 좋은 프로그램은 사용성, 성능, 확장성, 기획 변경에 대한 대응력이 좋다.
- 위의 내용들을 효율적이고 생산적으로 이루어내는 것이 성공적인 프로그래밍이다.

### 함수형 프로그래밍
- 함수형 프로그래밍은 성공적인 프로그래밍을 위하여 부수 효과를 지양하고 조합성을 강조하는 프로그래밍 패러다임이다.
- 여기서 부수 효과(side effect)를 지양한다는 의미는 **순수 함수** 를 만든다는 의미이며, 조합성을 강조하는 것은 **모듈화** 의 수준을 높여 재사용이 가능한 함수를 만든다는 의미다.

### 순수 함수

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(4, 7)); // 11
```

위와 같이 동일한 인자를 전달했을 때 항상 동일한 값이 나오는 함수를 순수 함수라고 한다.

```javascript
var c = 10;

function add2(a, b) {
  return a + b * c;
}

console.log(add2(3, 6)); // 63

c = 5;

console.log(add2(3, 6)); // 33
```

반면에 위와 같이 동일한 인자에 대해 리턴값이 달라질 가능성이 있는 함수는 순수 함수라고 할 수 없다. 물론, 위의 경에는 `c`를 상수로 선언한다면 순수 함수가 될 수 있다.

```javascript
var c = 20;
function add3(a, b) {
  c = b;
  return a + c;
}

console.log(add3(5, 6)); // 11
console.log(add3(5, 6)); // 11

console.log(c); // 6
```

또한, 위와 같이 함수의 리턴값은 동일한 인자에 대해 동일하게 출력되지만, 함수 내부에서 변수 `c`의 값이 변하는 것은 일종의 부수 효과라고 할 수 있으며, 이와 같은 경우에도 순수 함수라고 할 수 없다.

## 평가

**평가(evaluation) : 코드가 계산되어 값이 되는 과정**
자바스크립트는 브라우저 상에서 평가 단계와 실행 단계로 나뉘게 되며, 호이스팅은 평가 단계에서 일어난다.
변수는 평가 단계에 undefined가 할당(기본값) 되고, 실행 단계에서 평가가 완료된 값이 할당된다.

### 변수에 값이 할당되는 과정

```javascript
var a = 1;

// 위의 코드는 사실상 아래와 같은 과정을 거친다

var a; // 선언 : 평가 후 undefined가 할당되어 있음
a = 1; // 할당 : 평가가 완료된 값이 할당됨
```

다만, `let`과 `const`로 선언한 변수의 경우 **다르게 동작하는 것처럼 보일 수 있다.**

```javascript
const b;
// 할당 없이 선언만 하면 아래와 같은 에러가 발생한다.
// Uncaught SyntaxError: Missing initializer in const declaration

console.log(c);
let c = 2;
// Uncaught ReferenceError: b is not defined at <anonymous>:2:13
```

## 일급 함수
자바스크립트에서 함수는 1급이며, 이말은 곧 함수를 값으로 다룰 수 있다는 말이다.

```javascript
const add5 = a => a + 5;
console.log(add5(5)); // 10
```

그리고, 값으로 평가되기 때문에 함수를 다른 함수에 인자로 전달거나 함수의 실행 결과도 다시 함수를 반환할 수도 있다. 이를 고차함수라고 부른다. 이러한 특성을 이용한 것으로는 대표적으로 콜백이 있다.

```javascript
const multiply3 = a => a * 3;
console.log(multiply3(add5(3))); // 24
```

위와 같은 자바스크립트 함수의 특성을 기반으로 조합성과 추상화의 도구로써 사용하여 자바스크립트의 함수형 프로그래밍이라는 패러다임이 가능하다.

## 고차함수
함수를 인자로 받거나 리턴값이 함수거나 혹은 둘 다인 함수를 고차함수라고 부른다.

**함수를 인자로 받는 함수 예시**

```javascript
const times = (f, n) => {
  let i = -1;
  while (i++ < n) f(i);
};

times(console.log, 3);
// 1
// 2
// 3
```

**함수를 리턴하는 함수 예시**
함수를 리턴하며 동시에 클로저를 만들어 리턴함
함수가 함수를 리턴할 때에는 결국 클로저를 리턴하기 위한 목적

```javascript
const addMaker = a => b => a + b;
const add10 = addMaker(10);
console.log(add10(5)); // 15
```

## map과 filter
ES5에서 도입된 내장 함수 중 `map`과 `filter`가 있다. 이를 통해 함수형 자바스크립트를 사용하기가 보다 수월해졌다. `map`과 `filter`가 등장하기 전에는 아래와 같이 코드를 작성해야 했다.

```javascript
const users = [
  {id: 1, name: 'AJ', age: 36},
  {id: 2, name: 'JS', age: 32},
  {id: 3, name: 'MJ', age: 23},
  {id: 4, name: 'HY', age: 29},
  {id: 5, name: 'SY', age: 30},
  {id: 6, name: 'EB', age: 33},
  {id: 7, name: 'TK', age: 27},
  {id: 8, name: 'YJ', age: 35},
  {id: 9, name: 'HH', age: 39},
];

// 30세 이상을 거른다
let overThirty = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    overThirty.push(users[i]);
  }
}

// 30세 이상인 users의 name을 수집한다.
let namesOverThirty = [];
for (let i = 0; i < overThirty.length; i++) {
  namesOverThirty.push(overThirty[i].name);
}

// 30세 미만의 users를 거른다
let underThirty = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    underThirty.push(users[i]);
  }
}

// 30세 미만 users의 age를 수집한다.
let agesUnderThirty = [];
for (let i = 0; i < underThirty.length; i++) {
  agesUnderThirty.push(underThirty[i].age);
}
```

우리에게 익숙한 `for`문이지만, `map`과 `filter`를 통해 더욱 심플하고 직관적인 코드로 리팩토링이 가능하다.

위의 코드를 `map`과 `filter`의 매커니즘을 사용하여 리팩토링해보자.

```javascript
function myFilter(users, myFunc) {
  let newUsers = [];
  for (let i = 0; i < users.length; i++) {
    if (myFunc(users[i])) {
      newUsers.push(users[i]);
    }
  }
  return newUsers;
}

console.log(
  myFilter(users, function(users) {
    return users.age >= 30;
  })
);
```

위의 코드가 `filter`의 동작을 구현한 고차함수다. 그 말은 곧, ES5에서 추가된 내장함수 `filter`는 함수를 인자로 받거나 값으로 내보내는 **고차함수** 라는 말이기도 하다.



## ES6의 리스트 순회
함수형 자바스크립트에서는 리스트 순회가 특히 중요하다.
ES5까지는 `for`문으로 순회하던 것을 ES6부터는 아래와 같이 `for ...of`로 보다 간단하게 순회할 수 있게 되었다.

```javascript
const arr = [1, 2, 3];
const str = 'abc';

for (const a of arr) {
  console.log(a);
};
// 1
// 2
// 3

for (const a of str) {
  console.log(a);
};
// a
// b
// c
```

이전에 비해 일단 문법이 간결해졌으며, 과정을 보여주기 보다는 더욱 **선언적인** 형태를 띄고 있다.

## 이터러블/이터레이터 프로토콜
Array, Set, Map은 **순회가 가능한 이터러블/이터레이터 프로토콜** 을 따르고 있다. 따라서 아래와 같이 각각 ES6에서 추가된 `for ...of`문을 통해 순회가 가능하다.

**Array**

```javascript
const arr = [1, 2, 3];
for (const a of arr) console.log(a);
// 1
// 2
// 3

console.log(arr[0]); // 1
```

Array의 경우 인덱스(key)를 통해 접근 가능하다.


**Set**

```javascript
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
// 1
// 2
// 3

console.log(set[0]); // undefined
```

그러나 Set은 인덱스(key)를 통한 접근이 불가능하다.

**Map**

```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) console.log(a);
// (2) ["a", 1]
// (2) ["b", 2]
// (2) ["c", 3]

console.log(map(0)); // TypeError: map is not a function
```

Map도 마찬가지로 인덱스를 통한 접근이 불가능하다.
이말은 곧, `for`문과 `for ...of`문이 내부적으로 다르게 동작한다는 말이기도 하다.

여기서 **이터러블** 의 의미에 대해 다시 한 번 짚고 넘어갈 필요가 있다.
이터러블은, 이터레이터를 리턴하는 `[Symbol.iterator]()`를 가진 값인데, `[Symbol.iterator]()`가 무엇인지 이해를 돕기 위해 아래의 예시 코드를 보자.

```javascript
console.log(arr[Symbol.iterator]); // values() { [native code] }
console.log(set[Symbol.iterator]); // values() { [native code] }
console.log(map[Symbol.iterator]); // entries() { [native code] }
```

위와 같이 이터러블한 세 가지 객체에 대해 `[Symbol.iterator]()`로 접근했을 때 네이티브 함수가 담겨 있음을 알 수 있다. 그리고, 여기서 또 하나 실험을 해볼 수가 있다.

```javascript
arr[Symbol.iterator] = null;
for (const a of arr) console.log(a);
// Uncaught TypeError: arr is not iterable
```

기본적으로 내장되어 있던 `[Symbol.iterator]()` 값으로 `null`을 할당한 후에도 `for ...of`문으로 순회가 가능한지 보는 것인데, 위와 같이 해당 객체는 이터러블이 아니라는 에러 메시지를 볼 수 있다. 이를 통해 알 수 있는 것은 이터러블 객체를 이터러블이게 하는 것은 결국 `[Symbol.iterator]()`이라는 네이티브 함수라는 사실이다.

그렇다면, 이터러블이 리턴한다는 **이터레이터** 란 무엇인가. 이터레이터는 `{value, done}` 객체를 리턴하며 `next()` 메서드를 갖고 있는 값이다.
아래의 예시 코드를 보자.

```javascript
let iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

위와 같이 `next()` 메서드를 실행했을 때 `value`와 `done`이라는 키와 함께 값이 리턴됨을 알 수 있으며, 모든 값이 리턴됐을 경우에는 `{value: undefined, done: true}`가 리턴됨을 알 수 있다.

이처럼 이터러블을 `for ...of`이나 `...(spread operator)` 등으로 동작하도록 정해놓은 규약이 **이터러블/이터레이터 프로토콜** 이라고 할 수 있다.