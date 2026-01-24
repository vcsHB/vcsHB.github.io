---
layout: default
title: "Code:Unknown"
description: "2D 해킹 로그라이트 게임입니다."
thumbnail: "/assets/Thumbnails/CodeUnkncown_Title.png"
categories: ["TeamProject", "Unity", "Award"]  # Category Id
order: 4
color : "#dc3c18"
---

## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
<div class="equal-table">

| 제목 | Code:Unknown |
| --- | --- |
| 장르 | 2D / 로그라이트 |
| 플랫폼 | Android |
| 다운로드 | 🔗[ONE Store](https://m.onestore.co.kr/v2/ko-kr/app/0000778599) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[AVOID Git](https://github.com/REVERSE-DRIVE/Code-UnKnown) |
| --- | --- |
| 개발 환경 | Unity / C# |
| 개발 인원 | 4인 팀 |
| 역할 | 기획 / 개발 / 아트 |

</div>
</div>
</div>


<div class="review-section" style="--review-accent: {{ page.color }};">
<div class="review-title">
<h2>💻 주요 기능 개발 리스트</h2>
</div>

<div class="review-index">
<button class="review-item-btn" onclick="toggleReview(event, 'objectPooling')">
1. Object Pooling - 오브젝트 풀링 최적화 기능<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'fsmEnemy')">
2. Finite State Machine 구조 Enemy개발 - 에너미 FSM AI 개발 <span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'playerSkill')">
3. Player Skill System - SO, Prefab기반의 스킬구현 <span>▼</span>
</button>
</div>

<div id="review-objectPooling" class="review-display-box">
<div class="review-tag">🔄 Object Pooling  - 오브젝트 풀링 최적화 기능</div>
<div class="review-content">
<img src="..\assets\ReferenceData\ProjectCodeUnknown\Image_CodeUnknown_1.png" style ="border-radius: 8px;"/>

<p>
오브젝트 풀링을 활용해 각종 VFX와 SFX, 반복적으로 재사용되는 여러 오브젝트들을 관리했습니다. 기존에 여러 프로젝트에서 당시 사용하던 풀링 시스템이 새롭게 알게된 SOLID법칙에 위배된다는 것을 알게되었습니다. 

따라서 이를 리팩토링하여 해결하고 적용시켰습니다.

🔗[티스토리 - PoolManager 개발 글](https://dev-vcs.tistory.com/entry/STAC-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-%EC%8A%A4%ED%83%9D-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-2-PoolManager)
</p>
</div>
</div>

<div id="review-fsmEnemy" class="review-display-box">
<div class="review-tag">🤖 Finite State Machine 구조 Enemy개발 - 에너미 FSM AI 개발</div>
<div class="review-content">
<p>
FSM 패턴은 학교 수업 시간에 배웠던 구조를 응용하여 개발했습니다.
</p>
<img src="..\assets\ReferenceData\ProjectCodeUnknown\GIF_CodeUnknown_1.gif" height="300px" style ="border-radius: 8px;"/>
<p>

🔗[깃허브 BossAVGState.cs](https://github.com/REVERSE-DRIVE/Code-UnKnown/blob/main/Assets/01.Scripts/Agent/Enemy/Boss/AVG/BossAVGState.cs)
</p>
<img src="..\assets\ReferenceData\ProjectCodeUnknown\Image_CodeUnknown_2.png" height="300px" style ="border-radius: 8px;"/>
<p>
위 코드는 1스테이지 보스로 등장하는 “AVG”의 State 기본 코드입니다.
</p>
<img src="..\assets\ReferenceData\ProjectCodeUnknown\Image_CodeUnknown_3.png" height="420px" style ="border-radius: 8px;"/>
<p>

🔗[깃허브 EnemyStateMachine.cs](https://github.com/REVERSE-DRIVE/Code-UnKnown/blob/main/Assets/01.Scripts/Agent/Enemy/EnemyStateMachine.cs)
</p>
<img src="..\assets\ReferenceData\ProjectCodeUnknown\Image_CodeUnknown_4.png" height="120px" style ="border-radius: 8px;"/>

<p>
이 당시에는 코드 재사용성으로 인해 Enum 제네릭 타입을 들고있는 StateMachine 구조를 선호했으나. 추후 다른 개발들을 이어가면서 특유의 비직관성과 은근히 확장이 어려운 면들이 보이면서 사용을 줄였습니다.  또한 패턴과 동작이 복잡한 보스의 경우에 FSM으로 구현하면 State가 혼자서 패턴의 모든 행동을 구사해야하기 때문에, 패턴의 내용이 복잡해지면 복잡해질수록 State스크립트의 코드가 길어지는 문제가 있기 때문에, 보스 패턴과 같이 복잡한 행동의 구현은 Behaviour Tree로 개발을 해야함을 느꼈습니다. 이러한 문제들에 대한 보완으로, 추후 졸업 작품인 “NightCode”에서 보스개발에 BT를 활용하였습니다.
</p>

</div>
</div>

<div id="review-playerSkill" class="review-display-box">
<div class="review-tag">⚡ Player Skill System - SO, Prefab기반의 스킬구현</div>
<div class="review-content">
<img src="..\assets\ReferenceData\ProjectCodeUnknown\GIF_CodeUnknown_2.gif" height="300px" style ="border-radius: 8px;"/>

<img src="..\assets\ReferenceData\ProjectCodeUnknown\Image_CodeUnknown_5.png" height="180px" style ="border-radius: 8px;"/>
<p>
컨트롤러 생성을 통해 장착가능한 파츠의 스킬 효과를 SO로 분리하였습니다.
ScriptableObject의 변경만으로 스킬의 기능이 변경될 수 있도록 스킬의 텍스트 정보와 아이콘등을 ScriptableObject내에 담고, 실질적인 스킬의 기능을 Prefab화 시켜 SO내에 넣었습니다. SO를 Controller가 넘겨 받았을 때 프리팹을 생성하여 사용할 수 있도록 구조를 짰습니다.

🔗[티스토리 - PlayerSkillSystem 개발 글](https://dev-vcs.tistory.com/entry/STAC-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-%EC%8A%A4%ED%83%9D-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-4-Player-Skill-System)
</p>

</div>
</div>
</div>