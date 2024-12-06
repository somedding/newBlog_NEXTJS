---
title: '2024년 9월 12일'
date: '2024-09-12'
description: '2024년 9월 공부 로그'
---
# 9월 12일
## C# 기초

### Mac에서 .NET 사용법

생성하기
```
dotnet new console —framework net8.0 —use-program-main
```


실행
```
dotnet run
```

### 자료형

### float
 float f = 10.5f;

# 9월 16일
## 리액트 웹앱 만들기 (타입스크립트)

### Chance, Luxon 패키지
chance : 그럴듯한 가짜 데이터 생성
luxon : 날짜 >> n분전 과 같은 형태

```
npm i chance luxon
```

```
npm i -D @types/chance @types/luxon
```

가짜 데이터 만드는 함수 만들기

```ts
export const makeArray = (length : number) => new Array(length).fill(null)
export const range = (min: number, max: number): number[] =>
    makeArray(max - min).map((notUsed, index) => index + min)
export const random = (min: number, max: number): number =>
    Math.floor(Math.random() * (max-min)) + min
```

makeArray 함수 : Array 클래스를 좀더 간결하게
const Array = new Array

# 9월 19일
## C#
### Switch 조건문
```c#
switch(input) {
    case 12:
    case 1:
    case 2:
        Console.WriteLine("겨울입니다");
        break; //case 뒤에 break 안쓰면 오류남
}
```
break 를 사용하지 않는 switch 문

### 3항 연산자
```
[불 표현식]?[참]:[거짓]
```
`[불 표현식]` : 조건문 형태  

`[불 표현식]`이 참 이면 `[참]` 거짓 이면 `[거짓]` 출력  


### 반복문과 배열(1)  
#### length의 속성  
`new` : 객체 생성

### while 반복문
```c#
while (//조건문 
) {
    //실행문
}
```

- 예시

```c#
do {
    Console.Write("EXIT을 쳐라")
    input = Console.ReadLine();
}while (input != "exit")
```

### for 문
- 원하는 횟수 반복
```c#
int output = 0;
for (int = 0; i <= 100; i++)
{
    output += 1;
}
```

int 에는 `가` 와 같은 문자를 넣어도 됨

```c#
for (int i = '가' ; i<= '힣'; i++)
{
    console.Write((char)i) ; //캐스팅
} 
```

### 역 for
```c#
for (int i = length -1 ; i >=0 ; i--) {
    //실행
}
```

### foreach
```c#
int[] num = (1,2,3,4,5);
    foreach (var item in num) // var 은 자동
    {
        System.Console.WriteLine();       
    }
```

var 을 주로 사용한다.  

### 이중 For 문
```c#
for ( int i = 0; i < 10; i++)
{
    for (int j = 0; j < i + 1; j++)
        Console.Write('*');
    Console.Write('₩n');
}
```

### Label
코드 블럭이다 . 중간중간 넣어도 됨
```c#
myLabel1:
    //코드
    //코드
```

# 9월 26일
## C#
### List 클래스

- 배열과 유사
- 제네릭 클래스 -> 객체 생성시 어떤 자료형인지 알려줌
```c#
svm {
    Lsit<int> list = new List<int>()
}
```

리스트 요소 추가하기
```c#
static void Main(string[] args)
        {
            List<int> list = new List<int>(); // 변수선언
            list.Add(10);
            list.Add(20);
            list.Add(52);   // 리스트에 요소추가
            list.Add(273);
            list.Add(32);
            list.Add(64);

            foreach (var item in list) // 반복수행
            {
                Console.WriteLine("Count: " + list.Count + "\titem: " + item);
            }
        }
```

- 리스트 요소 제거하기 
```c#
static void Main(string[] args)
        {
            // 변수 선언, 초기값 할당
            List<int> list = new List<int>() { 52, 273, 32, 64 };
            
            list.Remove(32);  // 지정된 값을 삭제 수행
            list.RemoveAt(2); // 지정된 위치의 값을 삭제 수행
            list[1] = 1000;   // 두번째 값 수정
            list.Add(55);     // 세번째 값 추가

            // list[3] = 300;   // 네번째 값 추가???

            // 반복 수행
            foreach (var item in list) {
                Console.WriteLine("Count: " + list.Count + "\titem: " + item);
            }
        }
```

### Math 클래스
- `ABS` : 절대값 구하기  
- `Ceiling` : 크거나 같은 최소 정수  
- `Floor` : 작거나 같은 최대 정수  
- `Max` : 두개의 매개변수 중 큰거  
- `Min` : 두개의 매개변수 중 작은거  
- `Round` : 반올림  

### class 생성
```c#
class Program
{
    class FirstClass
    {

    }

    class SecondClass
    {

    }

    static void Main(string[] args)
}
```

- InnerClass
- VariousClass

### 인스턴스 변수
```
[접근 제한자][자료형][이름]
```

```c#
class Program
    {
        class Product {
            public string name; //인스턴스 변수
            public int price; //인스턴스 변수
            public Random random;
        }
        static void Main(string[] args)
        {
            Product product = new Product(); //인스턴스 생성
            product.name = "감자"; //인스턴스 변수값 변경
            product.price = 2000;

            Console.WriteLine(product.name + ":" + product.price + "원");
        }
    }
```

### 클래스 변수
#### 클래스 변수, 클래스 메서드
- 인스턴스 의 생성 없이 사용되는 변수
- 클래스 이름으로 곧바로 사용하는 변수, 메서드  

- 생성방법
```
[접근 제한자] static [자료형] [이름]
```

`foreach` 문 사용 불능
