---
title: '2024년 12월 5일'
date: '2024-12-05'
description: '2024년 12월 공부 로그'
---
# 2024년 12월 5일
## 윈도우 프로그래밍 (C#)

### Linq(Language Integrated Query)
- 컬렉션 형태의 데이터를 쉽게 다루고자, SQL을 본따서 만든 구문
- C# 객체의 집합을 쉽게 관리 가능

```c#
 class Program
    {
        static void Main(string[] args)
        {
            List<int> input = new List<int>() { 1, 10, 2, 9, 8, 3, 4, 7, 6, 5 };
            //int[] input = new int[] { 1, 10, 2, 9, 8, 3, 4, 7, 6, 5 };

            var output = from item in input
                         where item % 2 == 1
                         //orderby item descending : 거꾸로 정렬
                         select item;

            foreach (var item in output) {
                Console.WriteLine(item);
            }
        }
    }
```

1. `from in select` 구문
$\to$ 기본 형태
```c#
var output = from item in input //변수이름, 컬렉션이름
             select item; //결과에 넣을 요소
```

2. `where` 구문 : 조건 지정할때 사용
```c#
var output = from item in input //변수이름, 컬렉션이름
             where //조건식
             select //변수이름
```

예시
```c#
static void Main(string[] args) {
            List<int> input = new List<int>() 
                            { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

            var output = from item in input
                         where (item > 5) && (item % 2 == 0)
                         select item;

            foreach (var item in output) {
                Console.WriteLine(item);
            }
        }
```

3. `orderby` 구문 : 정렬할때 사용
```c#
var output = from item in input
             where //조건식
             orderby //정렬 대상 , 순서
             select //변수이름
```

예시
```c#
static void Main(string[] args) {
            List<int> input = new List<int>() 
                        { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

            var output = from item in input //변수이름, 컬렉션이름  
                         where (item > 5) && (item % 2 == 0) //조건식
                         orderby item descending //정렬 대상, 순서  
                         select item; //결과에 넣을 요소

            Console.WriteLine(output); //출력

            foreach (var item in output)
            {
                Console.WriteLine(item); //출력
            }
        }
```

