---
layout: default
title: "Eclipse"
description: "Win32Api로 제작된 2D 화면조작 탄막 게임입니다"
thumbnail: "/assets/Thumbnails/Title_BLAST.png"
categories: ["TeamProject", "WinAPI", "Award"]  # Category Id
order: 1
color : "#868686"
---

## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
<div class="equal-table">

| 제목 | Eclipse |
| --- | --- |
| 장르 | 2D / 화면 조작 / 탄막 / 슈팅 |
| 플랫폼 | Windows |
| 다운로드 | 🔗[구글 드라이브](https://store.onstove.com/en/games/4039) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[BLAST Git](https://github.com/GapMoeGroupMeister/BLAST) |
| --- | --- |
| 개발 환경 | Win32Api / C++ |
| 개발 인원 | 2인 팀(개발 2) |
| 역할 | PM / 팀장 / 개발 / 아트 |

</div>
</div>
</div>


<div class="review-section" style="--review-accent: {{ page.color }};">
<div class="review-title">
<h2>💻 주요 기능 개발 리스트</h2>
</div>

<div class="review-index">
<button class="review-item-btn" onclick="toggleReview(event, 'objectPooling')">
1. ObjectPooling - MSVC _interface를 활용한 오브젝트 풀링<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'ParticleSystem')">
2. ParticleSystem - 파티클 구현 <span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'UISystem')">
3. Canvas System - UI 개발 기반 좌표계<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'Delegate')">
4. Delegate 구현 - 의존성 줄이기<span>▼</span>
</button>
</div>

<div id="review-objectPooling" class="review-display-box">
<div class="review-tag">🔄 ObjectPooling - MSVC _interface를 활용한 오브젝트 풀링</div>
<div class="review-content">
<p>
MS 에서 지원하는 _interface를 활용하여 종속성을 줄인 ObjectPooling을 구현하여 재사용되는 투사체와 파티클들을 최적화했습니다.
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\GIF_Eclipse_1.gif" style ="border-radius: 8px;"/>
<p>
Eclipse는 2D 탄막 게임입니다. 탄막게임 특성상 투사체들이 굉장히 많이 등장하게 되는데. 이를 생성하고 삭제하기를 반복하면 게임이 프레임이 무지막지하게 떨어지는 것을 볼 수 있었습니다.
</p>
<h3>🚨문제 상황  </h3>
<p>
 원래 주로 개발하던 환경인 Unity에서 개발할 때에는 C#에 들어있는 Interface를 활용하여 풀링 시스템을 구성하여 객체간 의존성을 줄일 수 있었지만, C++에서는 이를 어떻게 해결할지가 막막했습니다. 같은 부모를 상속받는 방법도 있지만. 객체가 풀링되길 원치 않는 경우가 존재할 수 있었고. 만약 풀링 객체를 상속받았지만 정작 풀링은 하지 않는 객체라면 SOLID원칙의 리스코프 치환 원칙에 위배가 될 수 있었습니다. 

 그렇게 구글링을 해봤더니 VisualStudio에 마이크로소프트가 자체 지원하는 **_interface라는 기능**이 c++에 존재한다는 것을 알아냈습니다. (모던 C++ 자체에는 존재하지 않음) 

그냥 클래스 중복상속으로도 해결은 되지만 그냥 써보고싶었다는 느낌
</p>


</div>
</div>
</div>