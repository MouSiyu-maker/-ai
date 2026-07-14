import {
  contents,
  createState,
  beginProductPurchase,
  clearProductPurchase,
  experienceModes,
  getFilteredContents,
  getContentDetail,
  getExperienceMode,
  getExperienceRoute,
  getGeneratedPlan,
  getGenerationRoute,
  getPreferenceGroups,
  getRelatedContents,
  getSearchResults,
  hotspots,
  lightUpSkill,
  paintingData,
  products,
  removeHotspot,
  restoreGuideAsResult,
  saveGuide,
  seedFilters,
  setSearchQuery,
  setExperienceMode,
  skills,
  tabs,
  toggleContentSaved,
  toggleHotspot,
} from './model.js';

const state = createState();
const screen = document.querySelector('#screen');
const tabbar = document.querySelector('#tabbar');
const toast = document.querySelector('#toast');
let lastViewKey = '';

const paintingViews = [
  {
    id: 'shangyuan',
    title: paintingData.title,
    meta: `${paintingData.era}${paintingData.artist} · ${paintingData.collection} · 南京元宵灯市`,
    scene: '夜游',
    scenePlace: '葛仙村',
    dimensions: '物艺人景情',
    image: './assets/figma-painting-tab/painting-shangyuan.png',
    hotspots,
    related: [
      { id: 'festival', title: '葛仙村', meta: '鳌山灯 · 夜游首选' },
      { id: 'village', title: '三清山', meta: '药发木偶 · 技艺体验' },
      { id: 'painting', title: '婺女洲', meta: '祈福仪式 · 古画入口' },
      { id: 'market', title: '望仙谷', meta: '赏灯文人 · 烟火市集' },
      { id: 'craft', title: '婺源', meta: '祈福仪式 · 古画入口' },
      { id: 'paper', title: '景德镇', meta: '制作文人 · 烟火市集' },
    ],
  },
  {
    id: 'qingming',
    title: '《清明上河图》',
    meta: '北宋张择端 · 故宫博物院 · 汴京市井长卷',
    scene: '市集',
    scenePlace: '灵宝夜市',
    dimensions: '桥市舟铺人',
    image: './assets/figma-painting-tab/painting-shangyuan.png',
    hotspots: [
      { ...hotspots[0], name: '虹桥市集', dim: '景', dimLabel: '景 · 空间场景', x: 58, y: 48, desc: '虹桥连接水路与街市，是画中人流、商贸和观看视线最密集的空间节点。' },
      { ...hotspots[1], name: '舟船货运', dim: '物', dimLabel: '物 · 交通器物', x: 31, y: 58, desc: '船只、货担和码头动作共同呈现宋代城市物流，可映射到现实市集动线。' },
      { ...hotspots[2], name: '沿街商贩', dim: '人', dimLabel: '人 · 市井角色', x: 70, y: 68, desc: '店铺与摊贩构成热闹烟火感，适合转译为逛吃、问摊和挑选小物。' },
      { ...hotspots[3], name: '楼阁招牌', dim: '物', dimLabel: '物 · 视觉符号', x: 83, y: 35, desc: '招牌、楼阁与旗幡提供城市识别度，适合形成拍照和路线记忆点。' },
      { ...hotspots[4], name: '节令人流', dim: '情', dimLabel: '情 · 城市情绪', x: 18, y: 72, desc: '画中人群流动带出节令里的生活气息，可对应热闹节庆型体验。' },
    ],
    related: [
      { id: 'market', title: '灵宝夜市', meta: '沿街商贩 · 烟火市集' },
      { id: 'festival', title: '葛仙村', meta: '节令人流 · 夜游首选' },
      { id: 'craft', title: '手作工坊', meta: '楼阁招牌 · 手作体验' },
      { id: 'paper', title: '纸影小铺', meta: '市井纹样 · 轻手作' },
    ],
  },
  {
    id: 'gusu',
    title: '《姑苏繁华图》',
    meta: '清代徐扬 · 辽宁省博物馆 · 江南商业图景',
    scene: '慢游',
    scenePlace: '江南水巷',
    dimensions: '水街桥园商',
    image: './assets/figma-painting-tab/painting-shangyuan.png',
    hotspots: [
      { ...hotspots[0], name: '水巷街肆', dim: '景', dimLabel: '景 · 水城空间', x: 44, y: 62, desc: '水巷、街铺和人流叠合，适合转成慢游、停留和街区观察。' },
      { ...hotspots[1], name: '舟桥往来', dim: '人', dimLabel: '人 · 行旅行为', x: 64, y: 42, desc: '桥与船构成移动节奏，适合设计低强度步行和换景体验。' },
      { ...hotspots[2], name: '店铺招幌', dim: '物', dimLabel: '物 · 商业符号', x: 76, y: 70, desc: '招幌、门面和货架形成古城商业记忆，可承接到市集小物。' },
      { ...hotspots[3], name: '园林片段', dim: '情', dimLabel: '情 · 文艺留白', x: 24, y: 36, desc: '园林和水岸让热闹中保留安静停顿，适合安静文艺偏好。' },
      { ...hotspots[4], name: '工艺小铺', dim: '艺', dimLabel: '艺 · 民间手作', x: 88, y: 52, desc: '小铺里的手艺线索可转译为剪纸、扎灯或糖画等轻手作体验。' },
    ],
    related: [
      { id: 'village', title: '山水村落', meta: '园林片段 · 安静慢游' },
      { id: 'market', title: '灵宝夜市', meta: '店铺招幌 · 市集小物' },
      { id: 'paper', title: '纸上灯影', meta: '工艺小铺 · 轻手作' },
      { id: 'festival', title: '千灯入夜', meta: '水巷街肆 · 夜游延展' },
    ],
  },
];

function getActivePaintingView() {
  const index = ((state.paintingIndex || 0) % paintingViews.length + paintingViews.length) % paintingViews.length;
  return paintingViews[index];
}

function getViewKey() {
  return `${state.page}:${state.page === 'home' ? state.tab : state.selectedContentId || state.pendingSource || ''}`;
}

function resetScrollOnViewChange(viewKey) {
  if (viewKey === lastViewKey) return;
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.querySelector('#app')?.scrollTo?.(0, 0);
  lastViewKey = viewKey;
}

function render() {
  const viewKey = getViewKey();
  tabbar.hidden = state.page !== 'home';
  tabbar.innerHTML = tabs.map(tab => `
    <button class="tab ${state.tab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
      <span class="tab-symbol ${tab.icon}" aria-hidden="true"></span><b>${tab.label}</b>
    </button>
  `).join('');

  if (state.page === 'detail') renderDetail();
  else if (state.page === 'preference') renderPreference();
  else if (state.page === 'result') renderResult();
  else if (state.tab === 'seed') renderSeed();
  else if (state.tab === 'painting') renderPainting();
  else if (state.tab === 'experience') renderExperience();
  else renderSeed();

  if (state.profileOpen) {
    screen.insertAdjacentHTML('beforeend', profileDrawer());
  }

  if (state.page === 'home' && state.lightupPanelOpen) {
    screen.insertAdjacentHTML('beforeend', globalLightupPanel());
  }

  if (state.secondarySheet) {
    screen.insertAdjacentHTML('beforeend', secondarySheet(state.secondarySheet));
  }

  resetScrollOnViewChange(viewKey);
}

function renderSeed() {
  const list = getFilteredContents(state);
  screen.innerHTML = `
    <div class="system-bar" aria-hidden="true">
      <b>9:41</b>
      <div class="system-levels"><i></i><i></i><i></i><span></span></div>
    </div>
    <header class="seed-appbar">
      <button class="avatar-btn" data-open-profile aria-label="打开我的侧边页">
        <img src="./assets/figma-seed-home/avatar.png" alt="" />
      </button>
      <button class="location-pill" data-open-sheet="location" aria-label="切换地址">
        <span class="pin-icon"></span>
        <b>江西</b>
        <b>上饶</b>
        <i></i>
      </button>
      ${lightupEntryButton()}
    </header>
    <section class="seed-insight-strip" aria-label="种草概览">
      <article><span>今日已生成</span><b>0</b><em>种草行程</em></article>
      <article><span>今日灵感</span><b>6</b><em>个收藏景点</em></article>
      <article><span>推荐景点</span><b>葛仙村</b><em>最热</em></article>
    </section>
    <section class="home-block recommend-block">
      <div class="block-head">
        <h2>今日推荐</h2>
        <button data-open-sheet="seed-recommend">查看所有</button>
      </div>
      <article class="recommend-card" data-open="festival">
        <img class="hero-base-img" src="./assets/figma-seed-home/hero-base.png" alt="" />
        <img class="hero-layer-img" src="./assets/figma-seed-home/hero.png" alt="" />
        <div class="hero-scrim"></div>
        <span class="duration-chip">2 天 1 夜</span>
        ${collectButton('festival')}
        <div class="recommend-info">
          <p>热门推荐</p>
          <div class="hero-tags"><span>非遗</span><span>名画</span></div>
          <h3>葛仙村 · 千灯入夜</h3>
          <small>推荐葛仙村首次文化探索者，入夜后体验最佳</small>
          <i class="slider-dots"></i>
        </div>
      </article>
    </section>
    <section class="home-block discover-block">
      <div class="block-head">
        <h2>${state.seedFilter === '全部' ? '发现' : state.seedFilter}</h2>
        <button data-open-sheet="seed-discover">查看更多</button>
      </div>
      <div class="filters">
        ${seedFilters.map(item => `<button class="${state.seedFilter === item ? 'active' : ''}" data-filter="${item}">${item}</button>`).join('')}
      </div>
      <section class="article-grid">
        ${list.length ? list.map((item, index) => contentCard(item, index)).join('') : '<div class="empty-card">这里还没有内容</div>'}
      </section>
    </section>
    ${state.searchOpen ? searchSheet() : ''}
  `;
}

function contentCard(item, index = 0) {
  const images = ['article-1', 'article-2', 'article-3', 'article-4', 'article-5', 'article-6'];
  const image = images[index % images.length];
  const firstTag = item.type === '非遗' ? '非遗' : item.type;
  const secondTag = item.type === '名画' ? '解码' : (item.tags[1] || item.reason);
  return `
    <article class="seed-card ${item.tone}" data-open="${item.id}">
      <img src="./assets/figma-seed-home/${image}.png" alt="" />
      <div class="card-gradient"></div>
      ${collectButton(item.id, 'mini')}
      <div class="card-copy">
        <h3>${item.title}</h3>
        <div class="mini-tags"><i>${firstTag}</i><i>${secondTag}</i></div>
        <p>${item.subtitle}</p>
      </div>
    </article>
  `;
}

function collectButton(id, extraClass = '') {
  const isSaved = state.savedContentIds.includes(id);
  return `
    <button class="collect-btn ${extraClass} ${isSaved ? 'saved' : ''}" data-collect-content="${id}" aria-label="${isSaved ? '取消种草' : '加入种草'}">
      ${isSaved ? '★' : '☆'}
    </button>
  `;
}

function lightupEntryButton() {
  return `
    <button class="lightup-entry-btn ${state.lightupPanelOpen ? 'active' : ''}" data-open-lightups aria-label="打开收藏点亮">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" fill="#B8860B" stroke="#B8860B" stroke-width="0.5" stroke-linejoin="round"/>
        <path d="M12 5.5L13.26 9.38L17.25 10.07L14.38 13.07L15.07 17.09L12 15.14L8.93 17.09L9.62 13.07L6.75 10.07L10.74 9.38L12 5.5Z" fill="#F5D76E" stroke="none"/>
      </svg>
    </button>
  `;
}

function seedActionCard(title, desc, action, tab) {
  return `
    <button class="seed-action-card" data-jump-tab="${tab}">
      <span>${title}</span>
      <b>${action}</b>
      <p>${desc}</p>
    </button>
  `;
}

function searchSheet() {
  const results = getSearchResults(state);
  return `
    <div class="search-mask" data-close-search></div>
    <section class="search-sheet" role="dialog" aria-label="搜索内容">
      <div class="search-top">
        <h2>搜索文化种草</h2>
        <button data-close-search aria-label="关闭搜索">×</button>
      </div>
      <label class="search-field">
        <span></span>
        <input data-search-input value="${escapeAttr(state.searchQuery)}" placeholder="搜索灯会、剪纸、古画..." autofocus />
      </label>
      <div class="search-hotwords">
        ${['灯会', '剪纸', '古画', '夜游'].map(word => `<button data-search-word="${word}">${word}</button>`).join('')}
      </div>
      <div class="search-results">
        ${results.slice(0, 4).map(item => `
          <article data-open="${item.id}">
            <b>${item.title}</b>
            <span>${item.type} · ${item.duration} · ${item.reason}</span>
          </article>
        `).join('') || '<p>没有找到相关内容</p>'}
      </div>
    </section>
  `;
}

function escapeAttr(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function renderDetail() {
  const detail = getContentDetail(state.selectedContentId);
  const item = detail.content;
  const isSaved = state.savedContentIds.includes(item.id);
  screen.innerHTML = `
    <section class="detail-v3-hero">
      <img src="./assets/figma-seed-home/detail-hero.png" alt="" />
      <div class="detail-v3-hero-glow"></div>
    </section>
    <div class="system-bar detail-v3-system" aria-hidden="true">
      <b>9:41</b>
      <div class="system-levels"><i></i><i></i><i></i><span></span></div>
    </div>
    <header class="detail-appbar detail-v3-appbar">
      <button data-back aria-label="返回"><span class="detail-back-icon"></span></button>
      <div></div>
      <div class="detail-appbar-actions">
        <button class="${isSaved ? 'saved' : ''}" data-collect-content="${item.id}" aria-label="${isSaved ? '取消种草' : '加入种草'}">${isSaved ? '★' : '☆'}</button>
        <button data-open-sheet="share-detail" aria-label="分享"><span></span></button>
      </div>
    </header>
    <section class="detail-v3-meta">
      <span>📍江西 · 葛仙村</span>
      <span>${item.type}</span>
      <span>${item.duration}</span>
    </section>
    <section class="detail-v3-panel">
      <section class="detail-v3-intro">
        <span>${item.reason}</span>
        <h1>${item.title === '千灯入夜' ? '葛仙村·千灯入夜' : item.title}</h1>
        <div>${item.tags.map(tag => `<i># ${tag}</i>`).join('')}</div>
        <p>${detail.summary}</p>
      </section>
      <section class="detail-v3-block detail-v3-trip-block">
        <div class="detail-v3-head">
          <h2>热门行程单</h2>
          <button data-open-sheet="detail-trips">查看更多</button>
        </div>
        <div class="detail-v3-trip-row">
          ${detail.itineraries.map((plan, index) => detailItineraryCard(plan, index)).join('')}
        </div>
      </section>
      ${detailPaintingBreakdown()}
      <section class="detail-v3-block detail-v3-traveler-block">
        <div class="detail-v3-head">
          <h2>旅客说</h2>
          <button data-open-sheet="detail-travelers">查看更多</button>
        </div>
        <div class="detail-traveler-list">
          ${detailTravelerCard({ name: '木白', scene: '市集小食', text: '推荐逛完灯街再去夜市刚好，不会觉得行程断掉。' }, 0)}
          ${detailTravelerCard({ name: '迟迟', scene: '夜景实拍', text: '摊位旁边的灯很适合拍人像，比主街更生活化。' }, 1)}
          ${detailTravelerCard({ name: '圆子', scene: '夜景实拍', text: '大家一起放孔明灯的时候很震撼，想流泪。' }, 2)}
        </div>
      </section>
    </section>
    <button class="detail-floating-generate" data-detail-primary="${item.id}">${detail.actions.primary === '生成我的体验' ? '生成我的体验' : detail.actions.primary}</button>
  `;
}

function detailRouteItem(step, index) {
  const labels = ['起', '承', '转', '合'];
  return `
    <article class="detail-route-item">
      <div>${labels[index] || index + 1}</div>
      <span>${step.time}</span>
      <h3>${step.title}</h3>
      <p>${step.desc}</p>
    </article>
  `;
}

function detailRelatedCard(item, index) {
  const images = ['article-1', 'article-2', 'article-3', 'article-4', 'article-5', 'article-6'];
  const image = images[index % images.length];
  return `
    <article class="detail-related-card" data-open="${item.id}">
      <img src="./assets/figma-seed-home/${image}.png" alt="" />
      <div></div>
      <section>
        <h3>${item.title}</h3>
        <p>${item.type} · ${item.reason}</p>
      </section>
    </article>
  `;
}

function detailPaintingBreakdown() {
  return `
    <section class="detail-v3-block detail-painting-breakdown">
      <div class="detail-v3-head">
        <h2>古画溯源</h2>
      </div>
      <div class="detail-painting-card detail-v3-painting-card">
        <div class="detail-painting-art">
          <img src="./assets/figma-painting-tab/painting-shangyuan.png" alt="" />
          ${hotspots.map(hotspot => `
            <button style="left:${hotspot.x}%;top:${hotspot.y}%;" data-detail-hotspot="${hotspot.id}">
              <span>${hotspot.dim}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <article class="detail-v3-hotspot-card">
        <img src="./assets/figma-seed-home/detail-hotspot.png" alt="" />
        <div>
          <b>物·鳌山灯</b>
          <p>鳌山灯是明代元宵节期间盛行的传统花灯民俗活动，其形制源于蓬莱仙山神话，造型为“巨鳌驼山”状。</p>
        </div>
      </article>
    </section>
  `;
}

function detailItineraryCard(plan, index) {
  const images = ['detail-trip-1', 'detail-trip-2', 'detail-trip-3'];
  const labels = ['夜游首选', '夜游精选', '整套首选'];
  const titles = ['千灯夜游 2 天', '轻量半日旅行', '画中浏览路线'];
  return `
    <article class="detail-itinerary-card">
      <div class="detail-trip-stack">
        <span></span>
        <span></span>
        <img src="./assets/figma-seed-home/${images[index % images.length]}.png" alt="" />
        <em>${labels[index % labels.length]}</em>
      </div>
      <h3>${titles[index % titles.length] || plan.title}</h3>
    </article>
  `;
}

function detailTravelerCard(quote, index) {
  const images = ['detail-traveler-1', 'detail-traveler-2', 'detail-traveler-3'];
  return `
    <article class="detail-traveler-card">
      <img src="./assets/figma-seed-home/${images[index % images.length]}.png" alt="" />
      <div class="detail-traveler-shade"></div>
      <small>${quote.scene}</small>
      <div>
        <span></span>
        <h3>${quote.name}</h3>
        <p>${quote.text}</p>
      </div>
    </article>
  `;
}

function renderPreference() {
  const groups = getPreferenceGroups();
  const step = Math.min(Math.max(state.preferenceStep || 1, 1), groups.length);
  const activeGroup = groups[step - 1];
  const stepLabels = ['身份视角', '预留时间', '预期氛围'];
  screen.innerHTML = `
    <section class="preference-flow" data-pref-step="${step}">
      <div class="system-bar preference-system" aria-hidden="true">
        <b>9:41</b>
        <div class="system-levels"><i></i><i></i><i></i><span></span></div>
      </div>
      <header class="preference-nav">
        <button class="preference-round-btn" data-back aria-label="返回"><span></span></button>
        <h1>偏好设置</h1>
        <button class="preference-skip" data-confirm-pref aria-label="跳过配置">跳过</button>
      </header>
      <section class="preference-stepper" aria-label="偏好配置进度">
        ${stepLabels.map((label, index) => preferenceStepItem(label, index + 1, step)).join('')}
      </section>
      <section class="preference-stage">
        <div class="preference-stage-head">
          <h2>${activeGroup.title}</h2>
          <p>${activeGroup.desc}</p>
        </div>
        <div class="preference-choice-list">
          ${activeGroup.options.map(option => preferenceChoice(activeGroup.key, option)).join('')}
        </div>
      </section>
      <div class="preference-actions ${step === 1 ? 'single' : ''}">
        ${step > 1 ? '<button class="preference-secondary-action" data-pref-prev>上一步</button>' : ''}
        <button class="preference-primary-action" ${step === groups.length ? 'data-confirm-pref' : 'data-pref-next'}>
          ${step === groups.length ? '生成文化体验' : '下一步'}
        </button>
      </div>
      <div class="preference-home-indicator" aria-hidden="true"></div>
    </section>
  `;
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.querySelector('#app')?.scrollTo?.(0, 0);
  });
}

function preferenceStepItem(label, index, activeStep) {
  const isDone = index < activeStep;
  const isActive = index === activeStep;
  return `
    <article class="${isActive ? 'active' : ''} ${isDone ? 'done' : ''}">
      <b>${isDone ? '✓' : index}</b>
      <span>${label}</span>
    </article>
    ${index < 3 ? '<i aria-hidden="true"></i>' : ''}
  `;
}

function preferenceChoice(key, option) {
  const isSelected = state.preference[key] === option.label;
  return `
    <button class="preference-choice ${isSelected ? 'selected' : ''}" data-pref="${key}" data-value="${option.label}">
      <span>${option.signal}</span>
      <b>${option.label}</b>
      <small>${option.agentHint}</small>
    </button>
  `;
}

function renderResult() {
  const plan = getGeneratedPlan(state);
  const routeImages = ['photo-1', 'photo-2', 'photo-3'];
  const titleLines = plan.title.includes('·')
    ? ['千灯入夜后的', `${state.preference.days}文化体验`]
    : [plan.title, ''];
  screen.innerHTML = `
    <div class="agent-result-page">
      <div class="system-bar result-system-bar" aria-hidden="true">
        <b>9:41</b>
        <div class="system-levels"><i></i><i></i><i></i><span></span></div>
      </div>
      <header class="agent-appbar result">
        <button data-back aria-label="返回">‹</button>
        <span>定制体验</span>
        <div>
          <button data-open-sheet="share-result" aria-label="分享">↗</button>
        </div>
      </header>
      <section class="agent-result-preference" aria-label="当前偏好">
        ${plan.constraints.map(item => `<button data-adjust-pref>${item.key === 'role' ? `${item.label}视角` : item.label}</button>`).join('')}
        <button data-adjust-pref>调整 ›</button>
      </section>
      <h1 class="agent-result-title">
        <span>${titleLines[0]}</span>
        ${titleLines[1] ? `<span>${titleLines[1]}</span>` : ''}
      </h1>
      <section class="agent-dimension-card">
        <div class="agent-section-head compact">
          <h2>本次重点</h2>
        </div>
        <div class="agent-dimension-row">
          ${plan.focusDimensions.slice(0, 4).map(item => `
            <article>
              <span>${item.dimLabel}</span>
              <b>${item.name}</b>
              <p>${item.desc}</p>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="agent-route-card">
        <div class="agent-section-head">
          <h2>行程时间线</h2>
        </div>
        <div class="agent-route-list">
          ${plan.route.map((item, index) => `
            <article>
              <time>${item.time}</time>
              <i></i>
              <section>
                <div><h3>${item.title}</h3><em>${item.agentNote}</em></div>
                <p>${item.desc}</p>
              </section>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="agent-role-card">
        <div class="agent-section-head">
          <h2>角色代入玩法</h2>
        </div>
        <h3>${plan.rolePlay.title}</h3>
        <div>
          ${plan.rolePlay.tasks.slice(0, 3).map((task, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b><i>${['物', '艺', '情'][index] || '景'}</i>${task}</span>`).join('')}
        </div>
      </section>
      <section class="agent-photo-card">
        <div class="agent-section-head">
          <h2>拍照打卡点</h2>
        </div>
        <div class="agent-photo-list">
          ${plan.photoSpots.slice(0, 3).map((item, index) => `
            <article>
              <div class="agent-photo-thumb ${routeImages[index] || 'photo-1'}"></div>
              <section>
                <b>${item.title}</b>
                <p>${item.reason}</p>
              </section>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="agent-tips-card">
        <div class="agent-section-head">
          <h2>实用小贴士</h2>
        </div>
        <div class="agent-tip-list">
          ${plan.tips.slice(0, 4).map(tip => `<p>${tip}</p>`).join('')}
        </div>
      </section>
      <button class="agent-primary-action result-action" data-save-guide>加入行程单并点亮</button>
    </div>
  `;
}

function globalLightupPanel() {
  const groups = getGlobalLightupGroups();
  const scenicCount = groups.find(group => group.title === '收藏景点')?.total || 0;
  const paintingCount = groups.find(group => group.title === '点亮古画')?.total || 0;
  const skillCount = groups.find(group => group.title === '点亮技艺')?.total || 0;
  return `
    <div class="global-lightup-mask" data-close-lightups></div>
    <aside class="global-lightup-panel" role="dialog" aria-label="收藏点亮清单">
      <header>
        <h2>我的文化沉淀</h2>
        <button data-close-lightups aria-label="关闭收藏点亮清单">×</button>
      </header>
      <div class="global-lightup-summary">
        <article><b>${scenicCount}</b><span>收藏景点</span></article>
        <article><b>${paintingCount}</b><span>已点亮古画</span></article>
        <article><b>${skillCount}</b><span>已点亮技艺</span></article>
      </div>
      <div class="global-lightup-groups">
        ${groups.map(group => `
          <section>
            <div class="global-lightup-group-head">
              <h3>${group.title}</h3>
            </div>
            <div class="global-lightup-items">
              ${group.items.map(item => globalLightupItem(item)).join('')}
              <button class="global-lightup-more" type="button" data-open-sheet="lightup-${group.kind}">查看更多 <span>⌄</span></button>
            </div>
          </section>
        `).join('')}
      </div>
    </aside>
  `;
}

function globalLightupItem(item) {
  return `
    <article class="global-lightup-photo-card" style="--lightup-image:url('${item.image}');">
      <div>
        <b>${item.title}</b>
        <p>${item.desc}</p>
      </div>
      <button type="button" ${item.action || ''}>查看</button>
    </article>
  `;
}

function secondarySheet(type) {
  const content = getSecondarySheetContent(type);
  return `
    <div class="secondary-mask" data-close-sheet></div>
    <aside class="secondary-sheet ${content.size || ''}" role="dialog" aria-label="${content.title}">
      <div class="sheet-handle"></div>
      <header class="secondary-head">
        <div>
          <span>${content.kicker}</span>
          <h2>${content.title}</h2>
          ${content.desc ? `<p>${content.desc}</p>` : ''}
        </div>
        <button data-close-sheet aria-label="关闭">×</button>
      </header>
      <section class="secondary-body">
        ${content.body}
      </section>
    </aside>
  `;
}

function getSecondarySheetContent(type = '') {
  const detail = getContentDetail(state.selectedContentId);
  const related = getRelatedContents(state.selectedContentId, 6);
  const recommendations = profileRecommendations();
  const myTrips = state.itineraries.length
    ? [...state.itineraries.slice(0, 4), ...profileDemoTrips()]
    : profileDemoTrips();
  if (type === 'location') {
    return {
      kicker: '当前地址',
      title: '切换探索目的地',
      desc: 'Demo 会把体验 Tab 的推荐内容跟随当前内容地址更新。',
      body: `
        <div class="secondary-location-list">
          ${contents.slice(0, 4).map(item => `
            <button data-select-destination="${item.id}">
              <b>${item.location}</b>
              <span>${item.title} · ${item.reason}</span>
            </button>
          `).join('')}
        </div>
      `,
    };
  }
  if (type === 'seed-recommend') {
    return {
      kicker: '今日推荐',
      title: '适合立刻生成的文化灵感',
      desc: '保留当前首页的高优先内容，点击可进入详情。',
      body: `<div class="secondary-card-list">${contents.slice(0, 4).map(secondaryContentCard).join('')}</div>`,
    };
  }
  if (type === 'seed-discover') {
    return {
      kicker: '发现全集',
      title: `${state.seedFilter === '全部' ? '全部种草内容' : state.seedFilter}`,
      desc: '这里承接首页“查看更多”，用于快速浏览完整内容池。',
      body: `<div class="secondary-grid">${getFilteredContents(state).map(secondaryContentCard).join('')}</div>`,
      size: 'tall',
    };
  }
  if (type === 'detail-trips') {
    return {
      kicker: '热门行程单',
      title: `${detail.content.title} 的推荐玩法`,
      desc: '点击预览会复用现有 AI 体验结果页，不新增行程详情页。',
      body: `<div class="secondary-card-list">${detail.itineraries.map((item, index) => secondaryTripCard(item, index)).join('')}</div>`,
    };
  }
  if (type === 'detail-travelers') {
    return {
      kicker: '旅客说',
      title: '真实体验反馈',
      desc: '用实拍、评价和小建议补足内容详情页后的判断依据。',
      body: `<div class="secondary-quote-list">${detail.travelerSays.map((item, index) => secondaryQuoteCard(item, index)).join('')}</div>`,
    };
  }
  if (type === 'painting-related') {
    return {
      kicker: '相关景点',
      title: '画中线索可落地的目的地',
      desc: '用于承接探画页底部“查看更多”。',
      body: `<div class="secondary-grid">${related.map(secondaryContentCard).join('')}</div>`,
    };
  }
  if (type === 'experience-products') {
    return {
      kicker: '体验物品',
      title: '可带走的文化记忆',
      desc: '点击“去看看”仍会先出现跳转确认。',
      body: `<div class="secondary-card-list">${products.map((item, index) => secondaryProductCard(item, index)).join('')}</div>`,
    };
  }
  if (type === 'experience-skills') {
    return {
      kicker: '技艺点亮',
      title: '可解锁的民俗技艺',
      desc: '手动点亮等同于解锁，不等同收藏。',
      body: `<div class="secondary-card-list">${skills.map(secondarySkillCard).join('')}</div>`,
      size: 'tall',
    };
  }
  if (type === 'experience-service') {
    return {
      kicker: '现场服务',
      title: '体验前的小判断',
      desc: '把排队、入口、天气和沉淀进度集中承接。',
      body: `
        <div class="secondary-service-grid">
          ${secondaryServiceCard('排队预估', '12 分钟', '灯街工坊当前较空，适合先做手作。')}
          ${secondaryServiceCard('最近入口', '东街口', '距离推荐动线约 260 米。')}
          ${secondaryServiceCard('天气提醒', '微风', '夜间适合灯街游览，建议带薄外套。')}
          ${secondaryServiceCard('营业状态', '开放中', '夜市与祈愿灯廊均可进入。')}
        </div>
      `,
    };
  }
  if (type.startsWith('skill-')) {
    const skill = skills.find(item => item.id === type.replace('skill-', '')) || skills[0];
    return {
      kicker: skill.meta,
      title: skill.name,
      desc: skill.desc,
      body: `
        <div class="secondary-skill-detail">
          <div class="secondary-step-row">${skill.steps.map((step, index) => `<span><b>${index + 1}</b>${step}</span>`).join('')}</div>
          <article><b>体验地点</b><p>${skill.scene} · ${skill.duration}</p></article>
          <article><b>点亮说明</b><p>点亮后会同步进入右上角“收藏点亮”和头像侧边页的技艺沉淀。</p></article>
          <button data-skill="${skill.id}">${state.lightups.skills.includes(skill.id) ? '已点亮' : '点亮技艺'}</button>
        </div>
      `,
    };
  }
  if (type === 'profile-trips') {
    return {
      kicker: '我的行程单',
      title: '已生成与示例行程',
      desc: '已保存行程会直接复用 AI 体验结果页回看。',
      body: `<div class="secondary-grid trips">${myTrips.map((item, index) => profileMyTripCard(item, index)).join('')}</div>`,
      size: 'tall',
    };
  }
  if (type === 'profile-recommend') {
    return {
      kicker: '行程推荐',
      title: '其他人也在添加',
      desc: '点击卡片预览，点击添加会保存到我的行程单。',
      body: `<div class="secondary-recommend-grid">${recommendations.map(profileRecommendCard).join('')}</div>`,
    };
  }
  if (type === 'profile-unlocks') {
    return {
      kicker: '文化沉淀',
      title: '景点、古画、技艺点亮进度',
      desc: '按用户整体沉淀展示，不绑定单个 Tab。',
      body: `<div class="secondary-unlock-list">${getGlobalLightupGroups().map(group => `
        <section>
          <h3>${group.title}</h3>
          ${group.items.map(globalLightupItem).join('')}
        </section>
      `).join('')}</div>`,
      size: 'tall',
    };
  }
  if (type.startsWith('lightup-')) {
    const kind = type.replace('lightup-', '');
    const group = getGlobalLightupGroups().find(item => item.kind === kind) || getGlobalLightupGroups()[0];
    return {
      kicker: '收藏点亮',
      title: group.title,
      desc: `当前共 ${group.total} 项，展示已解锁和高相关内容。`,
      body: `<div class="secondary-card-list">${group.items.map(globalLightupItem).join('')}</div>`,
    };
  }
  if (type.startsWith('share-')) {
    const plan = getGeneratedPlan(state);
    const isResult = type === 'share-result';
    return {
      kicker: '分享预览',
      title: isResult ? '生成体验分享卡' : '内容详情分享卡',
      desc: 'Demo 中不调用系统分享，先展示分享后用户会看到的核心信息。',
      body: `
        <article class="secondary-share-card">
          <span>${isResult ? plan.subtitle : detail.content.type}</span>
          <h3>${isResult ? plan.title : detail.content.title}</h3>
          <p>${isResult ? plan.summary : detail.summary}</p>
          <div><b>文化种草机 v3.0</b><i>可继续生成专属玩法</i></div>
        </article>
        <button class="secondary-primary" data-close-sheet>保存分享卡</button>
      `,
    };
  }
  return {
    kicker: '承接页',
    title: '更多内容',
    desc: '这个入口已接入统一二级承接层。',
    body: `<div class="secondary-card-list">${contents.slice(0, 3).map(secondaryContentCard).join('')}</div>`,
  };
}

function secondaryContentCard(item, index = 0) {
  const images = ['hero', 'article-2', 'article-3', 'article-4', 'article-5', 'article-6'];
  return `
    <article class="secondary-content-card" data-open="${item.id}">
      <img src="./assets/figma-seed-home/${images[index % images.length]}.png" alt="" />
      <div>
        <span>${item.type} · ${item.duration}</span>
        <b>${item.title}</b>
        <p>${item.subtitle}</p>
      </div>
    </article>
  `;
}

function secondaryTripCard(item, index) {
  return `
    <article class="secondary-trip-card" data-preview-detail-trip="${index}">
      <span>${item.meta}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <button>预览生成结果</button>
    </article>
  `;
}

function secondaryQuoteCard(item, index) {
  const images = ['detail-traveler-1', 'detail-traveler-2', 'detail-traveler-3'];
  return `
    <article class="secondary-quote-card">
      <img src="./assets/figma-seed-home/${images[index % images.length]}.png" alt="" />
      <div>
        <span>${item.scene}</span>
        <b>${item.name}</b>
        <p>${item.text}</p>
      </div>
    </article>
  `;
}

function secondaryProductCard(item, index) {
  return `
    <article class="secondary-product-card">
      <span>${item.tag}</span>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div><b>${item.price}</b><button data-product="${index}">去看看</button></div>
    </article>
  `;
}

function secondarySkillCard(skill) {
  const isLighted = state.lightups.skills.includes(skill.id);
  return `
    <article class="secondary-skill-card">
      <span>${skill.meta} · ${skill.duration}</span>
      <h3>${skill.name}</h3>
      <p>${skill.desc}</p>
      <div>${skill.steps.map(step => `<i>${step}</i>`).join('')}</div>
      <button data-open-sheet="skill-${skill.id}">${isLighted ? '查看点亮记录' : '查看详情'}</button>
    </article>
  `;
}

function secondaryServiceCard(label, value, desc) {
  return `<article><span>${label}</span><b>${value}</b><p>${desc}</p></article>`;
}

function getGlobalLightupGroups() {
  return [
    {
      kind: 'scenic',
      title: '收藏景点',
      total: 6,
      items: [
        {
          title: '葛仙村 · 千灯入夜',
          desc: '从灯街延伸出的市集体验，适合逛吃、拍照和轻量停留。',
          image: './assets/figma-seed-home/hero.png',
          action: 'data-open="festival"',
        },
        {
          title: '婺源 · 深秋油画',
          desc: '推荐逛完灯街再去夜市刚好，不会觉得行程断掉。',
          image: './assets/figma-seed-home/article-5.png',
          action: 'data-open="village"',
        },
      ],
    },
    {
      kind: 'painting',
      title: '点亮古画',
      total: 4,
      items: [
        {
          title: '《上元灯彩图》',
          desc: '从明代灯市拆出物、艺、人、景、情五个体验入口。',
          image: './assets/figma-painting-tab/painting-shangyuan.png',
          action: 'data-jump-tab="painting"',
        },
        {
          title: '鳌山灯 · 视觉器物',
          desc: '灯会核心装置线索，适合映射到现实灯街的第一眼记忆。',
          image: './assets/figma-painting-tab/hotspot-aoshan.png',
          action: 'data-jump-tab="painting"',
        },
      ],
    },
    {
      kind: 'skill',
      title: '点亮技艺',
      total: 10,
      items: [
        {
          title: '扎灯技艺',
          desc: '从灯街延伸出的手作体验，适合边看边做、带走一份记忆。',
          image: './assets/figma-seed-home/article-2.png',
          action: 'data-jump-tab="experience"',
        },
        {
          title: '糖画制作',
          desc: '推荐逛完灯街再去夜市刚好，甜味收束整段夜游体验。',
          image: './assets/figma-seed-home/article-6.png',
          action: 'data-jump-tab="experience"',
        },
      ],
    },
  ];
}

function uniqueIds(ids) {
  return [...new Set(ids.filter(Boolean))];
}

function renderPainting() {
  const activePainting = getActivePaintingView();
  const paintingHotspots = activePainting.hotspots;
  const chosenHotspots = state.sessionHotspots
    .map(id => paintingHotspots.find(item => item.id === id))
    .filter(Boolean);
  const activeHotspot = paintingHotspots.find(item => item.id === state.activeHotspotId);
  const relatedSpots = activePainting.related;
  screen.innerHTML = `
    <div class="system-bar" aria-hidden="true">
      <b>9:41</b>
      <div class="system-levels"><i></i><i></i><i></i><span></span></div>
    </div>
    <header class="painting-titlebar">
      <button class="avatar-btn" data-open-profile aria-label="打开我的侧边页">
        <img src="./assets/figma-seed-home/avatar.png" alt="" />
      </button>
      <h1>探画 · 解码文化密码</h1>
      ${lightupEntryButton()}
    </header>
    <section class="home-block painting-carousel">
      <article class="painting-carousel-card">
        <button data-painting-switch="-1" aria-label="上一幅古画">‹</button>
        <div>
          <p>当前古画</p>
          <h2>${activePainting.title}</h2>
          <small>${activePainting.meta}</small>
        </div>
        <button data-painting-switch="1" aria-label="下一幅古画">›</button>
      </article>
    </section>
    <section class="painting-digest-row" aria-label="古画信息摘要">
      <article><span>解码维度</span><b>${paintingHotspots.length}</b><em>${activePainting.dimensions}</em></article>
      <article><span>已添加</span><b>${chosenHotspots.length}</b><em>本次生成</em></article>
      <article><span>推荐场景</span><b>${activePainting.scene}</b><em>${activePainting.scenePlace}</em></article>
    </section>
    <section class="home-block painting-hero-block">
      <div class="painting-section-head">
        <h2>古画体验区</h2>
        <span>横滑查看</span>
      </div>
      <article class="painting-experience-card ${activeHotspot ? 'is-expanded' : 'is-collapsed'}">
        <div class="painting-art-window">
          <img src="${activePainting.image}" alt="${activePainting.title}局部" />
          <div class="painting-hotspot-layer" aria-label="${activePainting.title}热点解码">
            ${paintingHotspots.map(hotspot => `
              <button class="hotspot-pin ${state.sessionHotspots.includes(hotspot.id) ? 'chosen' : ''} ${state.activeHotspotId === hotspot.id ? 'focused' : ''}" style="left:${hotspot.x}%;top:${hotspot.y}%;" data-painting-hotspot="${hotspot.id}" aria-label="${hotspot.name}">
                <span>${hotspot.dim}</span>
              </button>
            `).join('')}
          </div>
        </div>
        ${activeHotspot ? hotspotKnowledgeCard(activeHotspot, chosenHotspots) : hotspotHintCard()}
      </article>
    </section>
    <section class="home-block related-block">
      <div class="block-head painting-related-head">
        <h2>相关景点</h2>
        <button data-open-sheet="painting-related">查看更多</button>
      </div>
      <div class="related-grid">
        ${relatedSpots.map((item, index) => relatedCard(item, index)).join('')}
      </div>
    </section>
  `;
}

function hotspotKnowledgeCard(hotspot, chosenHotspots) {
  return `
    <section class="painting-knowledge-panel expanded">
      <div class="painting-knowledge-main">
        <img src="./assets/figma-painting-tab/hotspot-aoshan.png" alt="" />
        <div class="painting-knowledge-copy">
          <div class="painting-knowledge-title">
            <h2>${hotspot.dim}·${hotspot.name}</h2>
            <div>
              <button data-close-knowledge aria-label="收起知识卡">×</button>
            </div>
          </div>
          <p>${hotspot.desc}</p>
        </div>
      </div>
      <div class="painting-knowledge-actions">
        <div class="painting-added-row">
          <span>已添加：</span>
          ${chosenHotspots.length ? chosenHotspots.slice(0, 4).map(item => hotspotMiniChip(item)).join('') : '<em>暂无</em>'}
        </div>
        <button data-generate-painting="${hotspot.id}">生成体验</button>
      </div>
    </section>
  `;
}

function hotspotHintCard() {
  return `
    <section class="painting-knowledge-panel collapsed">
      <h2>选择文化线索</h2>
      <p>点击脉冲热点展开知识卡，选择是否添加到本次体验生成。</p>
    </section>
  `;
}

function hotspotMiniChip(hotspot) {
  return `
    <span class="mini-hotspot-chip" title="${hotspot.name}">
      <i>${hotspot.dim}</i>
    </span>
  `;
}

function relatedCard(item, index = 0) {
  const images = ['spot-1', 'spot-2', 'spot-3', 'spot-4', 'spot-5', 'spot-6'];
  const image = images[index % images.length];
  return `
    <article class="related-card" data-open="${item.id}">
      <img src="./assets/figma-painting-tab/${image}.png" alt="" />
      <div class="card-gradient"></div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.meta || `${item.type} · ${item.reason}`}</p>
      </div>
    </article>
  `;
}

function renderExperience() {
  const selectedContent = contents.find(item => item.id === state.selectedContentId) || contents[0];
  const destination = selectedContent.location.includes('江西') ? selectedContent.location : '江西 · 葛仙村';
  const lightedCount = state.lightups.skills.length;
  const mode = getExperienceMode(state);
  const route = getExperienceRoute(state);
  screen.innerHTML = `
    <div class="system-bar" aria-hidden="true">
      <b>9:41</b>
      <div class="system-levels"><i></i><i></i><i></i><span></span></div>
    </div>
    <header class="experience-appbar">
      <button class="avatar-btn" data-open-profile aria-label="打开我的侧边页">
        <img src="./assets/figma-seed-home/avatar.png" alt="" />
      </button>
      <div>
        <p>当前目的地</p>
        <h1>${destination.replace(' · ', '·')}<i></i></h1>
      </div>
      ${lightupEntryButton()}
    </header>
    <section class="experience-hero-card">
      <img src="./assets/figma-seed-home/hero.png" alt="" />
      <div class="experience-hero-shade"></div>
      <div class="experience-hero-copy">
        <span>${mode.tag}</span>
        <h2>${mode.title}</h2>
        <p>${mode.desc}</p>
      </div>
      <div class="experience-status-row">
        <span><b>${route.length + 1}</b><em>个节点</em></span>
        <span><b>${lightedCount}</b><em>已点亮</em></span>
        <span><b>${mode.bestTime}</b><em>最佳入场</em></span>
      </div>
    </section>
    <section class="home-block experience-route-block">
      <div class="block-head experience-block-head">
        <h2>推荐体验路线</h2>
        <button data-generate="experience">生成详细行程</button>
      </div>
      <section class="experience-route-panel">
        <section class="experience-mode-strip" aria-label="体验模式">
          ${experienceModes.map(item => `
            <button class="${state.experienceMode === item.id ? 'active' : ''}" data-experience-mode="${item.id}">
              <b>${item.label}</b><span>${item.tag}</span>
            </button>
          `).join('')}
        </section>
        ${experienceTimeline(route)}
      </section>
    </section>
    <section class="home-block experience-products-block">
      <div class="block-head experience-block-head">
        <h2>体验物品</h2>
        <button data-open-sheet="experience-products">查看更多</button>
      </div>
      <div class="experience-product-row">
        ${products.map((product, index) => experienceProductCard(product, index)).join('')}
      </div>
    </section>
    <section class="home-block experience-skills-block">
      <div class="block-head experience-block-head">
        <h2>技艺点亮</h2>
        <button data-open-sheet="experience-skills">全部技艺</button>
      </div>
      <div class="experience-skill-list">
        ${skills.map(skill => experienceSkillCard(skill)).join('')}
      </div>
    </section>
    <section class="home-block experience-service-block">
      <div class="block-head experience-block-head">
        <h2>现场服务</h2>
        <button data-open-sheet="experience-service">服务详情</button>
      </div>
      <div class="experience-service-grid">
        ${experienceServiceCard('排队预估', '12 分钟', '灯街工坊当前较空，可优先安排手作。')}
        ${experienceServiceCard('最近入口', '东街口', '距离当前推荐动线约 260 米。')}
        ${experienceServiceCard('天气提醒', '微风', '夜间适合灯街游览，建议带薄外套。')}
        ${experienceServiceCard('沉淀进度', `${lightedCount}/3`, '点亮技艺后会同步到我的。')}
      </div>
    </section>
    ${state.pendingPurchase ? purchaseConfirmSheet(state.pendingPurchase) : ''}
  `;
}

function experienceTimeline(route) {
  return `
    <section class="experience-timeline" aria-label="体验路线时间轴">
      <div class="timeline-track">
        ${route.map((item, index) => `<i style="left:${timelinePosition(index, route.length)}%;"></i>`).join('')}
      </div>
      <div class="timeline-times">
        ${route.map((item, index) => `<span style="left:${timelinePosition(index, route.length)}%;">${item.time}</span>`).join('')}
      </div>
      <div class="timeline-labels">
        ${route.map((item, index) => `<span style="left:${timelinePosition(index, route.length)}%;">${item.title}</span>`).join('')}
      </div>
    </section>
  `;
}

function timelinePosition(index, total) {
  if (total <= 1) return 50;
  return Math.round((index / (total - 1)) * 100);
}

function experienceRouteItem(item, index) {
  const labels = ['起', '承', '转', '合'];
  return `
    <article class="experience-route-item">
      <div class="route-node">${labels[index] || index + 1}</div>
      <div>
        <span>${item.time}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </article>
  `;
}

function experienceProductCard(product, index) {
  const images = ['article-1', 'article-2', 'article-5'];
  return `
    <article class="experience-product-card ${product.tone}">
      <div class="experience-product-visual">
        <img src="./assets/figma-seed-home/${images[index % images.length]}.png" alt="" />
      </div>
      <span>${product.tag}</span>
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="experience-product-foot">
        <b>${product.price}</b>
        <button data-product="${index}">去看看</button>
      </div>
    </article>
  `;
}

function experienceSkillCard(skill) {
  const isLighted = state.lightups.skills.includes(skill.id);
  const images = {
    'skill-lantern': 'img-01',
    'skill-paper': 'img-02',
    'skill-sugar': 'img-03',
  };
  return `
    <article class="experience-skill-card ${isLighted ? 'is-lighted' : ''}">
      <div class="experience-skill-main">
        <img class="skill-thumb" src="./assets/figma-seed-home/${images[skill.id] || 'img-04'}.png" alt="" />
        <div>
          <span>${skill.meta} · ${skill.duration}</span>
          <button data-skill="${skill.id}">${isLighted ? '已点亮' : '点亮技艺'}</button>
          <h3>${skill.name}</h3>
          <p>${skill.desc}</p>
          <div class="skill-step-row">
            ${skill.steps.map(step => `<i>${step}</i>`).join('')}
          </div>
        </div>
      </div>
    </article>
  `;
}

function experienceServiceCard(label, value, desc) {
  return `
    <article class="experience-service-card">
      <span>${label}</span>
      <h3>${value}</h3>
      <p>${desc}</p>
    </article>
  `;
}

function purchaseConfirmSheet(pending) {
  return `
    <div class="purchase-mask" data-cancel-purchase></div>
    <section class="purchase-sheet" role="dialog" aria-label="购买确认">
      <div class="sheet-handle"></div>
      <p>即将跳转</p>
      <h2>${pending.platform}</h2>
      <span>你将前往 ${pending.platform} 查看「${pending.product.name}」。Demo 不会真的打开外部 App。</span>
      <div class="purchase-actions">
        <button data-cancel-purchase>取消</button>
        <button data-confirm-purchase>确认前往</button>
      </div>
    </section>
  `;
}

function renderMine() {
  screen.innerHTML = `
    <header class="topbar compact center">
      <div class="avatar">文</div>
      <p class="eyebrow">My Archive</p>
      <h1>我的文化沉淀</h1>
    </header>
    <section class="light-grid">
      ${lightCard('景点', state.lightups.scenic.length)}
      ${lightCard('古画', state.lightups.paintings.length)}
      ${lightCard('技艺', state.lightups.skills.length)}
    </section>
    <section class="panel">
      <h2>我的行程单</h2>
      ${state.itineraries.length ? state.itineraries.map(item => `
        <article class="itinerary">
          <b>${item.title}</b>
          <p>${item.role} · ${item.days} · ${item.vibe}</p>
        </article>
      `).join('') : '<p class="body-copy">还没有加入行程单。</p>'}
    </section>
  `;
}

function lightCard(label, count) {
  return `<article class="light-card"><span>${label}</span><b>${count}/8</b><em>${count ? '已点亮' : '待点亮'}</em></article>`;
}

function profileDrawer() {
  const recommendations = profileRecommendations();
  const myTrips = state.itineraries.length ? state.itineraries.slice(0, 3) : profileDemoTrips().slice(0, 3);
  return `
    <div class="profile-drawer-mask" data-close-profile></div>
    <aside class="profile-drawer profile-drawer-v3" role="dialog" aria-label="我的文化侧边页">
      <header class="profile-hero-head">
        <button class="profile-close" data-close-profile aria-label="关闭侧边页">×</button>
        <div class="profile-avatar-wrap">
          <img src="./assets/figma-seed-home/avatar.png" alt="" />
        </div>
        <p>Culture Passport</p>
        <h2>热心市民小牟同学</h2>
        <small>探索文化，点亮记忆</small>
      </header>
      <section class="profile-v3-section">
        ${profileSectionHead('我的行程单', '查看更多', 'profile-trips')}
        <div class="profile-my-trip-row">
          ${myTrips.map((item, index) => profileMyTripCard(item, index)).join('')}
        </div>
      </section>
      <section class="profile-v3-section">
        ${profileSectionHead('个人偏好', '调整')}
        <article class="profile-preference-panel">
          <p><b>身份：</b><span>${state.preference.role}</span></p>
          <p><b>天数：</b><span>${state.preference.days}</span></p>
          <p><b>氛围：</b><span>${state.preference.vibe}</span></p>
          <button data-adjust-pref aria-label="调整偏好"></button>
        </article>
      </section>
      <section class="profile-v3-section">
        ${profileSectionHead('热门行程单', '查看更多', 'profile-recommend')}
        <div class="profile-recommend-row">
          ${recommendations.slice(0, 2).map(profileRecommendCard).join('')}
        </div>
      </section>
      <section class="profile-v3-section">
        ${profileSectionHead('技艺点亮', '查看全部', 'profile-unlocks')}
        <div class="profile-unlock-grid">
          ${profileUnlockCard('景点', Math.max(state.lightups.scenic.length, 6), '处')}
          ${profileUnlockCard('古画', Math.max(state.lightups.paintings.length, 4), '幅')}
          ${profileUnlockCard('技艺', Math.max(state.lightups.skills.length, 10), '项')}
        </div>
      </section>
    </aside>
  `;
}

function profileSectionHead(title, action = '', sheet = '') {
  return `
    <div class="profile-section-title">
      <h2>${title}</h2>
      ${action ? `<button ${action === '调整' ? 'data-adjust-pref' : `data-open-sheet="${sheet}"`}>${action}</button>` : ''}
    </div>
  `;
}

function profileStat(label, value, unit) {
  return `
    <article>
      <b>${value}<i>${unit}</i></b>
      <span>${label}</span>
    </article>
  `;
}

function profileRecommendations() {
  return [
    {
      title: '画中夜游 2 天',
      tag: '其他人常加',
      desc: '从上元灯彩图进入葛仙村夜游，补一个手作体验。',
      role: '游客',
      days: '两天一夜',
      vibe: '安静文艺',
      skillIds: ['skill-lantern'],
      fromPainting: true,
    },
    {
      title: '亲手做一盏灯',
      tag: '技艺优先',
      desc: '压缩景点数量，把时间留给工坊、灯街和祈愿。',
      role: '匠人',
      days: '一天',
      vibe: '出片打卡',
      skillIds: ['skill-lantern', 'skill-paper'],
    },
    {
      title: '夜市烟火半日',
      tag: '轻量路线',
      desc: '适合短暂停留，集中体验夜市、灯街与祈愿收束。',
      role: '商贩',
      days: '半天',
      vibe: '热闹节庆',
      skillIds: ['skill-lantern'],
    },
  ];
}

function profileDemoTrips() {
  return [
    { title: '千灯夜游', location: '葛仙村', role: '游客', days: '一天', vibe: '出片打卡', image: 'hero' },
    { title: '画中游览', location: '葛仙村', role: '游客', days: '两天', vibe: '安静文艺', image: 'article-4', fromPainting: true },
    { title: '非遗体验', location: '葛仙村', role: '匠人', days: '一天', vibe: '热闹节庆', image: 'article-2' },
    { title: '夜市烟火', location: '葛仙村', role: '商贩', days: '半天', vibe: '热闹节庆', image: 'article-5' },
    { title: '水边慢游', location: '葛仙村', role: '游客', days: '一天', vibe: '安静文艺', image: 'article-3' },
    { title: '剪纸轻旅', location: '葛仙村', role: '匠人', days: '半天', vibe: '安静文艺', image: 'article-6' },
    { title: '亲子找灯', location: '葛仙村', role: '游客', days: '一天', vibe: '热闹节庆', image: 'img-04' },
    { title: '祈愿收束', location: '葛仙村', role: '游客', days: '半天', vibe: '出片打卡', image: 'img-05' },
  ].map((item, demoIndex) => ({ ...item, demoIndex }));
}

function profileMyTripCard(item, index = 0) {
  const image = item.image || ['hero', 'article-4', 'article-2'][index % 3];
  const location = item.location || '葛仙村';
  const previewIndex = Number.isInteger(item.demoIndex) ? item.demoIndex : index;
  const actionAttr = item.id ? `data-open-itinerary="${item.id}"` : `data-preview-trip="${previewIndex}"`;
  return `
    <article class="profile-my-trip-card" ${actionAttr} style="--trip-image:url('./assets/figma-seed-home/${image}.png');">
      <span>${location}</span>
      <h3>${item.title}</h3>
      <p>${item.role} · ${item.days}</p>
      <em>${item.vibe}</em>
    </article>
  `;
}

function profileEmptyTripCards() {
  return [0, 1, 2].map(index => `
    <article class="profile-my-trip-card empty">
      <span>${index === 0 ? '待生成' : '空位'}</span>
      <h3>${index === 0 ? '暂无行程单' : '继续探索'}</h3>
      <p>${index === 0 ? '生成后会在这里出现' : '可保存更多路线'}</p>
      <em>${index === 0 ? 'AI' : '+'}</em>
    </article>
  `).join('');
}

function profileRecommendCard(item, index) {
  const images = index === 0 ? ['hero', 'article-4'] : ['article-3', 'article-1'];
  return `
    <article class="profile-recommend-card" data-preview-recommend="${index}">
      <div class="profile-recommend-visual" aria-hidden="true">
        <img src="./assets/figma-seed-home/${images[0]}.png" alt="" />
        <img src="./assets/figma-seed-home/${images[1]}.png" alt="" />
      </div>
      <div class="profile-recommend-copy">
        <span><i></i>${index === 0 ? '1.3w' : '1.7w'}</span>
        <small>${index === 0 ? '葛仙村' : '婺源'}</small>
      </div>
      <h3>${item.title}</h3>
      <button data-add-profile-guide="${index}">添加</button>
    </article>
  `;
}

function profileUnlockCard(title, count, unit) {
  return `
    <article class="profile-unlock-card">
      <h3>${title}</h3>
      <p>已解锁</p>
      <div class="profile-unlock-count"><b>${count}</b><span>${unit}</span></div>
    </article>
  `;
}

function profileItinerary(item) {
  return `
    <article class="profile-itinerary">
      <span>${item.source === 'explore' ? '探画生成' : '内容生成'}</span>
      <h3>${item.title}</h3>
      <p>${item.role} · ${item.days} · ${item.vibe}</p>
      <div>
        <i>景点已点亮</i>
        <i>${item.skillIds.length} 项技艺</i>
      </div>
    </article>
  `;
}

function profileHistoryItem(item) {
  return `
    <article>
      <span>${item.source === 'explore' ? '探画' : '内容'}</span>
      <div>
        <b>${item.title}</b>
        <p>${item.role} · ${item.days} · ${item.vibe}</p>
      </div>
    </article>
  `;
}

function profileLight(label, title, count, color) {
  return `
    <article style="--light-color:${color};">
      <b>${label}</b>
      <span>${title}</span>
      <em>${count ? `${count}/8 已点亮` : '待点亮'}</em>
    </article>
  `;
}

function profileLightFeed() {
  const scenic = state.lightups.scenic.map(() => ({ type: '景点', title: '葛仙村', desc: '已加入文化行程单' }));
  const paintings = state.lightups.paintings.map(() => ({ type: '古画', title: '上元灯彩图', desc: '探画热点已带入生成' }));
  const skillItems = state.lightups.skills.map(id => {
    const skill = skills.find(item => item.id === id);
    return { type: '技艺', title: skill?.name || '非遗技艺', desc: skill?.meta || '手动点亮' };
  });
  const feed = [...scenic, ...paintings, ...skillItems].slice(0, 4);
  if (!feed.length) {
    return '<p class="profile-feed-empty">点亮景点、古画或技艺后，这里会形成最近沉淀记录。</p>';
  }
  return feed.map(item => `
    <article>
      <span>${item.type}</span>
      <div>
        <b>${item.title}</b>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join('');
}

function profileDimension(dim, count, label) {
  const filled = Math.min(Math.max(count, 0), 3);
  return `
    <article class="${filled ? 'is-active' : ''}">
      <b>${dim}</b>
      <div>${[0, 1, 2].map(index => `<i class="${index < filled ? 'on' : ''}"></i>`).join('')}</div>
      <span>${label}</span>
    </article>
  `;
}

function profileMemoryList() {
  const memories = [];
  if (state.itineraries.length) memories.push({ tag: '行程', title: '千灯入夜后的文化体验', desc: '已沉淀为可继续执行的行程单。' });
  if (state.lightups.paintings.length) memories.push({ tag: '古画', title: '上元灯彩图', desc: '画中热点已进入你的文化线索库。' });
  if (state.lightups.skills.length) {
    const skill = skills.find(item => state.lightups.skills.includes(item.id));
    memories.push({ tag: '技艺', title: skill?.name || '非遗技艺', desc: skill?.desc || '已手动点亮为可回看的技艺记忆。' });
  }
  if (state.savedContentIds.length) memories.push({ tag: '种草', title: '收藏内容', desc: `已收藏 ${state.savedContentIds.length} 条文化灵感。` });
  if (!memories.length) {
    return `
      <article class="profile-memory-empty">
        <b>还没有形成记忆胶囊</b>
        <p>收藏内容、加入行程或点亮技艺后，会自动生成可回看的文化记忆。</p>
      </article>
    `;
  }
  return memories.slice(0, 4).map(item => `
    <article>
      <span>${item.tag}</span>
      <div>
        <b>${item.title}</b>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join('');
}

function profileSavedItem(item) {
  return `
    <article data-open="${item.id}" data-close-profile>
      <img src="./assets/figma-seed-home/${item.id === 'festival' ? 'hero' : item.id === 'craft' ? 'article-2' : item.id === 'village' ? 'article-3' : 'article-1'}.png" alt="" />
      <div>
        <span>${item.type} · ${item.reason}</span>
        <b>${item.title}</b>
        <p>${item.subtitle}</p>
      </div>
    </article>
  `;
}

function routeGenerate(source) {
  state.profileOpen = false;
  state.searchOpen = false;
  state.lightupPanelOpen = false;
  state.secondarySheet = null;
  if (getGenerationRoute(state) === 'preference') {
    state.page = 'preference';
    state.preferenceStep = 1;
    state.pendingSource = source;
  } else {
    state.page = 'result';
  }
  render();
}

function previewGuideAsResult(item) {
  state.preference = {
    role: item.role || '游客',
    days: item.days || '一天',
    vibe: item.vibe || '出片打卡',
  };
  state.sessionHotspots = item.fromPainting || item.title?.includes('画') ? ['aoshan-lamp'] : [];
  state.pendingSource = item.fromPainting || state.sessionHotspots.length ? 'explore' : 'detail';
  state.hasGenerated = true;
  state.page = 'result';
  state.profileOpen = false;
  state.searchOpen = false;
  state.lightupPanelOpen = false;
  state.secondarySheet = null;
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
    toast.hidden = true;
  }, 1800);
}

document.addEventListener('click', event => {
  if (event.target.closest('[data-close-sheet]')) {
    state.secondarySheet = null;
    render();
    return;
  }

  const openSheet = event.target.closest('[data-open-sheet]');
  if (openSheet) {
    state.secondarySheet = openSheet.dataset.openSheet;
    state.profileOpen = false;
    state.lightupPanelOpen = false;
    render();
    return;
  }

  const selectDestination = event.target.closest('[data-select-destination]');
  if (selectDestination) {
    state.selectedContentId = selectDestination.dataset.selectDestination;
    state.secondarySheet = null;
    showToast('已切换当前目的地，体验推荐会跟随更新');
    render();
    return;
  }

  const previewDetailTrip = event.target.closest('[data-preview-detail-trip]');
  if (previewDetailTrip) {
    const detail = getContentDetail(state.selectedContentId);
    const item = detail.itineraries[Number(previewDetailTrip.dataset.previewDetailTrip) || 0];
    previewGuideAsResult({
      title: item?.title || detail.content.title,
      role: state.preference.role,
      days: item?.title?.includes('半日') ? '半天' : state.preference.days,
      vibe: item?.meta?.includes('文化') ? '安静文艺' : state.preference.vibe,
      fromPainting: detail.showPaintingBreakdown,
    });
    state.secondarySheet = null;
    render();
    return;
  }

  if (event.target.closest('[data-open-profile]')) {
    state.profileOpen = true;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const addProfileGuide = event.target.closest('[data-add-profile-guide]');
  if (addProfileGuide) {
    const item = profileRecommendations()[Number(addProfileGuide.dataset.addProfileGuide) || 0];
    const guide = saveGuide(state, {
      source: item.fromPainting ? 'explore' : 'detail',
      skillIds: item.skillIds,
    });
    guide.title = item.title;
    guide.role = item.role;
    guide.days = item.days;
    guide.vibe = item.vibe;
    guide.hotspots = item.fromPainting ? ['aoshan-lamp'] : [];
    restoreGuideAsResult(state, guide.id);
    state.page = 'result';
    state.profileOpen = false;
    state.searchOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    showToast('已添加到我的行程单');
    render();
    return;
  }

  const openItinerary = event.target.closest('[data-open-itinerary]');
  if (openItinerary) {
    const guide = restoreGuideAsResult(state, openItinerary.dataset.openItinerary);
    if (!guide) {
      showToast('这张行程单还没有保存，先添加后再回看');
      return;
    }
    state.page = 'result';
    state.profileOpen = false;
    state.searchOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const previewTrip = event.target.closest('[data-preview-trip]');
  if (previewTrip) {
    const item = profileDemoTrips()[Number(previewTrip.dataset.previewTrip) || 0];
    previewGuideAsResult(item);
    render();
    return;
  }

  const previewRecommend = event.target.closest('[data-preview-recommend]');
  if (previewRecommend) {
    const item = profileRecommendations()[Number(previewRecommend.dataset.previewRecommend) || 0];
    previewGuideAsResult(item);
    render();
    return;
  }

  const profileJump = event.target.closest('[data-profile-jump]');
  if (profileJump) {
    state.tab = profileJump.dataset.profileJump;
    state.page = 'home';
    state.profileOpen = false;
    state.searchOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const closeProfile = event.target.closest('[data-close-profile]');
  if (closeProfile && !closeProfile.closest('[data-open]')) {
    state.profileOpen = false;
    render();
    return;
  }

  const tab = event.target.closest('[data-tab]');
  if (tab) {
    state.tab = tab.dataset.tab;
    state.page = 'home';
    state.searchOpen = false;
    state.profileOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const collectContent = event.target.closest('[data-collect-content]');
  if (collectContent) {
    const saved = toggleContentSaved(state, collectContent.dataset.collectContent);
    showToast(saved ? '已加入种草' : '已取消种草');
    render();
    return;
  }

  const jumpTab = event.target.closest('[data-jump-tab]');
  if (jumpTab) {
    state.tab = jumpTab.dataset.jumpTab;
    state.page = 'home';
    state.searchOpen = false;
    state.profileOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const paintingSwitch = event.target.closest('[data-painting-switch]');
  if (paintingSwitch) {
    const delta = Number(paintingSwitch.dataset.paintingSwitch) || 0;
    state.paintingIndex = ((state.paintingIndex || 0) + delta + paintingViews.length) % paintingViews.length;
    state.activeHotspotId = null;
    state.sessionHotspots = [];
    state.secondarySheet = null;
    render();
    return;
  }

  if (event.target.closest('[data-close-search]')) {
    state.searchOpen = false;
    render();
    return;
  }

  const searchWord = event.target.closest('[data-search-word]');
  if (searchWord) {
    setSearchQuery(state, searchWord.dataset.searchWord);
    render();
    return;
  }

  const open = event.target.closest('[data-open]');
  if (open) {
    state.selectedContentId = open.dataset.open;
    state.page = 'detail';
    state.searchOpen = false;
    state.profileOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const filter = event.target.closest('[data-filter]');
  if (filter) {
    state.seedFilter = filter.dataset.filter;
    render();
    return;
  }

  const paintingHotspot = event.target.closest('[data-painting-hotspot]');
  if (paintingHotspot) {
    const id = paintingHotspot.dataset.paintingHotspot;
    state.activeHotspotId = state.activeHotspotId === id ? null : id;
    render();
    return;
  }

  const removeSelectedHotspot = event.target.closest('[data-remove-hotspot]');
  if (removeSelectedHotspot) {
    removeHotspot(state, removeSelectedHotspot.dataset.removeHotspot);
    render();
    return;
  }

  if (event.target.closest('[data-close-knowledge]')) {
    state.activeHotspotId = null;
    render();
    return;
  }

  const generatePainting = event.target.closest('[data-generate-painting]');
  if (generatePainting) {
    const id = generatePainting.dataset.generatePainting;
    if (!state.sessionHotspots.includes(id)) toggleHotspot(state, id);
    state.activeHotspotId = id;
    routeGenerate('explore');
    return;
  }

  if (event.target.closest('[data-search]')) {
    state.searchOpen = true;
    render();
    return;
  }

  if (event.target.closest('[data-share-detail]')) {
    showToast('已生成分享卡片，Demo 中不打开系统分享');
    return;
  }

  const detailHotspot = event.target.closest('[data-detail-hotspot]');
  if (detailHotspot) {
    const id = detailHotspot.dataset.detailHotspot;
    if (!state.sessionHotspots.includes(id)) toggleHotspot(state, id);
    state.activeHotspotId = id;
    showToast('已加入本次探画线索');
    render();
    return;
  }

  if (event.target.closest('[data-collect]')) {
    showToast('收藏入口将在内容详情后补充');
    return;
  }

  const experienceMode = event.target.closest('[data-experience-mode]');
  if (experienceMode) {
    setExperienceMode(state, experienceMode.dataset.experienceMode);
    render();
    return;
  }

  if (event.target.closest('[data-back]')) {
    state.page = 'home';
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const generate = event.target.closest('[data-generate]');
  if (generate) {
    routeGenerate(generate.dataset.generate);
    return;
  }

  const detailPrimary = event.target.closest('[data-detail-primary]');
  if (detailPrimary) {
    if (detailPrimary.dataset.detailPrimary === 'painting') {
      state.tab = 'painting';
      state.page = 'home';
      render();
      return;
    }
    routeGenerate('detail');
    return;
  }

  const pref = event.target.closest('[data-pref]');
  if (pref) {
    state.preference[pref.dataset.pref] = pref.dataset.value;
    render();
    return;
  }

  if (event.target.closest('[data-pref-prev]')) {
    state.preferenceStep = Math.max((state.preferenceStep || 1) - 1, 1);
    render();
    return;
  }

  if (event.target.closest('[data-pref-next]')) {
    state.preferenceStep = Math.min((state.preferenceStep || 1) + 1, getPreferenceGroups().length);
    render();
    return;
  }

  if (event.target.closest('[data-confirm-pref]')) {
    state.hasGenerated = true;
    state.page = 'result';
    state.preferenceStep = 1;
    render();
    return;
  }

  if (event.target.closest('[data-open-lightups]')) {
    state.lightupPanelOpen = true;
    state.profileOpen = false;
    state.searchOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  if (event.target.closest('[data-close-lightups]')) {
    state.lightupPanelOpen = false;
    render();
    return;
  }

  if (event.target.closest('[data-adjust-pref]')) {
    state.page = 'preference';
    state.preferenceStep = 1;
    state.profileOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    render();
    return;
  }

  const hotspot = event.target.closest('[data-hotspot]');
  if (hotspot) {
    toggleHotspot(state, hotspot.dataset.hotspot);
    render();
    return;
  }

  if (event.target.closest('[data-save-guide]')) {
    const plan = getGeneratedPlan(state);
    const guide = saveGuide(state, {
      source: state.sessionHotspots.length ? 'explore' : 'detail',
      skillIds: plan.lightups.skills,
    });
    restoreGuideAsResult(state, guide.id);
    state.page = 'result';
    state.profileOpen = false;
    state.lightupPanelOpen = false;
    state.secondarySheet = null;
    showToast('已加入行程单，文化沉淀已点亮');
    render();
    return;
  }

  const product = event.target.closest('[data-product]');
  if (product) {
    beginProductPurchase(state, product.dataset.product);
    state.secondarySheet = null;
    render();
    return;
  }

  if (event.target.closest('[data-cancel-purchase]')) {
    clearProductPurchase(state);
    render();
    return;
  }

  if (event.target.closest('[data-confirm-purchase]')) {
    const platform = state.pendingPurchase?.platform;
    clearProductPurchase(state);
    render();
    showToast(`已确认，将前往${platform}，Demo 中不打开外部 App`);
    return;
  }

  const skill = event.target.closest('[data-skill]');
  if (skill) {
    const changed = lightUpSkill(state, skill.dataset.skill);
    showToast(changed ? '技艺已点亮' : '这个技艺已经点亮');
    render();
  }
});

render();

document.addEventListener('input', event => {
  const searchInput = event.target.closest('[data-search-input]');
  if (!searchInput) return;
  const cursor = searchInput.selectionStart || searchInput.value.length;
  setSearchQuery(state, searchInput.value);
  render();
  const nextInput = document.querySelector('[data-search-input]');
  if (nextInput) {
    nextInput.focus();
    nextInput.setSelectionRange(cursor, cursor);
  }
});
