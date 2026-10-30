/**
 * DIZITALADDA • DIWALI SPECIAL 2026
 * Ultra-Clean Luxury Dark & Gold Mobile Scratch Engine
 * 
 * Features:
 *  - 11 Exclusive Rewards Pool (Exact Repeat Limits)
 *  - High-Entropy Non-Sequential Random Distribution (No Loop)
 *  - Clean 1-Scratch-Per-Device Lockout (localStorage)
 *  - Minimalist 3D Card Flip (Front: Reference Design / Back: Official Voucher Details)
 *  - Touch & Mouse optimized Canvas Scratch
 *  - Subtle Celebratory Fireworks & Audio
 */

(function () {
  'use strict';

  // 11 EXCLUSIVE OFFERS DATA WITH EXACT REPEAT COUNTS
  const OFFERS_DATA = [
    {
      id: 1,
      badge: "CONGRATULATIONS!",
      title: "Corporate Industry Visit",
      desc: "You've Won an Exclusive Corporate Industry Visit + 4,000 Additional Skill Coins!",
      coins: "+4,000 Skill Coins",
      repeatCount: 3,
      icon: "🏢",
      highlight: "Corporate Industry Visit + 4,000 Coins"
    },
    {
      id: 2,
      badge: "AMAZING!",
      title: "AI Automation Special",
      desc: "You've Unlocked 1 Month of Exclusive AI Automation Classes + 1,000 Additional Skill Coins!",
      coins: "+1,000 Skill Coins",
      repeatCount: 7,
      icon: "🤖",
      highlight: "1 Month AI Classes + 1,000 Coins"
    },
    {
      id: 3,
      badge: "YOU'RE A WINNER!",
      title: "AI Certification Reward",
      desc: "You've Won 2,000 Skill Coins + An Exclusive AI Training Certificate!",
      coins: "+2,000 Skill Coins",
      repeatCount: 4,
      icon: "📜",
      highlight: "AI Training Certificate + 2,000 Coins"
    },
    {
      id: 4,
      badge: "CONGRATULATIONS!",
      title: "Expert Program Bonus",
      desc: "You've Unlocked 1 Month of Ad Credits with the Expert Program + 1,500 Skill Coins!",
      coins: "+1,500 Skill Coins",
      repeatCount: 2,
      icon: "📈",
      highlight: "1 Month Ad Credits + 1,500 Coins"
    },
    {
      id: 5,
      badge: "LUCKY YOU!",
      title: "Exclusive Course Fee Deal",
      desc: "You've Unlocked an Exclusive Course Offer!\n• Any Advance Skill Program at Just ₹35,000!\n• Any Expert Skill Program at Just ₹65,000!",
      coins: "Advance ₹35k | Expert ₹65k",
      repeatCount: 1,
      icon: "💎",
      highlight: "Advance Program ₹35,000 / Expert Program ₹65,000"
    },
    {
      id: 6,
      badge: "JACKPOT!",
      title: "AI Automation Bonus",
      desc: "You've Won 3,000 Skill Coins + Exclusive AI Automation Classes!",
      coins: "+3,000 Skill Coins",
      repeatCount: 3,
      icon: "⚡",
      highlight: "AI Automation Classes + 3,000 Coins"
    },
    {
      id: 7,
      badge: "CONGRATULATIONS!",
      title: "Lifetime Learning Support",
      desc: "You've Unlocked 500 Skill Coins + Lifetime Learning & Mentorship Support!",
      coins: "+500 Skill Coins",
      repeatCount: 10,
      icon: "🌟",
      highlight: "Lifetime Learning Support + 500 Coins"
    },
    {
      id: 8,
      badge: "DIWALI SURPRISE!",
      title: "Diwali Gift Hamper",
      desc: "You've Won 1,100 Skill Coins + An Exclusive Diwali Gift Hamper!",
      coins: "+1,100 Skill Coins",
      repeatCount: 8,
      icon: "🪔",
      highlight: "Exclusive Diwali Gift Hamper + 1,100 Coins"
    },
    {
      id: 9,
      badge: "EARN WHILE YOU LEARN!",
      title: "Refer & Earn Reward",
      desc: "You've Unlocked 1,000 Skill Coins + An Opportunity to Earn ₹5,000 Extra Cash by Referring a Friend!",
      coins: "+1,000 Skill Coins & ₹5k Cash",
      repeatCount: 6,
      icon: "🤝",
      highlight: "₹5,000 Cash Referral + 1,000 Coins"
    },
    {
      id: 10,
      badge: "SPECIAL DIWALI WIN!",
      title: "Silver Coin Reward",
      desc: "Congratulations! You've Unlocked an Exclusive Silver Coin!",
      coins: "Pure Silver Coin",
      repeatCount: 2,
      icon: "🪙",
      highlight: "Exclusive DizitalAdda Silver Coin"
    },
    {
      id: 11,
      badge: "MEGA DIWALI JACKPOT!",
      title: "Silver Coin + AI Bonus",
      desc: "Amazing! You've Won an Exclusive Silver Coin + 1 Month of Complimentary AI Automation Classes!",
      coins: "Silver Coin + 1 Month AI Classes",
      repeatCount: 2,
      icon: "👑",
      highlight: "Silver Coin + 1 Month AI Classes"
    }
  ];

  const STORAGE_KEY_CLAIM = 'dizitaladda_diwali_claim_2026';
  const STORAGE_KEY_POOL = 'dizitaladda_diwali_pool_2026';
  const CLAIM_DEADLINE = '5th November 2026';

  // State
  let isCardFlipped = false;
  let isScratching = false;
  let hasScratched = false;
  let assignedOffer = null;
  let currentCardId = null;

  // Canvas
  let canvas, ctx;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let lastScratchX = null;
  let lastScratchY = null;
  let scratchCheckThrottle = 0;

  // DOM Elements
  const card3D = document.getElementById('scratch-card-3d');
  const rewardBadge = document.getElementById('reward-badge');
  const rewardIcon = document.getElementById('reward-icon');
  const rewardTitle = document.getElementById('reward-title');
  const rewardDesc = document.getElementById('reward-desc');
  const rewardCoinVal = document.getElementById('reward-coin-val');
  const frontCardId = document.getElementById('front-card-id');

  const scratchCanvasContainer = document.getElementById('scratch-canvas-container');
  const scratchPadContent = document.getElementById('scratch-pad-content');
  const actionDock = document.getElementById('action-dock');
  const claimWhatsappBtn = document.getElementById('claim-whatsapp-btn');
  const toggleFlipBtn = document.getElementById('toggle-flip-btn');
  const flipBackBtn = document.getElementById('flip-back-btn');

  // Back elements
  const backScratchId = document.getElementById('back-scratch-id');
  const backBenefitTitle = document.getElementById('back-benefit-title');
  const backDeadline = document.getElementById('back-deadline');
  const copyCardIdBtn = document.getElementById('copy-card-id-btn');
  const adminDemoReset = document.getElementById('admin-demo-reset');
  const toastBubble = document.getElementById('toast-bubble');

  // Web Audio Context
  let audioCtx = null;

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initFireworks();
    checkDeviceClaimStatus();
    setupEventListeners();
  });

  // ==========================================================================
  // INVENTORY POOL & RANDOMIZATION LOGIC (NO PREDICTABLE LOOP)
  // ==========================================================================
  function getOrCreateInventoryPool() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_POOL);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Storage pool read error:", e);
    }

    // Build fresh inventory array: 48 items
    const pool = [];
    OFFERS_DATA.forEach(offer => {
      for (let i = 0; i < offer.repeatCount; i++) {
        pool.push(offer.id);
      }
    });

    // Fisher-Yates high-entropy shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pool[i];
      pool[i] = pool[j];
      pool[j] = temp;
    }

    saveInventoryPool(pool);
    return pool;
  }

  function saveInventoryPool(pool) {
    try {
      localStorage.setItem(STORAGE_KEY_POOL, JSON.stringify(pool));
    } catch (e) {
      console.warn("Storage pool write error:", e);
    }
  }

  function drawRandomOffer() {
    const pool = getOrCreateInventoryPool();
    if (pool.length === 0) {
      const fresh = getOrCreateInventoryPool();
      return drawRandomOffer();
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenId = pool[randomIndex];

    // Remove to respect repeat quota
    pool.splice(randomIndex, 1);
    saveInventoryPool(pool);

    return OFFERS_DATA.find(o => o.id === chosenId) || OFFERS_DATA[0];
  }

  function generateCardId() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const p1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const p2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `DA-DW26-${p1}-${p2}`;
  }

  // ==========================================================================
  // 1-SCRATCH-PER-DEVICE LOCKOUT
  // ==========================================================================
  function checkDeviceClaimStatus() {
    let savedClaim = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLAIM);
      if (raw) savedClaim = JSON.parse(raw);
    } catch (e) {
      console.warn("Storage claim read error:", e);
    }

    if (savedClaim && savedClaim.claimed) {
      // Device has already scratched
      hasScratched = true;
      assignedOffer = OFFERS_DATA.find(o => o.id === savedClaim.offerId) || OFFERS_DATA[0];
      currentCardId = savedClaim.cardId || generateCardId();
      renderClaimedView();
    } else {
      // First visit on this device: Prepare fresh scratch card
      hasScratched = false;
      currentCardId = generateCardId();
      assignedOffer = drawRandomOffer();
      renderFreshView();
    }
  }

  function renderFreshView() {
    populateOfferInfo(assignedOffer, currentCardId);
    initScratchCanvas();
    actionDock.style.display = 'none';
  }

  function renderClaimedView() {
    populateOfferInfo(assignedOffer, currentCardId);
    if (scratchCanvasContainer) {
      scratchCanvasContainer.classList.add('hidden');
    }
    actionDock.style.display = 'grid';
  }

  function populateOfferInfo(offer, cardId) {
    rewardBadge.textContent = offer.badge;
    rewardIcon.textContent = offer.icon;
    rewardTitle.textContent = offer.title;
    rewardDesc.textContent = offer.desc;
    rewardCoinVal.textContent = offer.coins;
    frontCardId.textContent = cardId;

    backScratchId.textContent = cardId;
    backBenefitTitle.textContent = `${offer.title} (${offer.coins})`;
    backDeadline.textContent = CLAIM_DEADLINE;
  }

  // ==========================================================================
  // CANVAS SCRATCH SURFACE (Soft Matte Gold Foil)
  // ==========================================================================
  function initScratchCanvas() {
    canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    const container = scratchCanvasContainer;
    const rect = container.getBoundingClientRect();
    canvasWidth = Math.round(rect.width || container.offsetWidth || 360);
    canvasHeight = Math.round(rect.height || container.offsetHeight || 190);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    drawMatteGoldFoil(ctx, canvasWidth, canvasHeight);
    setupScratchEvents();
  }

  function drawMatteGoldFoil(ctx, w, h) {
    ctx.save();

    // Soft Matte Luxury Gold Foil
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, '#d8b066');
    goldGrad.addColorStop(0.35, '#cda255');
    goldGrad.addColorStop(0.7, '#be9246');
    goldGrad.addColorStop(1, '#d8b066');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle metallic highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(0, 0, w, h * 0.4);

    ctx.restore();
  }

  function setupScratchEvents() {
    isScratching = false;

    // Mouse
    canvas.addEventListener('mousedown', startScratch);
    window.addEventListener('mousemove', scratchMove);
    window.addEventListener('mouseup', stopScratch);

    // Touch (Mobile Finger)
    canvas.addEventListener('touchstart', startScratchTouch, { passive: false });
    window.addEventListener('touchmove', scratchMoveTouch, { passive: false });
    window.addEventListener('touchend', stopScratchTouch);
  }

  function startScratch(e) {
    if (hasScratched) return;
    isScratching = true;
    lastScratchX = null;
    lastScratchY = null;
    scratchPadContent.classList.add('fade');
    playScratchSound();
    scratchAt(e.clientX, e.clientY);
  }

  function scratchMove(e) {
    if (!isScratching || hasScratched) return;
    scratchAt(e.clientX, e.clientY);
  }

  function stopScratch() {
    isScratching = false;
    lastScratchX = null;
    lastScratchY = null;
  }

  function startScratchTouch(e) {
    if (hasScratched) return;
    e.preventDefault();
    isScratching = true;
    lastScratchX = null;
    lastScratchY = null;
    scratchPadContent.classList.add('fade');
    playScratchSound();
    const touch = e.touches[0];
    scratchAt(touch.clientX, touch.clientY);
  }

  function scratchMoveTouch(e) {
    if (!isScratching || hasScratched) return;
    e.preventDefault();
    const touch = e.touches[0];
    scratchAt(touch.clientX, touch.clientY);
  }

  function stopScratchTouch() {
    isScratching = false;
    lastScratchX = null;
    lastScratchY = null;
  }

  function scratchAt(clientX, clientY) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    if (lastScratchX !== null && lastScratchY !== null) {
      ctx.beginPath();
      ctx.moveTo(lastScratchX, lastScratchY);
      ctx.lineTo(x, y);
      ctx.lineWidth = 50;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2, false);
      ctx.fill();
    }

    lastScratchX = x;
    lastScratchY = y;
    ctx.restore();

    if (Math.random() < 0.25) {
      playScratchSound();
    }

    scratchCheckThrottle++;
    if (scratchCheckThrottle % 6 === 0) {
      checkProgress();
    }
  }

  function checkProgress() {
    if (hasScratched) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const imgData = ctx.getImageData(0, 0, canvasWidth * dpr, canvasHeight * dpr);
      const pixels = imgData.data;
      let clear = 0;
      const step = 16;
      const total = pixels.length / step;

      for (let i = 3; i < pixels.length; i += step) {
        if (pixels[i] < 128) clear++;
      }

      const percent = Math.round((clear / total) * 100);
      if (percent >= 42) {
        completeScratch();
      }
    } catch (e) {
      // ignore
    }
  }

  function completeScratch() {
    if (hasScratched) return;
    hasScratched = true;

    scratchCanvasContainer.classList.add('hidden');
    actionDock.style.display = 'grid';

    // Lock to device in localStorage
    try {
      localStorage.setItem(STORAGE_KEY_CLAIM, JSON.stringify({
        claimed: true,
        cardId: currentCardId,
        offerId: assignedOffer.id,
        claimedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.warn("Storage save error:", e);
    }

    playFanfare();
    launchFireworks();
    showToast(`🎉 Reward Unlocked: ${assignedOffer.title}`);
  }

  // ==========================================================================
  // WEB AUDIO (No external MP3 needed)
  // ==========================================================================
  function initAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }

  function resumeAudio() {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playScratchSound() {
    if (!audioCtx) return;
    resumeAudio();
    try {
      const len = audioCtx.sampleRate * 0.04;
      const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1;
      }
      const src = audioCtx.createBufferSource();
      src.buffer = buf;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1600;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      src.start();
    } catch (e) {}
  }

  function playFanfare() {
    if (!audioCtx) return;
    resumeAudio();
    try {
      const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6 celebratory chord
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.55);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.1);
        osc.stop(audioCtx.currentTime + idx * 0.1 + 0.6);
      });
    } catch (e) {}
  }

  // ==========================================================================
  // CELEBRATION FIREWORKS
  // ==========================================================================
  let fwCanvas, fwCtx;
  let particles = [];

  function initFireworks() {
    fwCanvas = document.getElementById('celebration-canvas');
    if (!fwCanvas) return;
    fwCtx = fwCanvas.getContext('2d');
    resizeFw();
    window.addEventListener('resize', resizeFw);
    requestAnimationFrame(renderFw);
  }

  function resizeFw() {
    if (!fwCanvas) return;
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }

  function launchFireworks() {
    const colors = ['#d8ad62', '#ebd090', '#ffffff', '#25d366', '#ff9900'];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 3 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012
      });
    }
  }

  function renderFw() {
    if (fwCtx) {
      fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.16; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        fwCtx.save();
        fwCtx.globalAlpha = p.alpha;
        fwCtx.fillStyle = p.color;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fwCtx.fill();
        fwCtx.restore();
      }
    }
    requestAnimationFrame(renderFw);
  }

  // ==========================================================================
  // CARD FLIP & ACTIONS
  // ==========================================================================
  function flipCard() {
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
      card3D.classList.add('flipped');
      toggleFlipBtn.innerHTML = `<span>🔄</span> View Card Front`;
    } else {
      card3D.classList.remove('flipped');
      toggleFlipBtn.innerHTML = `<span>🔄</span> View Card Details / T&amp;C`;
    }
  }

  function setupEventListeners() {
    toggleFlipBtn.addEventListener('click', flipCard);
    flipBackBtn.addEventListener('click', flipCard);

    // Copy Card ID
    copyCardIdBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentCardId).then(() => {
          showToast(`Copied: ${currentCardId}`);
        }).catch(() => fallbackCopy(currentCardId));
      } else {
        fallbackCopy(currentCardId);
      }
    });

    // WhatsApp Claim
    claimWhatsappBtn.addEventListener('click', () => {
      const text = `🪔 *DIZITALADDA • DIWALI SPECIAL 2026*\n\n` +
        `Hello Team, I have scratched my card and won an exclusive reward!\n\n` +
        `🎁 *Reward Won:* ${assignedOffer.title}\n` +
        `🪙 *Benefit:* ${assignedOffer.coins}\n` +
        `🔑 *Unique Card ID:* ${currentCardId}\n` +
        `⏳ *Valid Till:* ${CLAIM_DEADLINE}\n\n` +
        `Please verify and register this to my admission profile. Thank you!`;

      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    });

    // Admin Demo Reset
    adminDemoReset.addEventListener('click', () => {
      if (confirm("Reset device scratch status for testing?")) {
        localStorage.removeItem(STORAGE_KEY_CLAIM);
        showToast("Device reset! Reloading...");
        setTimeout(() => window.location.reload(), 500);
      }
    });
  }

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`Copied: ${text}`);
  }

  function showToast(msg) {
    if (!toastBubble) return;
    toastBubble.textContent = msg;
    toastBubble.classList.add('show');
    setTimeout(() => {
      toastBubble.classList.remove('show');
    }, 2600);
  }

})();
