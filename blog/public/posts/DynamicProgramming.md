---
title: 'Dynamic Programming'
date: '2024-12-09'
description: 'Dynamic Programming에 대해 알아보자'
thumbnail: "/img/image.png"
tags: ['알고리즘']
---

# 📖 Dynamic Programming
 Dynamic Programming은 최적화 문제를 해결하는 알고리즘이다.  

![Dynamic Programming](/img/image.png)

D, E, F의 해를 이용해서 B의 해를 구한다.  

## 1. 모든 쌍 최단 경로 (All-Pairs Shortest Path) : 플로이드-와샬 알고리즘(Floyd-Warshall Algorithm)
각 쌍의 점사이의 최단경로 찾는 문제 $\to$ 시간복잡도 : $(n-1)O(n^2) = O(n^3)$    

플로이드 와샬 알고리즘의 점화식은 다음과 같다.
$$
D_{ij}^{(k)} = \min(D_{ij}^{(k-1)}, D_{ik}^{(k-1)} + D_{kj}^{(k-1)})
$$

의사코드는 다음과 같다.
```python title="플로이드-와샬 알고리즘 의사코드"
입력 : 2차원배열 D
출력 : 모든 쌍 최단 경로 2차원 배열 D

for k in range(n):
    for i in range(n):
        for j in range(n):
            D[i][j] = min(D[i][j], D[i][k] + D[k][j])
```

여기서 `for k in range(n)`은 경유 가능한 점을 1부터 n까지 확장시키기 위한 것이다.  
2, 3번 줄은 점들의 각쌍을 고려하기위한 루프이다.
4번 줄은 각 점의 쌍 `i - j` 에 대해 i에서 j까지의 거리가 k를 포함하여 경유하는 경로의 거리를 D[i,j] 로 갱신한다.

AllPaisShortest 알고리즘은 사이클 상의 간선들의 가중치 합이 음수가 되는 사이클은 없어야 한다.

이름 python으로 짠 코드는 다음과 같다.
```python title="플로이드-와샬 알고리즘 코드"
# 플로이드-워샬 알고리즘
def Floyd_AllPairShortest(D):
    N = len(D)  # 그래프 정점의 개수 
    for k in range(N): 
        # print('k =',k)
        for i in range(N): 
            for j in range(N): 
                # i에서 j로 가는 비용이 i에서 k를 거쳐 j로 가는 비용보다 크면
                if D[i][j] > D[i][k] + D[k][j]: 
                    # i에서j로 가는 비용 = i에서k를 거쳐 j로가는 비용으로 갱신
                    D[i][j] = D[i][k] + D[k][j] # 최단거리 값
                    # print("   D[%d][%d]=%d" % (i,j,D[i][j]))
    return D

# 입력 데이터 생성
# 각 정점 사이의 가중치를 담은 2차원 리스트
INF = float('inf') # 무한대값 저장
input = [[  0,    4,   2,   5, INF], 
          [INF,   0,   1, INF,   4],
          [  1,   3,   0,   1,   2],  
          [ -2, INF, INF,   0,   2],
          [INF,  -3,   3,   1,   0]]

# input = [[0,12,INF,INF,INF,15,INF,INF,INF,INF],
#          [12,0,4,INF,10,INF,INF,INF,INF,INF],
#          [INF,4,0,13,3,INF,INF,INF,INF,INF],
#          [INF,INF,13,0,INF,INF,INF,INF,INF,15],
#          [INF,10,3,INF,0,INF,INF,10,INF,INF],
#          [15,INF,INF,INF,INF,0,21,7,INF,INF],
#          [INF,INF,INF,INF,INF,21,0,INF,25,INF],
#          [INF,INF,INF,INF,10,7,INF,0,19,9],
#          [INF,INF,INF,INF,INF,INF,25,19,0,5],
#          [INF,INF,INF,15,INF,INF,INF,9,5,0]]

# 입력 배열 데이터 출력
n = len(input) # 정점의 개수 N 
print("\n<입력 배열>")
for i in range(n):
    for j in range(n):
        print('%5.0f' % input[i][j], end='')
    print()
    
# 알고리즘 호출 및 결과출력
R = Floyd_AllPairShortest(input)    
print("\n<최단 거리>")
for i in range(n):
    for j in range(n):
        print('%5d' % R[i][j], end='')
    print()

```
결과는 다음과 같다.
```
<입력 배열>
    0    4    2    5  inf
  inf    0    1  inf    4
    1    3    0    1    2
   -2  inf  inf    0    2
  inf   -3    3    1    0

<최단 거리>
    0    1    2    3    4
    0    0    1    2    3
   -1   -1    0    1    2
   -2   -1    0    0    2
   -3   -3   -2   -1    0
```

시간복잡도 : $O(n^3)$ (루프 문 3개)

## 2. 연속 행렬 곱셈(Chained Matrix Multiplication)
연속 행렬 곱셈은 연속된 행렬들의 곱셈에 필요한 원소간의 최소 곱셈 횟수를 찾는 문제이다.

연속된 행렬의 곱셈에는 결합법칙이 적용된다.
$$
A * B * C = (A * B) * C = A * (B * C)
$$
  
- 의사 코드 
```python title="연속 행렬 곱셈 의사 코드"
입력 : 연속된 행렬 $A_1, A_2, ..., A_n$
출력 : 입력의 행렬 곱셈에 필요한 원소간의 최소 곱셈 횟수

for i = 1 to n #배경의 대각선 원소 초기화
    C[i][i] = 0
for L = 1 to n-1 #L은 부분문제의 크기를 조절하는 변수
    for i = 1 to n-L {
        for i = 1 to n-L{
            j = i + L #원소간의 최소 곱셈 횟수 
            C[i][j] = infinity #결과 배열 : 대각선 이외의 위치값 초기화
            for k = i to j-1 {
                temp = C[i][k] + C[k+1][j] + d[i-1] * d[k] * d[j]
                if temp < C[i][j] {
                    C[i][j] = temp
                }
            }
        }
    }
return C[1][n]
```


- python 코드
```python title="MatrixMultiply.py"
# 연속 행렬 곱셈 알고리즘
def MatrixMultiply(d):
    N = len(d)-1 # N : 입력 행렬의 개수
    # C는 각 행렬 곱셈의 최소 연산 횟수 저장
    C = [[0 for _ in range(N+1)] for _ in range(N+1)] # NxN 배열
    # P는 최적의 행렬 곱셈 순서를 찾기 위한 괄호 위치 저장
    P = [[0 for _ in range(N+1)] for _ in range(N+1)] # NxN 배열    
    
    for L in range(1, N): # L:곱할 행렬의 개수
        print('L =',L)
        for i in range(1, N-L+1): # i:곱할 행렬들의 시작 인덱스
            j = i + L             # j:곱할 행렬들의 끝 인덱스  
            print('  i,j =',i,j);
            C[i][j] = float('inf')
            for k in range(i, j): # k:괄호를 치는 위치
                print('      k=',k,end=',')
                # temp:k를 괄호 위치로 했을 때의 연산 횟수 
                temp = C[i][k] + C[k+1][j] + d[i-1]*d[k]*d[j]
                print(' temp=',temp)
                if temp < C[i][j]:    
                    C[i][j] = temp # 최소 연산 횟수를 갱신
                    P[i][j] = k    # 최적의 괄호 위치 k를 기록
    return C,P  

# 행렬의 곱셈 순서 출력하기
def print_result(P, i, j):
    if i == j:
        print('A' + str(i), end='')
    else:
        print('(', end='')
        print_result(P, i, P[i][j])
        print_result(P, P[i][j]+1, j)
        print(')', end='')             


# 입력 데이터 및 알고리즘 호출
# D = [10, 20, 5]          # 입력행렬 = 10x20x5
# D = [10, 20, 5, 15]      # 입력행렬 = 10x20x5x15
D = [10, 20, 5, 15, 30]  # 입력행렬 = 10x20x5x15x30
# D = [10, 5, 15, 20, 30]  # 입력행렬 = 10x5x15x20x30
# D = [25, 10, 30, 10, 5]  # 입력행렬 = 25x10x30x10x5
R_C,R_P = MatrixMultiply(D)

# 결과 출력
n = len(D)-1 # 입력행렬의 갯수
print('\n[행렬의 곱셈 횟수 계산 결과]')
for i in range(1, n+1): 
    for j in range(1, n+1):   
        print('%4d  ' % R_C[i][j], end='')
    print()       
print('[최소 곱셈 횟수] =', R_C[1][n])
# print('[최소 곱셈 횟수의 k 값은] =', R_P[1][n])
print('[행렬의 곱셈 순서] = ', end='')
print_result(R_P, 1, n); print()

# print('[최적의 괄호 위치 k 값]')
# for i in range(1, n+1): 
#     for j in range(1, n+1):   
#         print('%4d  ' % R_P[i][j], end='')
#     print()  
```

