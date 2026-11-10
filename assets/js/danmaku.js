/*
 * Tofu Project — 포트폴리오 Arcade > Danmaku 탭의 미니 탄막 슈팅.
 *
 * - 내부 해상도 240x320 캔버스를 CSS로 확대(pixelated)해 도트 느낌을 낸다.
 * - 색은 전부 CSS 변수(--game-*)에서 읽으므로 사이트 테마를 바꾸면 스프라이트도 다시 칠해진다.
 * - 고정 60fps 스텝으로 갱신하고, Arcade 탭이 보일 때만 루프를 돌린다.
 */
(function () {
    'use strict';

    var W = 240, H = 320, STEP = 1000 / 60, TAU = Math.PI * 2;

    var panel = document.getElementById('Arcade');
    var canvas = document.getElementById('arcadeCanvas');
    if (!panel || !canvas) return;

    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    function $(id) { return document.getElementById(id); }
    var ui = {
        score: $('arcadeScore'), hi: $('arcadeHi'), lives: $('arcadeLives'), bombs: $('arcadeBombs'),
        overlay: $('arcadeOverlay'), banner: $('arcadeBanner'), boss: $('arcadeBoss'),
        bossName: $('arcadeBossName'), bossHp: $('arcadeBossHp'), bombBtn: $('arcadeBombBtn'),
        diff: $('arcadeDiff')
    };

    function load(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
    function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }

    // ------------------------------------------------------------------
    // 팔레트 & 스프라이트
    // ------------------------------------------------------------------
    var PAL = {};
    var COLOR_KEYS = ['bg', 'grid', 'player', 'enemy', 'bullet-a', 'bullet-b', 'core', 'shot'];

    var SPRITE_DEFS = {
        player: {
            colors: { 1: 'player', 2: 'core' },
            map: [
                '....1....',
                '...111...',
                '...121...',
                '..11211..',
                '.1111111.',
                '111.1.111',
                '11..1..11',
                '1.......1'
            ]
        },
        bugA: {
            colors: { 1: 'enemy' },
            map: [
                '.1.....1.',
                '..1...1..',
                '.1111111.',
                '11.111.11',
                '111111111',
                '.1.1.1.1.',
                '1.1...1.1'
            ]
        },
        bugB: {
            colors: { 1: 'enemy' },
            map: [
                '1.......1',
                '.1.....1.',
                '.1111111.',
                '11.111.11',
                '111111111',
                '1.1.1.1.1',
                '.1.....1.'
            ]
        },
        glitch: {
            colors: { 1: 'enemy', 2: 'bullet-b' },
            map: [
                '...11111...',
                '.111111111.',
                '11..111..11',
                '11..111..11',
                '11111111111',
                '12121212121',
                '11111111111',
                '.1..1.1..1.',
                '1..1...1..1'
            ]
        },
        boss: {
            colors: { 1: 'enemy', 2: 'bullet-b', 3: 'core' },
            map: [
                '......11111111111......',
                '......12222222221......',
                '......11111111111......',
                '....111111111111111....',
                '....122222222222221....',
                '....111111111111111....',
                '..1111111111111111111..',
                '..1222223333333222221..',
                '..1222233333333322221..',
                '..1222233333333322221..',
                '..1222223333333222221..',
                '..1111111111111111111..',
                '.1.1..1..1...1..1..1.1.',
                '1.....1.........1.....1'
            ]
        },
        power: {
            colors: { 1: 'shot', 2: 'core' },
            map: [
                '1111111',
                '1.222.1',
                '1.2.2.1',
                '1.222.1',
                '1.2...1',
                '1.2...1',
                '1111111'
            ]
        },
        point: {
            colors: { 1: 'player', 2: 'core' },
            map: [
                '..1..',
                '.121.',
                '12221',
                '.121.',
                '..1..'
            ]
        }
    };

    var SPR = {}, FLASH = {}, ORB = {};

    function paintSprite(def, override) {
        var h = def.map.length, w = 0;
        def.map.forEach(function (r) { w = Math.max(w, r.length); });
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var g = c.getContext('2d');
        def.map.forEach(function (row, y) {
            for (var x = 0; x < row.length; x++) {
                var ch = row[x];
                if (ch === '.' || ch === ' ') continue;
                g.fillStyle = override || PAL[def.colors[ch]];
                g.fillRect(x, y, 1, 1);
            }
        });
        return c;
    }

    // 픽셀 원형 탄: 바깥 테두리는 탄 색, 안쪽 코어는 밝은 색.
    function paintOrb(r, color) {
        var s = r * 2 + 1, c = document.createElement('canvas');
        c.width = c.height = s;
        var g = c.getContext('2d');
        for (var y = -r; y <= r; y++) {
            for (var x = -r; x <= r; x++) {
                var d = Math.sqrt(x * x + y * y);
                if (d > r + 0.3) continue;
                g.fillStyle = d <= r - 1.2 ? PAL.core : PAL[color];
                g.fillRect(x + r, y + r, 1, 1);
            }
        }
        return c;
    }

    function readPalette() {
        var cs = getComputedStyle(document.documentElement);
        COLOR_KEYS.forEach(function (k) {
            PAL[k] = cs.getPropertyValue('--game-' + k).trim() || '#ffffff';
        });
        Object.keys(SPRITE_DEFS).forEach(function (k) {
            SPR[k] = paintSprite(SPRITE_DEFS[k]);
            FLASH[k] = paintSprite(SPRITE_DEFS[k], PAL.core);
        });
        ['bullet-a', 'bullet-b'].forEach(function (c) {
            ORB[c] = {};
            for (var r = 2; r <= 4; r++) ORB[c][r] = paintOrb(r, c);
        });
    }

    function blit(img, x, y) {
        ctx.drawImage(img, Math.round(x - img.width / 2), Math.round(y - img.height / 2));
    }

    // ------------------------------------------------------------------
    // 게임 상태
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // 난이도 — speed: 탄속 배율, dens: 탄 밀도 배율, extra: 잔챙이 조준탄 추가 갈래
    // ------------------------------------------------------------------
    var DIFFS = {
        easy: {
            name: 'EASY', sub: '초보자에게 권장합니다', desc: 'test Desc1',
            color: '--diff-easy', speed: 0.75, dens: 0.6, extra: 0, lives: 5, bombs: 3
        },
        normal: {
            name: 'NORMAL', sub: '무난한 난이도입니다.', desc: 'test Desc2',
            color: '--diff-normal', speed: 1, dens: 1, extra: 0, lives: 3, bombs: 2
        },
        hard: {
            name: 'HARD', sub: '쉽지 않은 난이도입니다.', desc: 'test Desc3',
            color: '--diff-hard', speed: 1.15, dens: 1.35, extra: 1, lives: 3, bombs: 2
        },
        lunatic: {
            name: 'LUNATIC', sub: '힘듭니다.', desc: 'test Desc4',
            color: '--diff-lunatic', speed: 1.3, dens: 1.8, extra: 2, lives: 3, bombs: 2
        }
    };
    var DIFF_ORDER = ['easy', 'normal', 'hard', 'lunatic'];
    var diffId = load('tofu-diff', 'normal');
    if (!DIFFS[diffId]) diffId = 'normal';
    var DIFF = DIFFS[diffId];

    // 탄 개수를 난이도에 맞춰 늘리고 줄인다. 조준탄 부채꼴은 가운데 줄이 있도록 홀수로 맞춘다.
    function dn(n) { return Math.max(1, Math.round(n * DIFF.dens)); }
    function odd(n) { n = dn(n); return n % 2 ? n : n + 1; }
    function every(t, interval) { return t % Math.max(2, Math.round(interval / DIFF.dens)) === 0; }

    var state = 'title';
    var hi = 0;
    var score, lives, bombs, power, graze, loop, kills, frame, flash, shake;
    var player, shots, foes, bullets, items, fx, boss, director;
    var bannerT = 0;
    var keys = {};
    var drag = null;

    var stars = [];
    for (var i = 0; i < 48; i++) {
        stars.push({ x: Math.random() * W, y: Math.random() * H, s: 0.3 + Math.random() * 1.2 });
    }

    function rank() { return DIFF.speed * (1 + loop * 0.15); }
    function aim(x, y) { return Math.atan2(player.y - y, player.x - x); }
    function rand(a, b) { return a + Math.random() * (b - a); }

    function reset() {
        score = 0; lives = DIFF.lives; bombs = DIFF.bombs; power = 1; graze = 0; loop = 0; kills = 0;
        frame = 0; flash = 0; shake = 0;
        player = { x: W / 2, y: H - 36, inv: 90 };
        shots = []; foes = []; bullets = []; items = []; fx = []; boss = null;
        director = stageScript();
        hideBanner();
        ui.boss.hidden = true;
    }

    // ------------------------------------------------------------------
    // 탄 / 이펙트 헬퍼
    // ------------------------------------------------------------------
    function shoot(x, y, a, s, r, c, opt) {
        if (bullets.length > 1400) return;
        var b = { x: x, y: y, a: a, s: s, r: r, c: c, t: 0, acc: 0, min: 0, av: 0, reAt: 0, reS: 0, g: false };
        if (opt) for (var k in opt) b[k] = opt[k];
        bullets.push(b);
    }

    function ring(x, y, n, s, off, r, c, opt) {
        for (var k = 0; k < n; k++) shoot(x, y, off + k * TAU / n, s, r, c, opt);
    }

    function fan(x, y, n, gap, s, r, c) {
        var base = aim(x, y) - gap * (n - 1) / 2;
        for (var k = 0; k < n; k++) shoot(x, y, base + gap * k, s, r, c);
    }

    function burst(x, y, n, color, speed) {
        for (var k = 0; k < n; k++) {
            var a = Math.random() * TAU, v = Math.random() * (speed || 2);
            fx.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 20 + Math.random() * 20, c: color, size: Math.random() < 0.3 ? 2 : 1 });
        }
    }

    // 탄을 지우면서 점수 조각으로 바꾼다(폭탄, 피격, 보스 페이즈 전환 공통).
    function cancelBullets(toPoints) {
        bullets.forEach(function (b) {
            if (toPoints) items.push({ x: b.x, y: b.y, vy: -0.5, type: 'mini', magnet: true });
            fx.push({ x: b.x, y: b.y, vx: 0, vy: -0.4, life: 12, c: PAL.core, size: 1 });
        });
        bullets = [];
    }

    function banner(big, small, frames, warn) {
        ui.banner.querySelector('strong').textContent = big;
        ui.banner.querySelector('small').textContent = small || '';
        ui.banner.classList.toggle('warn', !!warn);
        ui.banner.classList.add('show');
        bannerT = frames || 120;
    }

    function hideBanner() {
        bannerT = 0;
        ui.banner.classList.remove('show');
    }

    // ------------------------------------------------------------------
    // 적
    // ------------------------------------------------------------------
    function addFoe(o) {
        o.t = 0; o.hit = 0;
        o.hp = Math.round(o.hp * (1 + loop * 0.35));
        foes.push(o);
        return o;
    }

    // 위에서 내려와 옆으로 휘어 빠져나가는 잔챙이
    function spawnSwoop(x, dir) {
        addFoe({
            x: x, y: -8, a: Math.PI / 2, hp: 3, r: 5, spr: 'bug', score: 100, seed: Math.random(),
            update: function (e) {
                if (e.t > 26) e.a = Math.max(0.15, Math.min(Math.PI - 0.15, e.a - dir * 0.035));
                e.x += Math.cos(e.a) * 2.1;
                e.y += Math.sin(e.a) * 2.1;
                // EASY에서는 절반만 쏜다
                if (e.t === 34 && (DIFF.dens >= 1 || e.seed < 0.5)) fan(e.x, e.y, 1 + Math.min(loop + DIFF.extra, 3) * 2, 0.22, 1.9 * rank(), 2, 'bullet-a');
            }
        });
    }

    // 천천히 내려오며 조준 3-way
    function spawnDrift(x) {
        addFoe({
            x: x, y: -8, hp: 5, r: 5, spr: 'bug', score: 150,
            update: function (e) {
                e.y += 0.75;
                if (e.t % 64 === 30 && e.y < H * 0.6) fan(e.x, e.y, odd(3), 0.25, 1.6 * rank(), 2, 'bullet-b');
            }
        });
    }

    // 자리를 잡고 원형 탄을 뿌리는 중형 — 반드시 P 아이템을 떨어뜨린다
    function spawnHover(tx, ty) {
        addFoe({
            x: tx, y: -12, ty: ty, hp: 28, r: 7, spr: 'glitch', score: 800, drop: 'power',
            update: function (e) {
                if (e.t < 300) e.y += (e.ty - e.y) * 0.05;
                else e.y -= 1.4;
                if (e.t > 40 && e.t < 300 && e.t % 48 === 0) {
                    ring(e.x, e.y, dn(12) + loop * 2, 1.15 * rank(), e.t * 0.05, 3, 'bullet-a');
                }
                if (e.t > 40 && e.t < 300 && e.t % 48 === 24) fan(e.x, e.y, odd(3), 0.12, 2 * rank(), 2, 'bullet-b');
            }
        });
    }

    function killFoe(e) {
        kills++;
        score += e.score;
        burst(e.x, e.y, e.spr === 'glitch' ? 26 : 12, PAL.enemy, 2.2);
        burst(e.x, e.y, 6, PAL['bullet-a'], 1.4);
        if (e.drop === 'power' || kills % 12 === 0) items.push({ x: e.x, y: e.y, vy: -1.6, type: 'power' });
        else if (Math.random() < 0.35) items.push({ x: e.x, y: e.y, vy: -1.6, type: 'point' });
    }

    // ------------------------------------------------------------------
    // 보스: STACK OVERFLOW (3 페이즈)
    // ------------------------------------------------------------------
    var PHASES = [
        {
            name: 'STACK OVERFLOW · RECURSION', hp: 240,
            fire: function (b, t) {
                b.x = W / 2 + Math.sin(t / 90) * 40;
                if (t % 4 === 0) {
                    var a = t * 0.13, arms = Math.max(2, dn(3));
                    for (var k = 0; k < arms; k++) shoot(b.x, b.y + 4, a + k * TAU / arms, 1.5 * rank(), 3, 'bullet-a');
                }
                if (t % 80 === 40) fan(b.x, b.y, odd(5) + loop * 2, 0.2, 2.1 * rank(), 2, 'bullet-b');
            }
        },
        {
            name: 'STACK OVERFLOW · HEAP SPRAY', hp: 280,
            fire: function (b, t) {
                b.x = W / 2 + Math.sin(t / 60) * 70;
                if (t % 28 === 0) ring(b.x, b.y, dn(18) + loop * 2, 1.3 * rank(), (t / 28) % 2 * Math.PI / 18, 3, 'bullet-b');
                if (every(t, 7)) shoot(b.x + rand(-20, 20), b.y + 6, Math.PI / 2 + rand(-0.7, 0.7), rand(1.4, 2.2) * rank(), 2, 'bullet-a');
            }
        },
        {
            name: 'STACK OVERFLOW · SEGFAULT', hp: 320,
            fire: function (b, t) {
                b.x += (W / 2 + Math.sin(t / 120) * 30 - b.x) * 0.05;
                // 퍼졌다가 멈춘 뒤, 플레이어를 향해 다시 날아오는 꽃잎 탄
                if (t % 72 === 10) {
                    ring(b.x, b.y, dn(20) + loop * 2, 3.2, t * 0.07, 3, 'bullet-a',
                        { acc: -0.06, min: 0.05, reAt: 55, reS: 1.9 * rank() });
                }
                if (t % 144 > 72 && every(t, 5)) {
                    var a = t * 0.09;
                    shoot(b.x, b.y, a, 1.3 * rank(), 2, 'bullet-b', { av: 0.007 });
                    shoot(b.x, b.y, a + Math.PI, 1.3 * rank(), 2, 'bullet-b', { av: -0.007 });
                }
            }
        }
    ];

    function spawnBoss() {
        boss = { x: W / 2, y: -30, phase: -1, t: 0, hit: 0, r: 13, enter: true, hp: 1, maxHp: 1 };
        ui.boss.hidden = false;
        nextPhase();
    }

    function nextPhase() {
        boss.phase++;
        if (boss.phase >= PHASES.length) return defeatBoss();
        var p = PHASES[boss.phase];
        boss.hp = boss.maxHp = Math.round(p.hp * (1 + loop * 0.3));
        boss.t = -70; // 페이즈 전환 직후 잠깐 숨 돌릴 틈
        ui.bossName.textContent = p.name;
        if (boss.phase > 0) {
            cancelBullets(true);
            burst(boss.x, boss.y, 30, PAL['bullet-b'], 3);
            shake = 10;
            score += 2000;
        }
    }

    function defeatBoss() {
        cancelBullets(true);
        for (var k = 0; k < 4; k++) burst(boss.x + rand(-12, 12), boss.y + rand(-8, 8), 30, k % 2 ? PAL.enemy : PAL['bullet-a'], 3.5);
        for (var j = 0; j < 8; j++) items.push({ x: boss.x + rand(-20, 20), y: boss.y + rand(-10, 10), vy: -2, type: j < 2 ? 'power' : 'point' });
        score += 10000 * (loop + 1);
        flash = 24; shake = 24;
        boss = null;
        ui.boss.hidden = true;
        banner('STAGE CLEAR', 'BUG FIXED ✓  +' + (10000 * (loop + 1)), 150);
    }

    // ------------------------------------------------------------------
    // 스테이지 진행 (제너레이터: yield 한 번 = 한 프레임)
    // ------------------------------------------------------------------
    function* wait(n) { for (var k = 0; k < n; k++) yield; }
    function* waitClear(max) { for (var k = 0; k < max && foes.length; k++) yield; }

    function* stageScript() {
        while (true) {
            banner(loop === 0 ? DIFF.name : 'LOOP ' + (loop + 1), loop === 0 ? DIFF.sub : '버그가 더 강해졌다', 110);
            yield* wait(100);

            for (var k = 0; k < 6; k++) { spawnSwoop(44, 1); yield* wait(14); }
            yield* wait(60);
            for (k = 0; k < 6; k++) { spawnSwoop(196, -1); yield* wait(14); }
            yield* wait(80);

            spawnHover(70, 72); spawnHover(170, 72);
            yield* waitClear(420);

            for (k = 0; k < 5; k++) spawnDrift(28 + k * 46);
            yield* wait(50);
            for (k = 0; k < 4; k++) spawnDrift(51 + k * 46);
            yield* waitClear(360);

            for (k = 0; k < 10; k++) { spawnSwoop(k % 2 ? 196 : 44, k % 2 ? -1 : 1); yield* wait(10); }
            spawnHover(120, 64);
            yield* waitClear(480);

            yield* wait(40);
            banner('WARNING', 'STACK OVERFLOW 접근 중', 150, true);
            yield* wait(150);
            spawnBoss();
            while (boss) yield;
            yield* wait(170);
            loop++;
        }
    }

    // ------------------------------------------------------------------
    // 플레이어 행동
    // ------------------------------------------------------------------
    function useBomb() {
        if (state !== 'playing' || bombs <= 0 || player.bombCd > 0) return;
        bombs--;
        player.bombCd = 40;
        player.inv = Math.max(player.inv, 120);
        cancelBullets(true);
        foes.forEach(function (e) { e.hp -= 40; e.hit = 4; });
        if (boss && !boss.enter && boss.t >= 0) { boss.hp -= 30; boss.hit = 4; }
        fx.push({ ring: true, x: player.x, y: player.y, r: 4, life: 30 });
        flash = 16; shake = 8;
    }

    function hitPlayer() {
        lives--;
        burst(player.x, player.y, 40, PAL.player, 3);
        burst(player.x, player.y, 20, PAL.core, 2);
        cancelBullets(false);
        shake = 14; flash = 10;
        power = Math.max(1, power - 1);
        if (lives <= 0) return gameOver();
        bombs = Math.max(bombs, DIFF.bombs);
        player.x = W / 2; player.y = H - 36; player.inv = 150;
    }

    // ------------------------------------------------------------------
    // 갱신
    // ------------------------------------------------------------------
    function update() {
        frame++;
        if (flash > 0) flash--;
        if (shake > 0) shake--;
        if (bannerT > 0 && --bannerT === 0) ui.banner.classList.remove('show');

        director.next();

        // 이동
        var focus = !!keys.f;
        var sp = focus ? 1.1 : 2.4;
        var dx = (keys.r ? 1 : 0) - (keys.l ? 1 : 0);
        var dy = (keys.d ? 1 : 0) - (keys.u ? 1 : 0);
        if (dx && dy) { dx *= 0.7071; dy *= 0.7071; }
        player.x = Math.max(6, Math.min(W - 6, player.x + dx * sp));
        player.y = Math.max(8, Math.min(H - 8, player.y + dy * sp));
        if (player.inv > 0) player.inv--;
        if (player.bombCd > 0) player.bombCd--;

        // 사격: 키보드는 Z를 누르고 있는 동안, 터치 기기는 자동
        if ((keys.z || autoFire) && frame % 5 === 0) {
            var spread = focus ? 0.05 : 0.17;
            shots.push({ x: player.x - 3, y: player.y - 6, a: 0 }, { x: player.x + 3, y: player.y - 6, a: 0 });
            if (power >= 2) shots.push({ x: player.x - 5, y: player.y - 2, a: -spread }, { x: player.x + 5, y: player.y - 2, a: spread });
            if (power >= 3) shots.push({ x: player.x - 6, y: player.y, a: -spread * 2 }, { x: player.x + 6, y: player.y, a: spread * 2 });
            if (power >= 4) shots.push({ x: player.x, y: player.y - 8, a: 0 });
        }

        // 아군 탄
        for (var i = shots.length - 1; i >= 0; i--) {
            var s = shots[i];
            s.x += Math.sin(s.a) * 7;
            s.y -= Math.cos(s.a) * 7;
            var gone = s.y < -8 || s.x < -8 || s.x > W + 8;
            if (!gone) {
                for (var j = 0; j < foes.length; j++) {
                    var e = foes[j];
                    if (Math.abs(s.x - e.x) < e.r + 2 && Math.abs(s.y - e.y) < e.r + 3) {
                        e.hp--; e.hit = 3; gone = true;
                        score += 10;
                        break;
                    }
                }
            }
            if (!gone && boss && !boss.enter && boss.t >= 0 &&
                Math.abs(s.x - boss.x) < boss.r + 2 && Math.abs(s.y - boss.y) < 9) {
                boss.hp--; boss.hit = 3; gone = true;
                score += 10;
                if (Math.random() < 0.3) fx.push({ x: s.x, y: s.y, vx: rand(-1, 1), vy: rand(-1.5, 0), life: 10, c: PAL.core, size: 1 });
            }
            if (gone) shots.splice(i, 1);
        }

        // 적
        for (i = foes.length - 1; i >= 0; i--) {
            e = foes[i];
            e.t++;
            if (e.hit > 0) e.hit--;
            e.update(e);
            if (e.hp <= 0) { killFoe(e); foes.splice(i, 1); continue; }
            if (e.t > 30 && (e.y > H + 16 || e.y < -30 || e.x < -20 || e.x > W + 20)) { foes.splice(i, 1); continue; }
            if (player.inv <= 0 && Math.hypot(e.x - player.x, e.y - player.y) < e.r) { hitPlayer(); if (state !== 'playing') return; }
        }

        // 보스
        if (boss) {
            if (boss.hit > 0) boss.hit--;
            if (boss.enter) {
                boss.y += (64 - boss.y) * 0.03;
                if (boss.y > 62) boss.enter = false;
            } else {
                boss.t++;
                if (boss.t >= 0) PHASES[boss.phase].fire(boss, boss.t);
                if (boss.hp <= 0) nextPhase();
            }
            if (boss) {
                ui.bossHp.style.width = Math.max(0, boss.hp / boss.maxHp * 100) + '%';
                if (player.inv <= 0 && Math.abs(player.x - boss.x) < boss.r && Math.abs(player.y - boss.y) < 8) {
                    hitPlayer(); if (state !== 'playing') return;
                }
            }
        }

        // 적 탄
        var px = player.x, py = player.y;
        for (i = bullets.length - 1; i >= 0; i--) {
            var b = bullets[i];
            b.t++;
            if (b.acc) { b.s += b.acc; if (b.acc < 0 && b.s < b.min) b.s = b.min; }
            if (b.av) b.a += b.av;
            if (b.reAt && b.t === b.reAt) { b.a = aim(b.x, b.y); b.s = b.reS; b.acc = 0; }
            b.x += Math.cos(b.a) * b.s;
            b.y += Math.sin(b.a) * b.s;
            if (b.x < -12 || b.x > W + 12 || b.y < -12 || b.y > H + 12) { bullets.splice(i, 1); continue; }

            var ddx = b.x - px, ddy = b.y - py, d2 = ddx * ddx + ddy * ddy;
            if (player.inv <= 0) {
                var hr = b.r - 0.5 + 1.5;
                if (d2 < hr * hr) { hitPlayer(); if (state !== 'playing') return; break; }
            }
            if (!b.g && d2 < (b.r + 7) * (b.r + 7)) {
                b.g = true; graze++; score += 20;
                fx.push({ x: px + rand(-3, 3), y: py + rand(-3, 3), vx: rand(-1, 1), vy: rand(-1, 1), life: 10, c: PAL.core, size: 1 });
            }
        }

        // 아이템 — 화면 위쪽 1/3 이상 올라가면 전부 끌어온다
        var magnetAll = py < H * 0.3;
        for (i = items.length - 1; i >= 0; i--) {
            var it = items[i];
            if (magnetAll) it.magnet = true;
            if (it.magnet) {
                var ia = Math.atan2(py - it.y, px - it.x);
                it.x += Math.cos(ia) * 5; it.y += Math.sin(ia) * 5;
            } else {
                it.vy = Math.min(1.5, it.vy + 0.05);
                it.y += it.vy;
                if (Math.hypot(it.x - px, it.y - py) < 24) it.magnet = true;
            }
            if (it.y > H + 10) { items.splice(i, 1); continue; }
            if (Math.hypot(it.x - px, it.y - py) < 10) {
                if (it.type === 'power') { if (power < 4) power++; else score += 1000; }
                else if (it.type === 'point') score += 300 * (loop + 1);
                else score += 10;
                items.splice(i, 1);
            }
        }

        // 이펙트
        for (i = fx.length - 1; i >= 0; i--) {
            var f = fx[i];
            if (f.ring) f.r += 7; else { f.x += f.vx; f.y += f.vy; f.vx *= 0.94; f.vy *= 0.94; }
            if (--f.life <= 0) fx.splice(i, 1);
        }

        if (score > hi) hi = score;
    }

    // ------------------------------------------------------------------
    // 그리기
    // ------------------------------------------------------------------
    function render() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = PAL.bg;
        ctx.fillRect(0, 0, W, H);

        if (shake > 0) ctx.setTransform(1, 0, 0, 1, Math.round(rand(-1, 1) * shake / 4), Math.round(rand(-1, 1) * shake / 4));

        // 배경: 흐르는 별 + 희미한 격자
        ctx.fillStyle = PAL.grid;
        ctx.globalAlpha = 0.55;
        var scroll = (frame * 0.5) % 32;
        for (var gy = -32 + scroll; gy < H; gy += 32) ctx.fillRect(0, Math.round(gy), W, 1);
        ctx.globalAlpha = 1;
        stars.forEach(function (s) {
            ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, s.s > 1 ? 2 : 1);
        });

        if (state === 'title') return drawFlash();

        items.forEach(function (it) {
            if (it.type === 'mini') { ctx.fillStyle = PAL.player; ctx.fillRect(Math.round(it.x) - 1, Math.round(it.y) - 1, 2, 2); }
            else blit(SPR[it.type], it.x, it.y);
        });

        var anim = (frame >> 4) & 1;
        foes.forEach(function (e) {
            var key = e.spr === 'bug' ? (anim ? 'bugA' : 'bugB') : e.spr;
            blit(e.hit ? FLASH[key] : SPR[key], e.x, e.y);
        });

        if (boss) {
            var bx = Math.round(boss.x), by = Math.round(boss.y);
            var img = boss.hit ? FLASH.boss : SPR.boss;
            var left = bx - (img.width >> 1), top = by - (img.height >> 1);
            ctx.drawImage(img, left, top);
            // 눈동자가 플레이어를 따라 움직인다
            var ox = Math.max(-2, Math.min(2, Math.round((player.x - bx) / 30)));
            ctx.fillStyle = PAL['bullet-a'];
            ctx.fillRect(left + 10 + ox, top + 8, 3, 2);
        }

        // 플레이어 (무적 중 깜빡임)
        if (state !== 'over' && (player.inv <= 0 || (frame >> 2) % 2)) {
            blit(SPR.player, player.x, player.y);
            if (frame % 4 < 2) { ctx.fillStyle = PAL['bullet-a']; ctx.fillRect(Math.round(player.x) - 1, Math.round(player.y) + 4, 1, 2); ctx.fillRect(Math.round(player.x) + 1, Math.round(player.y) + 4, 1, 2); }
        }

        // 자기 탄은 적 탄을 가리지 않도록 반투명하게
        ctx.fillStyle = PAL.shot;
        ctx.globalAlpha = 0.35;
        shots.forEach(function (s) { ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 2, 2, 5); });
        ctx.globalAlpha = 1;

        bullets.forEach(function (b) { blit(ORB[b.c][b.r], b.x, b.y); });

        if (keys.f) {
            ctx.fillStyle = PAL['bullet-a'];
            ctx.fillRect(Math.round(player.x) - 2, Math.round(player.y) - 2, 5, 5);
            ctx.fillStyle = PAL.core;
            ctx.fillRect(Math.round(player.x) - 1, Math.round(player.y) - 1, 3, 3);
        }

        fx.forEach(function (f) {
            if (f.ring) {
                ctx.strokeStyle = PAL.core;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, TAU); ctx.stroke();
            } else {
                ctx.fillStyle = f.c;
                ctx.fillRect(Math.round(f.x), Math.round(f.y), f.size, f.size);
            }
        });

        drawFlash();
        drawHud();
    }

    function drawFlash() {
        if (flash <= 0) return;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = Math.min(0.6, flash / 30);
        ctx.fillStyle = PAL.core;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
    }

    var hudCache = {};
    function setText(el, key, val) {
        if (hudCache[key] === val) return;
        hudCache[key] = val;
        el.textContent = val;
    }

    function icons(ch, n) {
        if (n <= 0) return '-';
        return n > 5 ? ch + '×' + n : new Array(n + 1).join(ch);
    }

    function drawHud() {
        setText(ui.score, 's', String(score));
        setText(ui.hi, 'h', String(hi));
        setText(ui.lives, 'l', icons('♥', lives));
        setText(ui.bombs, 'b', icons('★', bombs));
    }

    // ------------------------------------------------------------------
    // 상태 전환 & 오버레이
    // ------------------------------------------------------------------
    function hiKey(d) { return 'tofu-hi-' + d; }
    function hiOf(d) { return parseInt(load(hiKey(d), '0'), 10) || 0; }

    function showOverlay(html, focusSel) {
        ui.overlay.innerHTML = html;
        ui.overlay.hidden = false;
        var btn = ui.overlay.querySelector(focusSel || 'button');
        if (btn && panel.classList.contains('active')) btn.focus({ preventScroll: true });
    }

    function titleScreen() {
        state = 'title';
        ui.boss.hidden = true;
        hideBanner();
        var list = DIFF_ORDER.map(function (id) {
            var d = DIFFS[id];
            return '<button type="button" class="arcade-diff" data-action="start" data-diff="' + id + '" style="--diff-color:var(' + d.color + ')">' +
                '<span class="arcade-diff-name">' + d.name + '</span>' +
                '<span class="arcade-diff-hi">HI ' + hiOf(id) + '</span>' +
                '<span class="arcade-diff-sub">' + d.sub + '</span>' +
                '<span class="arcade-diff-desc">' + d.desc + '</span>' +
                '</button>';
        }).join('');
        showOverlay(
            '<h3 class="arcade-title">Tofu Project</h3>' +
            '<p class="arcade-subtitle">～ Bug Hunt in the Stack ～</p>' +
            '<p class="arcade-kicker">SELECT DIFFICULTY</p>' +
            '<div class="arcade-diffs">' + list + '</div>' +
            '<p class="arcade-hint">↑↓ 선택 · Z 결정</p>',
            '.arcade-diff[data-diff="' + diffId + '"]'
        );
        setText(ui.hi, 'h', String(hiOf(diffId)));
    }

    function start(id) {
        if (DIFFS[id]) { diffId = id; DIFF = DIFFS[id]; save('tofu-diff', id); }
        hi = hiOf(diffId);
        ui.diff.textContent = DIFF.name;
        ui.diff.style.setProperty('--diff-color', 'var(' + DIFF.color + ')');
        reset();
        state = 'playing';
        ui.overlay.hidden = true;
        canvas.focus({ preventScroll: true });
    }

    function pause() {
        if (state !== 'playing') return;
        state = 'paused';
        keys = {};
        drag = null;
        showOverlay(
            '<h3 class="arcade-title">PAUSED</h3>' +
            '<p class="arcade-stats">' + DIFF.name + ' · SCORE <b>' + score + '</b> · GRAZE <b>' + graze + '</b></p>' +
            '<button type="button" class="arcade-btn" data-action="resume">▶ CONTINUE</button>' +
            '<button type="button" class="arcade-btn arcade-btn-sub" data-action="title">난이도 선택으로</button>'
        );
    }

    function resume() {
        if (state !== 'paused') return;
        state = 'playing';
        ui.overlay.hidden = true;
        canvas.focus({ preventScroll: true });
    }

    function gameOver() {
        state = 'over';
        keys = {};
        drag = null;
        ui.boss.hidden = true;
        hideBanner();
        var record = score > hiOf(diffId);
        if (record) save(hiKey(diffId), String(score));
        drawHud();
        showOverlay(
            '<h3 class="arcade-title">GAME OVER</h3>' +
            (record ? '<p class="arcade-record">★ NEW RECORD ★</p>' : '') +
            '<p class="arcade-stats">' + DIFF.name + ' — ' + DIFF.sub + '<br>SCORE <b>' + score + '</b><br>GRAZE <b>' + graze + '</b> · LOOP <b>' + (loop + 1) + '</b> · BUGS <b>' + kills + '</b></p>' +
            '<button type="button" class="arcade-btn" data-action="start">↻ RETRY</button>' +
            '<button type="button" class="arcade-btn arcade-btn-sub" data-action="title">난이도 선택으로</button>'
        );
    }

    function backToTitle() { reset(); titleScreen(); }

    ui.overlay.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-action]');
        if (!btn) return;
        var act = btn.getAttribute('data-action');
        if (act === 'start') start(btn.getAttribute('data-diff') || diffId);
        else if (act === 'resume') resume();
        else if (act === 'title') backToTitle();
    });

    // 오버레이 안 버튼들을 화살표로 오간다.
    function moveFocus(step) {
        var btns = Array.prototype.slice.call(ui.overlay.querySelectorAll('button'));
        if (!btns.length) return;
        var i = btns.indexOf(document.activeElement);
        btns[(i + step + btns.length) % btns.length].focus({ preventScroll: true });
    }

    // ------------------------------------------------------------------
    // 입력 — 키보드는 화살표 + Z(사격) / Shift(정밀) / X(폭탄)
    // ------------------------------------------------------------------
    var KEYMAP = {
        ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'u', ArrowDown: 'd',
        ShiftLeft: 'f', ShiftRight: 'f', KeyZ: 'z', KeyX: 'b'
    };

    // 터치 기기에서는 쏘는 버튼을 누를 손이 없으므로 자동 사격.
    var autoFire = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    window.addEventListener('keydown', function (e) {
        if (!running) return;
        var t = e.target;
        if (t && t.closest && t.closest('input, textarea, select, .theme-picker')) return;

        if (state === 'playing') {
            var k = KEYMAP[e.code];
            if (k) {
                e.preventDefault();
                autoFire = false;
                if (k === 'b') { if (!e.repeat) useBomb(); }
                else keys[k] = true;
            } else if (e.code === 'Escape' || e.code === 'KeyP') {
                e.preventDefault(); pause();
            } else if (e.code === 'Space') {
                e.preventDefault();
            }
            return;
        }

        // 메뉴 조작은 포커스가 게임 패널 안에 있을 때만 가로챈다(페이지 스크롤 방해 방지).
        if (!panel.contains(document.activeElement)) return;

        if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') { e.preventDefault(); moveFocus(-1); }
        else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') { e.preventDefault(); moveFocus(1); }
        else if (e.code === 'KeyZ') {
            // Z는 포커스된 버튼을 누르는 결정 키
            e.preventDefault();
            if (!e.repeat && t && t.tagName === 'BUTTON' && ui.overlay.contains(t)) t.click();
        } else if (e.code === 'Escape' || e.code === 'KeyP') {
            e.preventDefault();
            if (state === 'paused') resume();
            else if (state === 'over') backToTitle();
        }
    });

    window.addEventListener('keyup', function (e) {
        var k = KEYMAP[e.code];
        if (k && k !== 'b') keys[k] = false;
    });

    window.addEventListener('blur', function () { keys = {}; pause(); });

    // 터치/마우스 드래그: 손가락 이동량만큼 기체를 상대 이동시킨다(손가락에 기체가 가려지지 않도록).
    canvas.addEventListener('pointerdown', function (e) {
        if (state !== 'playing') return;
        if (e.pointerType !== 'mouse') autoFire = true;
        drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
        try { canvas.setPointerCapture(e.pointerId); } catch (err) { }
        e.preventDefault();
    });

    canvas.addEventListener('pointermove', function (e) {
        if (!drag || drag.id !== e.pointerId || state !== 'playing') return;
        var scale = W / canvas.clientWidth * 1.15;
        player.x = Math.max(6, Math.min(W - 6, player.x + (e.clientX - drag.x) * scale));
        player.y = Math.max(8, Math.min(H - 8, player.y + (e.clientY - drag.y) * scale));
        drag.x = e.clientX; drag.y = e.clientY;
    });

    function endDrag(e) { if (drag && drag.id === e.pointerId) drag = null; }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    ui.bombBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); autoFire = true; useBomb(); });

    // ------------------------------------------------------------------
    // 루프 — Arcade 탭이 보일 때만 돈다
    // ------------------------------------------------------------------
    var running = false, rafId = 0, last = 0, acc = 0;

    function tick(now) {
        if (!running) return;
        rafId = requestAnimationFrame(tick);
        if (!last) last = now;
        acc += Math.min(100, now - last);
        last = now;
        while (acc >= STEP) {
            acc -= STEP;
            if (state === 'playing') update();
            else if (state !== 'paused') frame++;
            if (state !== 'paused') {
                stars.forEach(function (s) { s.y += s.s; if (s.y > H) { s.y = -2; s.x = Math.random() * W; } });
            }
            if (state !== 'playing' && state !== 'paused' && flash > 0) flash--;
        }
        render();
    }

    function setActive(on) {
        if (on && !running) {
            running = true; last = 0; acc = 0;
            rafId = requestAnimationFrame(tick);
        } else if (!on && running) {
            pause();
            running = false;
            cancelAnimationFrame(rafId);
        }
    }

    document.addEventListener('tabchange', function (e) { setActive(e.detail.tab === 'Arcade'); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); });
    document.addEventListener('themechange', function () { readPalette(); if (!running) render(); });

    // 픽셀 폰트를 미리 받아 둔다(오버레이 텍스트 깜빡임 방지).
    if (document.fonts && document.fonts.load) {
        document.fonts.load('12px Galmuri11'); document.fonts.load('26px Galmuri14');
    }

    readPalette();
    reset();
    titleScreen();
    render();
    if (panel.classList.contains('active')) setActive(true);
})();
