---
layout: default
title: "Eclipse"
description: "Win32Api로 제작된 2D 화면조작 탄막 게임입니다"
thumbnail: "/assets/Thumbnails/TheEclipse_Thumbnail.png"
categories: ["TeamProject", "WinAPI", "Award"]  # Category Id
order: 6
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
| 다운로드 | 🔗[구글 드라이브](https://drive.google.com/drive/folders/1pjWMZK-E237ximVBFSdq1-haXcVuid-T) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[Eclipse Git](https://github.com/vcsHB/TheEclipse) |
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
<button class="review-item-btn" onclick="toggleReview(event, 'particleSystem')">
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

그렇게 구글링을 해봤더니 VisualStudio에 마이크로소프트가 자체 지원하는 **_interface라는 기능**이 c++에 존재한다는 것을 알아냈습니다. (모던 C++ 자체에 인터페이스는 존재하지 않음) 

C++이라 그냥 클래스 중복상속으로 가능하지만 그냥 써보고싶었다는 느낌
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_1.png" style ="border-radius: 8px;"/>
<p>
동작 방식 자체가 C#의 interface를 역수입 해온것 처럼 동일하게 동작하며 
자식으로 형변환 캐스팅도 정상적으로 잘 되는 것을 보고, 이를 활용하여 ObjectPooling시스템을 만들어야겠다고 생각했습니다.

🔗[깃허브 PoolManager.h](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/PoolManager.h) 🔗[깃허브 PoolManager.cpp](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/PoolManager.cpp)
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_2.png" style ="border-radius: 8px;"/>
<p>
오브젝트 풀링은 기본적으로 사용하기 전에 오브젝트들을 미리 만들어두는 기능이 있는데 이를 위해 AddPool()을 해주어야합니다. 
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_3.png" style ="border-radius: 8px;"/>
<p>

이는 🔗[GameScene](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/GameScene_2.cpp)
이 Init(씬에 진입 했을때 초기에 실행됨 )되었을 때 AddPool을 해주게 되는데. 이걸 GameScene에서 해주는 이유는 여러가지가 있지만, 그중에서 대표적인 이유는 PoolManager 내부에서 생성을 해주려면 PoolManager가 각각의 풀링 객체에 대한 헤더파일들을 모두 Include해야 하는데. 이렇게 되면 순환 참조라던가... 다른 큼지막한 문제들이 생길 수 있어서 한둘이 아니라서 GameScene에서 생성해줍니다.
</p>

</div>
</div>



<div id="review-particleSystem" class="review-display-box">
<div class="review-tag">💥 Particle System - 파티클 구현</div>
<div class="review-content">
<p>
여러 파티클 조각들을 생성하고 Update, Render및 관리하는 ParticleSystem을 구현하여 게임의 퀄리티를 높혔습니다. 사소한 차이이고 로우 퀄리티의 구현 사항이지만 없는 것 보다는 훨씬 나은 효과를 보인 기능입니다. 
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_3.png" style ="border-radius: 8px;"/>

<p>
큰 구조로 보면 위와 같이 ParticleSystem도 일반적인 오브젝트와 같은 취급을 받되 풀링 처리를 받습니다. 따라서 **ParticleSystem이 Cell들을 생성하고 생명주기를 관리**하며 Cell들이 모두 파괴되면 자신까지 파괴(사실은 풀링처리를 통해 재사용)됩니다. 

내부적으로는 🔗[깃허브 ParticleSystem.h](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/ParticleSystem.h) 와 🔗[깃허브 ParticleCell.h](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/ParticleCell.h)를 통해 구현됩니다.
</p>
<div style="display: flex; justify-content: center; gap: 15px;">
    <img src="..\assets\ReferenceData\ProjectEclipse\GIF_Eclipse_2.gif" style="width: 40%; border-radius: 8px;">
    <img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_4.png" style ="width: 60%; border-radius: 8px;"/>
</div>

<p>
큰 구조로 보면 위와 같이 ParticleSystem도 일반적인 오브젝트와 같은 취급을 받되 풀링 처리를 받습니다. 따라서 **ParticleSystem이 Cell들을 생성하고 생명주기를 관리**하며 Cell들이 모두 파괴되면 자신까지 파괴(사실은 풀링처리를 통해 재사용)됩니다. 

내부적으로는 🔗[깃허브 ParticleSystem.h](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/ParticleSystem.h) 와 🔗[깃허브 ParticleCell.h](https://github.com/vcsHB/TheEclipse/blob/master/TheEclipse/ParticleCell.h)를 통해 구현됩니다.
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_5.png" style ="border-radius: 8px;"/>


<p>
ParticleSystem은 풀링처리되며, 위와 같이 생성 반지름, 파티클 개수, 수명, 속도등을 받습니다. 이런식으로 받아진 값들은 ParticleSystem내의 Play() 함수를 실행하면 적용되어 Cell들을 생성합니다.
</p>

<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_6.png" style ="border-radius: 8px;"/>

<p>
랜덤한 원 상의 위치, 랜덤한 퍼져나가는 방향 등을 추가로 계산하고 수명과 속도와 함께 Cell에 넣어줍니다.  그리고 관리할 셀들을 셀 vector에 넣어주면 ParticleSystem의 생명주기가 시작됩니다.
</p>

<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_7.png" style ="border-radius: 8px;"/>

<p>
particleSystem.cpp  line.32<br><br>
이후 Update에서 Cell들을 업데이트 해주고, 수명이 다한 셀들은 파괴해줍니다.
</p>
<img src="..\assets\ReferenceData\ProjectEclipse\Image_Eclipse_8.png" style ="border-radius: 8px;"/>
<p>
Render에서는 실제로 Cell들이 화면에 그려질 수 있게 Render함수를 모두 호출해줍니다.
</p>

</div>
</div>

</div>