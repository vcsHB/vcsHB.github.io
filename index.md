---
layout: default
---

{% for project in site.projects %}
  <div style="display: flex; align-items: center; margin-bottom: 50px; gap: 20px; flex-direction: {% cycle 'row', 'row-reverse' %};">
    
    <div style="flex: 1;">
      <img src="{{ project.thumbnail }}" alt="{{ project.title }}" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    </div>

    <div style="flex: 1;">
      <h2 style="margin-top: 0;">{{ project.title }}</h2>
      <p>{{ project.description }}</p>
      <a href="{{ project.url }}" style="color: #0366d6; font-weight: bold;">자세히 보기 →</a>
    </div>

  </div>
{% endfor %}
