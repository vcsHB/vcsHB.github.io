---
layout: default
title: "BLAST"
description: "3D 메카 뱀서라이크 게임입니다."
thumbnail: "/assets/Thumbnails/Title_BLAST.png"
categories: ["TeamProject", "Unity", "Award"]  # Category Id
order: 1
color : "#4287f5"
---
<div align="center">
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/-BOMyZsYJx0" 
    title="YouTube video player" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen style="border-radius: 12px;">
  </iframe>
</div>
## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
<div class="equal-table">

| 제목 | BLAST |
| --- | --- |
| 장르 | 3D / 메카 / 뱀서라이크 |
| 플랫폼 | Windows |
| 다운로드 | 🔗[구글 드라이브](https://store.onstove.com/en/games/4039) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[BLAST Git](https://github.com/GapMoeGroupMeister/BLAST) |
| --- | --- |
| 개발 환경 | Unity / C# |
| 개발 인원 | 5인 팀 |
| 역할 | 기획 / 개발 / 아트 |

</div>
</div>
</div>


<div class="review-section" style="--review-accent: {{ page.color }};">
<div class="review-title">
<h2>💻 주요 기능 개발 리스트</h2>
</div>

<div class="review-index">
<button class="review-item-btn" onclick="toggleReview(event, 'buffDebuffSystem')">
1. BUFF & DEBUFF System - 버프와 디버프 시스템<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'allUI')">
2. ALL UIs - 게임 내 전반적인 UI 개발 <span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'partChangeSystem')">
3. Part Change System - 파츠 변경 및 저장 시스템<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'playerSkill')">
4. PlayerSkill Dev - 플레이어 스킬 개발<span>▼</span>
</button>
</div>

<div id="review-buffDebuffSystem" class="review-display-box">
<div class="review-tag">⚡ BUFF & DEBUFF System - 버프와 디버프 시스템</div>
<div class="review-content">
<p>
FSM 구조 에서 일부 영감을 받아 Entity의 버프 디버프 시스템을 구현했습니다. 
</p>

🔗[깃허브 EffectSystem Folder](https://github.com/GapMoeGroupMeister/BLAST/tree/main/Assets/01.Scripts/EffectSystem)
<p>
엔티티 Agent개체 하나하나가 **EffectController**를 가지고 있고. Controller가 EffectState들을 Dictionary로 가지고 있으며 매 프레임 Update해줍니다. EffectState는 enable, 활성화 되어있는지(해당 버프 이펙트를 가지고 있는지), 이펙트의 레벨과 지속시간을 가지고. Controller는 이펙트가 캐스팅되면 Start(), enable일때 Update() 해줍니다.
</p>

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_1.png" height="250px" style ="border-radius: 8px;"/>

 🔗[티스토리 디버프 시스템 개발 글](https://dev-vcs.tistory.com/entry/BLAST-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EB%A1%9D-Effect-System-%EA%B0%9C%EB%B0%9C)

</div>
</div>

<div id="review-allUI" class="review-display-box">
<div class="review-tag">🪟 ALL UIs - 게임내 전반적인 UI 개발</div>
<div class="review-content">

<p>
버프와 파츠 변경, 및 컬러피커, 임무 선택 등등 게임 전체의 전반적인 UI들을 MVP와 MVVM 패턴을 활용하여 제작했습니다.
</p>
<h3>🎨 컬러피커 UI 
 <a href="https://github.com/GapMoeGroupMeister/BLAST/tree/main/Assets/01.Scripts/UI/LobbyScene/PartPanel/ColorSetting" target="_blank">🔗 깃허브 ColorSetting Folde</a>
</h3>
<img src="..\assets\ReferenceData\ProjectBlast\GIF_Blast_1.gif" height="300px" style ="border-radius: 8px;"/>

<p>
컬러피커 UI는 대회 제출 직전에 개발을 시작해서 완료한 급조된 구조라, 다시 봐도 엄청 비효율적이고 별로 못짠 코드같습니다. 무엇보다 컬러를 찍으면 HSV로 변환하여 각 슬라이더로 표시하고, 슬라이더를 조정하면, 컬러 피커 상에서 색깔이 변경되어야하는 고통스러운 양방향 input, output 으로 인해 양방향 의존성을 막을 방법을 시간안에 생각하지 못해 개발에 꽤 난항을 겪었습니다.

 추후 심화 개발을 통해 다른 여러 대회에 출품하고, 출시하는 과정에서 새롭게 리팩토링할 예정입니다. (언제하지)
</p>

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_2.png" height="100px" style ="border-radius: 8px;"/>
<p>
블로그도 쓰려했습니다.
</p>

</div>
</div>

<div id="review-partChangeSystem" class="review-display-box">
<div class="review-tag">📋 Player Part 플레이어 파츠 선택 UI</div>
<div class="review-content">
<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_3.png" height="300px" style ="border-radius: 8px;"/>

<p>
파츠 선택 UI는 이 다음에 설명될 파츠 변경 시스템을 동작시키는 부분으로, MVP 패턴을 활용한 대표적인 예시입니다. 
</p>

<h3>Model : 데이터를 가지고 있는 부분</h3>
<p>

BLAST는 파츠의 데이터를 가지고 있는 부분이 두가지로 나뉩니다.

첫번째는 GameDataManager가 가지고있는 PartSave. 
이는 파츠 ID와 파츠를 보유하고 있는지에 대한 정보를 가져옵니다.  
두번째는 SaveManager에서 현재 사용중 (장착중인) 파츠의 ID를 가져옵니다.

사실 데이터 관리는 담고 Json으로 저장하는 부분이 대부분이기 때문에 기능적으로 봤을때 UI가 필요로 하는 부분은 아래가 끝입니다.  
</p>
<a href="https://github.com/GapMoeGroupMeister/BLAST/blob/main/Assets/01.Scripts/UI/LobbyScene/PartPanel/PartSelectPanel.cs" target="_blank">🔗 깃허브 PartSelectPanel.cs Folde</a>  ← (Presenter)

<br>
<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_8.png" height="430px" style ="border-radius: 8px;"/>

<p>
Present : Model의 데이터를 받아서 View들에게 넘겨주는 코드

 두 데이터를 받아 해금된 파츠의 정보만. 그에 해당하는 선택 슬롯을 생성해줍니다. 
</p>


<h3>View : 데이터를 사용자에게 보여주는 부분</h3>
<p>

🔗[깃허브 SelectDisplayPanel.cs](https://github.com/GapMoeGroupMeister/BLAST/blob/main/Assets/01.Scripts/UI/LobbyScene/PartPanel/SelectDisplayPanel.cs) 
🔗[깃허브 PartSelectSlot.cs](https://github.com/GapMoeGroupMeister/BLAST/blob/main/Assets/01.Scripts/UI/LobbyScene/PartPanel/PartSelectSlot.cs)
</p>

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_4.png" height="200px" style ="border-radius: 8px;"/>

SelectDisplayPanel.cs

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_5.png" height="500px" style ="border-radius: 8px;"/>

PartSelectSlot.cs

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_6.png" height="300px" style ="border-radius: 8px;"/>

SelectDisplayPanel

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_7.png" height="300px" style ="border-radius: 8px;"/>

<p>
PartSelectSlot

🔗[깃허브 QuadMeshDraw.cs](https://github.com/GapMoeGroupMeister/BLAST/blob/main/Assets/01.Scripts/UI/LobbyScene/QuadMeshDrawer.cs)


**SelectDisplayPanel**은 이와 같이 **메쉬를 그려 해당 파츠의 Status를 시각화**하는 중요하디 중요한 기능을 담당했었습니다. 현재에는 디자인을 조금 수정해야한다는 이슈로 인해 잠시 로비 씬 배경 모델 바깥쪽으로 쫓겨나있는 신세입니다. 그래도 구버전 빌드본에서만 해도 현역으로 작동하던 View 기능이었습니다.

**PartSelectSlot**은 아래의 파츠 각각을 나타내고 선택할 수 있게 하는 버튼입니다.  이름과 파츠 아이콘에 대한 정보를 얻기위해 Initialize()를 통해 SO를 받고, 이를 **표시**합니다. 버튼으로 클릭 Input이 들어오면 OnSelectEvent를 발행합니다. 
</p>

<h3>Presenter : 데이터 가공, View에게 전달하는 부분</h3>

<p>Presenter는 위에서 잠깐 나왔듯이 아래의 기능을 그대로 수행합니다. </p>
<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_8.png" height="430px" style ="border-radius: 8px;"/>
<p>
Present : Model의 데이터를 받아서 View들에게 넘겨주는 코드

Model로 부터 해금된 파츠에 대한 데이터, 그리고 현재 장착하고 있는 파츠 ID를 받아옵니다. 해금 여부에 따라 Slot을 생성하지 않을수 있고 장착 중 인지에 따라 UI에 미리 사용중 표시를 할지 말지를 정합니다.
</p>

</div>
</div>

<div id="review-playerSkill" class="review-display-box">
<div class="review-tag">🔧 PlayerSkill Dev - 플레이어 스킬 개발</div>
<div class="review-content">

<p>
네이팜과 핵폭탄 등등 인게임에서 스케일이 크고 화려한 무기들의 기능을 개발하고 이펙트를 제작했습니다. 그중에서 가장 인상깊고도 재미있게 개발했던 무기는 **“Oil Terror”** 가 있습니다.

개발 과정이 재미있었어서 티스토리에도 쓰려고 헸으나 당시에 일이 쌓이고 쌓여서 글쓰기를 미루고 미루다 결론적으로는 작성하던 것도 어느새인가 지워져있었습니다. (변명 맞음)

**OIL TERROR**는 바닥에 기름을 말 그대로 뿌려버리는 스킬입니다. 

그래서 이게 무엇을 하는가하면..
</p>
<h4>🔥불이 근처에서 발생하면 기름에 불이 옮겨 붙습니다. </h4>
<p>
대표적으로는 플레이어의 화염방사 공격, 네이팜 스킬등이 있습니다.
</p>
<div style="display: flex; justify-content: center; gap: 20px;">
  <img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_9.png" style="width: 40%; border-radius: 8px;" >
  <img src="..\assets\ReferenceData\ProjectBlast\GIF_Blast_2.gif" style="width: 48%; border-radius: 8px;">
</div>
<br>
<p>
이 작고 사소한 기름 웅덩이는 넓은 범위로 깔려있을때 적들을 손쉽게 고물로 만들 수 있는 꽤 무시무시한 무기 라는 설정인데. 결론적으로 저 콜라이더가 **화염 공격을 감지하면 스스로 불을 내기 시작** 합니다. 동시에 자신 또한 공격 기능을 가지고 있어. 주변의 모든 물체에게 불속성 공격을 가하게 됩니다. 
</p>

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_10.png" height="430px" style ="border-radius: 8px;"/>

<p>
따라서 **한쪽의 기름에 먼저 불이 붙는다면 이 불은 기름을 따라 점점 퍼져 나가는 매커니즘**을 가집니다. 내부적으로는 EffectSystem과 연관이 되어있는데.

🔗[깃허브 IEffectable.cs](https://github.com/GapMoeGroupMeister/BLAST/blob/main/Assets/01.Scripts/EffectSystem/IEffectable.cs) ( 처음 만들땐 괜찮았던 거 같은데 다시 보니 이름이 그렇게 막 와닫진 않는 느낌)

🔗[깃허브 OilObject.cs](https://github.com/GapMoeGroupMeister/BLAST/blob/main/Assets/01.Scripts/Object/OilObject.cs)
</p>

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_11.png" height="430px" style ="border-radius: 8px;"/>

<p>
기름 오브젝트가 활성화 되면 FixedUpdate에서 위 함수를 실행시켜 주변의 모든 것을 불태우도록 합니다. IEffectable 인터페이스로 감지함으로 의존성을 줄였고. 추후 Caster시스템과 이펙트 시스템의 통합을 논의하다가 결론적으로는 하위 캐스터로 약간씩 기능을 분리하는 방향을 잡았었습니다.
</p>


<h2> 
<a href="https://dev-vcs.tistory.com/entry/%EA%B2%8C%EC%9E%84-%EA%B0%9C%EB%B0%9C-Caster-%EC%8B%9C%EC%8A%A4%ED%85%9C-Damage-Knockback" target="_blank">🔗 그렇게 그에 따른 내용들을 고찰하다가 탄생한 Caster 시스템에 관한 글</a>
</h2>
<p>
2D라 약간 구현이 다를순 있지만 전반적인 고찰의 배경이나 구현 방식은 같은 뿌리인 이 프로젝트에 시작된 것 입니다.

다시 돌아와서 Oil의 데미지 시스템은 그렇게 구현되었고. 아래 기름은 메쉬도 그 무엇도 아닌 **Decal**로 구현되었습니다. Decal은 Decal Projector를 활용하여 빔 프로젝터와 같이 어느 면에 그대로 도장처럼 무언가를 찍어내는 기능입니다.  
그것이 텍스쳐가 될 수도 있고. 쉐이더로 뽑은 이펙트가 될 수도 있는데. 여기서는 **쉐이더 그래프를 통해 구현**하였습니다.

메쉬를 만들거나 하는것이 아니라 간단하게 말하자면, 유니티 렌더파이프라인 과정중에 끼어서 따로 연산되는 개념이라 단순히 싸고 가볍기 때문에 사용했습니다. 
</p>
<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_12.png" height="430px" style ="border-radius: 8px;"/>

<p>
전체적으로 보면 그래프 비주얼이 좀 기괴하긴 해서 SubGraph로 뺄까 생각도 해보았지만 왜 인지 그렇게 하지 않았다고 합니다. 
</p>

<img src="..\assets\ReferenceData\ProjectBlast\Image_Blast_13.png" height="300px" style ="border-radius: 8px;"/>

<img src="..\assets\ReferenceData\ProjectBlast\GIF_Blast_3.gif" height="300px" style ="border-radius: 8px;"/>

<p>
하나의 원을 살펴보면 위와 같이 구성되어있고, 이 원들을 각기 다른 크기로, Seed를 입력받아 다른 위치에 있도록 하여 기름 Decal의 다양성을 만들었습니다 DissolveHeight를 받아 불타오르며 기름이 실시간으로 줄어드는 것 까지 표현하였습니다.
</p>

</div>
</div>

</div>
