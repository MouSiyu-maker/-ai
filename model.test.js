import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createState,
  getGenerationRoute,
  toggleHotspot,
  saveGuide,
  pickPlatform,
  getFilteredContents,
  beginProductPurchase,
  lightUpSkill,
  setExperienceMode,
  getExperienceMode,
  getExperienceRoute,
  toggleContentSaved,
  setSearchQuery,
  getSearchResults,
  removeHotspot,
  getContentDetail,
  getRelatedContents,
  getPreferenceGroups,
  getGeneratedPlan,
  restoreGuideAsResult,
} from '../model.js';

test('first generation routes to preference step, later generation routes to result', () => {
  const state = createState();
  assert.equal(getGenerationRoute(state), 'preference');
  state.hasGenerated = true;
  assert.equal(getGenerationRoute(state), 'result');
});

test('preference groups provide agent-style option details', () => {
  const groups = getPreferenceGroups();
  assert.deepEqual(groups.map(group => group.key), ['role', 'days', 'vibe']);
  assert.equal(groups[0].options[0].label, '游客');
  assert.ok(groups[0].options[0].agentHint.includes('第一次'));
  assert.ok(groups[2].options.some(option => option.label === '热闹节庆' && option.signal.includes('灯会')));
});

test('generated plan reflects preference, source, and painting hotspots', () => {
  const state = createState();
  state.preference = { role: '匠人', days: '两天一夜', vibe: '热闹节庆' };
  state.pendingSource = 'explore';
  state.sessionHotspots = ['aoshan-lamp', 'fire-puppet'];

  const plan = getGeneratedPlan(state);

  assert.equal(plan.title, '画中夜游 · 匠人文化体验单');
  assert.equal(plan.summary.includes('热闹节庆'), true);
  assert.equal(plan.constraints.length, 3);
  assert.equal(plan.agentSteps.length, 4);
  assert.equal(plan.route.length, 4);
  assert.equal(plan.includedHotspots.length, 2);
  assert.equal(plan.lightups.skills.includes('skill-lantern'), true);
  assert.equal(plan.confidence.label, '高匹配');
});

test('generated plan includes agent result modules and five-dimension focus clues', () => {
  const state = createState();
  state.preference = { role: '匠人', days: '一天', vibe: '出片打卡' };
  state.pendingSource = 'explore';
  state.sessionHotspots = ['aoshan-lamp', 'fire-puppet', 'literati'];

  const plan = getGeneratedPlan(state);

  assert.deepEqual(plan.focusDimensions.map(item => item.dim), ['物', '艺', '人', '景', '情']);
  assert.equal(plan.mustVisits.length >= 3, true);
  assert.equal(plan.interactions.map(item => item.type).join(','), '物品,记忆,活动');
  assert.equal(plan.photoSpots.some(item => item.reason.includes('机位') || item.reason.includes('光线')), true);
  assert.equal(plan.tips.length >= 4, true);
  assert.equal(plan.rolePlay.role, '匠人');
  assert.equal(plan.rolePlay.tasks.some(item => item.includes('纹样') || item.includes('手作')), true);
});

test('generated plan answers change across role and vibe preferences', () => {
  const merchant = createState();
  merchant.preference = { role: '商贩', days: '半天', vibe: '热闹节庆' };
  const maker = createState();
  maker.preference = { role: '匠人', days: '半天', vibe: '安静文艺' };

  const merchantPlan = getGeneratedPlan(merchant);
  const makerPlan = getGeneratedPlan(maker);

  assert.notDeepEqual(merchantPlan.mustVisits.map(item => item.title), makerPlan.mustVisits.map(item => item.title));
  assert.notDeepEqual(merchantPlan.photoSpots.map(item => item.title), makerPlan.photoSpots.map(item => item.title));
  assert.notDeepEqual(merchantPlan.rolePlay.tasks, makerPlan.rolePlay.tasks);
  assert.equal(merchantPlan.rolePlay.role, '商贩');
  assert.equal(makerPlan.rolePlay.role, '匠人');
});

test('generated plan shows all five culture dimensions without painting hotspot input', () => {
  const state = createState();
  const plan = getGeneratedPlan(state);

  assert.deepEqual(plan.focusDimensions.map(item => item.dim), ['物', '艺', '人', '景', '情']);
});

test('painting hotspots are session-only and can be toggled', () => {
  const state = createState();
  toggleHotspot(state, 'aoshan-lamp');
  assert.deepEqual(state.sessionHotspots, ['aoshan-lamp']);
  assert.deepEqual(state.lightups.paintings, []);
  toggleHotspot(state, 'aoshan-lamp');
  assert.deepEqual(state.sessionHotspots, []);
});

test('painting hotspot can be removed without changing active hotspot', () => {
  const state = createState();
  state.sessionHotspots = ['aoshan-lamp', 'fire-puppet'];
  state.activeHotspotId = 'aoshan-lamp';
  removeHotspot(state, 'fire-puppet');
  assert.deepEqual(state.sessionHotspots, ['aoshan-lamp']);
  assert.equal(state.activeHotspotId, 'aoshan-lamp');
});

test('saving guide creates itinerary and three light-up categories', () => {
  const state = createState();
  state.sessionHotspots = ['aoshan-lamp'];
  saveGuide(state, { source: 'explore', skillIds: ['skill-lantern'] });
  assert.equal(state.itineraries.length, 1);
  assert.deepEqual(state.lightups.scenic, ['gexian-village']);
  assert.deepEqual(state.lightups.paintings, ['shangyuan-painting']);
  assert.deepEqual(state.lightups.skills, ['skill-lantern']);
});

test('saved guide restores existing AI result context instead of using a detail page', () => {
  const state = createState();
  state.preference = { role: '匠人', days: '两天一夜', vibe: '热闹节庆' };
  state.sessionHotspots = ['aoshan-lamp'];
  const guide = saveGuide(state, { source: 'explore', skillIds: ['skill-lantern', 'skill-paper'] });
  state.preference = { role: '游客', days: '半天', vibe: '出片打卡' };
  state.sessionHotspots = [];
  state.pendingSource = 'detail';

  const restored = restoreGuideAsResult(state, guide.id);
  const plan = getGeneratedPlan(state);

  assert.equal(restored.id, guide.id);
  assert.deepEqual(state.preference, { role: '匠人', days: '两天一夜', vibe: '热闹节庆' });
  assert.deepEqual(state.sessionHotspots, ['aoshan-lamp']);
  assert.equal(state.pendingSource, 'explore');
  assert.equal(state.hasGenerated, true);
  assert.equal(plan.title, '画中夜游 · 匠人文化体验单');
});

test('platform selection stays inside approved platform set', () => {
  assert.equal(pickPlatform(0), '淘宝');
  assert.equal(pickPlatform(1), '京东');
  assert.equal(pickPlatform(2), '小红书');
  assert.equal(pickPlatform(3), '淘宝');
});

test('seed home filters content by channel', () => {
  const state = createState();
  assert.equal(getFilteredContents(state).length, 6);
  state.seedFilter = '非遗';
  assert.deepEqual(getFilteredContents(state).map(item => item.type), ['非遗', '非遗']);
});

test('seed content can be saved uniquely and toggled off', () => {
  const state = createState();
  assert.equal(toggleContentSaved(state, 'festival'), true);
  assert.equal(toggleContentSaved(state, 'festival'), false);
  assert.deepEqual(state.savedContentIds, []);
});

test('seed search finds content by title, type, tag, and subtitle', () => {
  const state = createState();
  setSearchQuery(state, '剪纸');
  assert.deepEqual(getSearchResults(state).map(item => item.id), ['paper']);

  setSearchQuery(state, '灯会');
  assert.deepEqual(getSearchResults(state).map(item => item.id), ['festival', 'market']);
});

test('product purchase waits for confirmation with platform and product context', () => {
  const state = createState();
  const pending = beginProductPurchase(state, 1);
  assert.equal(pending.platform, '京东');
  assert.equal(pending.product.id, 'paper-kit');
  assert.equal(state.pendingPurchase.platform, '京东');
});

test('manual skill light-up is unique and reports whether state changed', () => {
  const state = createState();
  assert.equal(lightUpSkill(state, 'skill-lantern'), true);
  assert.equal(lightUpSkill(state, 'skill-lantern'), false);
  assert.deepEqual(state.lightups.skills, ['skill-lantern']);
});

test('experience mode changes route content and ignores unknown mode ids', () => {
  const state = createState();
  assert.equal(getExperienceMode(state).id, 'night');
  assert.equal(getExperienceRoute(state)[0].title, '入村取景');

  setExperienceMode(state, 'craft');
  assert.equal(getExperienceMode(state).id, 'craft');
  assert.equal(getExperienceRoute(state)[0].title, '工坊入座');

  setExperienceMode(state, 'unknown');
  assert.equal(getExperienceMode(state).id, 'craft');
});

test('content detail provides structured narrative, route, and action modules', () => {
  const detail = getContentDetail('festival');
  assert.equal(detail.content.id, 'festival');
  assert.equal(detail.heroImage, 'hero');
  assert.equal(detail.insights.length, 3);
  assert.equal(detail.route.length, 4);
  assert.equal(detail.itineraries.length, 3);
  assert.equal(detail.travelerSays.length, 2);
  assert.equal(detail.actions.primary, '生成我的体验');
});

test('painting detail is marked for painting breakdown only for painting content', () => {
  assert.equal(getContentDetail('painting').showPaintingBreakdown, true);
  assert.equal(getContentDetail('festival').showPaintingBreakdown, false);
});

test('related contents exclude current content and prefer matching tags', () => {
  const related = getRelatedContents('festival').map(item => item.id);
  assert.equal(related.includes('festival'), false);
  assert.equal(related[0], 'market');
});
