---
layout: default
title: "OXIDATION"
description: "2D 공장 시뮬레이션 디펜스 게임입니다."
thumbnail: "/assets/Thumbnails/Oxidation_Title.png"
categories: ["TeamProject", "Unity", "Award"]  # Category Id
order: 6
color : "#ff7b0094"
---

## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 제목 | OXIDATION |
| --- | --- |
| 장르 | 2D / 디펜스 / 공장 |
| 플랫폼 | Windows |
| 다운로드 | 🔗[구글 드라이브](https://store.onstove.com/en/games/4039) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[OXIDATION Git](https://github.com/vcsHB/AVOID) |
| --- | --- |
| 개발 환경 | Unity / C# |
| 개발 인원 | 3인 팀 |
| 역할 | 기획 / 개발 / 아트 |

</div>
</div>
</div>

---

<div class="review-section">
    <h3 class="review-title">💻 주요 기능 개발 리스트</h3>
    
<div class="review-index">
        <button class="review-item-btn" onclick="toggleReview(event, 'pathFinding')">
            1. Enemy PathFinding AI - A* 알고리즘 활용 <span>▼</span>
        </button>
        <button class="review-item-btn" onclick="toggleReview(event, 'buildingUI')">
            2. Building UIs - MVP, MVVM 패턴 활용 <span>▼</span>
        </button>
    </div>

    <div id="review-pathFinding" class="review-display-box" markdown="1">
<div class="review-tag">🔎 Enemy PathFinding AI - A* 알고리즘 활용</div>
<div class="review-content" markdown="1">

Astar 알고리즘을 활용하여 적들이 몰려오는 경로를 탐색하고 최종적으로 플레이어의 베이스를 부수는 적의 AI를 개발했습니다. 

🔗[깃허브 PathFinder.cs](https://github.com/vcsHB/DUCKING/blob/main/Assets/01.Scripts/Agent/Enemy/PathFinder.cs)

우선적으로 시작 원점 위치와 목표 도착 위치를 받아오고 시작 위치와 도착위치를 Tilemap의 좌표계로 연산하기 위해 Vector2Int로 변환해줍니다. 그리고 시작 지점을 openSet(탐색할 위치)에 추가한 후 탐색 루프를 돌아줍니다. 알고리즘은 기본적인 A*알고리즘의 흐름대로 작동합니다.

### A* 알고리즘 기본 플로우

1. openSet (탐색할 위치)가 비지 않았는지 확인
2. openSet에서 가장 Score가 낮은 위치**(가장 거리가 가까운 위치)를 선택**
3. **목표 지점에 도달하였는지 (거리 기반) 체크**
4. 도착이 아니라면 현재 위치를 closedSet에 추가
5. 곧바로 이웃(상하좌우) 위치를 체크(벽이거나 이미 방문했다면 제외시킴)
6. gScore 연산 - 현재위치를 통해 이웃노드로 이동했을때의 비용을 계산
7. 혹시 **더 나은 경로**가 있는지 확인 (Score dictionary에서 이웃노드의 Score보다 현재 위치에서 이웃으로 이동한 Score가 더 낮다면 현재 노드에서 온 것(cameFrom)으로 갱신.
8. 새로운 위치라면 openSet에 추가

### 🔢 우선순위 큐(Priority Queue) 구현
낮은 Score의 위치정보를 먼저 뽑아오기 위하여 우선순위 큐(Priority Queue)를 직접 구현하였습니다. 

### ↗️ Heuristic에 관하여
<img src="/assets/ReferenceData/ProjectOxidation/Image_Oxidation_1.png" style="height:100px; border-radius: 8px;"/>

GetHeuristic함수를 통해 ‘멘해튼 거리’ 기법을 활용하여 상하좌우의 제한적인 경로 탐색에서 효율적인 연산을 할 수 있도록 합니다.

### 🗺️ ReconstructPath에 관하여
<img src="/assets/ReferenceData/ProjectOxidation/Image_Oxidation_2.png" style="height:250px; border-radius: 8px;"/>

경로 탐색에 성공하였을 때, 에너미가 이를 필요로 할 때 얕은 복사로 네비게이션 정보를 전달합니다.

### + 🚨 개발 중 사소한 사건사고
<img src="/assets/ReferenceData/ProjectOxidation/Image_Oxidation_3.png" style="height:450px; border-radius: 8px;"/>

스택오버플로우 방지를 위해 만든 예외처리입니다.
<img src="/assets/ReferenceData/ProjectOxidation/Image_Oxidation_4.png" style="height:150px; border-radius: 8px;"/>

</div>
    </div>

    <div id="review-buildingUI" class="review-display-box" markdown="1">
<div class="review-tag">🖥️ Building Detail UI - MVP, MVVM 패턴 활용</div>
<div class="review-content" markdown="1">

각종 건물과 포탑들에 따른 정보를 MVP, MVVM 패턴을 활용하여 사용자 친화적인 UI로 제작했습니다. 모든 건물들이 공통적으로 가지고 있는 요소인 체력과 건물 이름은 위로 따로 빼고 건물의 종류에 따라 상세한 정보를 표기해야했기 때문에 이에 따른 패널을 분리하여 개발할 필요가 있었습니다.

🔗[깃허브 FactoryBuildingDetailInfoPanel.cs](https://github.com/vcsHB/DUCKING/blob/main/Assets/01.Scripts/UI/InGame/InfoPanel/FactoryBuildingDetailInfoPanel.cs)

</div>
    </div>
</div>