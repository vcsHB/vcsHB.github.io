---
layout: default
title: "AVOID"
description: "3D 실시간 턴제 퍼즐 게임입니다."
thumbnail: "/assets/Thumbnails/AVOID_SubTitle.png"
categories: ["SingleProject", "Unity", "Award"]  # Category Id
order: 4
color : "#5c5c5c"
---

## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
<div class="equal-table">

| 제목 | AVOID |
| --- | --- |
| 장르 | 3D / 실시간 / 턴제  / 퍼즐 |
| 플랫폼 | Windows |
| 다운로드 | 🔗[스토브 인디](https://store.onstove.com/en/games/4039) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[AVOID Git](https://github.com/vcsHB/AVOID) |
| --- | --- |
| 개발 환경 | Unity / C# |
| 개발 인원 | 1인 팀 |
| 역할 | 기획 / 개발 / 아트 |

</div>
</div>
</div>


<div class="review-section" style="--review-accent: {{ page.color }};">
<div class="review-title">
<h2>💻 주요 기능 개발 리스트</h2>
</div>

<div class="review-index">
<button class="review-item-btn" onclick="toggleReview(event, 'moveInteract')">
1. MOVE to INTERACT System - 움직임을 통한 상호작용<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'stageManage')">
2. Stage Manage System - 스테이지 동적 생성 및 관리 <span>▼</span>
</button>
</div>

<div id="review-moveInteract" class="review-display-box">
<div class="review-tag">➡️ MOVE to INTERACT System - 움직임을 통한 상호작용</div>
<div class="review-content">
<p>
AVOID는 움직임을 통한 상호작용 시스템을 가지고 있습니다. 

인게임에서 대표적으로 많이 등장하는 기물들 중 PushObject는 상호작용을 당하는 기물이면서 동시에 상호작용을 하는 기물입니다. 

이를 위하여 IInteractable 인터페이스를 만들었습니다. 이는 상호작용을 하는 객체에 붙습니다.그리고 PushObject는 피상호작용을 당하는 객체인 InteractObject를 상속받아 구현됩니다.
<br>
🔗[깃허브 PushObject.cs](https://github.com/vcsHB/AVOID/blob/main/Assets/01.Scripts/InGame/Object/InteractionObject/PushObject.cs)

</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_1.png" height="300px" style ="border-radius: 8px;"/>
<p>
예를 들어 일렬로 나란히 놓은 PushObject를 상호작용 한다면. 상호작용 방향에 놓인 PushObject들은 연쇄적으로 밀려나야합니다.  따라서 IInteractable 인터페이스는 MoveDirection 프로퍼티를 통해 이동방향을 나타냅니다. 그리고 다음 오브젝트에게 자신 객체를 통째로 넘기는 것이 아닌. IInteractable 객체만을 넘겨 이동방향을 전달합니다.
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_2.png" height="300px" style ="border-radius: 8px;"/>
<p>
또한 최종적으로 마지막으로 밀려날 오브젝트의 이동방향에 장애물이 존재한다면. 첫번째 밀려난 오브젝트는 물론 플레이어의 상호작용 행위 그 자체가 취소되어야합니다. 
</p>

<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_3.png" style ="border-radius: 8px;"/>
<p>
이를 위해 IInteractable 인터페이스의 DetectInteraction()은 bool값을 반환하여. 연쇄적인 상호작용을 타고 전방에 장애물이 있는지를 검사하고 그 결과를 반환하여 움직임의 여부를 최종 결정합니다.
</p>



</div>
</div>


<div id="review-stageManage" class="review-display-box">
<div class="review-tag">🔖 Stage Manage System - 스테이지 동적 생성 및 관리</div>
<div class="review-content">
<p>
Scriptable Object를 통해 프리팹화 시킨 레벨을 로드하고 관리하는 시스템을 개발했습니다.
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_4.png" style ="border-radius: 8px;"/>
<p>
이와같이 맵은 시작지점 세팅과 기본 오브젝트와 플랫폼을 가지고 있는 base맵이 원본인 Variant Prefab으로 맵을 제작하고 디자인하여 SO에 할당합니다. 

그리고 각 레벨에는 필수적으로 1개 이상의 포탈이 배치됩니다. 이 포탈은 각 레벨에서 다른 레벨로 이어주는 통로의 역할을 수행합니다.
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_5.png" style ="border-radius: 8px;"/>
<p>
AVOID는 포탈을 통해 다음 레벨이 로딩되는 방식이기 때문에 포탈 상호작용에 기반하여 함수를 작성했습니다.

🔗[깃허브 Portal.cs](https://github.com/vcsHB/AVOID/blob/main/Assets/01.Scripts/InGame/Object/LogicObject/Objects/Portal.cs)
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_6.png" style ="border-radius: 8px;"/>
<p>
우선 포탈 클래스는 포탈에 들어갔을때 넘어갈 스테이지의 ID를 가지고 있습니다.

(Stage ScriptableObject를 가지고 있었다면 더욱 명시적이고 좋았을 수도 있지만, 이 당시에는 id int만 넘기는게 싸게 먹히지 않을까 라는 생각으로 만들었습니다. 딱히 그런거 신경쓸 정도는 아닌데..)
</p>

<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_7.png" height="400px" style ="border-radius: 8px;"/>
<p>
그리고 TriggerEvent로 포탈이 동작하면 StageManager의 스테이지 변경 함수가 작동되게 됩니다. 실질적인 스테이지의 데이터 처리와 변경을 StageManager가 담당합니다.

🔗[깃허브 StageManager.cs](https://github.com/vcsHB/AVOID/blob/main/Assets/01.Scripts/Core/StageManager.cs)
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_8.png" style ="border-radius: 8px;"/>
<p>
StageManager가 Awake되면 JSON으로 저장된 스테이지 세이브 정보를 받아옵니다.
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_9.png" style ="border-radius: 8px;"/>

<p>
StageManager는 이동 횟수 데이터와 현재 레벨 ID, 레벨 클리어 데이터들을 묶은 스테이지 세이브 데이터를 가지고 있고. LevelManager 에게 현재 레벨에 대한 데이터를 넘겨 맵을 생성합니다.

🔗[깃허브 LevelManager.cs](https://github.com/vcsHB/AVOID/blob/main/Assets/01.Scripts/InGame/Manager/LevelManager.cs)
</p>
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_10.png" style ="border-radius: 8px;"/>
<p>
최종적으로 기존의 레벨을 삭제. 새로운 레벨을 생성해주고 약간의 연출과 함께 플레이어의 위치를 시작위치로 설정된 위치로 설정해주었습니다.
</p>

</div>
</div>

</div>