# js-functional-programming
유인동님의 함수형 프로그래밍과 자바스크립트 강의를 보고 정리하는 레포

***

## 평가와 일급

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

