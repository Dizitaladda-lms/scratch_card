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
  const STORAGE_KEY_PENDING = 'dizitaladda_diwali_pending_2026';
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
  // 1-SCRATCH-PER-DEVICE LOCKOUT & SESSION STATE
  // ==========================================================================
  function resetCampaignStorage() {
    try {
      localStorage.removeItem(STORAGE_KEY_CLAIM);
      localStorage.removeItem(STORAGE_KEY_PENDING);
      localStorage.removeItem(STORAGE_KEY_POOL);
    } catch (e) {}
  }

  // Admin console helper
  window.resetDiwaliCampaign = function() {
    resetCampaignStorage();
    window.location.reload();
  };

  function checkDeviceClaimStatus() {
    // Secret URL reset trigger (#reset or ?reset=1)
    if (window.location.hash === '#reset' || window.location.search.includes('reset=1')) {
      resetCampaignStorage();
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    // Check optional forced offer via URL (?offer=1 to 11) for testing
    let urlOffer = null;
    try {
      const params = new URLSearchParams(window.location.search);
      const offParam = parseInt(params.get('offer'), 10);
      if (offParam >= 1 && offParam <= 11) {
        urlOffer = OFFERS_DATA.find(o => o.id === offParam);
      }
    } catch (e) {}

    let savedClaim = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLAIM);
      if (raw) savedClaim = JSON.parse(raw);
    } catch (e) {
      console.warn("Storage claim read error:", e);
    }

    if (savedClaim && savedClaim.claimed) {
      // Device has already scratched - Permanent Lockout
      hasScratched = true;
      assignedOffer = OFFERS_DATA.find(o => o.id === savedClaim.offerId) || OFFERS_DATA[0];
      currentCardId = savedClaim.cardId || generateCardId();
      renderClaimedView();
      return;
    }

    // If an offer is forced via URL parameter
    if (urlOffer) {
      hasScratched = false;
      assignedOffer = urlOffer;
      currentCardId = generateCardId();
      renderFreshView();
      return;
    }

    // Check if device already has a card assigned before scratching
    let savedPending = null;
    try {
      const rawPending = localStorage.getItem(STORAGE_KEY_PENDING);
      if (rawPending) savedPending = JSON.parse(rawPending);
    } catch (e) {}

    if (savedPending && savedPending.offerId && savedPending.cardId) {
      // Resume current assigned card without consuming new inventory
      hasScratched = false;
      assignedOffer = OFFERS_DATA.find(o => o.id === savedPending.offerId) || OFFERS_DATA[0];
      currentCardId = savedPending.cardId;
      renderFreshView();
      return;
    }

    // First visit on this device: Draw fresh card from the 48-item quota pool
    hasScratched = false;
    currentCardId = generateCardId();
    assignedOffer = drawRandomOffer();
    try {
      localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify({
        offerId: assignedOffer.id,
        cardId: currentCardId
      }));
    } catch (e) {}

    renderFreshView();
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

  // ==========================================================================
  // REALISTIC 3D GRAPHIC ICONS FOR ALL 11 OFFERS
  // ==========================================================================
  function getRealisticOfferSvg(offerId) {
    switch (offerId) {
      // Offer 1: Corporate Industry Visit
      case 1:
        return `
          <div class="realistic-reward-icon corporate-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="glass1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#4aa3df"/>
                  <stop offset="50%" stop-color="#1f5882"/>
                  <stop offset="100%" stop-color="#0e2a40"/>
                </linearGradient>
                <linearGradient id="glass2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#64b5f6"/>
                  <stop offset="60%" stop-color="#1976d2"/>
                  <stop offset="100%" stop-color="#0d47a1"/>
                </linearGradient>
                <linearGradient id="goldRoof" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="42" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <rect x="22" y="24" width="24" height="50" rx="3" fill="url(#glass1)" stroke="#d8ad62" stroke-width="0.8"/>
              <line x1="28" y1="28" x2="28" y2="70" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" stroke-dasharray="2 2"/>
              <line x1="34" y1="28" x2="34" y2="70" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" stroke-dasharray="2 2"/>
              <line x1="40" y1="28" x2="40" y2="70" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" stroke-dasharray="2 2"/>
              <polygon points="34,14 26,24 42,24" fill="url(#goldRoof)"/>
              <line x1="34" y1="8" x2="34" y2="14" stroke="#ffea9f" stroke-width="1.5"/>
              <rect x="50" y="16" width="28" height="58" rx="3" fill="url(#glass2)" stroke="#ffea9f" stroke-width="0.8"/>
              <line x1="57" y1="20" x2="57" y2="70" stroke="rgba(255,255,255,0.5)" stroke-width="0.8" stroke-dasharray="2 2"/>
              <line x1="64" y1="20" x2="64" y2="70" stroke="rgba(255,255,255,0.5)" stroke-width="0.8" stroke-dasharray="2 2"/>
              <line x1="71" y1="20" x2="71" y2="70" stroke="rgba(255,255,255,0.5)" stroke-width="0.8" stroke-dasharray="2 2"/>
              <polygon points="64,8 54,16 74,16" fill="url(#goldRoof)"/>
              <line x1="64" y1="2" x2="64" y2="8" stroke="#ffea9f" stroke-width="1.5"/>
              <rect x="36" y="52" width="28" height="20" rx="3" fill="#201117" stroke="url(#goldRoof)" stroke-width="1.2"/>
              <text x="50" y="62" font-family="'Cinzel', serif" font-size="5" font-weight="900" fill="#ffea9f" text-anchor="middle">VIP TOUR</text>
              <text x="50" y="69" font-family="'Plus Jakarta Sans', sans-serif" font-size="4.2" font-weight="700" fill="#d8ad62" text-anchor="middle">INDUSTRY</text>
            </svg>
          </div>`;

      // Offer 2: AI Automation Special
      case 2:
        return `
          <div class="realistic-reward-icon ai-icon-glow">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <radialGradient id="aiGlow2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#00f7ff" stop-opacity="0.8"/>
                  <stop offset="50%" stop-color="#0077ff" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#0077ff" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="aiGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="36" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <circle cx="50" cy="40" r="32" fill="url(#aiGlow2)"/>
              <rect x="30" y="20" width="40" height="40" rx="8" fill="#0d141e" stroke="url(#aiGold)" stroke-width="1.5"/>
              <path d="M 18 28 L 30 28 M 18 40 L 30 40 M 18 52 L 30 52 M 70 28 L 82 28 M 70 40 L 82 40 M 70 52 L 82 52 M 38 12 L 38 20 M 50 12 L 50 20 M 62 12 L 62 20 M 38 60 L 38 68 M 50 60 L 50 68 M 62 60 L 62 68" stroke="#00e5ff" stroke-width="1.2"/>
              <rect x="38" y="28" width="24" height="24" rx="5" fill="#002b47" stroke="#00ffff" stroke-width="1.2"/>
              <path d="M 44 40 C 44 35 47 34 50 34 C 53 34 56 35 56 40 C 56 44 54 46 50 48" fill="none" stroke="#ffea9f" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="50" cy="40" r="2.5" fill="#00ffff"/>
              <rect x="24" y="60" width="52" height="13" rx="3" fill="url(#aiGold)" stroke="#5c3c12" stroke-width="0.8"/>
              <text x="50" y="69.5" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="900" fill="#201117" text-anchor="middle">1 MONTH AI</text>
            </svg>
          </div>`;

      // Offer 3: AI Certification Reward
      case 3:
        return `
          <div class="realistic-reward-icon cert-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="diplomaParch" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#fff9e6"/>
                  <stop offset="60%" stop-color="#f5e8c4"/>
                  <stop offset="100%" stop-color="#dfcaa0"/>
                </linearGradient>
                <radialGradient id="waxSeal" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </radialGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="38" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <rect x="20" y="14" width="60" height="52" rx="4" fill="url(#diplomaParch)" stroke="#8c6a38" stroke-width="1.2"/>
              <rect x="24" y="18" width="52" height="44" rx="2" fill="none" stroke="#d8ad62" stroke-width="0.8" stroke-dasharray="3 1.5"/>
              <line x1="32" y1="26" x2="68" y2="26" stroke="#b39768" stroke-width="1.5"/>
              <line x1="35" y1="32" x2="65" y2="32" stroke="#b39768" stroke-width="1"/>
              <line x1="30" y1="38" x2="70" y2="38" stroke="#b39768" stroke-width="1"/>
              <polygon points="46,54 42,72 47,69 51,72 49,54" fill="#a00f28"/>
              <polygon points="51,54 48,72 53,69 58,72 54,54" fill="#d91e36"/>
              <circle cx="50" cy="50" r="10" fill="url(#waxSeal)" stroke="#ffffff" stroke-width="1"/>
              <circle cx="50" cy="50" r="7.5" fill="none" stroke="#5c3c12" stroke-width="0.8" stroke-dasharray="1.5 1"/>
              <text x="50" y="53" font-family="'Cinzel', serif" font-size="7" font-weight="900" fill="#301804" text-anchor="middle">★</text>
            </svg>
          </div>`;

      // Offer 4: Expert Program Bonus
      case 4:
        return `
          <div class="realistic-reward-icon ad-rocket-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="50%" stop-color="#d4dbe3"/>
                  <stop offset="100%" stop-color="#8c97a5"/>
                </linearGradient>
                <linearGradient id="rocketFin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ff3b68"/>
                  <stop offset="100%" stop-color="#a00028"/>
                </linearGradient>
                <linearGradient id="fireTrail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#ffd700"/>
                  <stop offset="50%" stop-color="#ff7700"/>
                  <stop offset="100%" stop-color="#ff1a00"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="38" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <circle cx="50" cy="42" r="28" fill="#1b1218" stroke="#d8ad62" stroke-width="1.5"/>
              <circle cx="50" cy="42" r="20" fill="#291420" stroke="#d8ad62" stroke-width="1" stroke-dasharray="2 2"/>
              <circle cx="50" cy="42" r="12" fill="#d90b3e"/>
              <circle cx="50" cy="42" r="5" fill="#ffd700"/>
              <g transform="translate(18, -4) rotate(22 50 42)">
                <polygon points="46,54 50,68 54,54" fill="url(#fireTrail)"/>
                <polygon points="48,54 50,63 52,54" fill="#ffffff"/>
                <polygon points="42,46 36,54 44,52" fill="url(#rocketFin)"/>
                <polygon points="58,46 64,54 56,52" fill="url(#rocketFin)"/>
                <path d="M 44 48 L 44 32 C 44 22 50 14 50 14 C 50 14 56 22 56 32 L 56 48 Z" fill="url(#rocketBody)" stroke="#3e4854" stroke-width="0.8"/>
                <path d="M 46 24 C 46 19 50 14 50 14 C 50 14 54 19 54 24 Z" fill="url(#rocketFin)"/>
                <circle cx="50" cy="32" r="3.5" fill="#00ffff" stroke="#ffd700" stroke-width="1"/>
              </g>
              <text x="50" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="900" fill="#ffd700" text-anchor="middle">AD CREDITS</text>
            </svg>
          </div>`;

      // Offer 5: Exclusive Course Fee Deal
      case 5:
        return `
          <div class="realistic-reward-icon diamond-vip-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="diaTop" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="50%" stop-color="#bfeaff"/>
                  <stop offset="100%" stop-color="#60b8e6"/>
                </linearGradient>
                <linearGradient id="diaBot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#60b8e6"/>
                  <stop offset="50%" stop-color="#1f7db3"/>
                  <stop offset="100%" stop-color="#0a4669"/>
                </linearGradient>
                <linearGradient id="vipGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="36" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <polygon points="30,26 42,12 58,12 70,26 50,26" fill="url(#diaTop)" stroke="#ffffff" stroke-width="0.8"/>
              <polygon points="42,12 50,26 58,12" fill="#ffffff" opacity="0.9"/>
              <polygon points="30,26 50,26 50,56" fill="url(#diaBot)" stroke="#398ebc" stroke-width="0.8"/>
              <polygon points="70,26 50,26 50,56" fill="#14608c" stroke="#398ebc" stroke-width="0.8"/>
              <polygon points="50,26 44,50 50,56" fill="#80d0ff" opacity="0.75"/>
              <polygon points="50,26 56,50 50,56" fill="#2d7fa8" opacity="0.75"/>
              <polygon points="68,14 70,18 74,19 70,20 68,24 66,20 62,19 66,18" fill="#ffffff"/>
              <rect x="18" y="56" width="64" height="15" rx="3.5" fill="url(#vipGold)" stroke="#52350d" stroke-width="0.8"/>
              <text x="50" y="66.5" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.8" font-weight="900" fill="#201117" text-anchor="middle">₹35,000 / ₹65,000</text>
            </svg>
          </div>`;

      // Offer 6: AI Automation Bonus
      case 6:
        return `
          <div class="realistic-reward-icon energy-core-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <radialGradient id="electricGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#ffe600"/>
                  <stop offset="40%" stop-color="#ff7700" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#ff4400" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="36" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <circle cx="50" cy="38" r="28" fill="url(#electricGlow)"/>
              <ellipse cx="50" cy="38" rx="26" ry="10" transform="rotate(-30 50 38)" fill="none" stroke="url(#goldRing)" stroke-width="1.8"/>
              <ellipse cx="50" cy="38" rx="26" ry="10" transform="rotate(30 50 38)" fill="none" stroke="url(#goldRing)" stroke-width="1.8"/>
              <circle cx="50" cy="38" r="14" fill="#1b1218" stroke="#ffe600" stroke-width="1.5"/>
              <circle cx="50" cy="38" r="10" fill="#ffe600" opacity="0.3"/>
              <polygon points="52,22 42,38 49,38 46,54 58,36 50,36" fill="#ffffff" stroke="#ffaa00" stroke-width="1"/>
              <rect x="22" y="58" width="56" height="13" rx="3" fill="url(#goldRing)" stroke="#52350d" stroke-width="0.8"/>
              <text x="50" y="67.5" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.8" font-weight="900" fill="#201117" text-anchor="middle">+3,000 COINS</text>
            </svg>
          </div>`;

      // Offer 7: Lifetime Learning Support
      case 7:
        return `
          <div class="realistic-reward-icon lifetime-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#3d2230"/>
                  <stop offset="60%" stop-color="#24111c"/>
                  <stop offset="100%" stop-color="#14070e"/>
                </linearGradient>
                <linearGradient id="infGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="35%" stop-color="#ffea9f"/>
                  <stop offset="70%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="38" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <polygon points="50,14 84,26 50,38 16,26" fill="url(#capGrad)" stroke="#d8ad62" stroke-width="1.2"/>
              <path d="M 32 32 L 32 44 C 32 50 68 50 68 44 L 68 32 Z" fill="#1b0c15" stroke="#8a5a1f" stroke-width="1"/>
              <circle cx="50" cy="26" r="2.5" fill="#ffea9f"/>
              <path d="M 50 26 Q 64 30 68 40" fill="none" stroke="#ffd700" stroke-width="1.8"/>
              <polygon points="68,40 66,48 70,48" fill="#ffd700"/>
              <g transform="translate(0, 18)">
                <path d="M 38 34 C 32 34 26 38 26 44 C 26 50 32 54 38 54 C 45 54 48 44 50 44 C 52 44 55 54 62 54 C 68 54 74 50 74 44 C 74 38 68 34 62 34 C 55 34 52 44 50 44 C 48 44 45 34 38 34 Z" fill="none" stroke="url(#infGold)" stroke-width="4.5" stroke-linecap="round"/>
                <text x="50" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="5" font-weight="900" fill="#201117" text-anchor="middle">LIFETIME</text>
              </g>
            </svg>
          </div>`;

      // Offer 8: Diwali Gift Hamper
      case 8:
        return `
          <div class="realistic-reward-icon hamper-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="basketWood" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#dfa863"/>
                  <stop offset="50%" stop-color="#ad7230"/>
                  <stop offset="100%" stop-color="#5a350d"/>
                </linearGradient>
                <linearGradient id="crimsonBox" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#ff3b68"/>
                  <stop offset="60%" stop-color="#d90b3e"/>
                  <stop offset="100%" stop-color="#800020"/>
                </linearGradient>
                <linearGradient id="goldBox" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="40" ry="5" fill="rgba(0,0,0,0.55)" filter="blur(2px)"/>
              <path d="M 18 42 L 25 70 Q 50 74 75 70 L 82 42 Q 50 38 18 42 Z" fill="url(#basketWood)" stroke="#45270a" stroke-width="1.2"/>
              <ellipse cx="50" cy="42" rx="32" ry="5" fill="#f0c283" stroke="#754415" stroke-width="1.2"/>
              <rect x="24" y="24" width="22" height="20" rx="2" fill="url(#goldBox)" stroke="#5e390c" stroke-width="0.8"/>
              <line x1="35" y1="24" x2="35" y2="44" stroke="#ff3b68" stroke-width="2.5"/>
              <rect x="52" y="20" width="26" height="24" rx="2.5" fill="url(#crimsonBox)" stroke="#540013" stroke-width="0.8"/>
              <line x1="65" y1="20" x2="65" y2="44" stroke="#ffd700" stroke-width="2.5"/>
              <path d="M 65 20 C 58 13 54 15 62 19 C 65 21 65 20 65 20 Z" fill="#ffd700"/>
              <path d="M 65 20 C 72 13 76 15 68 19 C 65 21 65 20 65 20 Z" fill="#ffd700"/>
              <circle cx="65" cy="20" r="2.5" fill="#ffeaa7"/>
              <path d="M 40 48 C 40 57 60 57 60 48 C 58 46 55 45 50 45 C 45 45 42 46 40 48 Z" fill="#b84d2b" stroke="#541e0c" stroke-width="0.8"/>
              <path d="M 50 45 Q 50 38 50 35 Q 53 39 50 45 Z" fill="#ffd700"/>
              <path d="M 50 35 C 48 38 47 41 50 44 C 53 41 52 38 50 35 Z" fill="#ff4d00"/>
              <polygon points="18,18 20,22 24,23 20,24 18,28 16,24 12,23 16,22" fill="#ffd700"/>
              <polygon points="82,24 84,28 88,29 84,30 82,34 80,30 76,29 80,28" fill="#ffd700"/>
            </svg>
          </div>`;

      // Offer 9: Refer & Earn Reward
      case 9:
        return `
          <div class="realistic-reward-icon cash-bundle-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <linearGradient id="noteGrad" x1="0" y1="0" x2="1" y2="0.6">
                  <stop offset="0%" stop-color="#4caf7d"/>
                  <stop offset="50%" stop-color="#2d8557"/>
                  <stop offset="100%" stop-color="#195435"/>
                </linearGradient>
                <linearGradient id="strapGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="42" ry="5" fill="rgba(0,0,0,0.55)" filter="blur(2px)"/>
              <path d="M 16 58 L 74 48 L 84 62 L 26 72 Z" fill="#1b4d32" stroke="#0e2f1e" stroke-width="0.8"/>
              <path d="M 16 54 L 74 44 L 84 58 L 26 68 Z" fill="#236542" stroke="#133d26" stroke-width="0.8"/>
              <polygon points="16,50 74,40 84,54 26,64" fill="url(#noteGrad)" stroke="#195435" stroke-width="1.2"/>
              <text x="46" y="55" transform="rotate(-9.5 46 55)" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" font-weight="900" fill="#ffffff" text-anchor="middle">₹500</text>
              <polygon points="42,45 53,43 57,59 46,61" fill="url(#strapGold)" stroke="#664312" stroke-width="0.8"/>
              <text x="50" y="54" transform="rotate(-9.5 50 54)" font-family="'Cinzel', serif" font-size="4" font-weight="800" fill="#201117" text-anchor="middle">RBI</text>
              <circle cx="76" cy="30" r="14" fill="url(#strapGold)" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))"/>
              <circle cx="76" cy="30" r="11" fill="#201117"/>
              <path d="M 69 30 L 73 27 L 79 32 L 83 28" stroke="#ffd700" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <path d="M 72 32 L 76 35 L 80 31" stroke="#ffd700" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <rect x="18" y="18" width="50" height="14" rx="4" fill="url(#strapGold)" stroke="#57380f" stroke-width="1"/>
              <text x="43" y="27.5" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="900" fill="#201117" text-anchor="middle">₹5,000 CASH</text>
            </svg>
          </div>`;

      // Offer 10: Silver Coin Reward (REALISTIC 3D 999 PURE SILVER COIN)
      case 10:
        return `
          <div class="realistic-reward-icon silver-coin-icon">
            <svg viewBox="0 0 100 80" class="real-svg">
              <defs>
                <radialGradient id="scFace10" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="20%" stop-color="#eaf0f6"/>
                  <stop offset="45%" stop-color="#cfd8e3"/>
                  <stop offset="70%" stop-color="#9aa5b1"/>
                  <stop offset="100%" stop-color="#616c78"/>
                </radialGradient>
                <linearGradient id="scRim10" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="25%" stop-color="#b0bac6"/>
                  <stop offset="50%" stop-color="#ffffff"/>
                  <stop offset="75%" stop-color="#555f6b"/>
                  <stop offset="100%" stop-color="#dce3ec"/>
                </linearGradient>
                <linearGradient id="scSheen10" x1="0.1" y1="0" x2="0.9" y2="1">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
                  <stop offset="42%" stop-color="#ffffff" stop-opacity="0.05"/>
                  <stop offset="58%" stop-color="#ffffff" stop-opacity="0.75"/>
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="74" rx="38" ry="5" fill="rgba(0,0,0,0.6)" filter="blur(2.5px)"/>
              <circle cx="50" cy="38" r="36" fill="url(#scRim10)" stroke="#434b54" stroke-width="1.2"/>
              <circle cx="50" cy="38" r="33.5" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="2 1.4" opacity="0.85"/>
              <circle cx="50" cy="38" r="31" fill="url(#scFace10)"/>
              <circle cx="50" cy="38" r="27" fill="none" stroke="#758290" stroke-width="1" stroke-dasharray="2 1.5" opacity="0.75"/>
              <path d="M 38 41 C 38 48 62 48 62 41 C 60 39.5 56 38.5 50 38.5 C 44 38.5 40 39.5 38 41 Z" fill="#ffffff" opacity="0.92"/>
              <ellipse cx="50" cy="40.5" rx="10" ry="2" fill="#8b97a4"/>
              <path d="M 50 38.5 Q 50 32 50 29 Q 53 33 50 38.5 Z" fill="#ffd700"/>
              <path d="M 50 29 C 48 33 47 36 50 38.5 C 53 36 52 33 50 29 Z" fill="#ffaa00"/>
              <text x="50" y="24" font-family="'Cinzel', serif" font-size="5.5" font-weight="900" fill="#424c56" text-anchor="middle" letter-spacing="1">DIZITALADDA</text>
              <text x="50" y="53" font-family="'Plus Jakarta Sans', sans-serif" font-size="5.5" font-weight="800" fill="#39424c" text-anchor="middle" letter-spacing="0.8">999 PURE SILVER</text>
              <text x="50" y="59" font-family="'Cinzel', serif" font-size="4" font-weight="700" fill="#5e6975" text-anchor="middle">★ DIWALI 2026 ★</text>
              <circle cx="50" cy="38" r="31" fill="url(#scSheen10)" pointer-events="none"/>
              <polygon points="26,16 28.5,21 34,22 28.5,23.5 26,29 24.5,23.5 19,22 24.5,21" fill="#ffffff" opacity="0.95"/>
            </svg>
          </div>`;

      // Offer 11: Silver Coin + AI Bonus
      case 11:
        return `
          <div class="realistic-reward-icon silver-ai-icon">
            <svg viewBox="0 0 110 80" class="real-svg">
              <defs>
                <radialGradient id="scFace11" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="25%" stop-color="#eaf0f6"/>
                  <stop offset="50%" stop-color="#cfd8e3"/>
                  <stop offset="80%" stop-color="#9aa5b1"/>
                  <stop offset="100%" stop-color="#616c78"/>
                </radialGradient>
                <linearGradient id="scRim11" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="30%" stop-color="#a0aab5"/>
                  <stop offset="50%" stop-color="#ffffff"/>
                  <stop offset="70%" stop-color="#555f6b"/>
                  <stop offset="100%" stop-color="#c8d1db"/>
                </linearGradient>
                <radialGradient id="aiGlow11" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#00ffff" stop-opacity="0.8"/>
                  <stop offset="40%" stop-color="#00aaff" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#00aaff" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="goldPlate11" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffea9f"/>
                  <stop offset="50%" stop-color="#d8ad62"/>
                  <stop offset="100%" stop-color="#8a5a1f"/>
                </linearGradient>
              </defs>
              <ellipse cx="40" cy="74" rx="28" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(2px)"/>
              <ellipse cx="78" cy="74" rx="20" ry="4" fill="rgba(0,0,0,0.4)" filter="blur(2px)"/>
              <circle cx="40" cy="38" r="30" fill="url(#scRim11)" stroke="#434b54" stroke-width="1.2"/>
              <circle cx="40" cy="38" r="27.5" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="2 1.2" opacity="0.85"/>
              <circle cx="40" cy="38" r="25" fill="url(#scFace11)"/>
              <path d="M 31 41 C 31 46 49 46 49 41 C 47 39.5 44 38.5 40 38.5 C 36 38.5 33 39.5 31 41 Z" fill="#ffffff" opacity="0.9"/>
              <path d="M 40 38.5 Q 40 33 40 30 Q 43 34 40 38.5 Z" fill="#ffd700"/>
              <text x="40" y="26" font-family="'Cinzel', serif" font-size="4.5" font-weight="900" fill="#424c56" text-anchor="middle">DIZITALADDA</text>
              <text x="40" y="51" font-family="'Plus Jakarta Sans', sans-serif" font-size="4.5" font-weight="800" fill="#39424c" text-anchor="middle">SILVER COIN</text>
              <polygon points="21,18 23,22 28,23 23,25 21,29 19,25 15,23 19,22" fill="#ffffff" opacity="0.95"/>
              <circle cx="78" cy="40" r="24" fill="url(#aiGlow11)"/>
              <rect x="63" y="25" width="30" height="30" rx="6" fill="#121824" stroke="url(#goldPlate11)" stroke-width="1.5"/>
              <line x1="67" y1="21" x2="67" y2="25" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="73" y1="21" x2="73" y2="25" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="78" y1="21" x2="78" y2="25" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="84" y1="21" x2="84" y2="25" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="67" y1="55" x2="67" y2="59" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="73" y1="55" x2="73" y2="59" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="78" y1="55" x2="78" y2="59" stroke="#d8ad62" stroke-width="1.5"/>
              <line x1="84" y1="55" x2="84" y2="59" stroke="#d8ad62" stroke-width="1.5"/>
              <rect x="70" y="32" width="16" height="16" rx="3.5" fill="#002b47" stroke="#00e5ff" stroke-width="1.2"/>
              <text x="78" y="44" font-family="'Cinzel', serif" font-size="8" font-weight="900" fill="#00ffff" text-anchor="middle" filter="drop-shadow(0 0 3px #00ffff)">AI</text>
              <circle cx="59" cy="40" r="7" fill="#d8ad62" stroke="#ffffff" stroke-width="1"/>
              <text x="59" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="900" fill="#201117" text-anchor="middle">+</text>
            </svg>
          </div>`;

      default:
        return `<div class="realistic-reward-icon">🎁</div>`;
    }
  }

  function populateOfferInfo(offer, cardId) {
    rewardBadge.textContent = offer.badge;
    rewardIcon.innerHTML = getRealisticOfferSvg(offer.id);
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

    // Lock to device in localStorage & clear pending
    try {
      localStorage.setItem(STORAGE_KEY_CLAIM, JSON.stringify({
        claimed: true,
        cardId: currentCardId,
        offerId: assignedOffer.id,
        claimedAt: new Date().toISOString()
      }));
      localStorage.removeItem(STORAGE_KEY_PENDING);
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

    // Discreet 5-tap on header brand logo to reset device (Admin/Staff only, leaves no visible UI buttons)
    const brandLogoWrap = document.querySelector('.brand-logo-wrap');
    if (brandLogoWrap) {
      let logoClicks = 0;
      let lastClickTime = 0;
      brandLogoWrap.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastClickTime < 800) {
          logoClicks++;
        } else {
          logoClicks = 1;
        }
        lastClickTime = now;

        if (logoClicks >= 5) {
          logoClicks = 0;
          resetCampaignStorage();
          showToast('Campaign Reset: Loading new card...');
          setTimeout(() => window.location.reload(), 600);
        }
      });
    }
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
