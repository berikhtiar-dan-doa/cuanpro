/**
 * CuanPRO - Core Interaction Engine
 * Optimized for Mobile WebViews, Clean UX, and Fast Performance
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. DUAL-STAGE CTA HANDLER
     ========================================================================== */
  let clickCount = 0;
  const ctaBtn = document.getElementById("ctaBtn");
  const modal = document.getElementById("rewardModal");
  const modalAmount = document.getElementById("modalAmount");
  const modalTrxId = document.getElementById("modalTrxId");

  // Affiliate Target Link
  const SHOPEE_LINK = "https://s.shopee.co.id/2qV87fGqlb";

  if (ctaBtn && modal) {
    ctaBtn.addEventListener("click", () => {
      clickCount++;

      if (clickCount === 1) {
        // Stage 1: Direct to Shopee Product
        openSafeLink(SHOPEE_LINK);
      } else {
        // Stage 2: Display Official Reward Receipt Modal
        if (modalTrxId) {
          modalTrxId.textContent = "CP-" + Math.floor(100000 + Math.random() * 900000);
        }
        if (modalAmount) {
          const amounts = ["Rp 250.000", "Rp 350.000", "Rp 450.000", "Rp 500.000"];
          modalAmount.textContent = amounts[Math.floor(Math.random() * amounts.length)];
        }

        modal.classList.add("active");
      }
    });
  }

  // Close modal when tapping outside the modal-card
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  /* ==========================================================================
     2. REAL-TIME ACTIVITY FEED (AUTHENTIC SOCIAL PROOF)
     ========================================================================== */
  const track = document.getElementById("liveTrack");
  if (!track) return;

  const firstNames = [
    "Andi", "Budi", "Rina", "Siti", "Dewi", "Ayu", "Putri", "Rizki", "Fajar",
    "Agus", "Yudi", "Bayu", "Dimas", "Arif", "Doni", "Rio", "Kevin", "Alif",
    "Nanda", "Indra", "Ilham", "Farhan", "Hendra", "Wahyu", "Eko", "Rendi",
    "Bagas", "Iqbal", "Akbar", "Reza", "Yoga", "Surya", "Bima", "Rafi",
    "Hafiz", "Fikri", "Ridho", "Faiz", "Zaki", "Maya", "Intan", "Nabila",
    "Aulia", "Nisa", "Amelia", "Citra", "Lestari", "Anisa", "Rahma", "Safira",
    "Zahra", "Nadya", "Aisyah", "Aurel", "Keisha", "Wulan", "Ratna", "Melati"
  ];

  function getAvatarInitials(name) {
    return name.slice(0, 2).toUpperCase();
  }

  function getRandomUser() {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastInitial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${name} ${lastInitial}.***`;
  }

  function getRandomAmount() {
    const raw = Math.floor(Math.random() * 550000) + 75000;
    // Round to nearest 5,000 for realistic vouchers
    const rounded = Math.round(raw / 5000) * 5000;
    return "Rp " + rounded.toLocaleString("id-ID");
  }

  function getRandomTime() {
    const times = ["Baru saja", "15 dtk lalu", "45 dtk lalu", "1 mnt lalu", "2 mnt lalu"];
    return times[Math.floor(Math.random() * times.length)];
  }

  function createLiveItem() {
    const user = getRandomUser();
    const initials = getAvatarInitials(user);
    const amount = getRandomAmount();
    const time = getRandomTime();

    const item = document.createElement("div");
    item.className = "live-item";
    item.innerHTML = `
      <div class="live-user">
        <div class="user-avatar-badge">${initials}</div>
        <div class="user-meta">
          <span class="user-name">${user}</span>
          <span class="user-status">Berhasil dicairkan</span>
        </div>
      </div>
      <div class="live-payout">
        <span class="payout-amount">+${amount}</span>
        <span class="payout-time">${time}</span>
      </div>
    `;

    track.prepend(item);

    // Keep DOM lightweight
    if (track.children.length > 5) {
      track.lastElementChild.remove();
    }
  }

  // Populate initial items
  for (let i = 0; i < 4; i++) {
    createLiveItem();
  }

  // Add new item every 3.5s only when tab is visible
  let tickerInterval = setInterval(createLiveItem, 3500);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(tickerInterval);
    } else {
      tickerInterval = setInterval(createLiveItem, 3500);
    }
  });

  /* ==========================================================================
     3. STAGE 2 ACTION: REDIRECT TO SHOPEE
     ========================================================================== */
  window.goCek = function () {
    openSafeLink(SHOPEE_LINK);
  };

  /**
   * Safe Link Navigation Helper
   * Handles WebView popup blockers gracefully
   */
  function openSafeLink(url) {
    try {
      const newWin = window.open(url, "_blank");
      if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        window.location.href = url;
      }
    } catch (e) {
      window.location.href = url;
    }
  }
});
