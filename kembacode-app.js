/* ================================================================
   KEMBACODE — interactivity
   ================================================================ */

/* -------- 1. HERO TERMINAL — typewriter intro -------- */
(() => {
  const el = document.getElementById('hero-term');
  if (!el) return;
  const lines = [
    { t: '<span class="term-comment">// kembacode init — booting your business operating system</span>' },
    { t: '<span class="term-prompt">kemba@core</span>:~$ scan --target your-business' },
    { t: '<span class="term-out">→ mapeando procesos manuales...</span>', d: 350 },
    { t: '<span class="term-out">→ detectando puntos de fuga de tiempo...</span>', d: 350 },
    { t: '<span class="term-out">→ identificando integraciones disponibles...</span>', d: 350 },
    { t: '<span class="term-warn">[!] encontrados 47 procesos automatizables</span>', d: 200 },
    { t: '' },
    { t: '<span class="term-prompt">kemba@core</span>:~$ deploy --plan growth' },
    { t: '<span class="term-out">→ desplegando agentes IA....... <span class="term-ok">OK</span></span>', d: 300 },
    { t: '<span class="term-out">→ conectando marketing stack... <span class="term-ok">OK</span></span>', d: 300 },
    { t: '<span class="term-out">→ activando dashboard tiempo real... <span class="term-ok">OK</span></span>', d: 300 },
    { t: '' },
    { t: '<span class="term-ok">✓ sistema online — la serpiente está despierta.</span>', d: 200 },
    { t: '<span class="term-prompt">kemba@core</span>:~$ <span class="term-cursor"></span>', d: 0, keep: true }
  ];

  let idx = 0;
  const next = () => {
    if (idx >= lines.length) return;
    const line = lines[idx];
    const div = document.createElement('span');
    div.className = 'term-line';
    div.innerHTML = line.t || '&nbsp;';
    el.appendChild(div);
    idx++;
    setTimeout(next, line.d != null ? line.d : 180);
  };
  setTimeout(next, 400);
})();

/* -------- 2. SCROLL SNAKE — pixel snake along left margin -------- */
(() => {
  const container = document.getElementById('scroll-snake');
  const food = document.getElementById('snake-food');
  if (!container) return;

  const SEG_COUNT = 12;
  const SEG_SIZE = 16;
  const GAP = 4;

  // Build segments
  const segs = [];
  for (let i = 0; i < SEG_COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'snake-seg' + (i === 0 ? ' head' : '');
    container.appendChild(s);
    segs.push(s);
  }

  // Position queue — head follows scroll, tail trails
  const positions = new Array(SEG_COUNT).fill(0);
  let foodY = 50;

  const update = () => {
    const scrollPct = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight));
    const targetY = 80 + scrollPct * (window.innerHeight - 200);

    // shift queue
    positions.unshift(targetY);
    positions.pop();

    segs.forEach((s, i) => {
      s.style.top = (positions[i] - i * (SEG_SIZE + GAP) * 0.4) + 'px';
    });

    // food positioning — reset when "eaten"
    if (food) {
      const headY = positions[0];
      if (Math.abs(headY - foodY) < 12) {
        foodY = 80 + Math.random() * (window.innerHeight - 200);
        food.style.top = foodY + 'px';
      }
    }
  };

  // Initial food placement
  if (food) {
    foodY = 80 + Math.random() * (window.innerHeight - 200);
    food.style.top = foodY + 'px';
  }

  let raf;
  const tick = () => {
    update();
    raf = requestAnimationFrame(tick);
  };
  tick();
})();

/* -------- 3. DEMO TERMINAL — interactive command runner -------- */
(() => {
  const body = document.getElementById('demo-term-body');
  const cmds = document.getElementById('demo-cmds');
  if (!body || !cmds) return;

  const responses = {
    'agent qualify --lead acme': [
      { t: '<span class="term-out">→ fetching lead context...</span>', d: 250 },
      { t: '<span class="term-out">→ analyzing website, linkedin, recent activity...</span>', d: 400 },
      { t: '<span class="term-out">→ scoring against ICP model v2.1...</span>', d: 300 },
      { t: '' },
      { t: '<span class="term-ok">┌─────────────────────────────────────┐</span>' },
      { t: '<span class="term-ok">│ LEAD SCORE   ████████░░  84/100     │</span>' },
      { t: '<span class="term-ok">│ FIT          ENTERPRISE / SAAS      │</span>' },
      { t: '<span class="term-ok">│ INTENT       HIGH (visited /pricing) │</span>' },
      { t: '<span class="term-ok">│ NEXT         demo scheduled · 24h    │</span>' },
      { t: '<span class="term-ok">└─────────────────────────────────────┘</span>' },
      { t: '<span class="term-warn">[!] routed to AE: María R.</span>' }
    ],
    'campaign run blackfriday': [
      { t: '<span class="term-out">→ loading audience segments...</span>', d: 250 },
      { t: '<span class="term-out">→ 12,847 contacts identified</span>', d: 200 },
      { t: '<span class="term-out">→ generating personalized variants (claude-3.5)...</span>', d: 500 },
      { t: '<span class="term-out">→ A/B test: 4 subject lines</span>', d: 300 },
      { t: '<span class="term-out">→ scheduled send: lun 10:00 / mar 14:00</span>', d: 200 },
      { t: '' },
      { t: '<span class="term-ok">✓ campaña lista · 12,847 emails · proyección 23% open · 4.1% click</span>' },
      { t: '<span class="term-warn">[?] aprobar envío? (auto-aprueba en 2h)</span>' }
    ],
    'report weekly': [
      { t: '<span class="term-out">→ aggregating week of 2026-05-21 → 2026-05-27</span>', d: 300 },
      { t: '' },
      { t: '<span class="term-ok">┌── WEEKLY OPS REPORT ────────────────┐</span>' },
      { t: '<span class="term-ok">│ leads in:        1,284  (↑ 18%)     │</span>' },
      { t: '<span class="term-ok">│ qualified:         412  (↑ 22%)     │</span>' },
      { t: '<span class="term-ok">│ demos booked:       89  (↑ 11%)     │</span>' },
      { t: '<span class="term-ok">│ deals closed:       23  (↑ 8%)      │</span>' },
      { t: '<span class="term-ok">│ revenue:        $187k  (↑ 14%)      │</span>' },
      { t: '<span class="term-ok">│ time saved:       127h  by agents   │</span>' },
      { t: '<span class="term-ok">└─────────────────────────────────────┘</span>' },
      { t: '<span class="term-warn">[!] anomaly: drop-off en /checkout step 3 (-9%)</span>' }
    ],
    'connect hubspot': [
      { t: '<span class="term-out">→ initializing oauth flow...</span>', d: 300 },
      { t: '<span class="term-out">→ verifying api scopes: contacts, deals, marketing</span>', d: 300 },
      { t: '<span class="term-out">→ syncing 4,218 contacts...</span>', d: 500 },
      { t: '<span class="term-out">→ mapping custom properties...</span>', d: 300 },
      { t: '<span class="term-ok">✓ hubspot conectado · sync activo cada 5 min</span>' },
      { t: '<span class="term-comment">// tip: usá `agent qualify` para empezar a calificar leads</span>' }
    ],
    'help': [
      { t: '<span class="term-out">comandos disponibles:</span>' },
      { t: '<span class="term-out">  agent qualify --lead &lt;name&gt;   califica un lead con IA</span>' },
      { t: '<span class="term-out">  campaign run &lt;name&gt;          ejecuta campaña marketing</span>' },
      { t: '<span class="term-out">  report &lt;period&gt;              genera reporte</span>' },
      { t: '<span class="term-out">  connect &lt;tool&gt;               conecta una herramienta</span>' },
      { t: '<span class="term-out">  clear                          limpia terminal</span>' },
      { t: '<span class="term-comment">// esto es una demo. la versión real tiene 80+ comandos.</span>' }
    ],
    'clear': 'CLEAR'
  };

  const append = (html, opts = {}) => {
    const span = document.createElement('span');
    span.className = 'term-line';
    span.innerHTML = html;
    body.appendChild(span);
    body.scrollTop = body.scrollHeight;
  };

  const setCursor = () => {
    // remove old cursor if any
    const cur = body.querySelector('.live-cursor');
    if (cur) cur.remove();
    const span = document.createElement('span');
    span.className = 'term-line live-cursor';
    span.innerHTML = '<span class="term-prompt">kemba@agent</span>:~$ <span class="term-cursor"></span>';
    body.appendChild(span);
    body.scrollTop = body.scrollHeight;
  };

  const runCommand = (cmd) => {
    // remove cursor
    const cur = body.querySelector('.live-cursor');
    if (cur) cur.remove();
    // echo
    append(`<span class="term-prompt">kemba@agent</span>:~$ ${cmd}`);

    const response = responses[cmd];
    if (response === 'CLEAR') {
      body.innerHTML = '';
      bootDemo();
      return;
    }
    if (!response) {
      setTimeout(() => {
        append(`<span class="term-warn">command not found: ${cmd}</span>`);
        append('<span class="term-comment">// type `help` to see available commands</span>');
        setCursor();
      }, 200);
      return;
    }

    let i = 0;
    const playNext = () => {
      if (i >= response.length) {
        setCursor();
        return;
      }
      const line = response[i];
      append(line.t || '&nbsp;');
      i++;
      setTimeout(playNext, line.d != null ? line.d : 100);
    };
    setTimeout(playNext, 150);
  };

  const bootDemo = () => {
    const intro = [
      '<span class="term-comment">// kemba agent shell v3.2 — interactive demo</span>',
      '<span class="term-comment">// click any command on the left, or type your own below</span>',
      '&nbsp;'
    ];
    intro.forEach(t => append(t));
    setCursor();
  };

  bootDemo();

  // Wire buttons
  cmds.querySelectorAll('.demo-cmd').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      runCommand(cmd);
    });
  });
})();

/* -------- 4. FAQ accordion -------- */
(() => {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
})();

/* -------- 5. Reveal on scroll -------- */
(() => {
  const els = document.querySelectorAll('.section, .terminal, .case, .plan, .testi, .post');
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

/* -------- 6. Contact form fake submit -------- */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;
    btn.textContent = '✓ ENVIADO — TE CONTACTAMOS EN 24H';
    btn.style.background = '#84cc16';
    btn.style.borderColor = '#84cc16';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3500);
  });
})();
