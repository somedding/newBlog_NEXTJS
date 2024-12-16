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
        mark[visit_seq[i]] = True # 방문한 점(True로 변경)4
direct_seq.append(0)  # 도착점 = 시작점
print('- TSP 방문 순서(중복제거) :', direct_seq)

# 5. 최종 경로의 총 길이 계산
total = 0
for i in range(N):  
    total = total + g[direct_seq[i]][direct_seq[i + 1]]
print('- TSP 최종 경로의 길이  = ', total)


```


## 통채우기 문제
1. 최초 적합 First Fit
2. 다음 적합 
3. 최적 적합
4. 최악 적합
최초 , 최선 , 최악 적합은 최소한의 통을 쓰는 거임
다음 적합은 최소한의 통을 쓰지는 않음

### 최초 적합 First Fit
//todo

### JobScheduling
```python title="의사코드"
for j = 1 to m
    L[j] = 0
for i = 1 to n
    min = 1
    for j = 2 to m
        if L[j] < L[min]
            min = j #작업 i를 기계 M[min]에 배정
    L[min] = L[min] + t[i]
return L #가장 늦은 작업 종료 시간 (모든 작업이 종료된 시간)
```

```python title="JobScheduling.py"
# 작업 스케쥴링 알고리즘
def JobScheduling(Job):
    M = [[0]]  # 기계 0으로 시작, 시작시간=0
    for i in range(len(Job)):
        j = 0   # 현재 기계의 인덱스
        allocated = False # 현재 작업에 대한 할당완료 여부
        while not allocated and j < len(M): # 현재 확인할 기계가 존재
            if Job[i][0] >= M[j][0]: # 현재 기계에 현재 작업을 할당할 수 있는지 확인
                M[j].append(i)       # 기계 j에 Job i 할당
                M[j][0] = Job[i][1]  # 기계 j의 시작(가능한)시간을 job i의 종료시간으로
                allocated = True     # 현재 작업에 대한 할당 완료    
            j += 1                   # 다음 기계로 넘어가기 위해 인덱스 증가
        if not allocated:        # 현재 작업에 대한 할당이 완료되지 않았으면
            M.append([0])       # 새로운 기계 추가: 0은 해당 기계의 시작 가능 시간
            M[j].append(i)      # 새로운 기계 j에 현재 작업을 할당
            M[j][0] = job[i][1] # 기계 j의 시작(가능한)시간을 job i의 종료시간으로               
            
    last_job = max(Job, key=lambda arr: arr[1])  # 모든 작업의 최종 종료시간
    print('[모든 작업의 종료시간] = %d' % last_job[1])
    return M

# 입력 : n개의 작업, 시작시간으로 정렬
job = [[0,2],[1,6],[1,5],[3,7],[5,9],[6,8],[7,8]]  # [시작시간,종료시간]
machine = JobScheduling(job)    # 작업 스케쥴링 알고리즘 호출

for k in range(len(machine)):   # 기계에 배정된 job 리스트 출력
    print('기계%d:'% k, end='')
    for i in range(1, len(machine[k])): 
        print(' 작업%d' % machine[k][i],job[machine[k][i]],'',end='')
    print()

```

### 클러스터링 문제
#### 클러스터링 알고리즘 방법
1. C1을 찾을때는 임의
2. 두번쨰 센터 C2는 가장 먼점을 할당하되 , 두개의 그룹으로 나누어 생각하면 편하다.
3. 세번째 센터 C3는 가장 먼점을 할당하는데 후보지에서 그중 작은 값을 D[i]로 설정, D에서 가장 큰 값을 가진 원소의 인덱스가 i라고 하면 점 $x_i$가 C3가 된다.

#### D[i] 계산