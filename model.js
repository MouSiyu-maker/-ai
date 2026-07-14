export const tabs = [
  { id: 'seed', label: '种草', icon: 'seed' },
  { id: 'painting', label: '探画', icon: 'painting' },
  { id: 'experience', label: '体验', icon: 'experience' },
];

export const contents = [
  {
    id: 'festival',
    type: '灯会',
    title: '千灯入夜',
    subtitle: '从一条灯街开始，生成你的文化行程',
    location: '江西 · 葛仙村',
    tone: 'festival',
    tags: ['灯会', '夜游', '可生成'],
    reason: '夜游首选',
    duration: '2天1夜',
    heat: '8.9k',
    priority: 'hero',
  },
  {
    id: 'craft',
    type: '非遗',
    title: '手作与火光',
    subtitle: '把一门技艺变成可参与的体验',
    location: '江西 · 葛仙村',
    tone: 'craft',
    tags: ['非遗', '技艺', '可点亮'],
    reason: '技艺体验',
    duration: '90分钟',
    heat: '4.2k',
    priority: 'normal',
  },
  {
    id: 'village',
    type: '古村',
    title: '山水里的村落',
    subtitle: '慢走、停留、把空间读成故事',
    location: '江西 · 葛仙村',
    tone: 'village',
    tags: ['古村', '漫游', '行程'],
    reason: '慢游路线',
    duration: '半日',
    heat: '3.6k',
    priority: 'tall',
  },
  {
    id: 'painting',
    type: '名画',
    title: '上元灯彩图',
    subtitle: '一幅画，拆出五个体验入口',
    location: '线上 · 古画解码',
    tone: 'painting',
    tags: ['名画', '可拆解', '探画'],
    reason: '古画入口',
    duration: '15分钟',
    heat: '6.1k',
    priority: 'normal',
  },
  {
    id: 'market',
    type: '灯会',
    title: '灵宝夜市',
    subtitle: '灯下小食、摊位与市井烟火',
    location: '江西 · 葛仙村',
    tone: 'festival',
    tags: ['灯会', '市集', '夜游'],
    reason: '烟火市集',
    duration: '夜间',
    heat: '5.4k',
    priority: 'normal',
  },
  {
    id: 'paper',
    type: '非遗',
    title: '纸上灯影',
    subtitle: '从剪纸纹样进入一场手作体验',
    location: '江西 · 葛仙村',
    tone: 'craft',
    tags: ['非遗', '剪纸', '手作'],
    reason: '亲手完成',
    duration: '60分钟',
    heat: '2.7k',
    priority: 'short',
  },
];

export const seedFilters = ['全部', '灯会', '非遗', '古村', '名画'];

const contentDetailMap = {
  festival: {
    heroImage: 'hero',
    summary: '夜色落下后，葛仙村的灯街、亭台与山水会连成一条节庆动线。适合从“被画面打动”进入，再把兴趣转成可执行的夜游体验。',
    insightTitle: '为什么值得种草',
    insights: [
      { label: '视觉记忆', value: '千灯', desc: '建筑、灯影和山水形成第一眼记忆点。' },
      { label: '体验时段', value: '夜间', desc: '18:20 后进入主氛围，适合慢游。' },
      { label: '转化动作', value: '生成', desc: '可直接生成两天一夜文化行程。' },
    ],
    route: [
      { time: '16:30', title: '入村取景', desc: '先完成入口、山水与建筑的轻量浏览。' },
      { time: '18:20', title: '灯街夜游', desc: '跟随灯火进入主街，捕捉节庆氛围。' },
      { time: '19:10', title: '手作体验', desc: '选择扎灯或剪纸，把观看转为参与。' },
      { time: '20:30', title: '祈愿收束', desc: '用木牌或灯影完成个人记忆沉淀。' },
    ],
    service: ['最佳时段 18:20', '建议停留 2天1夜', '适合首次探索者'],
    itineraries: [
      { title: '千灯夜游 2 天', meta: '夜游首选', desc: '灯街、手作、祈愿完整串联。' },
      { title: '轻量半日夜景', meta: '省力路线', desc: '只保留核心灯街和拍照点。' },
      { title: '画中灯会路线', meta: '文化向', desc: '从上元灯彩图反推现实游线。' },
    ],
    travelerSays: [
      { name: '阿雨', scene: '夜游实拍', text: '灯刚亮起来的时候最好看，走到主街会有一种进入画里的感觉。' },
      { name: '南枝', scene: '亲子体验', text: '孩子对扎灯最有兴趣，最后拿着小灯去拍照，记忆点很明确。' },
    ],
    showPaintingBreakdown: false,
    actions: { primary: '生成我的体验', secondary: '加入种草' },
  },
  craft: {
    heroImage: 'article-2',
    summary: '这条内容把非遗从“看见”推进到“亲手完成”。适合想在旅途中带走一件作品，也适合后续点亮技艺沉淀。',
    insightTitle: '体验亮点',
    insights: [
      { label: '参与门槛', value: '轻手作', desc: '步骤清晰，适合初次体验。' },
      { label: '文化转译', value: '纹样', desc: '把画中灯、窗、街市转成作品元素。' },
      { label: '沉淀方式', value: '点亮', desc: '完成后可同步到我的技艺记录。' },
    ],
    route: [
      { time: '16:40', title: '工坊入座', desc: '选择扎灯或剪纸作为主体验。' },
      { time: '17:20', title: '纹样讲解', desc: '理解图案背后的节庆含义。' },
      { time: '18:10', title: '完成作品', desc: '按照步骤完成可带走的手作。' },
      { time: '19:00', title: '夜街展示', desc: '把作品放回灯街场景中拍照。' },
    ],
    service: ['建议预约', '预计 90 分钟', '可点亮技艺'],
    itineraries: [
      { title: '手作工坊 90 分钟', meta: '技艺体验', desc: '扎灯、剪纸二选一，完成可带走作品。' },
      { title: '灯街作品拍照线', meta: '出片', desc: '完成手作后回到灯街拍摄。' },
      { title: '亲子轻手作', meta: '低门槛', desc: '控制步骤和时长，适合家庭。' },
    ],
    travelerSays: [
      { name: '亦安', scene: '工坊记录', text: '老师讲纹样的时候很有意思，做完以后再看灯街会更有代入感。' },
      { name: '小满', scene: '作品带走', text: '不是单纯买纪念品，而是真的自己做了一件东西。' },
    ],
    showPaintingBreakdown: false,
    actions: { primary: '生成手作体验', secondary: '加入种草' },
  },
  village: {
    heroImage: 'article-3',
    summary: '这是一条更慢的空间阅读路线。重点不是打卡数量，而是在村落、水系和山景之间建立自己的停留节奏。',
    insightTitle: '空间阅读',
    insights: [
      { label: '节奏', value: '慢游', desc: '适合半日或一日留白。' },
      { label: '场景', value: '山水', desc: '用步行动线串联空间记忆。' },
      { label: '适合人群', value: '安静', desc: '适合偏文艺、低强度体验。' },
    ],
    route: [
      { time: '14:30', title: '入口慢行', desc: '从入口开始观察村落尺度。' },
      { time: '15:20', title: '水边停留', desc: '在水系边完成休息与拍照。' },
      { time: '16:30', title: '登高看村', desc: '从高处重新理解空间结构。' },
      { time: '18:00', title: '灯火过渡', desc: '等待夜景点亮，进入下一段体验。' },
    ],
    service: ['适合半日', '步行友好', '低强度路线'],
    itineraries: [
      { title: '山水慢游半日', meta: '慢节奏', desc: '水边、村落、登高三个停留点。' },
      { title: '安静文艺线', meta: '轻拍照', desc: '避开高峰，更适合独处和记录。' },
      { title: '夜景过渡线', meta: '傍晚', desc: '从山水慢游自然过渡到灯街。' },
    ],
    travelerSays: [
      { name: '青禾', scene: '水边停留', text: '比起打卡，我更喜欢坐在水边看光线慢慢变暗。' },
      { name: '小乔', scene: '慢游路线', text: '这条路线不赶，适合边走边看建筑细节。' },
    ],
    showPaintingBreakdown: false,
    actions: { primary: '生成慢游路线', secondary: '加入种草' },
  },
  painting: {
    heroImage: 'article-4',
    summary: '从《上元灯彩图》进入，把画中器物、技艺、人物、空间和情绪拆成五个可体验入口。',
    insightTitle: '画中可拆解',
    insights: [
      { label: '热点', value: '5 个', desc: '物、艺、人、景、情五个维度。' },
      { label: '连接', value: '夜游', desc: '可映射到葛仙村灯街体验。' },
      { label: '生成', value: '带入', desc: '选择热点后自动带入 AI 结果。' },
    ],
    route: [
      { time: '线上', title: '查看古画', desc: '先观察整体灯市场景。' },
      { time: '解码', title: '点击热点', desc: '选择自己感兴趣的文化线索。' },
      { time: '生成', title: '带入体验', desc: '将热点转成行程偏好。' },
      { time: '沉淀', title: '点亮古画', desc: '完成后进入我的文化沉淀。' },
    ],
    service: ['5 个热点', '支持生成', '点亮古画'],
    itineraries: [
      { title: '画中灯会解码', meta: '名画入口', desc: '先拆热点，再生成体验。' },
      { title: '鳌山灯夜游线', meta: '器物向', desc: '围绕灯会装置与街景展开。' },
      { title: '民俗技艺体验线', meta: '技艺向', desc: '药发木偶、扎灯、剪纸联动。' },
    ],
    travelerSays: [
      { name: '知白', scene: '古画解码', text: '点热点之后才知道一幅画可以拆出这么多现实体验。' },
      { name: '林间', scene: '夜游联想', text: '看完画再去灯街，会更容易理解为什么灯会是核心。' },
    ],
    showPaintingBreakdown: true,
    actions: { primary: '去探画解码', secondary: '加入种草' },
  },
  market: {
    heroImage: 'article-5',
    summary: '灵宝夜市承接灯会后的烟火气：小食、摊位、灯影和人流共同构成更生活化的夜游场景。',
    insightTitle: '市集体验',
    insights: [
      { label: '氛围', value: '烟火', desc: '更适合轻松逛吃。' },
      { label: '时段', value: '夜间', desc: '灯会后顺路进入。' },
      { label: '体验', value: '小食', desc: '和手作、祈愿形成补充。' },
    ],
    route: [
      { time: '18:40', title: '灯街转入', desc: '从主灯街进入夜市场景。' },
      { time: '19:00', title: '摊位浏览', desc: '选择小食和纪念物。' },
      { time: '19:40', title: '街巷拍照', desc: '利用灯笼和摊位形成画面。' },
      { time: '20:10', title: '祈愿收束', desc: '用轻仪式结束夜游。' },
    ],
    service: ['夜间开放', '小食集中', '适合顺路'],
    itineraries: [
      { title: '灯街夜市顺游', meta: '逛吃', desc: '灯街之后进入夜市补充烟火气。' },
      { title: '市集小食线', meta: '轻松', desc: '以小食和摊位为主，不做重体验。' },
      { title: '夜景拍照线', meta: '出片', desc: '利用摊位灯影形成照片层次。' },
    ],
    travelerSays: [
      { name: '木白', scene: '市集小食', text: '逛完灯街再去夜市刚好，不会觉得行程断掉。' },
      { name: '迟迟', scene: '夜景实拍', text: '摊位旁边的灯很适合拍人像，比主街更生活化。' },
    ],
    showPaintingBreakdown: false,
    actions: { primary: '生成夜市路线', secondary: '加入种草' },
  },
  paper: {
    heroImage: 'article-6',
    summary: '从剪纸纹样进入手作体验，适合时间较短但仍希望完成一件“可带走文化记忆”的用户。',
    insightTitle: '手作重点',
    insights: [
      { label: '时长', value: '60 分钟', desc: '比完整工坊更轻量。' },
      { label: '成果', value: '纸影', desc: '完成后可作为纪念物。' },
      { label: '人群', value: '亲子', desc: '适合轻参与与低门槛。' },
    ],
    route: [
      { time: '15:40', title: '选纹样', desc: '从灯、窗、花三类纹样中选择。' },
      { time: '16:00', title: '折纸起稿', desc: '跟随步骤完成基础轮廓。' },
      { time: '16:30', title: '剪刻展开', desc: '完成作品并理解纹样寓意。' },
      { time: '17:00', title: '拍照留存', desc: '将作品放入场景中完成记录。' },
    ],
    service: ['60 分钟', '轻手作', '适合亲子'],
    itineraries: [
      { title: '剪纸轻体验', meta: '60 分钟', desc: '选纹样、起稿、剪刻、展开。' },
      { title: '亲子纸影线', meta: '亲子', desc: '降低难度，保留完成感。' },
      { title: '纹样拍照线', meta: '纪念', desc: '将纸影作品放进场景记录。' },
    ],
    travelerSays: [
      { name: '澄澄', scene: '亲子手作', text: '剪纸比想象中容易上手，孩子展开作品的时候很开心。' },
      { name: '山月', scene: '纹样体验', text: '做完再看窗花和灯影，会突然注意到很多图案。' },
    ],
    showPaintingBreakdown: false,
    actions: { primary: '生成剪纸体验', secondary: '加入种草' },
  },
};

export const paintingData = {
  id: 'shangyuan',
  title: '《上元灯彩图》',
  era: '明代',
  artist: '佚名',
  collection: '南京博物院',
  description: '描绘明代南京元宵灯市的盛大场面，灯火、街市、人物与祈愿共同构成上元节的文化图景。',
  hotspots: [
    {
      id: 'aoshan-lamp',
      name: '鳌山灯',
      dim: '物',
      dimCode: 'wu',
      dimLabel: '物 · 视觉器物',
      x: 49,
      y: 60,
      desc: '明代灯会核心装置，以竹木为架、彩绢为面，高数丈，层层灯火构成节庆视觉中心。',
    },
    {
      id: 'fire-puppet',
      name: '药发木偶',
      dim: '艺',
      dimCode: 'yi',
      dimLabel: '艺 · 民俗技艺',
      x: 55,
      y: 16,
      desc: '将烟花与木偶戏结合，火树银花中木偶翻飞，把观看转化为热闹的民俗表演。',
    },
    {
      id: 'literati',
      name: '赏灯文人',
      dim: '人',
      dimCode: 'ren',
      dimLabel: '人 · 角色行为',
      x: 67,
      y: 87,
      desc: '明代文人雅士结伴赏灯，吟诗作画，饮酒赋词，形成节庆中的雅集叙事。',
    },
    {
      id: 'lingbao-street',
      name: '灵宝仙街',
      dim: '景',
      dimCode: 'jing',
      dimLabel: '景 · 空间场景',
      x: 81,
      y: 54,
      desc: '街市两侧店铺林立，灯笼高悬，人流如织，可映射为现实游线中的夜游街区。',
    },
    {
      id: 'blessing-ritual',
      name: '祈福仪式',
      dim: '情',
      dimCode: 'qing',
      dimLabel: '情 · 精神内核',
      x: 7,
      y: 75,
      desc: '元宵祈福是上元节核心仪式，放灯许愿，把热闹节庆沉淀为个人情绪记忆。',
    },
  ],
};

export const hotspots = paintingData.hotspots;

export const skills = [
  {
    id: 'skill-lantern',
    name: '扎灯技艺',
    meta: '传统美术',
    scene: '灯街工坊',
    duration: '45 分钟',
    steps: ['选竹', '扎架', '糊面', '点灯'],
    desc: '从一根竹篾开始，完成一盏可以带走的小灯。',
  },
  {
    id: 'skill-paper',
    name: '剪纸纹样',
    meta: '民间技艺',
    scene: '纸影小铺',
    duration: '35 分钟',
    steps: ['折纸', '起稿', '剪刻', '展开'],
    desc: '把上元灯彩图里的窗花纹样，转译成自己的祈愿图案。',
  },
  {
    id: 'skill-sugar',
    name: '糖画制作',
    meta: '市集手艺',
    scene: '灵宝夜市',
    duration: '25 分钟',
    steps: ['熬糖', '构图', '浇线', '起画'],
    desc: '在灯火市集里完成一幅糖画，把烟火气变成可食用的记忆。',
  },
];

export const products = [
  {
    id: 'fish-lantern',
    name: '手作鱼灯',
    tag: '夜游纪念',
    desc: '适合作为夜游纪念物，和灯街路线一起完成体验闭环。',
    price: '¥68 起',
    tone: 'lantern',
  },
  {
    id: 'paper-kit',
    name: '剪纸体验包',
    tag: '手作延展',
    desc: '把纹样带回家继续完成，适合亲子与轻手作人群。',
    price: '¥38 起',
    tone: 'paper',
  },
  {
    id: 'wish-card',
    name: '祈愿木牌',
    tag: '情绪沉淀',
    desc: '行程结束后的情绪收束，把许愿动作转成个人纪念。',
    price: '¥28 起',
    tone: 'wish',
  },
];

export const experienceModes = [
  {
    id: 'night',
    label: '夜游',
    title: '千灯入夜后的文化体验单',
    desc: '跟随种草页当前地址，优先推荐夜游、手作与祈愿收束。',
    bestTime: '18:20',
    tag: '今日可体验',
  },
  {
    id: 'craft',
    label: '手作',
    title: '把画中技艺做成自己的作品',
    desc: '优先推荐扎灯、剪纸与糖画，适合想把文化带走的人。',
    bestTime: '16:40',
    tag: '工坊可约',
  },
  {
    id: 'family',
    label: '亲子',
    title: '轻量参与的亲子文化体验',
    desc: '减少长距离移动，保留拍照、手作和祈愿三个记忆点。',
    bestTime: '15:30',
    tag: '轻松路线',
  },
];

const experienceRoutes = {
  night: [
  { time: '16:30', title: '入村取景', desc: '从山水入口进入，先完成轻量拍照与路线熟悉。' },
  { time: '18:20', title: '灯街夜游', desc: '跟随千灯入夜场景，进入葛仙村的节庆主线。' },
  { time: '19:10', title: '手作体验', desc: '选择扎灯、剪纸或糖画，把文化线索转成参与动作。' },
  { time: '20:30', title: '祈愿收束', desc: '用木牌或灯影完成情绪沉淀，并点亮个人记录。' },
  ],
  craft: [
    { time: '16:40', title: '工坊入座', desc: '先进入灯街工坊，选择扎灯或剪纸作为本次主体验。' },
    { time: '17:20', title: '纹样讲解', desc: '从上元灯彩图中提取灯、窗、街市三类视觉线索。' },
    { time: '18:10', title: '完成作品', desc: '根据步骤完成作品，并生成可点亮的技艺记录。' },
    { time: '19:00', title: '夜街展示', desc: '带着作品进入灯街拍摄，把手作成果放回场景。' },
  ],
  family: [
    { time: '15:30', title: '轻松入村', desc: '避开高峰时段，先完成休息、拍照和路线确认。' },
    { time: '16:10', title: '亲子手作', desc: '选择剪纸或糖画，控制时长，降低上手难度。' },
    { time: '17:00', title: '灯街找线索', desc: '用小游戏方式寻找灯、街、祈愿三个文化线索。' },
    { time: '18:00', title: '祈愿留念', desc: '用木牌完成收束，形成孩子可理解的文化记忆。' },
  ],
};

export const experienceRoute = experienceRoutes.night;

export const preferenceGroups = [
  {
    key: 'role',
    title: '这次用什么身份视角进入？',
    desc: '身份会影响 讲解视角、互动深度和路线节奏。',
    options: [
      { label: '游客', signal: '第一次到访', agentHint: '适合第一次来葛仙村的人，优先降低理解成本。' },
      { label: '商贩', signal: '市集烟火', agentHint: '会更关注摊位、交易、夜市和可带走的纪念物。' },
      { label: '匠人', signal: '市集烟火', agentHint: '会强化手作工坊、纹样来源和技艺点亮。' },
    ],
  },
  {
    key: 'days',
    title: '你准备了多少时间？',
    desc: '时间会决定路线密度，以及是否保留休息、拍照和二次探索。',
    options: [
      { label: '半天', signal: '轻量快闪', agentHint: '保留最强记忆点，减少移动和等待。' },
      { label: '一天', signal: '完整体验', agentHint: '串联白天入村、傍晚手作和夜间灯街。' },
      { label: '两天一夜', signal: '深度沉浸', agentHint: '允许加入慢游、夜游和第二天沉淀回看。' },
    ],
  },
  {
    key: 'vibe',
    title: '你喜欢什么氛围？',
    desc: '氛围会影响 Agent 在安静、热闹、出片之间的取舍。',
    options: [
      { label: '热闹节庆', signal: '人气灯会', agentHint: '优先灯会、夜市、表演和人群中的节庆感。' },
      { label: '安静文艺', signal: '漫游留白', agentHint: '优先水边、古村、轻讲解和低打扰停留。' },
      { label: '出片打卡', signal: '拍照效率', agentHint: '优先光线、机位、服饰和可快速完成的体验。' },
    ],
  },
];

export function createState() {
  return {
    tab: 'seed',
    page: 'home',
    seedFilter: '全部',
    selectedContentId: 'festival',
    hasGenerated: false,
    activeHotspotId: null,
    paintingIndex: 0,
    profileOpen: false,
    lightupPanelOpen: false,
    preferenceStep: 1,
    preference: { role: '游客', days: '一天', vibe: '出片打卡' },
    experienceMode: 'night',
    searchOpen: false,
    searchQuery: '',
    secondarySheet: null,
    savedContentIds: [],
    sessionHotspots: [],
    itineraries: [],
    lightups: { scenic: [], paintings: [], skills: [] },
    pendingPlatform: null,
    pendingPurchase: null,
  };
}

export function getFilteredContents(state) {
  if (!state.seedFilter || state.seedFilter === '全部') return contents;
  return contents.filter(item => item.type === state.seedFilter);
}

export function setSearchQuery(state, query = '') {
  state.searchQuery = String(query).trim();
  return state.searchQuery;
}

export function getSearchResults(state) {
  const query = String(state.searchQuery || '').trim().toLowerCase();
  if (!query) return contents;
  return contents.filter(item => {
    const haystack = [
      item.title,
      item.subtitle,
      item.type,
      item.location,
      item.reason,
      item.duration,
      ...item.tags,
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  });
}

export function getContentDetail(id) {
  const content = contents.find(item => item.id === id) || contents[0];
  const detail = contentDetailMap[content.id] || contentDetailMap.festival;
  return { content, ...detail };
}

export function getRelatedContents(id, limit = 4) {
  const current = contents.find(item => item.id === id) || contents[0];
  return contents
    .filter(item => item.id !== current.id)
    .map(item => ({
      item,
      score: item.tags.filter(tag => current.tags.includes(tag)).length + (item.type === current.type ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(entry => entry.item);
}

export function toggleContentSaved(state, id) {
  if (state.savedContentIds.includes(id)) {
    state.savedContentIds = state.savedContentIds.filter(item => item !== id);
    return false;
  }
  state.savedContentIds = [...state.savedContentIds, id];
  return true;
}

export function getGenerationRoute(state) {
  return state.hasGenerated ? 'result' : 'preference';
}

export function getPreferenceGroups() {
  return preferenceGroups;
}

export function getGeneratedPlan(state) {
  const role = state.preference.role || '游客';
  const days = state.preference.days || '两天一夜';
  const vibe = state.preference.vibe || '安静文艺';
  const source = state.pendingSource || (state.sessionHotspots.length ? 'explore' : 'detail');
  const includedHotspots = state.sessionHotspots
    .map(id => hotspots.find(item => item.id === id))
    .filter(Boolean);
  const isExplore = source === 'explore' || includedHotspots.length > 0;
  const mode = role === '匠人' ? 'craft' : (vibe === '热闹节庆' ? 'night' : 'family');
  const route = buildGeneratedRoute({ days, vibe, role, mode, includedHotspots });
  const focusDimensions = buildFocusDimensions({ includedHotspots, role, vibe });
  const selectedSignals = preferenceGroups.map(group => {
    const selected = group.options.find(option => option.label === state.preference[group.key]) || group.options[0];
    return {
      key: group.key,
      title: group.title,
      label: selected.label,
      signal: selected.signal,
      agentHint: selected.agentHint,
    };
  });

  return {
    title: isExplore ? `画中夜游 · ${role}文化体验单` : `葛仙村 · ${role}专属文化行程`,
    subtitle: isExplore ? '由探画热点与内容偏好共同生成' : '由内容详情与个人偏好生成',
    summary: `我已按“${role} / ${days} / ${vibe}”重新组织路线，优先保留${vibe === '热闹节庆' ? '灯会、人群与夜市烟火' : vibe === '出片打卡' ? '高识别度画面与拍摄动线' : '慢游留白与文化解释'}，并把体验收束到可点亮的文化沉淀。`,
    constraints: selectedSignals,
    agentSteps: [
      { label: '读取内容', desc: isExplore ? '识别探画热点、种草内容和当前目的地。' : '读取内容详情、地点类型和停留时间。' },
      { label: '理解偏好', desc: selectedSignals.map(item => item.signal).join(' · ') },
      { label: '重排路线', desc: `按 ${days} 容量控制节奏，避免只堆景点。` },
      { label: '输出沉淀', desc: '同步准备景点、古画、技艺三类点亮入口。' },
    ],
    evidence: [
      includedHotspots.length ? `${includedHotspots.length} 个画中热点已带入` : '未带入额外画中热点',
      `${role}视角`,
      `${days}容量`,
      `${vibe}氛围`,
    ],
    includedHotspots,
    focusDimensions,
    route,
    mustVisits: buildMustVisits({ role, vibe, days, includedHotspots }),
    interactions: buildGeneratedInteractions({ role, vibe, includedHotspots }),
    photoSpots: buildPhotoSpots({ role, vibe }),
    tips: buildPracticalTips({ role, vibe, days }),
    rolePlay: buildRolePlay({ role, vibe }),
    focusCards: buildGeneratedFocusCards({ role, vibe, includedHotspots }),
    lightups: {
      scenic: ['gexian-village'],
      paintings: isExplore ? ['shangyuan-painting'] : [],
      skills: role === '匠人' ? ['skill-lantern', 'skill-paper'] : ['skill-lantern'],
    },
    confidence: {
      label: includedHotspots.length || role === '匠人' || vibe === '热闹节庆' ? '高匹配' : '稳定匹配',
      value: includedHotspots.length ? 92 : 86,
      desc: includedHotspots.length ? '热点线索与夜游体验可直接映射。' : '内容详情与偏好条件完整，可生成稳定路线。',
    },
  };
}

export function getExperienceMode(state) {
  return experienceModes.find(mode => mode.id === state.experienceMode) || experienceModes[0];
}

export function setExperienceMode(state, id) {
  if (!experienceModes.some(mode => mode.id === id)) return getExperienceMode(state);
  state.experienceMode = id;
  return getExperienceMode(state);
}

export function getExperienceRoute(state) {
  const mode = getExperienceMode(state);
  return experienceRoutes[mode.id] || experienceRoutes.night;
}

function buildGeneratedRoute({ days, vibe, role, mode, includedHotspots }) {
  const base = experienceRoutes[mode] || experienceRoutes.night;
  if (days === '半天') {
    return [
      { time: '16:30', title: '快速入村定位', desc: '先确认灯街、工坊和主拍摄点，减少无效移动。', agentNote: '半天容量，只保留强记忆点。' },
      { time: '18:20', title: vibe === '出片打卡' ? '黄金灯影机位' : '灯街主线体验', desc: '进入夜游核心区，完成本次最有识别度的文化场景。', agentNote: '匹配氛围偏好。' },
      { time: '19:10', title: role === '匠人' ? '短时手作体验' : '祈愿收束', desc: '用一个轻参与动作完成个人记忆，不继续加重行程。', agentNote: '控制体力消耗。' },
    ];
  }
  if (days === '一天') {
    return base.slice(0, 4).map((item, index) => ({
      ...item,
      agentNote: ['建立场景', '进入主体验', '转为参与', '形成沉淀'][index],
    }));
  }
  return [
    ...base.slice(0, 3).map((item, index) => ({
      ...item,
      agentNote: ['第一天建立场景', '第一天主体验', '把观看转成参与'][index],
    })),
    {
      time: '次日 10:00',
      title: includedHotspots.length ? '回看画中线索' : '慢游回看',
      desc: includedHotspots.length ? '用已选热点复盘灯会器物、技艺和空间，把古画理解带回现实。' : '用更慢的节奏补看村落、水边和白天的建筑细节。',
      agentNote: '两天一夜保留二次理解。',
    },
  ];
}

function buildGeneratedFocusCards({ role, vibe, includedHotspots }) {
  const hotspotCard = includedHotspots[0]
    ? { title: includedHotspots[0].name, label: includedHotspots[0].dimLabel, desc: includedHotspots[0].desc }
    : { title: '千灯入夜', label: '景 · 夜游主线', desc: '用灯街作为路线骨架，让文化体验有明确的开始和收束。' };
  const craftCard = role === '匠人'
    ? { title: '扎灯 + 剪纸', label: '艺 · 双技艺', desc: '强化手作参与，把画中纹样转成可带走作品。' }
    : { title: '轻手作体验', label: '艺 · 低门槛', desc: '保留一个可参与动作，让行程不止停留在观看。' };
  const moodCard = vibe === '热闹节庆'
    ? { title: '夜市烟火', label: '情 · 节庆人气', desc: '把灯会后的市集作为情绪高点，增强热闹感。' }
    : vibe === '出片打卡'
      ? { title: '灯影机位', label: '物 · 视觉记忆', desc: '优先安排光线稳定、背景完整的拍摄场景。' }
      : { title: '水边慢游', label: '情 · 留白沉淀', desc: '保留安静停留，让体验从热闹落到个人记忆。' };
  return [hotspotCard, craftCard, moodCard];
}

function buildFocusDimensions({ includedHotspots, role, vibe }) {
  const defaults = [
    { dim: '物', name: vibe === '出片打卡' ? '灯影器物' : '鳌山灯意象', dimLabel: '物 · 视觉器物', desc: '从灯、牌、木作和手持小物里找到可被记住的文化符号。' },
    { dim: '艺', name: role === '匠人' ? '扎灯剪纸' : '轻手作', dimLabel: '艺 · 民俗技艺', desc: '至少保留一个可参与动作，让路线不止是观看。' },
    { dim: '人', name: role === '商贩' ? '市集摊主' : role === '匠人' ? '工坊师傅' : '同行游客', dimLabel: '人 · 角色行为', desc: '用一个角色视角理解现场行为，而不是只看风景。' },
    { dim: '景', name: '灯街夜游', dimLabel: '景 · 空间场景', desc: '用现实街区承接内容详情里的夜游动线。' },
    { dim: '情', name: vibe === '热闹节庆' ? '灯会人气' : '祈愿收束', dimLabel: '情 · 精神内核', desc: '把节庆情绪收束成个人记忆。' },
  ];
  const selected = includedHotspots.map(item => ({
    dim: item.dim,
    name: item.name,
    dimLabel: item.dimLabel,
    desc: item.desc,
  }));
  const merged = [...selected];
  defaults.forEach(item => {
    if (!merged.some(existing => existing.dim === item.dim)) merged.push(item);
  });
  return merged.slice(0, 5);
}

function buildMustVisits({ role, vibe, days, includedHotspots }) {
  const firstHotspot = includedHotspots[0];
  const base = [
    {
      title: firstHotspot ? firstHotspot.name : '千灯主街',
      tag: firstHotspot ? firstHotspot.dimLabel : '景 · 主线入口',
      reason: firstHotspot ? `前期选择的“${firstHotspot.dim}”维度会在这里落到现实体验。` : '这是整条夜游路线的视觉锚点，先建立文化氛围。',
    },
    role === '商贩'
      ? { title: '灵宝夜市', tag: '人 · 市集烟火', reason: '从摊位、叫卖和小食进入，更符合商贩视角。' }
      : role === '匠人'
        ? { title: '纸影工坊', tag: '艺 · 手作工坊', reason: '把看见的灯影纹样转成亲手完成的作品。' }
        : { title: '水边灯影', tag: '情 · 慢游停留', reason: '第一次到访时用低压力停留消化信息。' },
    vibe === '出片打卡'
      ? { title: '桥头灯阵', tag: '物 · 视觉机位', reason: '背景完整、光源稳定，适合快速完成高识别照片。' }
      : vibe === '热闹节庆'
        ? { title: '鳌山灯会场', tag: '物 · 节庆装置', reason: '人群、灯火和表演集中，是热闹感的峰值。' }
        : { title: '祈愿灯廊', tag: '情 · 安静收束', reason: '适合从热闹转入个人记忆，完成体验闭环。' },
  ];
  if (days === '两天一夜') {
    base.push({ title: '次日回看点', tag: '景 · 二次理解', reason: '第二天用白天视角复盘昨晚的灯会与手作线索。' });
  }
  return base;
}

function buildGeneratedInteractions({ role, vibe, includedHotspots }) {
  const item = role === '商贩'
    ? { title: '带走一枚市集小物', detail: '挑一件和灯会相关的小纪念，把烟火气变成可保存物品。' }
    : role === '匠人'
      ? { title: '完成一件手作成品', detail: '扎灯或剪纸二选一，记录材料、纹样和完成步骤。' }
      : { title: '领取一张祈愿木牌', detail: '把第一次到访的愿望写下来，作为路线收束物。' };
  const memory = vibe === '热闹节庆'
    ? { title: '记录人群亮灯瞬间', detail: '把灯亮起、人群聚拢、摊位开张作为情绪峰值。' }
    : vibe === '出片打卡'
      ? { title: '保存一组同机位对比', detail: '同一位置拍全景、人像、手作特写三张照片。' }
      : { title: '留下水边安静片段', detail: '记录一次没有赶路的停留，让行程有呼吸感。' };
  const activity = includedHotspots.some(item => item.dim === '艺')
    ? { title: '复刻画中技艺线索', detail: '把已选热点里的技艺维度转成现实体验任务。' }
    : { title: '参与灯街祈愿动作', detail: '用点灯、挂愿或合影完成轻量互动。' };
  return [
    { type: '物品', ...item },
    { type: '记忆', ...memory },
    { type: '活动', ...activity },
  ];
}

function buildPhotoSpots({ role, vibe }) {
  if (vibe === '出片打卡') {
    return [
      { title: '桥头灯阵正面', bestTime: '18:40-19:10', reason: '光线稳定，适合先拍全身再拍半身机位。' },
      { title: '水面倒影侧拍', bestTime: '19:10-19:30', reason: '灯影会拉长，画面更有层次。' },
      { title: role === '匠人' ? '手作成品特写' : '灯街回望机位', bestTime: '体验结束后', reason: role === '匠人' ? '把作品放进灯光里拍，能体现技艺成果。' : '人流作为背景，主体更突出。' },
    ];
  }
  if (vibe === '热闹节庆') {
    return [
      { title: '鳌山灯会场', bestTime: '亮灯后 10 分钟', reason: '人群刚聚拢，节庆感最强。' },
      { title: '夜市摊位斜侧', bestTime: '19:30 后', reason: '摊位灯、小食和人流能形成生活化画面。' },
      { title: '祈愿灯廊入口', bestTime: '收束前', reason: '适合拍多人同行和仪式感照片。' },
    ];
  }
  return [
    { title: '水边灯影', bestTime: '18:50-19:20', reason: '人流较少，适合安静文艺的低打扰记录。' },
    { title: '古村巷口', bestTime: '傍晚转夜', reason: '建筑轮廓和灯光同时可见。' },
    { title: '祈愿灯廊末端', bestTime: '离开前', reason: '适合用背影或手部细节收束记忆。' },
  ];
}

function buildPracticalTips({ role, vibe, days }) {
  const tips = [
    days === '半天' ? '半天路线不要加餐饮长停留，先完成主灯街和一个互动任务。' : days === '一天' ? '一天路线建议把手作放在傍晚前，避免夜间排队。' : '两天一夜建议第二天上午回看古画线索，不要把所有体验挤在第一晚。',
    vibe === '热闹节庆' ? '热闹路线要接受人流，优先抢亮灯后的前 20 分钟。' : vibe === '出片打卡' ? '出片路线建议穿低饱和纯色，避免和灯笼背景抢视觉。' : '安静路线建议避开主街高峰，水边和巷口更适合停留。',
    role === '商贩' ? '市集视角可以多问摊位故事，但不要在高峰时段长时间占位。' : role === '匠人' ? '手作体验尽量提前预约，完成品更适合放到灯街补拍。' : '首次到访先走完整主线，再决定是否加购或加体验。',
    '固定留 15 分钟机动时间，给拍照、排队和临时兴趣点。',
  ];
  return tips;
}

function buildRolePlay({ role, vibe }) {
  if (role === '商贩') {
    return {
      role,
      title: '把自己代入一位灯市摊主',
      intro: '你不是只逛夜市，而是在观察一条灯市如何被人流、叫卖和小物件点亮。',
      tasks: [
        '找一个最有记忆点的摊位，记录它卖什么、怎么招呼客人。',
        vibe === '热闹节庆' ? '在人流最密的路口观察 3 分钟，感受节庆秩序。' : '挑一件小物作为“今晚的摊位记忆”。',
        '最后用一张摊位灯光照片收束这条市集线。',
      ],
    };
  }
  if (role === '匠人') {
    return {
      role,
      title: '把自己代入一位灯彩匠人',
      intro: '你会更关注材料、结构、纹样和手上动作，而不是只看成品好不好看。',
      tasks: [
        '在灯街先找 2 个纹样，再去工坊判断它们能否被复刻。',
        '手作时记录一个“失败但有意思”的步骤。',
        vibe === '出片打卡' ? '把完成品放回灯光环境拍一张作品照。' : '写下这个作品最像画中哪个线索。',
      ],
    };
  }
  return {
    role,
    title: '把自己代入第一次入画的游客',
    intro: '你要做的是降低理解成本，先被画面打动，再慢慢知道它为什么成立。',
    tasks: [
      '入村先找最容易记住的一个灯景，作为整条路线起点。',
      vibe === '热闹节庆' ? '跟随人群走一段，感受灯会的节奏。' : '找一个安静位置停留 5 分钟，记录第一印象。',
      '离开前选一个动作完成收束：挂愿、合影或带走小物。',
    ],
  };
}

export function toggleHotspot(state, id) {
  if (state.sessionHotspots.includes(id)) {
    state.sessionHotspots = state.sessionHotspots.filter(item => item !== id);
  } else {
    state.sessionHotspots = [...state.sessionHotspots, id];
  }
  return state.sessionHotspots;
}

export function removeHotspot(state, id) {
  state.sessionHotspots = state.sessionHotspots.filter(item => item !== id);
  return state.sessionHotspots;
}

export function saveGuide(state, options = {}) {
  const source = options.source || 'detail';
  const skillIds = options.skillIds || ['skill-lantern', 'skill-paper'];
  const guide = {
    id: `guide-${Date.now()}`,
    title: source === 'explore' ? '画中夜游 · 文化体验行程' : '葛仙村 · 专属文化行程',
    source,
    role: state.preference.role,
    days: state.preference.days,
    vibe: state.preference.vibe,
    hotspots: [...state.sessionHotspots],
    skillIds,
  };
  state.itineraries = [guide, ...state.itineraries];
  mergeUnique(state.lightups.scenic, 'gexian-village');
  if (source === 'explore' || state.sessionHotspots.length > 0) {
    mergeUnique(state.lightups.paintings, 'shangyuan-painting');
  }
  skillIds.forEach(id => mergeUnique(state.lightups.skills, id));
  state.hasGenerated = true;
  return guide;
}

export function restoreGuideAsResult(state, guideId) {
  const guide = state.itineraries.find(item => item.id === guideId);
  if (!guide) return null;
  state.preference = {
    role: guide.role || '游客',
    days: guide.days || '一天',
    vibe: guide.vibe || '出片打卡',
  };
  state.sessionHotspots = [...(guide.hotspots || [])];
  state.pendingSource = guide.source || 'detail';
  state.hasGenerated = true;
  return guide;
}

export function pickPlatform(seed = 0) {
  return ['淘宝', '京东', '小红书'][Math.abs(Number(seed) || 0) % 3];
}

export function beginProductPurchase(state, productIndex = 0) {
  const index = Math.abs(Number(productIndex) || 0) % products.length;
  const pending = {
    platform: pickPlatform(index),
    product: products[index],
  };
  state.pendingPlatform = pending.platform;
  state.pendingPurchase = pending;
  return pending;
}

export function clearProductPurchase(state) {
  state.pendingPlatform = null;
  state.pendingPurchase = null;
}

export function lightUpSkill(state, skillId) {
  if (state.lightups.skills.includes(skillId)) return false;
  state.lightups.skills.push(skillId);
  return true;
}

function mergeUnique(list, value) {
  if (!list.includes(value)) list.push(value);
}
