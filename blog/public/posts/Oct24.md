---
title: '2024년 10월 10일'
date: '2024-10-10'
description: '2024년 10월 공부 로그'
---
# 10월 10일
## C#
### 메서드

기본구조 : 
```
[접근제한자] [반환형] [메서드 이름]([매개변수])
{
    [메서드 코드]
}
```

```c#
class Program
    {
        class Test
        {
            public int Power(int x)
            {
                return x * x;
            }
        }

        static void Main(string[] args)
        {
            Test test = new Test();
            Console.WriteLine(test.Power(10));
            Console.WriteLine(test.Power(20));
        }
```
### 접근 제한자
#### Private
접근 제한자를 입력하지 않으면, 자동으로 private 접근 제한자 설정

#### Public
- 다른 클래스에서 public ~ Main( )메서드 호출 가능
- `public` 접근 제한자가 걸린 변수 또는 메서드는 모든곳에서 접근 가능

### 생성자
생성자 : 클래스를 사용하여 인스턴스를 생성할때 자동으로 호출되는 메서드

생성자의 생성 조건 : 
- 이름이 클래스와 동일
- public or private
- 반환값과 관련된 선언 x

```
public [클래스 이름]([매개변수]) {

}
```

* 생성자의 인스턴스 변수 초기화
```c#
//Constructors program.cs

class Product {
        public string name;
        public int price;

        public Product(string name, int price)
        {
            this.name = name;
            this.price = price;
        }
    }
```

중간 시험범위 6장 까지

