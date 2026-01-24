---
layout: default
title: "EDGE"
description: "2D 모서리를 타고 이동하는 디펜스 게임입니다."
thumbnail: "/assets/Thumbnails/Edge_Title.png"
categories: ["TeamProject", "Unity", "Award"]  # Category Id
order: 4
color : "#8965ff"
---

## 📕 개요
<div style="display: flex; width: 100%; gap: 10px; justify-content: space-between;">
<div style="flex: 1; width: 50%;">
<style>
.equal-table table { width: 100% !important; table-layout: fixed !important; }
</style>
<div class="equal-table">

| 제목 | EDGE |
| --- | --- |
| 장르 | 2D / 디펜스 |
| 플랫폼 | Windows |
| 다운로드 | 🔗[스토브 인디](https://drive.google.com/drive/u/0/folders/1GKqSQ31P-Y9XUsZsF8-VkbBMi12OlSYm) |

</div>
</div>
<div style="flex: 1; width: 50%;">
<div class="equal-table">

| 깃허브 | 🔗[EDGE Git](https://github.com/vcsHB/Edge) |
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
<button class="review-item-btn" onclick="toggleReview(event, 'moveLimit')">
1. EDGE MovePoint Controller - 모서리 지정 및 영역 제한<span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'moveEdge')">
2. EDGE Movement System - 모서리 이동 시스템 <span>▼</span>
</button>
<button class="review-item-btn" onclick="toggleReview(event, 'soundManage')">
3. SOUND Manage System - 사운드 관리 시스템 <span>▼</span>
</button>
</div>

<div id="review-moveLimit" class="review-display-box">
<div class="review-tag">⛔ EDGE MovePoint Controller - 모서리 지정 및 영역 제한</div>
<div class="review-content">

<p> 
2024 동계 게임잼의 키워드는 "무제한" 이었습니다. 
그래서 플레이어의 움직임에 제한을 주고 일정 스코어에 도달했을떄 제한을 일시적으로 풀어주는 '무제한'모드를 켜서 모든 적들을 초살낼수 있는 데미지를 부여해주는 기믹을 기획했습니다. 따라서 그 기획에 따른 제한적인 움직임을 구현할 필요가 있었습니다. 
Edge는 화면 끝 네 모서리에 MovePoint들을 가지고 있습니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_1.png" height="300px" style ="border-radius: 8px;"/>
<p>
각각의 MovePoint들은 플레이어 클라이언트에 따라 다양한 화면 비율과 사이즈를 가지고 있기 때문에. 화면을 벗어나지 않도록 올바른 위치에 배치되어야 합니다. 

🔗 [깃허브 MapController.cs](https://github.com/vcsHB/Edge/blob/main/Assets/01.Script/Core/MapControl/MapController.cs)  🔗[Unity 공식 문서 Camera.ViewportToWorldPoint](https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Camera.ViewportToWorldPoint.html)
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_2.png" style ="border-radius: 8px;"/>
<p>
따라서 main카메라를 받아와 각 카메라에서 뷰포트상의 좌표를 World좌표계로 변환해줍니다. 
</p>
<div style="display: flex; justify-content: center; gap: 20px;">
  <img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_3.png" style="width: 49%; border-radius: 8px;" >
  <img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_4.png" style="width: 43%; border-radius: 8px;">
</div>
<p>
카메라 상의 뷰포트 위치를 월드 좌표로 변환해주면 모서리들의 좌표가 나오게 되고.  이후 정해진 순서에 맞게 각각의 offset을 적용시켜주면 최종적으로 MovePoint가 위치할 좌표가 계산됩니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_5.png" style ="border-radius: 8px;"/>
<p>
그리고 맵 탈출을 막기 위한 적절한 Clamper를 각 모서리의 중간 좌표로 이동 시켜주어 맵 초기 세팅을 완료합니다.
</p>

</div>
</div>

<div id="review-moveEdge" class="review-display-box">
<div class="review-tag">↔️ EDGE Movement System - 모서리 이동 시스템</div>
<div class="review-content">

<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_1.png" height="300px" style ="border-radius: 8px;"/>

<p>
앞서 위에서 설명했던 것과 같이 EDGE는 화면 끝 네 모서리에 MovePoint들을 가지고 있습니다. 모서리 위치가 지정되면 그 위치로 플레이어가 이동할 수 있어야합니다. 

🔗 [깃허브 PlayerMover.cs](https://github.com/vcsHB/Edge/blob/main/Assets/01.Script/Agent/Player/PlayerMover.cs)

</p>

<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_6.png" style ="border-radius: 8px;"/>

<p>
따라서 PlayerMover에서 Input에 기반한 moveDirection이 들어오면 그 방향으로 Ray를 발사합니다. 그렇게 발사된 Ray는 MovePoint전용 레이어인 MovePoint레이어를 가진 타겟을 감지하게 되고. 만약 감지되었다면 목표 MovePoint로 설정하고 이동을 시작합니다. 
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_7.png" style ="border-radius: 8px;"/>
<p>
목표 MovePoint를 새로 지정하기에 앞서 현재 머물고 있는 MovePoint가 있다면 Exit()을 실행하여 빈 MovePoint임을 표시합니다.  (추후 개발의 방향성이나 유지보수를 고려하여 작성했지만 이펙트 재생 외에는 확장하여 쓰지 않았습니다.)

🔗 [깃허브 PlayerMoveState.cs](https://github.com/vcsHB/Edge/blob/main/Assets/01.Script/Agent/Player/FSM/PlayerMoveState.cs)
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_8.png" style ="border-radius: 8px;"/>
<p>
이후 이동 처리를 FSM내부에서 해주게됩니다. 이동속도 Status를 받아 이동속도를 지정하고. 시간을 증가시켜 선형 보간을 통해 이동합니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_9.png" style ="border-radius: 8px;"/>
<p>
FSM을 통해 넘어온 이동 진행 비율 (ratio)를 받아 위치를 보간 해주게 됩니다. 좀 더 자연스러운 움직임을 위해 EaseInSine()함수를 구현하여 자연스러운 보간을 만들어 냈습니다. 원래 InCubic을 사용했었는데. 수식이 y = x ^ 3 이라 Update상에서 계속 호출 되었을때 프레임 드랍이 일어날 정도의 오버헤드를 발생시켰기 때문에. 이를 InSine으로 변경했습니다. 
</p>

</div>
</div>

<div id="review-soundManage" class="review-display-box">
<div class="review-tag">🔊 SOUND Manage System - 사운드 관리 시스템</div>
<div class="review-content">

<p>
사운드 클립과 랜덤 pitch 등의 상세 효과 정보들을 가지고있는 Sound Scriptable Object를 만들고 이를 재생해주는 SoundPlayer를 풀링 처리하여 재사용 가능한 SFX 기능을 구현했습니다.

🔗[깃허브 SoundSystem](https://github.com/vcsHB/Edge/tree/main/Assets/01.Script/SoundSystem) 
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_10.png" style ="border-radius: 8px;"/>


<p>
AudioClip과 여러 상세 설정들을 담는 SoundSO를 제작했습니다. 그리고 이 설정값들은 효과음 오브젝트인 SoundPlayer 내에서 오디오에 적용됩니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_13.png" style ="border-radius: 8px;"/>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_11.png" style ="border-radius: 8px;"/>

<p>
SoundPlayer는 IPoolable을 상속받아 ObjectPooling시스템에서 재사용처리됩니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_12.png" style ="border-radius: 8px;"/>

<p>
따라서 실사용은 풀링을 통하여 사용할 수 있습니다. 또한 사운드 시스템을 적극 활용하기 위해 추가적인 코드구조를 작성할 필요가 있었는데. 이를 FeedbackPlayer구조를 통해 해결했습니다.
</p>

<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_14.png" style ="border-radius: 8px;"/>

<p>
이는 UnityEvent나 코드 내의 직접적인 호출로 자식에 들어있는 모든 Feedback들을 동작 시키는 시스템입니다. 이를 활용한 SoundFeedback을 만들어 직렬화로 할당된 SoundSO를 Play시키는 기능입니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_15.png" style ="border-radius: 8px;"/>

<p>
위에서 구현했던 SoundPlayer의 풀링을 활용하여 구현되었습니다.

### + 추가로 편한 사운드 편집 환경을 위하여 **에디터를 제작**했습니다. 

UIToolkit은 아니고 레거시 에디터 GUI를 사용하여 간단하게 개발하였습니다. 버튼으로 SO를 경로내에 생성해주고 SoundTable에 자동으로 추가되며 SoundName을 설정하면 SO 파일의 이름을 변경해줍니다.
</p>
<img src="..\assets\ReferenceData\ProjectEdge\Image_Edge_16.png" style ="border-radius: 8px;"/>

<p>
(게임잼때 급하게 몇가지 기능들을 수정하고 확장하며 인덱스가 바뀌어서, 태그 이름이 Item입니다…)

좌측 SoundList의 사운드 슬롯의 X를 누르면 삭제되고 List에서 빠집니다.
</p>

</div>
</div>

</div>