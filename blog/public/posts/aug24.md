---
title: '2024년 8월 10일'
date: '2024-08-10'
description: '2024년 8월 공부 로그'
---
# 8월 10일 
## 리액트 기초
틱택토 게임 제작

# 8월 13일 
## 리액트 기초
  
### 리액트와 재사용성
1. 리액트는 컴포넌트 기반이라 재사용에 용이함

### 기존 프로젝트에서 사용

```html
<div id="root"></div>

<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>

<script src="MyButton.js"></script>
```
### create-react-app
처음부터 리액트로 빌드 할때 사용 

- 사용 방법
    ```
    npx create-react-app <프로젝트 이름>
    ```

  cd 하고 `npm start` 하면 로컬호스트 3000번 포트로 접속됨

### JSX

 - 자바스크립트의 문법을 확장 시켜준것
  ``` js
React.CreateElement
  ```

- jsx 를 사용하면... 
```
1. 간결하게 코드 표현 가능
2. 가독성 향상
3. 인젝션 어택 방어
4. 

```

#### 사용 방법
```js
XML/ HTML CODE..
{JAVASCRIPT CODE}..
XML/ HTML CODE..
```

XML / HTML 코드 {JS CODE}를 중괄호 사이에 껴서 사용 

-> 중괄호를 사용하면 무조건 JS 가 들어간다
 
Elements 생성 후에는 children 이나 attributes 를 바꿀  수 없다.

#### Elements 렌더링 하기 
- root DOM code
```jsx
<div id = "root"></div>
```
리액트에 필수 적임  
DOM의 최상단

```jsx
const element = <h1>h1</h1>;
ReactDOM.render(element, document.getElementById('root'));
//버츄얼 돔 >> 실제 돔
```
#### 불변성
```jsx
function tick() {
    const element = (
        <div>
          <h2> {new Date().toLocaleDateString()}</h2>
        </div>
    );
    
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

이 코드에선 매초 Date 부분 만 계속 변경됨 (크롬 반짝이는 걸로 확인 가능)

불변성 떄문에 react의 Element를 만들때 에는 새로 만들어야함

### 시계만들기 
react-study/chapter04

```jsx
//Clock.jsx
import React from "react";

function Clock(props) {
  return (
          <div>
            <h1>Hello,,,,!</h1>
            <h2>현재 시간 :  {new Date().toLocaleTimeString()}</h2>
          </div>
  );
}

export default Clock;
```

   clock 을 만드는 간단한 함수 
   
```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Clock from './chapter_04/Clock';

const root = ReactDOM.createRoot(document.getElementById('root'))
setInterval(() => {
  root.render(
          <React.StrictMode>
            <Clock />
          </React.StrictMode>,
          // document.getElementById('root')
  );
},1000);
reportWebVitals();
```

최신 버전에서는 `ReactDOM.render ()` 이렇게 적지 않음. (리액트 18)  
`document.getElementById('root')`도 주석 처리

하나의 컴포넌트로 재사용  

Props -> React Component -> React element

React component => 객체지향 의 클래스, 인스턴트와 비슷함

### 8월 16일
#### Props
하나의 component 에 여러개의 Element (props)를 만든다  
컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체

- Read only 
수정할 수 없다!

수정 할떄에는 새로운 Element를 만들 면 된다.


- 순수한 함수 (Pure function)
```jsx
function  sum(a,b) {
    return a + b;
}
// 입력값을 변경하지 않으며 같은 입력값에 대해서는 항상 같은 출력값을 리턴 하는 함수
```
- 순수하지 않은 함수 (Impure function)
```jsx
function withdraw(account, amount) {
    account.total -= amount;
}
// 입력값이 변경됨 
```

- 정리
```
모든 리액트 컴포넌트는 Props를 직접 바꿀 수 없고,  
같은 Props에 대해서는 항상 같은 결과를 보여줄것!!
```

#### Props 사용법  
```js
//jsx 를 사용하는 경우
function App(props) {
    return (
        <profile
          name = "썸딩"
          introduction = "안녕하세요"
          viewCount={1500}
        /> // 프로필 컴포넌트, Name introduction,,, 은 속성임
    );
}
```

`{}`를 사용하면 무조건 Java Script 가 들어간다.

왠만하면 JSX 형태로 사용할 것.

#### Class Component 

```jsx
class Welcome extends React.component {
    render() {
        return <h1>안녕 {this.props.name}</h1>
    }
}
```

Component 이름은 항상 대문자로 시작해야한다. > 규칙임 무조건 따라야함

```
comment Component > UserInfo Component > Avatar Component
```

 재사용 가능한 component를 많이 가지고 있을 수록 개발 속도가 향상됨
- 직관적인 component 이름으로 만들것 예) (userInfo)

#### 댓글 컴포넌트 만들기

### State (상태)
- 리액트에서 가장 중요한 개념이라고 생각해도 됨

리액트 Component의 변경 가능한 데이터

state 에는 성능저하가 일어날 수 있기 때문에 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함시켜야함

```jsx
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked : false
        };
    }
    ...
}
```
- state 는 직접 수정 할 수 없다.

```jsx
// state를 직접 수정 (잘못된 사용법)
this.state = {
    name : 'someding'
};

//setState 함수를 통한 수정 (정상적인 사용법)
this.setState({
  name: 'someding'
})
```

### Lifecycle
- 리액트 Component의 생명 주기를 의미한다.

### State, Lifecycle 사용하기 (실습)

### Hooks

component -> function component , class component 

기존 함수 컴포넌트는 [state 사용 불가, Lifecycle에 따른 기능 구현 불가] 였지만
Hooks 를 사용하면 class component 처럼 사용 할 수 있다.

대체적으로 이름 앞에 `use`를 붙이면 된다.
#### `useState` : state를 사용하기 위한 Hook
- `useState` 사용 방법
```jsx
const [변수명, set함수명] = useState(초기값);
```

- `useState` 를 사용하지 않은 Code
```jsx
function Counter(props) {
    var count = 0;
    return (
            <div>
              <p>총 {count} 번 클릭했습니다.</p>
              <button onClick = {() => count++}>
                클릭
              </button>
            </div>
    );
} 
```
버튼을 클릭하면 숫자를 증가시키는 간단한 함수 이지만,   
재렌더링이 일어나지 않아, 실제로 숫자가 증가 하지 않음 (함수 컴퍼넌트)

- `useState` 를 사용하는 Code
```jsx
import React, { useState } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);
    
    return (
            <div>
              <p>총 {count} 번 클릭했습니다.</p>
              <button onClick = {() => setCount(count+1)}>
                클릭
              </button>
            </div>
    );
} 

//변수 각각에 대해 set 함수가 따로 존재한다.
```

#### `useEffect`
+ Side effect (효과) 를 수행하기 위한 HOOK
+ `Side Effect` : 다른 컴포넌트에 영향을 미칠 수 있으며, 렌더링 중에는 작업을 완료 할 수 없음
+ 사용방법
```jsx
useEffect(() => {
  //이펙트 함수
}, [//의존성배열 (대괄호 를 사용하면 mount, unmount시에 단 한번씩만 시행됨)
]);
// useEffect(이펙트 함수 , 의존성 배열);
```
`의존성 배열` : 배열 안에 값이 하나라도 변경 되었을 때 `이펙트 함수` 가 실행 된다.  
- Effect Function 이 mount,unmount 시에 단 한 번씩만 실행 된다.

- `useEffect` 를 사용한 Code
```jsx
import React, { useState , useEffect } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);
    
    //componentDidMount, componentDidUpdate 와 비슷하게 작동합니다.
    useEffect(() => {
        // 브라우저 API를 사용해서 document의 title을 업데이트 합니다.
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>총 {count} 번 클릭했습니다.</p>
            <button onClick={() => setCount(count + 1)}>
                클릭
            </button>
        </div>
    );
}
//변수 각각에 대해 set 함수가 따로 존재한다.
```
- 정리
```jsx
useEffect(() => {
  // 컴포넌트가 마운트된 이후,
  // 의존성 배열에 있는 변수들 중 하나라도 값이 변경 되었을때 실행됨
  // 의존성 배열에 빈 배열 을 넣으면 마운트와 언마운트 시에 단 한번씩 만 실행됨
  // 의존성 배열 생략시 컴포넌트 업데이트 시마다 실행됨
  
  return () => {
      // 컴포넌트가 마운트 해제 되기 전에 실행됨
  }
}, [의존성 변수1, 의존성 변수2, ... ]);
```
  
#### `useMemo()` 
- `Memorized Value`를 리턴하는 HOOK
- `Memoization` : 연산량이 많이드는 함수의 호출 결과를 저장해 두었다가 새로 함수를 호출 하지 않고 호출 결과를 반환
- `Memoization Value` : memoization이 된 결과 값

```jsx
const memoizedValue = useMemo(
        () => {
            //연산량이 높은 작업을 수행하여 결과를 반환
          return 
        }
)
```

- 의존성 배열을 넣지 않을 경우, 매 렌더링 마다 함수가 실행된다.
```jsx
const memoizedValue = useMemo(
        () => computeExpensiveValue(a,b)
);
```

- 빈배열 일 경우, 컴포넌트 마운트 시에만 호출한다.

사실상 이용할 필요가 없으므로 의존성배열이 있을때만 사용하는걸로 하자.

### `useCallback()`
  - `useMemo()` 와 비슷하지만 값이 아니라 함수를 반환한다.

```jsx
const memoizedCallback = useCallback(
        () => {
            doSomething(의존성 변수1, 의존성 변수2);
        },
        [의존성 변수1, 의존성 변수2]
);
```

특정 변수의 값이 변한 경우에만 함수를 다시 사용해서, 불필요한 반복 작업을 없애줌

### `useRef()`
```jsx
const refContainer = useRef(초기값);
```

### Hook의 규칙
- Hook은 무조건 최상위 레벨 에서만 호출해야한다. (반복문, 조건문 안에서 사용x)
- Hook은 컴포넌트가 렌더링 될 때마다 매번 같은 순서로 호출되어야 한다. (이렇게 해야 React가 다수의 useState hook 과 useEffect 훅에 호출해서 컴포넌트의 state를 올바르게 관리 할 수 있게 된다.)

```
1. Hook은 무조건 최상위 레벨에서만 호출해야한다.
2. 리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.
```

### eslint-plugin-react-hooks
-> Hook의 규칙을 따르도록 강제하는 프로그램

### Custom Hook 만들기

이름이 use로 시작하고 내부에서 다른 Hook을 호출하는 하나의 자바스크립트 함수

 ## 8월 19일

### Event의 정의와 Event 다루기


```jsx
//예제코드
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { isToggleOn : true};
        
        //callback에서 `this`를 사용하기 위해서는 바인딩을 필수적으로 해야한다.
      this.handleClick = this.handleClick.bind(this); //bind를 하는 부분
    }
    
    //bind를 정의하는 부분
    handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    }
    
    render() {
        return (
            <button onClick={this.handleClick}>
              {this.state.isToggleOn ? '켜짐' : '꺼짐'}
            </button>
        );
    }
}
```

자바스크립트에서는 클래스 함수들이 바운드 되지 않는다

### 파라미터 (매개 변수)

### turthy 와 falsy
```jsx
true
{} (empty object)
[] (empty array)
42 (number, not zero)
"0" , "false" (string, not empty)

//falsy
0, -0 (zero, minus zero)
0n (BigInt zero)
'', "", `` (empty string)
null
undefined
NaN (not a number)
```

Element Variables  

### InLine : 조건문을 코드 문 안에 넣는 것

IF 문의 경우에는 && 문을 사용
```
true && expression -> expression
false && expression -> false
```

결과가 정해져 있는 논리 연산에서 굳이 필요하지 않은 연산은 하지 않도록 하기 위해 사용하는 방법
트루 이면 expression 이 나오고, false 이면 false 출력

```jsx
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    
    return (
            <div>
              <h1>안녕하세요</h1>
              {unreadMessages.length > 0 &&
                <h2>
                    현재 {unreadMessages.length} 개의 읽지 않은 메시지가 있습니다
                </h2>
              }
            </div>
    );
}
```
`length`가 0 보다 크면 `h2` 가 출력 됨, 그리고 0보다 작으면 `false` 가 출력 되어 아무것도 출력되지 않음.

