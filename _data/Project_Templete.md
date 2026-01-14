---
layout: default
title: "***PROJECTNAME"
description: "***PROJECT_DESCRIPTION"
thumbnail: "/assets/Thumbnails/Default_Thumbnail.png"
categories: []  # Category Id
order: 999
color : "#000000"
---

## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
<div class="equal-table">

| 제목 | ***PROJECTNAME |
| --- | --- |
| 장르 | GENRE |
| 플랫폼 | PLATFORM |
| 다운로드 | 🔗[LINK ORIGIN](URL) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[LINK Git](URL) |
| --- | --- |
| 개발 환경 | DEV_ENVIRONMENT |
| 개발 인원 | MEMBERS |
| 역할 | ROLE |

</div>
</div>
</div>

<div class="review-section">
    <div class="review-title">
        ## 💻 주요 기능 개발 리스트
    </div>
    
   <div class="review-index">
        <button class="review-item-btn" onclick="toggleReview('logic')">
            1. LOGIC REFACTOR <span>▼</span>
        </button>
        <button class="review-item-btn" onclick="toggleReview('memory')">
            2. MEMORY MANAGE REFACTOR <span>▼</span>
        </button>
    </div>

   <div id="review-logic" class="review-display-box">
        <div class="review-tag">LOGIC</div>
        <p class="review-content">REVIEW CONTENT 1</p>
    </div>

   <div id="review-memory" class="review-display-box">
        <div class="review-tag">MEMORY MANAGE</div>
        <p class="review-content">REVIEW CONTENT 2</p>
    </div>
</div>