# js-functional-programming
유인동님의 함수형 프로그래밍과 자바스크립트 강의를 보고 정리하는 레포

***

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
