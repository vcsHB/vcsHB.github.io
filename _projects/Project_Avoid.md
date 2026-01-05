---
layout: default
title: "AVOID"
description: "이 프로젝트는 이런 기술을 써서 만들었습니다."
thumbnail: "/assets/Thumbnails/Default_Thumbnail.png"
categories: ["Unity"]  # Category Id
---
### 프로젝트 개요

## 개요
<table style="margin-left: auto; margin-right: auto; border: none;">
  <tr style="border: 0 !important;">
    <td style="border: none; vertical-align: top;">

| 제목 | AVOID |
| --- | --- |
| 장르 | 3D / 실시간 / 턴제  / 퍼즐 |
| 플랫폼 | Windows |
| 다운로드 | 🔗[스토브 인디](https://store.onstove.com/en/games/4039) |
</td>
<td style="border: none; width: 10px;"></td> <td style="border: none; vertical-align: top;">

| 깃허브 | 🔗[AVOID Git](https://github.com/vcsHB/AVOID) |
| --- | --- |
| 개발 환경 | Unity / C# |
| 개발 인원 | 1인 팀 |
| 역할 | 기획 / 개발 / 아트 |
</td>
</tr>
</table>
<br>

## 💻 주요 기능 개발 리스트

- **MOVE to INTERACT System** - 움직임을 통한 상호작용<br>

- **Stage Manage System** - 스테이지 동적 생성 및 관리

<br>

## ➡️ MOVE to INTERACT System - 움직임을 통한 상호작용

AVOID는 움직임을 통한 상호작용 시스템을 가지고 있습니다. 

 인게임에서 대표적으로 많이 등장하는 기물들 중 PushObject는 상호작용을 당하는 기물이면서 동시에 상호작용을 하는 기물입니다. 

이를 위하여 IInteractable 인터페이스를 만들었습니다. 이는 상호작용을 하는 객체에 붙습니다.그리고 PushObject는 피상호작용을 당하는 객체인 InteractObject를 상속받아 구현됩니다.

🔗[깃허브 PushObject.cs](https://github.com/vcsHB/AVOID/blob/main/Assets/01.Scripts/InGame/Object/InteractionObject/PushObject.cs)

<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_1.png" height="300px"/>

예를 들어 일렬로 나란히 놓은 PushObject를 상호작용 한다면. 상호작용 방향에 놓인 PushObject들은 연쇄적으로 밀려나야합니다.  따라서 IInteractable 인터페이스는 MoveDirection 프로퍼티를 통해 이동방향을 나타냅니다. 그리고 다음 오브젝트에게 자신 객체를 통째로 넘기는 것이 아닌. IInteractable 객체만을 넘겨 이동방향을 전달합니다.
<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_2.png" height="300px"/>

또한 최종적으로 마지막으로 밀려날 오브젝트의 이동방향에 장애물이 존재한다면. 첫번째 밀려난 오브젝트는 물론 플레이어의 상호작용 행위 그 자체가 취소되어야합니다. 

<img src="..\assets\ReferenceData\ProjectAvoid\Image_Avoid_3.png"/>

이를 위해 IInteractable 인터페이스의 DetectInteraction()은 bool값을 반환하여. 연쇄적인 상호작용을 타고 전방에 장애물이 있는지를 검사하고 그 결과를 반환하여 움직임의 여부를 최종 결정합니다.