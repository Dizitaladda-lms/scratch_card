/**
 * DIZITALADDA – DIWALI SCRATCH & WIN 2026
 * Mobile Scratch Card Engine
 * Features:
 *  - 11 Festive Offers with exact inventory repetitions
 *  - True Randomized Pool Distribution (no sequential or predictable loop)
 *  - Strict 1-Scratch-Per-Device Lockout via localStorage
 *  - Interactive 3D Card Flip (Front: Scratch & Reward, Back: Official Voucher Details)
 *  - Touch & Mouse optimized Canvas Scratch with transparent pixel detection
 *  - Diwali Web Audio API Sound Effects (Scratch sound & Celebration Fanfare)
 *  - Fireworks & Confetti celebration engine
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & 11 EXCLUSIVE OFFERS DATA
  // ==========================================================================
  const OFFERS_DATA = [
    {
      id: 1,
      badge: "CONGRATULATIONS!",
      title: "Corporate Industry Visit",
      desc: "You've Won an Exclusive Corporate Industry Visit + 4,000 Additional Skill Coins!",
      coins: "+4,000 Skill Coins",
      repeatCount: 3,
      icon: "🏢",
      highlight: "Exclusive Corporate Industry Visit + 4,000 Coins"
    },
    {
      id: 2,
      badge: "AMAZING!",
      title: "AI Automation Special",
      desc: "You've Unlocked 1 Month of Exclusive AI Automation Classes + 1,000 Additional Skill Coins!",
      coins: "+1,000 Skill Coins",
      repeatCount: 7,
      icon: "🤖",
      highlight: "1 Month AI Automation Classes + 1,000 Coins"
    },
    {
      id: 3,
      badge: "YOU'RE A WINNER!",
      title: "AI Certification Reward",
      desc: "You've Won 2,000 Skill Coins + An Exclusive AI Training Certificate!",
      coins: "+2,000 Skill Coins",
      repeatCount: 4,
      icon: "📜",
      highlight: "Exclusive AI Training Certificate + 2,000 Coins"
    },
    {
      id: 4,
      badge: "CONGRATULATIONS!",
      title: "Expert Program Bonus",
      desc: "You've Unlocked 1 Month of Ad Credits with the Expert Program + 1,500 Skill Coins!",
      coins: "+1,500 Skill Coins",
      repeatCount: 2,
      icon: "📈",
      highlight: "1 Month Ad Credits (Expert Program) + 1,500 Coins"
    },
    {
      id: 5,
      badge: "LUCKY YOU!",
      title: "Exclusive Course Fee Deal",
      desc: "You've Unlocked an Exclusive Course Offer!\n• Any Advance Skill Program at Just ₹35,000!\n• Any Expert Skill Program at Just ₹65,000!",
      coins: "Mega Fee Discount",
      repeatCount: 1,
      icon: "💎",
      highlight: "Advance Program ₹35,000 | Expert Program ₹65,000"
    },
    {
      id: 6,
      badge: "JACKPOT!",
      title: "AI Automation Bonus",
      desc: "You've Won 3,000 Skill Coins + Exclusive AI Automation Classes!",
      coins: "+3,000 Skill Coins",
      repeatCount: 3,
      icon: "⚡",
      highlight: "Exclusive AI Classes + 3,000 Skill Coins"
    },
    {
      id: 7,
      badge: "CONGRATULATIONS!",
      title: "Lifetime Learning Support",
      desc: "You've Unlocked 500 Skill Coins + Lifetime Learning & Mentorship Support!",
      coins: "+500 Skill Coins",
      repeatCount: 10,
      icon: "🌟",
      highlight: "Lifetime Learning & Mentorship + 500 Coins"
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
      coins: "+1,000 Skill Coins & ₹5k Opportunity",
      repeatCount: 6,
      icon: "🤝",
      highlight: "₹5,000 Cash Referral Bonus + 1,000 Coins"
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
      coins: "Silver Coin + AI Classes",
      repeatCount: 2,
      icon: "👑",
      highlight: "Exclusive Silver Coin + 1 Month AI Classes"
    }
  ];

  const STORAGE_KEY_CLAIM = 'dizitaladda_diwali_claim_2026';
  const STORAGE_KEY_POOL = 'dizitaladda_diwali_pool_2026';
  const STORAGE_KEY_STUDENT = 'dizitaladda_diwali_student_2026';
  const DEFAULT_CLAIM_DEADLINE = '20th November 2026';

  // App State
  let soundEnabled = true;
  let isCardFlipped = false;
  let isScratching = false;
  let hasScratched = false;
  let assignedOffer = null;
  let currentCardId = null;
  let studentData = {
    name: 'Satya Verma',
    ref: 'ADM-2026-9871'
  };

  // Canvas elements
  let canvas, ctx;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let scratchPercent = 0;
  let scratchCheckThrottle = 0;

  // Web Audio Context for synthesize festive audio
  let audioCtx = null;

  // DOM Elements
  const card3D = document.getElementById('scratch-card-3d');
  const cardFront = document.getElementById('card-front');
  const cardBack = document.getElementById('card-back');
  const cardFlipToggle = document.getElementById('card-flip-toggle');
  const frontFlipHint = document.getElementById('front-flip-hint');
  const backFlipTriggerBtn = document.getElementById('back-flip-trigger-btn');
  const flipCardActionBtn = document.getElementById('flip-card-action-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');

  // Student elements
  const dispStudentName = document.getElementById('disp-student-name');
  const editStudentBtn = document.getElementById('edit-student-btn');
  const studentModal = document.getElementById('student-modal');
  const studentForm = document.getElementById('student-form');
  const inputStudentName = document.getElementById('input-student-name');
  const inputAdmissionRef = document.getElementById('input-admission-ref');

  // Reward display elements
  const rewardBadge = document.getElementById('reward-badge');
  const rewardIcon = document.getElementById('reward-icon');
  const rewardTitle = document.getElementById('reward-title');
  const rewardDesc = document.getElementById('reward-desc');
  const rewardCoinsVal = document.getElementById('reward-coins-val');
  const claimedStamp = document.getElementById('claimed-stamp');
  const stampDate = document.getElementById('stamp-date');
  const previewCardId = document.getElementById('preview-card-id');
  const scratchInstruction = document.getElementById('scratch-instruction');
  const scratchCanvasContainer = document.getElementById('scratch-canvas-container');
  const revealedActions = document.getElementById('revealed-actions');
  const scratchStatusNote = document.getElementById('scratch-status-note');
  const deviceLockBanner = document.getElementById('device-lock-banner');

  // Back elements
  const backScratchId = document.getElementById('back-scratch-id');
  const backStudentName = document.getElementById('back-student-name');
  const backAdmissionRef = document.getElementById('back-admission-ref');
  const backWonTitle = document.getElementById('back-won-title');
  const backLastDate = document.getElementById('back-last-date');
  const copyIdBtn = document.getElementById('copy-id-btn');

  // Actions & Modals
  const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
  const downloadVoucherBtn = document.getElementById('download-voucher-btn');
  const openCatalogueBtn = document.getElementById('open-catalogue-btn');
  const closeCatalogueBtn = document.getElementById('close-catalogue-btn');
  const catCloseBtn = document.getElementById('cat-close-btn');
  const catalogueModal = document.getElementById('catalogue-modal');
  const catalogueList = document.getElementById('catalogue-list');
  const adminResetBtn = document.getElementById('admin-reset-btn');
  const toastNotification = document.getElementById('toast-notification');

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    loadStudentData();
    initAudio();
    initFireworks();
    checkDeviceClaimStatus();
    setupEventListeners();
    renderCatalogue();
  });

  // ==========================================================================
  // STUDENT DATA MANAGEMENT
  // ==========================================================================
  function loadStudentData() {
    try {
      const savedStudent = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (savedStudent) {
        studentData = JSON.parse(savedStudent);
      }
    } catch (e) {
      console.warn("Storage access restricted or unavailable:", e);
    }
    updateStudentDisplay();
  }

  function saveStudentData(name, ref) {
    studentData = {
      name: name.trim() || 'Valued Student',
      ref: ref.trim() || 'ADM-2026-FESTIVE'
    };
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(studentData));
    } catch (e) {
      console.warn("Could not save student data:", e);
    }
    updateStudentDisplay();
  }

  function updateStudentDisplay() {
    dispStudentName.textContent = `${studentData.name} (${studentData.ref})`;
    backStudentName.textContent = studentData.name;
    backAdmissionRef.textContent = studentData.ref;
    inputStudentName.value = studentData.name;
    inputAdmissionRef.value = studentData.ref;
  }

  // ==========================================================================
  // INVENTORY POOL & RANDOM DISTRIBUTION LOGIC
  // "ye nhi ki ak coupan lagta a raha hai ak loop ya coordination ke hisab se"
  // ==========================================================================
  function getOrCreateInventoryPool() {
    try {
      const storedPool = localStorage.getItem(STORAGE_KEY_POOL);
      if (storedPool) {
        const parsed = JSON.parse(storedPool);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Inventory storage read error:", e);
    }

    // Build fresh inventory array with exact repeat counts
    // Offer 1: 3, Offer 2: 7, Offer 3: 4, Offer 4: 2, Offer 5: 1, Offer 6: 3,
    // Offer 7: 10, Offer 8: 8, Offer 9: 6, Offer 10: 2, Offer 11: 2
    const freshPool = [];
    OFFERS_DATA.forEach(offer => {
      for (let i = 0; i < offer.repeatCount; i++) {
        freshPool.push(offer.id);
      }
    });

    // Fisher-Yates shuffle array to prevent any sequential bias
    for (let i = freshPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = freshPool[i];
      freshPool[i] = freshPool[j];
      freshPool[j] = temp;
    }

    saveInventoryPool(freshPool);
    return freshPool;
  }

  function saveInventoryPool(pool) {
    try {
      localStorage.setItem(STORAGE_KEY_POOL, JSON.stringify(pool));
    } catch (e) {
      console.warn("Inventory storage write error:", e);
    }
  }

  /**
   * Draw a truly randomized coupon from remaining pool
   */
  function drawRandomOffer() {
    const pool = getOrCreateInventoryPool();
    if (pool.length === 0) {
      // Re-populate pool if exhausted
      const resetPool = getOrCreateInventoryPool();
      return drawRandomOffer();
    }

    // Select random index from current remaining pool
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenOfferId = pool[randomIndex];

    // Remove the chosen card from the pool so repeat limit is strictly respected
    pool.splice(randomIndex, 1);
    saveInventoryPool(pool);

    return OFFERS_DATA.find(o => o.id === chosenOfferId) || OFFERS_DATA[0];
  }

  // Generate Unique Scratch Card ID (e.g. DA-DW26-7824-3912)
  function generateUniqueCardId() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const randPart1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const randPart2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `DA-DW26-${randPart1}-${randPart2}`;
  }

  // ==========================================================================
  // DEVICE RESTRICTION CHECK (1 SCRATCH PER MOBILE DEVICE)
  // "ak coupan ak mobile se ak hi baar stract hoga dubara vo repat nhi hog"
  // ==========================================================================
  function checkDeviceClaimStatus() {
    let savedClaim = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLAIM);
      if (raw) {
        savedClaim = JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Claim storage read error:", e);
    }

    if (savedClaim && savedClaim.claimed) {
      // Device has ALREADY scratched a card!
      hasScratched = true;
      assignedOffer = OFFERS_DATA.find(o => o.id === savedClaim.offerId) || OFFERS_DATA[0];
      currentCardId = savedClaim.cardId || generateUniqueCardId();
      
      if (savedClaim.studentName) {
        studentData.name = savedClaim.studentName;
        studentData.ref = savedClaim.admissionRef;
        updateStudentDisplay();
      }

      renderClaimedState(savedClaim);
    } else {
      // First time on this device: Prepare a fresh card
      prepareFreshCard();
    }
  }

  function prepareFreshCard() {
    hasScratched = false;
    currentCardId = generateUniqueCardId();
    assignedOffer = drawRandomOffer();

    renderOfferCard(assignedOffer, currentCardId);
    initScratchCanvas();

    cardFlipToggle.style.display = 'none';
    revealedActions.style.display = 'none';
    scratchInstruction.classList.remove('fade');
    scratchStatusNote.innerHTML = "✨ Use your finger or touch to scratch off the golden diya foil above!";
    
    deviceLockBanner.innerHTML = `
      <span class="lock-icon">🔒</span>
      <span class="lock-text">1 Scratch Card per Mobile Device • Tamper Protected</span>
    `;
    deviceLockBanner.style.borderColor = 'rgba(255, 153, 0, 0.5)';
  }

  function renderClaimedState(claimData) {
    renderOfferCard(assignedOffer, currentCardId);

    // Hide scratch canvas
    if (scratchCanvasContainer) {
      scratchCanvasContainer.classList.add('hidden');
    }

    // Show claimed stamp
    claimedStamp.classList.add('visible');
    const claimDate = claimData.claimedAt ? new Date(claimData.claimedAt).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    }) : 'CLAIMED';
    stampDate.textContent = `ON ${claimDate.toUpperCase()}`;

    // Enable flip buttons and share actions
    cardFlipToggle.style.display = 'inline-flex';
    revealedActions.style.display = 'grid';
    
    scratchStatusNote.innerHTML = `
      <strong style="color:#ffd700;">✅ Card Already Claimed on this Device:</strong><br>
      Your reward is locked with Unique ID: <strong>${currentCardId}</strong>. Flip to see full voucher details!
    `;

    deviceLockBanner.innerHTML = `
      <span class="lock-icon">🔒</span>
      <span class="lock-text">Reward Claimed &amp; Locked to this Mobile Device</span>
    `;
    deviceLockBanner.style.borderColor = '#25d366';
  }

  function renderOfferCard(offer, cardId) {
    rewardBadge.textContent = offer.badge;
    rewardIcon.textContent = offer.icon;
    rewardTitle.textContent = offer.title;
    rewardDesc.textContent = offer.desc;
    rewardCoinsVal.textContent = offer.coins;
    
    previewCardId.textContent = `ID: ${cardId}`;
    backScratchId.textContent = cardId;
    backWonTitle.textContent = `${offer.title} (${offer.coins})`;
    backLastDate.textContent = DEFAULT_CLAIM_DEADLINE;
  }

  // ==========================================================================
  // CANVAS SCRATCH SURFACE IMPLEMENTATION
  // ==========================================================================
  function initScratchCanvas() {
    canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    const container = scratchCanvasContainer;
    const rect = container.getBoundingClientRect();
    canvasWidth = Math.round(rect.width || container.offsetWidth || 340);
    canvasHeight = Math.round(rect.height || container.offsetHeight || 380);

    // Support High-DPI Mobile Screens (Retina / OLED)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    drawGoldenFestiveFoil(ctx, canvasWidth, canvasHeight);

    // Attach Scratch Interaction Listeners
    setupScratchEvents();
  }

  function drawGoldenFestiveFoil(ctx, w, h) {
    ctx.save();

    // Base Rich Festive Gold Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, '#ffd700');
    goldGrad.addColorStop(0.25, '#ffe57f');
    goldGrad.addColorStop(0.5, '#d4af37');
    goldGrad.addColorStop(0.75, '#b8860b');
    goldGrad.addColorStop(1, '#ffd700');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, w, h);

    // Metallic Diagonal Shimmer Stripes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 14;
    for (let x = -w; x < w * 2; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }

    // Traditional Festive Rangoli / Mandala Pattern in Center
    ctx.fillStyle = 'rgba(100, 10, 30, 0.12)';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 70, 0, Math.PI * 2);
    ctx.fill();

    // Golden Border Frame Inside Canvas
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.7)';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.restore();
  }

  function setupScratchEvents() {
    isScratching = false;

    // Mouse Events
    canvas.addEventListener('mousedown', startScratch);
    window.addEventListener('mousemove', scratchMove);
    window.addEventListener('mouseup', stopScratch);

    // Touch Events (Mobile Finger Touch)
    canvas.addEventListener('touchstart', startScratchTouch, { passive: false });
    window.addEventListener('touchmove', scratchMoveTouch, { passive: false });
    window.addEventListener('touchend', stopScratchTouch);
  }

  function startScratch(e) {
    if (hasScratched) return;
    isScratching = true;
    lastScratchX = null;
    lastScratchY = null;
    scratchInstruction.classList.add('fade');
    playScratchSound();
    scratchAt(e.clientX, e.clientY);
  }

  function scratchMove(e) {
    if (!isScratching || hasScratched) return;
    scratchAt(e.clientX, e.clientY);
  }

  let lastScratchX = null;
  let lastScratchY = null;

  function stopScratch() {
    isScratching = false;
    lastScratchX = null;
    lastScratchY = null;
  }

  function startScratchTouch(e) {
    if (hasScratched) return;
    e.preventDefault(); // Stop mobile pull-to-refresh or page dragging!
    isScratching = true;
    scratchInstruction.classList.add('fade');
    playScratchSound();
    const touch = e.touches[0];
    lastScratchX = null;
    lastScratchY = null;
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
    // 'destination-out' erases the pixels to reveal what's underneath!
    ctx.globalCompositeOperation = 'destination-out';

    if (lastScratchX !== null && lastScratchY !== null) {
      ctx.beginPath();
      ctx.moveTo(lastScratchX, lastScratchY);
      ctx.lineTo(x, y);
      ctx.lineWidth = 54;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else {
      ctx.beginPath();
      // Brush radius of 27px for smooth scratching on mobile screens
      ctx.arc(x, y, 27, 0, Math.PI * 2, false);
      ctx.fill();
    }

    lastScratchX = x;
    lastScratchY = y;
    ctx.restore();

    // Periodically play scratch friction sound
    if (Math.random() < 0.3) {
      playScratchSound();
    }

    // Check scratch progress throttled every 6 strokes
    scratchCheckThrottle++;
    if (scratchCheckThrottle % 6 === 0) {
      checkScratchPercentage();
    }
  }

  /**
   * Calculates the percentage of canvas that has been cleared
   */
  function checkScratchPercentage() {
    if (hasScratched) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const imgData = ctx.getImageData(0, 0, canvasWidth * dpr, canvasHeight * dpr);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalSampled = pixels.length / 16; // Sample every 4th pixel for high mobile performance

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) { // Alpha channel < 128 considered transparent
          transparentCount++;
        }
      }

      scratchPercent = Math.round((transparentCount / totalSampled) * 100);

      // If user has scratched 45% or more, automatically reveal with celebration!
      if (scratchPercent >= 45) {
        revealFullReward();
      }
    } catch (err) {
      console.warn("Pixel check error:", err);
    }
  }

  /**
   * Complete the reveal, trigger victory fanfare, fireworks and lock to device
   */
  function revealFullReward() {
    if (hasScratched) return;
    hasScratched = true;

    // Smoothly fade out the canvas
    scratchCanvasContainer.classList.add('hidden');

    // Show stamp with today's date
    claimedStamp.classList.add('visible');
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    stampDate.textContent = `ON ${today.toUpperCase()}`;

    // Enable flip buttons and action bar
    cardFlipToggle.style.display = 'inline-flex';
    revealedActions.style.display = 'grid';

    // Update status
    scratchStatusNote.innerHTML = `
      <strong style="color:#ffd700;">🎉 Congratulations!</strong> Reward unlocked and linked to this device!
    `;

    // Permanently persist to localStorage for 1-scratch-per-device rule
    const claimRecord = {
      claimed: true,
      cardId: currentCardId,
      offerId: assignedOffer.id,
      studentName: studentData.name,
      admissionRef: studentData.ref,
      claimedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY_CLAIM, JSON.stringify(claimRecord));
    } catch (e) {
      console.warn("Could not save claim record:", e);
    }

    deviceLockBanner.innerHTML = `
      <span class="lock-icon">🔒</span>
      <span class="lock-text">Reward Claimed &amp; Locked to this Mobile Device</span>
    `;
    deviceLockBanner.style.borderColor = '#25d366';

    // Celebration Audio & Visuals
    playFanfareSound();
    triggerCelebrationFireworks();
    showToast(`🎉 You've unlocked: ${assignedOffer.title}!`);
  }

  // ==========================================================================
  // WEB AUDIO SYNTHESIZER (NO EXTERNAL AUDIO FILES NEEDED)
  // ==========================================================================
  function initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }

  function resumeAudioContext() {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playScratchSound() {
    if (!soundEnabled || !audioCtx) return;
    resumeAudioContext();

    try {
      const bufferSize = audioCtx.sampleRate * 0.05; // 50ms scratch burst
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400 + Math.random() * 600;
      filter.Q.value = 3;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch (e) {
      // Audio fallback fail silently
    }
  }

  function playFanfareSound() {
    if (!soundEnabled || !audioCtx) return;
    resumeAudioContext();

    try {
      // Diwali celebratory musical chime arpeggio: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.12);
        osc.stop(audioCtx.currentTime + idx * 0.12 + 0.65);
      });
    } catch (e) {
      // Silently ignore
    }
  }

  // ==========================================================================
  // FESTIVE CANVAS FIREWORKS & SPARKLE ENGINE
  // ==========================================================================
  let fwCanvas, fwCtx;
  let particles = [];
  let isCelebrating = false;

  function initFireworks() {
    fwCanvas = document.getElementById('fireworks-canvas');
    if (!fwCanvas) return;
    fwCtx = fwCanvas.getContext('2d');

    resizeFwCanvas();
    window.addEventListener('resize', resizeFwCanvas);

    requestAnimationFrame(renderFireworksLoop);
  }

  function resizeFwCanvas() {
    if (!fwCanvas) return;
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }

  function triggerCelebrationFireworks() {
    isCelebrating = true;
    const colors = ['#ffd700', '#ff5100', '#ff0055', '#ffe57f', '#ffffff', '#25d366'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.4;

    // Burst 120 festive particles
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 3.5 + 1.5,
        alpha: 1,
        gravity: 0.18,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    setTimeout(() => {
      isCelebrating = false;
    }, 4000);
  }

  function renderFireworksLoop() {
    if (fwCtx) {
      fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
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
    requestAnimationFrame(renderFireworksLoop);
  }

  // ==========================================================================
  // 3D CARD FLIP HANDLERS
  // ==========================================================================
  function flipCard() {
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
      card3D.classList.add('flipped');
      document.getElementById('flip-btn-text').textContent = 'View Card Front';
    } else {
      card3D.classList.remove('flipped');
      document.getElementById('flip-btn-text').textContent = 'View Card Back';
    }
  }

  // ==========================================================================
  // EVENT LISTENERS & MODAL BINDINGS
  // ==========================================================================
  function setupEventListeners() {
    // Card Flip buttons
    cardFlipToggle.addEventListener('click', flipCard);
    frontFlipHint.addEventListener('click', flipCard);
    backFlipTriggerBtn.addEventListener('click', flipCard);
    flipCardActionBtn.addEventListener('click', flipCard);

    // Sound toggle
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      soundLabel.textContent = soundEnabled ? 'Sound On' : 'Sound Off';
      showToast(soundEnabled ? 'Festive Sounds: ON' : 'Festive Sounds: OFF');
    });

    // Student Edit Modal
    editStudentBtn.addEventListener('click', () => {
      studentModal.style.display = 'flex';
      inputStudentName.focus();
    });

    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveStudentData(inputStudentName.value, inputAdmissionRef.value);
      studentModal.style.display = 'none';
      showToast('Student information updated!');
    });

    // Close modal on background tap
    studentModal.addEventListener('click', (e) => {
      if (e.target === studentModal) {
        studentModal.style.display = 'none';
      }
    });

    // Copy Scratch Card ID
    copyIdBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentCardId).then(() => {
          showToast(`Copied Scratch ID: ${currentCardId}`);
        }).catch(() => {
          fallbackCopyText(currentCardId);
        });
      } else {
        fallbackCopyText(currentCardId);
      }
    });

    // WhatsApp Claim Button
    whatsappShareBtn.addEventListener('click', () => {
      const shareMessage = `🪔 *DIZITALADDA - DIWALI SCRATCH & WIN 2026* 🪔\n\n` +
        `Hello DizitalAdda Team,\nI have scratched and unlocked an exclusive reward!\n\n` +
        `👤 *Student Name:* ${studentData.name}\n` +
        `🎫 *Admission / Mobile Ref:* ${studentData.ref}\n` +
        `🎁 *Reward Won:* ${assignedOffer.title}\n` +
        `🪙 *Benefit:* ${assignedOffer.coins}\n` +
        `🔑 *Unique Scratch ID:* ${currentCardId}\n` +
        `⏳ *Claim Deadline:* ${DEFAULT_CLAIM_DEADLINE}\n\n` +
        `Kindly verify and map this reward to my student profile. Thank you!`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      window.open(whatsappUrl, '_blank');
    });

    // Save Voucher / Print View
    downloadVoucherBtn.addEventListener('click', () => {
      printOrSaveVoucher();
    });

    // Catalogue Modal
    openCatalogueBtn.addEventListener('click', () => {
      catalogueModal.style.display = 'flex';
    });
    closeCatalogueBtn.addEventListener('click', () => {
      catalogueModal.style.display = 'none';
    });
    catCloseBtn.addEventListener('click', () => {
      catalogueModal.style.display = 'none';
    });
    catalogueModal.addEventListener('click', (e) => {
      if (e.target === catalogueModal) {
        catalogueModal.style.display = 'none';
      }
    });

    // Admin Demo Reset Button
    adminResetBtn.addEventListener('click', () => {
      const confirmed = window.confirm(
        "DEMO RESET:\n\nDo you want to reset this mobile device so you can test scratching another card?\n(This clears saved claim state on this device for testing)."
      );
      if (confirmed) {
        localStorage.removeItem(STORAGE_KEY_CLAIM);
        showToast('Device reset for testing! Reloading...');
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied: ${text}`);
  }

  // ==========================================================================
  // RENDER 11 OFFERS CATALOGUE
  // ==========================================================================
  function renderCatalogue() {
    catalogueList.innerHTML = '';
    OFFERS_DATA.forEach(offer => {
      const itemRow = document.createElement('div');
      itemRow.className = 'cat-item-row';
      itemRow.innerHTML = `
        <div class="cat-item-left">
          <span class="cat-item-badge">OFFER ${offer.id} • ${offer.badge}</span>
          <span class="cat-item-name">${offer.icon} ${offer.title}</span>
          <span class="cat-item-details">${offer.highlight}</span>
        </div>
        <div class="cat-item-qty" title="Pool Frequency">
          ${offer.repeatCount}× Repeat
        </div>
      `;
      catalogueList.appendChild(itemRow);
    });
  }

  // ==========================================================================
  // VOUCHER RECEIPT PRINTER / EXPORT
  // ==========================================================================
  function printOrSaveVoucher() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow pop-ups to view printable voucher.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DizitalAdda Diwali Reward Voucher - ${currentCardId}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fdf8f4; color: #2a0512; padding: 30px; }
          .voucher-box { max-width: 550px; margin: 0 auto; border: 3px double #d4af37; border-radius: 14px; padding: 25px; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .voucher-header { text-align: center; border-bottom: 2px solid #ffd700; padding-bottom: 12px; margin-bottom: 15px; }
          .voucher-title { font-size: 22px; font-weight: 800; color: #7c0e35; margin: 0; }
          .sub-title { font-size: 13px; color: #b8860b; font-weight: 600; }
          .code-box { background: #3b0217; color: #ffd700; text-align: center; padding: 12px; border-radius: 8px; font-size: 18px; font-weight: bold; letter-spacing: 2px; margin: 15px 0; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 13.5px; }
          .info-table td { padding: 8px 6px; border-bottom: 1px solid #eee; }
          .info-table td.lbl { font-weight: bold; color: #5c0626; width: 40%; }
          .reward-box { background: #fff6e0; border: 1px solid #ffd700; border-radius: 8px; padding: 12px; margin-bottom: 15px; }
          .reward-title { font-size: 16px; font-weight: bold; color: #b8860b; }
          .reward-desc { font-size: 13px; color: #333; margin-top: 4px; }
          .tc-box { font-size: 10px; color: #666; line-height: 1.4; border-top: 1px dashed #ccc; padding-top: 10px; }
          .stamp { text-align: center; margin-top: 15px; font-weight: bold; color: #25d366; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="voucher-box">
          <div class="voucher-header">
            <h1 class="voucher-title">🪔 DIZITALADDA</h1>
            <div class="sub-title">DIWALI SCRATCH &amp; WIN 2026 OFFICIAL VOUCHER</div>
          </div>

          <div class="code-box">CARD ID: ${currentCardId}</div>

          <table class="info-table">
            <tr><td class="lbl">Student Name:</td><td>${studentData.name}</td></tr>
            <tr><td class="lbl">Admission / Mobile Ref:</td><td>${studentData.ref}</td></tr>
            <tr><td class="lbl">Status:</td><td>VERIFIED &amp; CLAIMED</td></tr>
            <tr><td class="lbl">Last Date to Claim:</td><td><strong>${DEFAULT_CLAIM_DEADLINE}</strong></td></tr>
          </table>

          <div class="reward-box">
            <div class="reward-title">🎁 ${assignedOffer.title}</div>
            <div class="reward-desc">${assignedOffer.desc}</div>
            <div style="margin-top:6px; font-weight:bold; color:#7c0e35;">Skill Coins: ${assignedOffer.coins}</div>
          </div>

          <div class="tc-box">
            <strong>Redemption &amp; Terms:</strong> Present this voucher at DizitalAdda admission desk or official WhatsApp support (+91 98765 43210). Valid across Advance and Expert Skill Programs. Cannot be clubbed with external promos. Strictly 1 scratch card per mobile device. Non-transferable.
          </div>

          <div class="stamp">
            ✓ OFFICIALLY REGISTERED DIWALI 2026 BENEFIT
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }

  // ==========================================================================
  // TOAST NOTIFICATION
  // ==========================================================================
  let toastTimer = null;
  function showToast(msg) {
    if (!toastNotification) return;
    toastNotification.textContent = msg;
    toastNotification.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

})();
