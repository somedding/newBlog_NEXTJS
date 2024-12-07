---
title: '근사 알고리즘'
date: '2024-12-07'
description: '근사 알고리즘'
thumbnail: "/img/image.png"
tags: ['알고리즘']
---

# Approximation Algorithm
## Approx_MST_TSP Algorithm (Minimum Spanning Tree, Traveling Salesman Problem)

```python title="Approx_MST_TSP.py"
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
