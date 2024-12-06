---
title: '2024년 4월 1일'
date: '2024-04-01'
description: '2024년 4월 공부 로그'
---
# 2024년 4월 1일
## 📚자료구조
### 노드를 탐색하는 알고리즘
`searchNode()` 를 이용해 단순 연결 리스트에서 x 노드를 탐색하기

`temp <- L;` 리스트 L의 시작주소를 노드를 탐색할때 사용할 순회 포인터 temp의 시작위치를 지정한다.

`순회포인터가 NULL이 아닌 경우` : 
```c
while (temp가 Null 이 아닐때) do {
    if (temp.data == x) then return temp; //a
    else temp <- temp.link; //b
}
```

순회포인터 temp가 NULL이 아닌 동안 탐색 연산을 반복한다.  
`a` : 현재 temp 노드의 데이터 필드값이 탐색값 과 같으면, 현재 temp 값을 리턴하여 x가 있는 노드 주소를 알려준다  

`b` : 현재 temp 노드의 데이터 필드값이 탐색값과 같지 않으면, 다음 노드로 이동.

```c
return temp;
```

while문에서 x노드를 찾지 못하고 마지막 링크 필드값인 NULL 이 포인터 temp에 설정되어   
while 문 수행을 마치게 된다 현재 포인터의 temp 값인 NULL값을 반환하므로 탐색값x가 리스트 L 에 없다는 의미가 된다. 이경우는 탐색 실패가 된다.

## 📚시스템 프로그래밍

프로세서가 자료를 기억 장치에서 판독하는것.
1. 판독 요구 신호
2. 주소 전송
3. 데이터 수신
4. 판독 완료 신호

### 명령어의 실행

책 페이지 48

1. 명령어 인출
2. 명령어 해독
3. 데이터 인출
4. 연산
5. 기록

`ADD` : op code, 명령어 코드
`1000 3000` : 오퍼랜드 (8,16,32,64bit)

### 명령어 실행 속도
명령어 호출 사이클
명령어 실행 사이클

보통 하나의 명령어 실행 &rarr; 400~200 사이클  

    명령어 실행 시간   
    
    = 명령어 호출 시간 + 명령어 해독시간 + 데이터 호출 시간 + 실행 시간

    = l_time + E_time

`명령어 호출 시간(I_time)` : 명령어 호출 시간  
`명령어 실행 사이클(E_time)` : 해석 + 데이터 인출 + 실행시간  
`실행속도 단위` : MIPS (million Instruction Per Second)

cpu 타입  
`CISC`  
`RISC`  

### 기억 장치의 주소

- 주기억 장치
    - RAM, ROM
    - 실행 프로그램 , 데이터

- 보조 기억 장치
    - HDD, SDD등
    - 소스, 목적, 적재 프로그램 등

- 액세스 단위
    - 기억장치에 저장되는 정보의 단위
    - 기억장치 액세스를 위한 주소 맵핑 단위
    - 액세스 단위 : 8바이트

10진수 &rarr; 2진수  

- 세그먼트 기억장치
    - 고정 크기의 여러개의 메모리 영역으로 관리 하는 방식
## 📚HTML 5 
### list 내부의 list
전혀 문제 없음 

```html 5 
<ol>
  <li>Remove the skin from the garlic, and chop coarsely.</li>
  <li>Remove all the seeds and stalk from the pepper, and chop coarsely.</li>
  <li>Add all the ingredients into a food processor.</li>
  <li>Process all the ingredients into a paste.</li>
  <li>If you want a coarse "chunky" hummus, process it for a short time.</li>
  <li>If you want a smooth hummus, process it for a longer time.</li>
</ol>
```

### 강조하기

html 기본 기능 뿐 아니라 css 를 보통 이용한다.
- emphasis : `<em></em>` 으로 이탤릭 체로 강조 할 수 있다.
- Strong importance : `<strong></strong>` 사용하면 굵은 글씨로 가능 

### 링크 만들기 
```html
<p>
  나는 <a href="https://github.com/somedding">somedding의 깃허브</a>로 향하는
  링크를 만들었습니다.
</p>
```

# 2024년 4월 2일
## 정보통신학개론
### 
