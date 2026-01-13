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
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
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

## 💻 주요 기능 개발 리스트

<div class="review-section">
    <div class="review-title">
        코드 리뷰 목차
    </div>
    
   <div class="review-index">
        <button class="review-item-btn" onclick="toggleReview('logic')">
            1. 로직 최적화 (Algorithm) <span>▼</span>
        </button>
        <button class="review-item-btn" onclick="toggleReview('memory')">
            2. 메모리 관리 (Memory) <span>▼</span>
        </button>
        <button class="review-item-btn" onclick="toggleReview('ui')">
            3. UI/UX 개선 (Interface) <span>▼</span>
        </button>
    </div>

   <div id="review-logic" class="review-display-box">
        <div class="review-tag">Algorithm</div>
        <p class="review-content">불필요한 이중 루프를 제거하고 해시맵을 도입하여 탐색 속도를 개선했습니다.</p>
    </div>

   <div id="review-memory" class="review-display-box">
        <div class="review-tag">Memory</div>
        <p class="review-content">오브젝트 풀링을 적용하여 프레임 드랍 현상을 해결했습니다.</p>
    </div>

   <div id="review-ui" class="review-display-box">
        <div class="review-tag">Interface</div>
        <p class="review-content">반응형 레이아웃을 적용하여 모바일 환경에서의 가독성을 높였습니다.</p>
    </div>
</div>