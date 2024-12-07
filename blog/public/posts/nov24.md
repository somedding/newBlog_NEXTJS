---
title: '2024년 11월 6일'
date: '2024-11-06'
description: '2024년 11월 공부 로그'
image: /img/image.png
tags: ['알고리즘']
---
# 2024 년 11월 6일
## 알고리즘

### dp 알고리즘 (dynamic programming)

입력 크기가 작은 부분 문제들을 해결한 후에 , 큰 크기의 부분문제 해결 후 입력 문제 해결

![dp알고리즘](/img/image.png)

### 플로이드-워샬 알고리즘 Floyd - Warshall
시간 복잡도 : O($n^3$)   
다익스트라 알고리즘 n 회 와 동일

### Matrix multiply 연속 행렬 곱셈 

오른쪽 삽입 연산  
아래쪽 삭제 연산
![dp알고리즘](/img/Screenshot%202024-11-06%20at%203.40.18%20PM.png)
- $E[i, j]$ 의 값 공식  
    - $E[i,j] = min \to { E[i, j-1]+1, E[i-1, j]+1, E[i-1, j-1]+\alpha}$


- 기말고사 : 예제문제 값 바꿔서 출제

시간 복잡도 : $O(mn)$ (배열 $E$ 의 원소수 $m \times n$ )


# 2024년 11월 9일 
## 백준 알고리즘

### 9093. 단어 뒤집기

baekjoon online judge $\to$ noojkeab enilno egduj  

스택을 사용한다. n개의 스택을 넣었다가 뺴면 자연스럽게 역순이됨  
-> 스택의 `LIFO` 성질이용 

abc defg hij

빈칸이거나 \n 이면 역순으로 출력 
else if 스택에 넣기

### 9012번 괄호

() 올바른 괄호 문자열인가를 판별하는 문제

1) 스택에는 여는 괄호만 넣는다
2) 다른 여는 괄호와 짝이 맞지 않는 여는 괄호 
3) 가장 가까운 여는 괄호

- `(()(()))` 의 경우  
0 1  
0 1 2   
0 (1 , 2 삭제)  
0 3  
0 3 4  
0 3 4 5   
0 3 (4, 5 삭제)  
0 3 6  
0 (3, 6 삭제)  
0 7 삭제  

--> 실제로는 스택을 사용할 필요는 없음  
`(` 만 사용해서 ( 의 개수만 이용해서 사용해도 된다  

### 1874 스택수열

- 임의의 수열 A에서 스택을 이용해서 이 수열을 만들 수 있는지 없는지 구하는 문제  

스택에 Push 되는 순서는 오름차순이다.  
pop 되는 순서대로 수열 a가 만들어지므로, a의 첫수 부터 순서대로 만들어야한다  

- m = 스택에 추가되어야 하는 수  
- A[i] = 만들어야 하는 수열 A의 수  
- m<A[i]: A[i]를 pop해야 하기 때문에, m부터 A[i]까지의 모든 수를 순서대로 push해야 한다.  
이후 상태는 m==A[i]인 경우와 같다.  
- m>A[i]인 경우: 불가능한 경우다.pop을 하면 A[i]가 아닌 다른 수가 A에 추가된다.  
- m==A[i]인 경우: pop을 해서 A[i]를 만들면 된다.  

# 2024년 11월 11일
## 백준 알고리즘
### 1406 에디터

한 줄로 된 간단한 에디터를 구현하려고 한다. 이 편집기는 영어 소문자만을 기록할 수 있는 편집기로, 최대 600,000글자까지 입력할 수 있다.

이 편집기에는 '커서'라는 것이 있는데, 커서는 문장의 맨 앞(첫 번째 문자의 왼쪽), 문장의 맨 뒤(마지막 문자의 오른쪽), 또는 문장 중간 임의의 곳(모든 연속된 두 문자 사이)에 위치할 수 있다. 즉 길이가 L인 문자열이 현재 편집기에 입력되어 있으면, 커서가 위치할 수 있는 곳은 L+1가지 경우가 있다.

이 편집기가 지원하는 명령어는 다음과 같다.

`L`	: 커서를 왼쪽으로 한 칸 옮김 (커서가 문장의 맨 앞이면 무시됨)  

`D`	: 커서를 오른쪽으로 한 칸 옮김 (커서가 문장의 맨 뒤이면 무시됨)  

`B`	: 커서 왼쪽에 있는 문자를 삭제함 (커서가 문장의 맨 앞이면 무시됨)  
삭제로 인해 커서는 한 칸 왼쪽으로 이동한 것처럼 나타나지만, 실제로 커서의 오른쪽에 있던 문자는 그대로임  

`P $` : $라는 문자를 커서 왼쪽에 추가함  

초기에 편집기에 입력되어 있는 문자열이 주어지고, 그 이후 입력한 명령어가 차례로 주어졌을 때, 모든 명령어를 수행하고 난 후 편집기에 입력되어 있는 문자열을 구하는 프로그램을 작성하시오. 단, 명령어가 수행되기 전에 커서는 문장의 맨 뒤에 위치하고 있다고 한다.



- 커서 기준으로 왼쪽과 오른쪽을 나누어서 스택을 나눈다

$\to$ `D` 연산 : 왼쪽 스택에 push 오른쪽 스택에 pop 한번  
$\to$ `B` 연산 : 왼쪽 스택에 pop 한번으로 구현 가능   
$\to$ `P $` 연산 : 왼쪽 스택에 push 한번  
 `P` 연산은 오른쪽  


- `P $` 연산 $\to$ d 는 왼쪽 스택에 추가

$\to$  이 문제는 링크드 리스트 이용해도 된다

- PyPy3
```python
import sys
input = sys.stdin.readline
left = list(input().strip())
right = []
m = int(input())
for _ in range(m):
    line = input().strip().split()
    what = line[0]
    if what == 'L':
        if left:
            right.append(left.pop())
    elif what == 'D':
        if right:
            left.append(right.pop())
    elif what == 'P':
        left.append(line[1])877
    elif what == 'B':
        if left:
            left.pop()
left += right[::-1] 
print(''.join(left)) #join:문자열 이어 붙이기
```

Java 8
```java
import java.util.*;
import java.io.*;
public class Main {
    public static void main(String args[]) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        Stack<Character> left = new Stack<Character>();
        Stack<Character> right = new Stack<Character>();
        for (int i=0; i<s.length(); i++) {
            left.push(s.charAt(i));
        }
        int m = Integer.parseInt(br.readLine());
        while (m-- > 0) {
            String[] line = br.readLine().split(" ");
            char what = line[0].charAt(0);
            if (what == 'L') {
                if (!left.empty()) {
                    right.push(left.pop());
                }
            } else if (what == 'D') {
                if (!right.empty()) {
                    left.push(right.pop());
                }
            } else if (what == 'P') {
                char c = line[1].charAt(0);
                left.push(c);
            } else if (what == 'B') {
                if (!left.empty()) {
                    left.pop();
                }
            }
        }
        while (!left.empty()) {
            right.push(left.pop());
        }
        StringBuilder sb = new StringBuilder();
        while (!right.empty()) {
            sb.append(right.pop());
        }
        System.out.println(sb);
    }
}
```

```c++
#include <cstdio>
#include <cstring>
#include <stack>
using namespace std;
char a[600000];
int main() {
    scanf("%s",a);
    stack<char> left, right;
    int n = strlen(a);
    for (int i=0; i<n; i++) {
        left.push(a[i]);
    }
    int m;
    scanf("%d",&m);
    while (m--) {
        char what;
        scanf(" %c",&what);
        if (what == 'L') {
            if (!left.empty()) {
                right.push(left.top());
                left.pop();
            }
        } else if (what == 'D') {
            if (!right.empty()) {
                left.push(right.top());
                right.pop();
            }
        } else if (what == 'B') {
            if (!left.empty()) {
                left.pop();
            }
        } else if (what == 'P') {
            char c;
            scanf(" %c",&c);
            left.push(c);
        }
    }
    while (!left.empty()) {
        right.push(left.top());
        left.pop();
    }
    while (!right.empty()) {
        printf("%c",right.top());
        right.pop();
    }
    printf("\n");
    return 0;
}
```

뭔가 순차적으로 처리가 됐는데 , 마지막에 있는것만 의미를 가진다면 스택을 사용하자  

### 큐 
한쪽 끝에서만 자료를 넣고 다른 한쪽 끝에서만 뺄 수 있는 구조  
`begin` 부터 `end - 1` 까지  


### 10845번 큐

```python
#pypy3
import sys
input = sys.stdin.readline
n = int(input())

queue = [0]*n
begin = 0
end = 0
for _ in range(n):
    cmd, *val = input().split()
    if cmd == 'push':
        num = int(val[0])
        queue[end] = num
        end += 1
    elif cmd == 'front':
        if begin == end:
            print(-1)
        else:
            print(queue[begin])
    elif cmd == 'size':
        print(end-begin)
    elif cmd == 'empty':
        if begin == end:
            print(1)
        else:
            print(0)
    elif cmd == 'pop':
        if begin == end:
            print(-1)
        else:
            print(queue[begin])
            begin += 1
    elif cmd == 'back':
        if begin == end:
            print(-1)
        else:
            print(queue[end-1])

```

```java
import java.util.*;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] queue = new int[n];
        int begin = 0;
        int end = 0;
        while (n-- > 0) {
            String cmd = sc.next();
            if (cmd.equals("push")) {
                int num = Integer.parseInt(sc.next());
                queue[end++ ] = num;
            } else if (cmd.equals("front")) {
                if (begin == end) {
                    System.out.println("-1");
                } else {
                    System.out.println(queue[begin]);
                }
            } else if (cmd.equals("size")) {
                System.out.println(end-begin);
            } else if (cmd.equals("empty")) {
                if (begin == end) {
                    System.out.println("1");
                } else {
                    System.out.println("0");
                }
            } else if (cmd.equals("pop")) {
                if (begin == end) {
                    System.out.println("-1");
                } else {
                    System.out.println(queue[begin]);
                    begin += 1;
                }
            } else if (cmd.equals("back")) {
                if (begin == end) {
                    System.out.println("-1");
                } else {
                    System.out.println(queue[end-1]);
                }
            }
        }
    }
}
```

```c++
#include <iostream>
#include <string>
using namespace std;
struct Queue {
    int data[10000];
    int begin, end;
    Queue() {
        begin = 0;
        end = 0;
    }
    void push(int num) {
        data[end] = num;
        end += 1;
    }
    bool empty() {
        if (begin == end) {
            return true;
        } else {
            return false;
        }
    }
    int size() {
        return end - begin;
    }
    int front() {
        return data[begin];
    }
    int back() {
        return data[end-1];
    }
    int pop() {
        if (empty()) {
            return -1;
        }
        begin += 1;
        return data[begin-1];
    }
};
int main() {
    int n;
    cin >> n;

    Queue q;

    while (n--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push") {
            int num;
            cin >> num;
            q.push(num);
        } else if (cmd == "pop") {
            if (q.empty()) {
                cout << -1 << '\n';
            } else {
                cout << q.front() << '\n';
                q.pop();
            }
        } else if (cmd == "size") {
            cout << q.size() << '\n';
        } else if (cmd == "empty") {
            cout << q.empty() << '\n';
        } else if (cmd == "front") {
            if (q.empty()) {
                cout << -1 << '\n';
            } else {
                cout << q.front() << '\n';
            }
        } else if (cmd == "back") {
            if (q.empty()) {
                cout << -1 << '\n';
            } else {
                cout << q.back() << '\n';
            }
        }
    }

    return 0;
}
```
### 1158번 조세퍼스 문제 

억지 (?) 큐 문제임  

요세푸스 문제는 다음과 같다.  

1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다. 이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 이 과정은 N명의 사람이 모두 제거될 때까지 계속된다. 원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. 예를 들어 (7, 3)-요세푸스 순열은 <3, 6, 2, 7, 5, 1, 4>이다.

N과 K가 주어지면 (N, K)-요세푸스 순열을 구하는 프로그램을 작성하시오.  


push pop

1 2 3 4 5 6 7
1 pop push   
2 pop push  
3 pop  

4 5 6 7 1 2  
4 pop push  
5 pop push  
6 pop  

7 1 2 4 5 
7 pop push  
1 pop push  
2 pop  

4 5 7 1  
4 pop push  
5 pop push  
7 pop  

... 




```python
#!/usr/bin/python3
from collections import deque #deque : double ended queue 양방향 큐
n, m = map(int,input().split())
q = deque()
for i in range(1, n+1):
    q.append(i)
ans = []
for i in range(n-1):
    for j in range(m-1):
        q.append(q.popleft())
    ans += [q.popleft()]

ans += [q[0]]
print('<' + ', '.join(map(str,ans)) + '>')
```

``` Java
import java.util.*;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        sb.append('<');
        Queue<Integer> queue = new LinkedList<Integer>();
        for (int i=1; i<=n; i++) {
            queue.offer(i);
        }
        for (int i=0; i<n-1; i++) {
            for (int j=0; j<m-1; j++) {
                queue.offer(queue.poll());
            }
            sb.append(queue.poll() + ", ");
        }
        sb.append(queue.poll() + ">");
        System.out.println(sb);
    }
}
```

```c++
#include <cstdio>
#include <queue>
using namespace std;
int main() {
    int n, m;
    scanf("%d %d",&n,&m);
    queue<int> q;
    for (int i=1; i<=n; i++) {
        q.push(i);
    }
    printf("<");
    for (int i=0; i<n-1; i++) {
        for (int j=0; j<m-1; j++) {
            q.push(q.front());
            q.pop();
        }
        printf("%d, ",q.front());
        q.pop();
    }
    printf("%d>\n",q.front());
    return 0;
}
```

### 덱 deque
양 끝에서 자료를 넣고 양 끝에ㅓ 자료를 뺼 수 있음  

### 10866번 덱 
```python
import sys
from collections import deque
input = sys.stdin.readline
n = int(input())
d = deque()

for _ in range(n):
    s = input().split()
    cmd = s[0]
    if cmd == 'push_front':
        num = int(s[1])
        d.appendleft(num)
    elif cmd == 'push_back':
        num = int(s[1])
        d.append(num)
    elif cmd == 'pop_front':
        if d:
            print(d.popleft())
        else:
            print(-1)
    elif cmd == 'pop_back':
        if d:
            print(d.pop())
        else:
            print(-1)
    elif cmd == 'size':
        print(len(d))
    elif cmd == 'empty':
        print(0 if d else 1)
    elif cmd == 'front':
        if d:
            print(d[0])
        else:
            print(-1)
    elif cmd == 'back':
        if d:
            print(d[-1])
        else:
            print(-1)

```  

```java
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String args[]) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int n = Integer.parseInt(br.readLine());
        ArrayDeque<Integer> queue = new ArrayDeque<Integer>();
        for (int k=0; k<n; k++) {
            String line = br.readLine();
            String[] s = line.split(" ");
            String cmd = s[0];
            if (cmd.equals("push_front")) {
                int num = Integer.parseInt(s[1]);
                queue.offerFirst(num);
            } else if (cmd.equals("push_back")) {
                int num = Integer.parseInt(s[1]);
                queue.offerLast(num);
            }  else if (cmd.equals("front")) {
                if (queue.isEmpty()) {
                    bw.write("-1");
                } else {
                    bw.write(String.valueOf(queue.peekFirst()));
                }
                bw.write("\n");
            } else if (cmd.equals("size")) {
                bw.write(String.valueOf(queue.size()));
                bw.write("\n");
            } else if (cmd.equals("empty")) {
                if (queue.isEmpty()) {
                    bw.write("1");
                } else {
                    bw.write("0");
                }
                bw.write("\n");
            } else if (cmd.equals("pop_front")) {
                if (queue.isEmpty()) {
                    bw.write("-1");
                } else {
                    bw.write(String.valueOf(queue.pollFirst()));
                }
                bw.write("\n");
            } else if (cmd.equals("pop_back")) {
                if (queue.isEmpty()) {
                    bw.write("-1");
                } else {
                    bw.write(String.valueOf(queue.pollLast()));
                }
                bw.write("\n");
            } else if (cmd.equals("back")) {
                if (queue.isEmpty()) {
                    bw.write("-1");
                } else {
                    bw.write(String.valueOf(queue.peekLast()));
                }
                bw.write("\n");
            }
        }
        bw.flush();
    }
}
```

```c++
#include <deque>
#include <iostream>
#include <string>
using namespace std;
int main() {
    int n;
    cin >> n;

    deque<int> d;

    while (n--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push_front") {
            int num;
            cin >> num;
            d.push_front(num);
        } else if (cmd == "push_back") {
            int num;
            cin >> num;
            d.push_back(num);
        } else if (cmd == "pop_front") {
            if (d.empty()) {
                cout << -1 << '\n';
            } else {
                cout << d.front() << '\n';
                d.pop_front();
            }
        } else if (cmd == "pop_back") {
            if (d.empty()) {
                cout << -1 << '\n';
            } else {
                cout << d.back() << '\n';
                d.pop_back();
            }
        } else if (cmd == "size") {
            cout << d.size() << '\n';
        } else if (cmd == "empty") {
            cout << d.empty() << '\n';
        } else if (cmd == "front") {
            if (d.empty()) {
                cout << -1 << '\n';
            } else {
                cout << d.front() << '\n';
            }
        } else if (cmd == "back") {
            if (d.empty()) {
                cout << -1 << '\n';
            } else {
                cout << d.back() << '\n';
            }
        }
    }

    return 0;
}
```

### 17413번 단어뒤집기

```python
import sys
S = sys.stdin.readline().strip() + ' ' # 마지막에 공백을 더해주자
stack = [] # 저장해줄 스택
result = '' # 결과물 출력
cnt = 0 # 괄호 안에 있는지 여부
for i in S : # 받은 문자열 찾아보자
    if i == '<' : # <를 만나면
        cnt = 1 # 지금 괄호 안에 있음 표시
        for _ in range(len(stack)): #괄호 만나기 이전 stack 애들 비워주고 다 뒤집어서 더해!
            result += stack.pop()
    stack.append(i)
    
    if i == '>' : # >를 만나면
        cnt = 0 # 지금 괄호 빠져 나왔음 표시
        for _ in range(len(stack)): # 괄호 안에 있는 애들은 뒤집지 말고 더해!
            result += stack.pop(0)

    if i == ' ' and cnt == 0: # 공백을 만나고 괄호 밖에 있다면
        stack.pop() # 들어간 공백 뺴주고
        for _ in range(len(stack)): # 뒤집어서 더해!
            result += stack.pop()
        result += ' ' # 마지막에 공백 살려주기
print(result)
```
```java
import java.util.*;
import java.io.*;

public class Main {
    static void print(BufferedWriter bw, Stack<Character> s) throws IOException {
        while (!s.isEmpty()) {
            bw.write(s.pop());
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
        String str = bf.readLine();
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        boolean tag = false;
        Stack<Character> s = new Stack<>();
        for (char ch : str.toCharArray()) {
            if (ch == '<') {
                print(bw, s);
                tag = true;
                bw.write(ch);
            } else if (ch == '>') {
                tag = false;
                bw.write(ch);
            } else if (tag) {
                bw.write(ch);
            } else {
                if (ch == ' ') {
                    print(bw, s);
                    bw.write(ch);
                } else {
                    s.push(ch);
                }
            }
        }
        print(bw, s);
        bw.write("\n");
        bw.flush();
    }
}
```

```c++
#include <iostream>
#include <string>
#include <stack>
using namespace std;
void print(stack<char> &s) {
    while (!s.empty()) {
        cout << s.top();
        s.pop();
    }
}
int main() {
    string str;
    getline(cin, str);
    bool tag = false;
    stack<char> s;
    for (char ch : str) {
        if (ch == '<') {
            print(s);
            tag = true;
            cout << ch;
        } else if (ch == '>') {
            tag = false;
            cout << ch;
        } else if (tag) {
            cout << ch;
        } else {
            if (ch == ' ') {
                print(s);
                cout << ch;
            } else {
                s.push(ch);
            }
        }
    }
    print(s);
    cout << '\n';
    return 0;
}

```

# 2024년 11월 12일
## 웹프로그래밍기초

1. 수업시간에 제시한 실행결과가 나오도록 alert(), confirm(),parseInt() 메소드 사용하여 자신의 내용, 스타일로 작성
2. 두개의 수를 입력받아 합을 구하는 프로그램 작성(parseInt())를 쓰지 않았을때와 쓸때의 차이점 같이 쓰기

## 백준 알고리즘
### 10799번 쇠막대기
```java
import java.util.*;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        String a = sc.nextLine().trim();
        int n = a.length();
        Stack<Integer> s = new Stack<Integer>();
        int ans = 0;
        for (int i=0; i<n; i++) {
            char c = a.charAt(i);
            if (c == '(') {
                s.push(i);
            } else {
                if (s.peek()+1 == i) {
                    s.pop();
                    ans += s.size();
                } else {
                    s.pop();
                    ans += 1;
                }
            }
        }
        System.out.println(ans);
    }
}
```

```c++
#include <iostream>
#include <string>
#include <stack>
using namespace std;
int main() {
    string a;
    cin >> a;
    int n = a.size();
    stack<int> s;
    int ans = 0;
    for (int i=0; i<n; i++) {
        if (a[i] == '(') {
            s.push(i);
        } else {
            if (s.top()+1 == i) {
                s.pop();
                ans += s.size();
            } else {
                s.pop();
                ans += 1;
            }
        }
    }
    cout << ans << '\n';
    return 0;
}
```

```python
Mass= input()
stack=[]
cnt = 0
for i in range(len(Mass)):
    if Mass[i] == "(":
        stack.append("(")
    else :
        if Mass[i-1]=="(":
            stack.pop()
            cnt+=len(stack)
        else :
            stack.pop()
            cnt+=1
print(cnt)
```

# 2024년 11월 13일
## 알고리즘
### 배낭 문제

$K[i,w]$ = 물건 1~$i$ 까지만 고려하고, 배낭의 용량이 w일떄 최대 가치  
(단, i = 1, 2, ... , n dlrh, w = 1, 2, 3, ... , c)  

$\to$ 문제의 최적해 = $K[n,C]$  

가치 높은것을 최대한 많이 

```c
//의사코드
for i = 0 to n K[i,0] = 0
for w = 0 to c K[0,2] = 0
for i = 1 to N
    for w = 1 to c
        if(wi > w)
            K[i, w] = k[i-1, w]
        else
            k[i,w] = max {k[i-1, w], k[i-1, w-wi]+ vi}
return k[n,C]
```

Knapsck_origin.py
```python
# 0-1 배낭문제 알고리즘
# W(물건의 무게),V(가치),C(배낭용량)
def Kanpsack(W, V, C):  
    n = len(W) # n: 물건의 갯수
    K = [[ 0 for x in range(C+1)] for x in range(n)]

    for i in range(1, n): # 1 ~ (n-1)까지
        for w in range(1, C+1): # 1 ~ C까지(배낭의 임시용량)
            if W[i] > w:  # i의 무게가 임시 배낭 용량을 초과하면
                K[i][w] = K[i-1][w]  # (i-1)까지 담긴 값으로 저장
            else: 
                # 이전까지 담긴 가치, 물건 i를 배낭에 담을 경우 중 최대값
                K[i][w] = max(K[i-1][w], K[i-1][w - W[i]] + V[i])
        print(K[i])    
    return K[n-1][C]

# 입력배열 및 알고리즘 호출
Weight = [0, 5, 4, 6, 3]     # item 1..4의 무게, 0은 제외
Value = [0, 10, 40, 30, 50]  # item 1..4의 가치, 0은 제외
capacity = 10

result = Kanpsack(Weight, Value, capacity)
print('<최대 가치> =', result)
```

### 내부 정렬 과 외부정렬

### 버블 정렬

$\to$ 이웃하는 숫자를 비교하여 작은 수를 앞쪽으로 이동  

`패스` : 입력을 전반적으로 한번 처리 하는 것  
n 개의 원소가 있으면 n-1 번의 패스가 수행된다  

- 의사코드
![alt text](/24/img/bubblesort.png)  

- 파이썬 코드

```python
def bubble_sort(A):
    for p in range(1, len(A)):
        print('패스 %d' % p,end=' : ')
        for i in range(1, len(A)-p+1):
            if A[i-1] > A[i]:
                A[i-1],A[i] = A[i],A[i-1]
        print('A[%d] = %d' % (i,A[i]))
    return A

input_list = [54, 88, 77, 26, 93, 17, 49, 10, 
               17, 77, 11, 31, 22, 44, 17, 20]
# input_list = ['da','caz','ap','ad','bc']
print('정렬 전:',input_list)
result = bubble_sort(input_list)
print('정렬 후:',result)
```

### 선택 정렬 (selection sort)

$\to$  입력 전체에서 최소값을 선책해서 배열 0 번과 교환 ...  

- 의사 코드
![alt text](/24/img/selectionsort.png)

- 파이썬 코드
```python
def selection_sort(A):
    for i in range(0, len(A)-1):
        min = i # 최솟값 원소의 인덱스        
        print('패스 %d' % (i+1),end=' : ')
        # A[i]~A[n-1]에서 최솟값 찾기
        for j in range(i+1, len(A)): 
            if A[j] < A[min]:
                min = j
        A[i], A[min] = A[min], A[i]
        print('A[%d] = %d' % (i,A[i]))
    return A    

input_list = [54, 88, 77, 26, 93, 17, 49, 10, 
              17, 77, 11, 31, 22, 44, 17, 20]
# input_list = ['da','caz','ap','ad','bc']
print('정렬 전:', input_list)
result = selection_sort(input_list)
print('정렬 후:', result)
```

시간 복잡도 : $O(n^2)$

### 삽입 정렬

- 정의
```
배열을 정렬 된 부분과 정렬 안된 부분으로 나누고, 정렬 안된 부분의 가장 왼쪽 원소를 정렬된 부분의 적절한 위치에 삽입하여 정렬 
```
$\to$ 정렬 된 부분의 원소 하나 추가 정렬 안된부분은 하나 감소

- 의사코드 
![alt text](/24/img/insertionsort.png)

- python 코드
```python
def insertion_sort(A):
    for i in range(1, len(A)):     
        print('패스 %d' % i, end=' : ')
        currentElement = A[i] # 현재 정렬할 원소
        j = i-1           # 현재 원소 바로 앞의 인덱스
        while (j>=0) and (A[j]>currentElement):            
            A[j+1] = A[j] # 큰 값 A[j]을 한칸 뒤로 이동
            j-=1          # 하나 앞의 원소로 이동
        A[j+1] = currentElement # 현재 원소를 저장
        print(A)
    return A

input_list = [54, 88, 77, 26, 93, 17, 49, 10, 
              17, 77, 11, 31, 22, 44, 17, 20]
# input_list = ['da','caz','ap','ad','bc']
print('정렬 전:', input_list)
result = insertion_sort(input_list)
print('정렬 후:', result)
```

시간 복잡도 :  

`최선` : $O(n) \to$ 이미 정렬 된 값을 넣으면 `while` 문이 실행이 안된다. (80% 이상 정렬 된 data를 넣으면 성능이 좋다)  
=> 다른 정렬 알고리즘의 마지막 부분에 넣어서 시간복잡도를 줄일때 사용된다.  

`최악` : $O(n^2)$  

### 쉘 정렬 (Shell Sort)
- 정의
```
버블 정렬이나 삽입 정렬이 수행되는 과정
```  
간격을 이용한다  

- 의사코드
![alt text](/24/img/shellsort.png)

- python 코드
```python
# 쉘정렬
def shell_sort(A):
    gap = [5,3,1]
    for h in gap: # h=5(i=5~14), h=3(i=3~14), h=1(i=1~14)
        print('Gap %d' % h, end=': ')
        for i in range(h, len(A)):  # h-정렬 수행
            currentElement = A[i]
            j = i            
            while (j>=h) and (A[j-h]>currentElement): 
                A[j] = A[j-h]
                j = j-h
            A[j] = currentElement
        print(A)
    return A

# 입력 배열 및 함수 호출
data = [30,60,90,10,40,80,40,20,10,60,50,30,40,90,80]
# data = ['da','caz','ap','ad','bc','xoa','za','rap','bad','hungry']
print('정렬 전:', data)
result = shell_sort(data)
print('정렬 후:', result)
```

시간 복잡도 :  $O (n^2)$

### 힙 정렬 (Heap sort)

## 전자회로
### MOSFET
MOSFET  -> three terminal  
사용처: 증폭, 마이크로 프로세서, 메모리, 디지털 회로  

n 타입 을 많이 사용한다.--> electron 이 더빨라서  
p 타입 MOSFET (hole) 은 특수용도  

source, gate, drain  

source 와 body 연결  
body는 전체에 가장 낮은 voltage 연결  

depletion layer = 공핍영역  

channel 형성 $\to$ channel layer 생성됨  
비율로 drain current 가 형성된다  

Overdrive voltage = VGS - VTH (ppt에서 Vt)  

Deep Triode Region  

Pinch off - 

## 백준 알고리즘

### 색종이
```python
k = int(input())
array = [[0] * 100 for _ in range(100)]

for _ in range(k):
    x, y = map(int, input().split())
    for i in range(y, y + 10):
        for j in range(x, x + 10):
            array[i][j] = 1 

array = sum(sum(row) for row in array)
print(array)
```

# 2024년 11월 14일 
## 윈도우 프로그래밍 (C#)

### 구조체
- 간단한 객체를 만들때 이용
- 클래스와 거의 동일한 구문 사용 $\to$ 복사형식이 다르고 클래스보다 제한이 많음  
- 구조체는 상속, 인터페이스 구현이 불가능  
- C# 의 기본 자료형은 모두 구조체로 정의 한다.

- 형식
```c#
struct Point
{
    public int x;
    public int y;
}
```

객체 형성 만으로 선언됨

# 2024년 11월 18일
## 운영체제
### 페이지 교체 알고리즘
- 정보처리기사 문제 수록 내용

페이지 부재가 발생 : 어떤 체이지 프레임을 선택하여 교체할 것인지를 결정

- `OPT (Optimal replacement)` : 가장 먼 미래에 참조되는 페이지를 교체 $\to$ 벨레이디가 제안함  

- `LRU (Least Recently Used)` : 가장 오랫동안 사용되지 않은 페이지를 교체  

- `LFU (Least Frequently Used)` : 가장 적게 사용된 페이지를 교체 

- `NUR (Not Used Recently)` : 최근에 사용되지 않은 페이지를 교체  

- `SCR (Second Chance Replacement)` : 최근에 사용된 페이지를 교체  


# 2024년 11월 20일
## 알고리즘
### 기수 정렬

숫자를 부분적으로 비교하며 정렬
기(radix)는 특정 진수를 나타내는 숫자들

RadixSort(A)  

- 의사코드
```
for i = 1 to k
    각 숫자의 i 자리 숫자에 대해 안정한 정렬을 수행
return A
```

- python code
```python
from queue import Queue  # 파이썬 queue모듈의 Queue 사용

# 기수정렬(10진수) : 버킷 사용
def radixSort(A) :
    queues = []						# 큐의 리스트
    for i in range(BUCKETS) :
        queues.append(Queue())		# BUCKETS개의 큐 사용
    n = len(A)
    factor = 1	                    # 1의 자리부터 시작
    for d in range(DIGITS) :		# 모든 자리에 대해
        for i in range(n) :			# 자릿수에 따라 큐에 삽입
            # 숫자와 동일한 큐(버킷)에 숫자를 삽입
            queues[(A[i]//factor) % 10].put(A[i]) 
        j = 0
        for b in range(BUCKETS) :		  # 버킷에서 꺼내어 원래의 리스트로
            while not queues[b].empty() : # b번째 큐가 공백이 아닌 동안
                A[j] = queues[b].get()	  # 원소를 꺼내 리스트에 저장
                j += 1
        factor *= 10					  # 그 다음 자리수로 간다.
        print("step %d: %s" % (d+1, A))			  # 중간 과정 출력용 문장   
    return A

# 입력 데이터 생성 및 radixSort() 호출
BUCKETS = 10	# 10진법으로 정렬
DIGITS  = 2		# 최대 2 자릿수
data = [13,21,51,33,22]
# data = [25,12,0,16,10,92,19,7] # DIGITS=2
# data = [251,125,0,16,100,192,319,57] # DIGITS=3
print('정렬전: ', data)
result = radixSort(data)
print('정렬후: ', result)
```


LSDSort : least significant digit sort  

```python
# Least Significant Digit(LSD) 기수 정렬
# RL(Right-to-Left) 기수 정렬 : 문자열 정렬
def lsdSort(A):
    Width = 3           # 문자의 최대 자릿수
    N = len(A)          # 배열 A의 크기
    R = 27              # 기수 : 영어소문자 수(26) + null(1)
    temp = [None] * N   # 임시배열: 입력배열의 크기
    for d in reversed(range(Width)): # d=2,1,0
        s_index = [0]*R     # 각 문자의 빈도수를 저장할 배열
        print(' - %d번째 자리 비교 후:'% d, end=' ')
        for i in range(N):  # 배열 A 각 문자의 빈도수 계산
            s_index[ord(A[i][d])-96] += 1 
        for r in range(1,R): # r=1~26, 빈도수 누적 
            s_index[r] += s_index[r-1]
        for i in range(N):
            p = ord(A[i][d]) - 97   # ord('a') = 97
            temp[s_index[p]] = A[i]
            s_index[p] += 1
        for i in range(N):          # temp를 A로 복사
            A[i] = temp[i]
        for i in range(N):          # 중간결과 출력
            print(A[i],'', end='')
        print()
    return A

# 입력 데이터 생성 및 lsdSort() 호출
data=['cop','xos','abf','cgh','apb','xsr']
# data = ['icn','sfo','lax','fra','sin','rom','hkg','tlv',
#       'syd','mex','lhr','nrt','jfk','pek','ber','mow']

print('정렬 전:',data)
result = lsdSort(data) # lsd 알고리즘 호출
print('정렬 후:',result)
```

배낭의 용량이 $c$ 이고, $W_i$ 와 $V_i$ 일때, 최대 가치를 가지는 최적해를 구하는 문제
  
독립 집합 : 연결하는 간선이 없는 점들의 집합 
클리크 : 모든 점들이 연결된 집합 
그래프 색칠하기 : 가장 적은 수의 색을 이용하여 그래프를 색칠
집합 커버 : 가장 적은 수의 집합으로 모든 원소를 포함하는 집합 


## 백준 알고리즘
### 10799번 오등큰수
```python
freq = [0] * 1000001
n = int(input())
a = list(map(int,input().split()))
for i in range(n):
    freq[a[i]] += 1
ans = [0]*n
s = [0]
for i in range(1, n):
    if not s:
        s.append(i)
    while s and freq[a[s[-1]]] < freq[a[i]]:
        ans[s.pop()] = a[i]
    s.append(i)
while s:
    ans[s.pop()] = -1
print(' '.join(map(str,ans)))
```

### 나머지 연산
$(A+B) \% c = ((A \% c) + (B \% c)) \% c$  
$(A \times B) \% c = ((A \% c) \times (B \% c)) \% c$  

이때, $+c$ 를 해서 - 값이 나오지 않게한다 $\to$ 언어마다 처리하는 값이 다르다.  


### `GCD` : 최대 공약수
GCD 는 A와 B의 공통된 약수 중에서 가장 큰 값이다. $\to$ $O(n^2)$

```c++
int g = 1;
for (int i = 2; i <= min(a,b); i++) {
    if (a % i == 0 && b % i == 0) {
        g = i;
    }
}
```
- 유클리드 호제법 : 최대 공약수를 조금더 빠르게 계산 할 수 있다.
- a 를 b 로 나눈 나머지를 r 이라고 하면, a 와 b 의 최대 공약수는 b 와 r 의 최대 공약수와 같다.  
GCD(a,b) = GCD(b,r)  

- 재귀함수를 사용한 유클리드 호제법 (재귀함수 : 자기 자신을 호출하는 함수)
```c++
int gcd (int a, int b) {
    if (b == 0) {return a;
    } else {
        return gcd(b, a % b);
    }
}
```

- 재귀함수를 사용하지 않는 유클리드 호제법
```C++
int gcd(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}
```

- 세수의 최대공약수
```
GCD(a,b,c) = GCD(GCD(a,b),c)
```
### `LCM` : 최소공배수
- 최소공배수는 최대공약수를 이용하여 구할 수 있다.
- 두수 a , b 의 GCD를 g 라고 하면, 
l = g * (a/g) * (b/g)

### 2609번 최대공약수와 최소공배수
```python
def gcd(x, y):
    if y == 0:
        return x
    else:
        return gcd(y, x%y)
a,b = map(int, input().split())
g = gcd(a, b)
print(g)
print(a*b//g)
```

### 소수 (Prime Number)
약수가 1과 자신밖에 없는 수

- 소수 관련 알고리즘
1. 어떤 수 N이 소수인지 판별하는 방법
2. N보다 작거나 같은 모든 자연수 중에서 소수를 찾아내는 방법

- 소수 판별 알고리즘
```c++
bool prime(int n) {
    if (n < 2) return false;
    for (int i = 2; i<=n-1; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

- 소수 표현법

$\sqrt{i} \leq N$ 은 $i \leq N^2$ 와 같다.



# 2024년 11월 21일
## 윈도우 프로그래밍 (C#)
### ToString() 메서드 오버라이딩

```c#
class Program {
        class Product { // : Object
            public string Name { get; set; }
            public int Price { get; set; }

            public override string ToString()
            {
                return Name + " : " + Price + "원";
            }
        }
        static void Main(string[] args) {
            List<Product> list = new List<Product>() {
                new Product() { Name = "고구마", Price = 1500 },
                new Product() { Name = "사과", Price = 2400 },
                new Product() { Name = "바나나", Price = 1000 },
                new Product() { Name = "배", Price = 3000 }
            };
            //list.Sort(); //오류 발생...
            foreach (var item in list) {
                Console.WriteLine(item.ToString());
            }
        }
    }
```

### Using block

```c#
using (){
//경로
}
```

### 인터페이스 다중 상속
하나의 클래스가 여러 부모 클래스를 가질 수 있게 되는 것

# 2024년 11월 27일
## 알고리즘
### NP완전문제

NP완전 문제들을 어떤 방식으로든 해결하려면 3가지 중 하나는 포기해야한다.  
- 다항식 시간에 해를 찾는것
- 최적해를 찾는것
- 모든 입력에 대해 해를 찾는것

### 근사 알고리즘
- 근사해를 찾는 대신, 다항식 시간의 복잡도 가짐
- 근사 비율 : 근사해가 얼마나 최적해에 가까운지 나타내는 비율

### 여행자 문제
- 최소 신장 트리 문제와 유사함
- 여행자가 임의 도시에서 출발하여 모든 도시를 한번씩 방문하고 다시 돌아오는 여행경로의 길이를 최소화
$\to$ 삼각 부등식 원리 적용


- python 코드
```python
from Prim_MST import PrimMST

# 근사 알고리즘으로 해결한 TSP 문제
N = 6  # 정점의 수
INF = float('inf')

# 6개 도시의 입력 그래프 배열(MST의 입력)
g = [[0,3,0,2,4,0],     # 정점 a의 행열
     [3,0,2,4,0,4],     # 정점 b의 행열
     [0,2,0,0,0,3],     # 정점 c의 행열
     [2,4,0,0,5,7],     # 정점 d의 행열
     [4,0,0,5,0,9],     # 정점 e의 행열
     [0,4,3,7,9,0]]     # 정점 f의 행열

# 1. MST 알고리즘의 실행 및 결과
mst = PrimMST(g, N)
print('- MST 출력 결과의 변환')
for row in mst:
    print('\t',row)

# 2. MST의 간선으로 인접 리스트 만들기
a = [[] for _ in range(N)]
for i in range(N - 1):      
    a[mst[i][0]].append(mst[i][1])
    a[mst[i][1]].append(mst[i][0])
print('- 인접 리스트 생성 :',a)

# 3. 점 0에서 MST를 따라 모든 점들을 방문, 0으로 돌아오는 방문순서
visit_seq = [0]  
current = 0
while len(a[0]) > 0:
    flag = False
    k = 0
    while k < len(a[current]):
        if a[current][k] not in visit_seq:  # 아직 방문 안된 정점이 있으면
            unvisited = k # 아직 방문 안된 정점으로 진행
            flag = True
            break
        k += 1
    if flag:
        next_visit = a[current].pop(unvisited)
    else:
        next_visit = a[current].pop(0)
    visit_seq.append(next_visit)
    current = next_visit
visit_seq.append(0)      # 마지막으로 시작 정점 0으로 귀환
print('- MST를 따른 방문 순서 :', visit_seq)

# 4. 중복된 방문 점을 제거한 경로
direct_seq = []
mark = [False for _ in range(N)] # 초기값 = False
j = 0
for i in range(len(visit_seq)): 
    if not mark[visit_seq[i]]: # 방문 안한 점(False)이면
        direct_seq.append(visit_seq[i])
        j += 1
        mark[visit_seq[i]] = True # 방문한 점(True로 변경)
direct_seq.append(0)  # 도착점 = 시작점
print('- TSP 방문 순서(중복제거) :', direct_seq)

# 5. 최종 경로의 총 길이 계산
total = 0
for i in range(N):  
    total = total + g[direct_seq[i]][direct_seq[i + 1]]
print('- TSP 최종 경로의 길이  = ', total)
```

### 클러스터링 문제
- n개의 점을 k개의 그룹으로 나누고, 각 그룹의 중심이 되는 K개의 점을 선택하는 문제

$\to$ 두 개의 센터가 서로 가까이 있는 것 보다 멀리 떨어져 있는 것이 좋다.

# 2024년 11월 28일
## 윈도우 프로그래밍 (C#)

```c#
class Product {
    public string Name { get; set; }
    public int Price { get; set; }
}

static void Main(string[] args) {
    List<Product> list = new List<Product>(); {
        new Product() { Name = "감자", Price = 1500 },
        new Product() { Name = "사과", Price = 2400 },
        new Product() { Name = "바나나", Price = 1000 },
        new Product() { Name = "배", Price = 3000 }
    };
    products.Sort(); //예외 발생 : 이유? 

    foreach (var item in products) {
        Console.WriteLine(item.ToString());
    }
}
```

예외 발생 이유 : Product 클래스에 ToString() 메서드가 없어서 발생하는 예외

