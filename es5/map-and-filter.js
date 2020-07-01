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

console.log(overThirty); // => 30세 이상 users만 배열에 담겨 출력된다.

// 30세 이상인 users의 name을 수집한다.
let namesOverThirty = [];
for (let i = 0; i < overThirty.length; i++) {
  namesOverThirty.push(overThirty[i].name);
}

console.log(namesOverThirty); // => 30세 이상 users의 name만 모은 배열이 출력된다.

// 30세 미만의 users를 거른다
let underThirty = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    underThirty.push(users[i]);
  }
}

console.log(underThirty); // => 30세 미만 users의 배열이 출력된다.

// 30세 미만 users의 age를 수집한다.
let agesUnderThirty = [];
for (let i = 0; i < underThirty.length; i++) {
  agesUnderThirty.push(underThirty[i].age);
}

console.log(agesUnderThirty); // => 30세 미만 users의 age만 담긴 배열이 출력된다.


// filter
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

console.log(
  myFilter(users, function(users) {
    return users.age < 30;
  })
);

// map
function myMap(list, mapper) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push(mapper(list[i]));
  }
  return newList;
}

const over30 = myFilter(users, function(users) {
  return users.age >= 30;
});

console.log(over30);

const nameOver30 = myMap(over30, function(user) {
  return user.name;
});

console.log(nameOver30);

const under30 = myFilter(users, function(users) {
  return users.age < 30;
});

const nameUnder30 = myMap(under30, function(user) {
  return user.name;
});

console.log(nameUnder30);


console.log(
  myMap(
    myFilter(users, function(user) { return user.age < 30; }),
    function(user) { return user.age; })
);

console.log(
  myMap(
    myFilter(users, function(user) { return user.age >= 30; }),
    function(user) { return user.name; })
);

