(() => {
  "use strict";

  // =========================================================
  // SETTINGS
  // =========================================================

  const STORAGE_KEY = "brainbyte_save_v1";
  const DEFAULT_LIVES = 3;

  const DIFFICULTY_TIME = {
    EASY: 30,
    MEDIUM: 45,
    HARD: 60
  };

  const LEVEL_TIME = 60;

  const POINTS_CORRECT = 100;
  const POINTS_SPEED_BONUS = 2;

  // =========================================================
  // GAME STATE
  // =========================================================

const state = {
    data: loadData(),
    screen: "mainMenu",
    currentQuestion: null,
    selectedAnswer: null,
    timerId: null,
    timeLeft: LEVEL_TIME,
    paused: false,
    answerLocked: false,
    gameMode: "codeDebug",
    language: "python", // NEW
    bugsFound: []
  };

  // =========================================================
  // SHORTCUT
  // =========================================================

  const $ = (id) => document.getElementById(id);

  // =========================================================
  // CREATE USER ID
  // =========================================================

  function createId() {
    return (
      "u_" +
      Date.now().toString(36) +
      Math.random().toString(36).slice(2, 7)
    );
  }

  // =========================================================
  // LOAD DATA
  // =========================================================

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        return {
          users: {},
          selectedUserId: null
        };
      }

      const parsed = JSON.parse(raw);

      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid save");
      }

      if (!parsed.users || typeof parsed.users !== "object") {
        parsed.users = {};
      }

      if (!("selectedUserId" in parsed)) {
        parsed.selectedUserId = null;
      }

      return parsed;
    } catch (error) {
      console.warn(
        "BrainByte save data could not be loaded:",
        error
      );

      return {
        users: {},
        selectedUserId: null
      };
    }
  }

  // =========================================================
  // SAVE DATA
  // =========================================================

  function saveData() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.data)
      );

      updateHeader();
    } catch (error) {
      console.error(
        "Could not save BrainByte data:",
        error
      );

      showToast(
        "Save failed. Check browser storage permissions."
      );
    }
  }

  // =========================================================
  // CREATE PROFILE
  // =========================================================

function newProfile(username) {
    const now = new Date().toISOString();

    return {
      id: createId(),
      username,

      currentLevel: 1,
      completedLevels: [],

      totalScore: 0,
      bestScore: 0,
      lives: DEFAULT_LIVES,
      currentLevelScore: 0,

      // ADD THESE TWO LINES:
      gameMode: "codeDebug",
      language: "python",

      gameState: "ready",
      lastSave: now,
      createdAt: now
    };
  }

  // =========================================================
  // CURRENT USER
  // =========================================================

  function getCurrentUser() {
    return (
      state.data.users[state.data.selectedUserId] ||
      null
    );
  }

  // =========================================================
  // USER LIST
  // =========================================================

  function userList() {
    return Object.values(state.data.users).sort(
      (a, b) =>
        a.username.localeCompare(
          b.username,
          undefined,
          { sensitivity: "base" }
        )
    );
  }

  // =========================================================
  // USERNAME
  // =========================================================

  function normalizeUsername(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  }

  function isValidUsername(username) {
    return (
      username.length >= 2 &&
      username.length <= 20 &&
      /^[a-zA-Z0-9 _-]+$/.test(username)
    );
  }

  function usernameExists(username, exceptId = null) {
    return userList().some(
      (user) =>
        user.id !== exceptId &&
        user.username.toLowerCase() ===
          username.toLowerCase()
    );
  }

  // =========================================================
  // SAVE TIME
  // =========================================================

  function formatSaveTime(iso) {
    if (!iso) {
      return "No save yet";
    }

    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
      return "No save yet";
    }

    return date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // =========================================================
  // TOUCH SAVE
  // =========================================================

  function touchSave(user) {
    user.lastSave = new Date().toISOString();
  }

  // =========================================================
  // UPDATE HEADER
  // =========================================================

  function updateHeader() {
    const user = getCurrentUser();

    const name = user
      ? user.username
      : "No user selected";

    if ($("headerUser")) {
      $("headerUser").textContent = name;
    }

    if ($("menuUsername")) {
      $("menuUsername").textContent =
        user ? user.username : "Guest";
    }

    if ($("optionsUsername")) {
      $("optionsUsername").textContent =
        user ? user.username : "Guest";
    }

    if ($("lastSave")) {
      $("lastSave").textContent = user
        ? formatSaveTime(user.lastSave)
        : "No save yet";
    }

 if ($("continueBtn")) {
      $("continueBtn").disabled = !user;

      $("continueBtn").title = user
        ? "Continue " + user.username
        : "Add or select a user first";

      $("continueBtn").style.opacity =
        user ? "1" : ".55";

      // Dynamically change text based on user progress
      if (user) {
        const hasProgress = 
          user.totalScore > 0 || 
          user.completedLevels.length > 0 || 
          user.currentLevel > 1;
          
        if (hasProgress) {
          $("continueBtn").innerHTML = '<span class="btn-icon">▶</span> CONTINUE';
        } else {
          $("continueBtn").innerHTML = '<span class="btn-icon">▶</span> NEW GAME';
        }
      } else {
        $("continueBtn").innerHTML = '<span class="btn-icon">▶</span> CONTINUE';
      }
    }
  }

  // =========================================================
  // SHOW SCREEN
  // =========================================================

  function showScreen(id) {
    stopTimer();

    document
      .querySelectorAll(".screen")
      .forEach((screen) => {
        screen.classList.remove("active");
      });

    const target = $(id);

    if (!target) {
      console.warn("Screen not found:", id);
      return;
    }

    target.classList.add("active");

    state.screen = id;
    state.paused = false;

    if ($("pauseOverlay")) {
      $("pauseOverlay").classList.add("hidden");
    }

    updateHeader();
  }

  // =========================================================
  // REQUIRE USER
  // =========================================================

// =========================================================
  // REQUIRE USER
  // =========================================================

function requireUser(actionText = "do that", onCreated = null) {
    const user = getCurrentUser();

    if (!user) {
      showToast("Create or select a user before you " + actionText + ".");
      // Redirect to your logo screen (change 'index.html' if your logo screen has a different name)
      window.location.href = 'index.html'; 
      return null;
    }

    return user;
  }

  // =========================================================
  // TOAST
  // =========================================================

  function showToast(message) {
    const toast = $("toast");

    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // =========================================================
  // MODAL
  // =========================================================

  function openModal({
    title,
    message = "",
    body = "",
    confirmText = "CONFIRM",
    cancelText = "CANCEL",
    onConfirm,
    showCancel = true
  }) {
    if (!$("modalOverlay")) {
      return;
    }

    $("modalTitle").textContent = title;
    $("modalMessage").textContent = message;
    $("modalBody").innerHTML = body;

    $("modalConfirm").textContent = confirmText;
    $("modalCancel").textContent = cancelText;

    $("modalCancel").classList.toggle(
      "hidden",
      !showCancel
    );

    $("modalOverlay").classList.remove("hidden");

    $("modalConfirm").onclick = () => {
      let result = true;

      if (typeof onConfirm === "function") {
        result = onConfirm();
      }

      // Returning false keeps the modal open.
      if (result !== false) {
        closeModal();
      }
    };
  }

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  function closeModal() {
    if ($("modalOverlay")) {
      $("modalOverlay").classList.add("hidden");
    }

    if ($("modalBody")) {
      $("modalBody").innerHTML = "";
    }

    if ($("modalConfirm")) {
      $("modalConfirm").onclick = null;
    }
  }

  // =========================================================
  // ADD USER
  // =========================================================

  function openAddUserModal() {
    openModal({
      title: "Add User",

      message:
        "Create a player profile. Usernames must be 2–20 characters and may use letters, numbers, spaces, underscores, or hyphens.",

      body: `
        <div class="form-field">
          <label for="newUsername">
            USERNAME
          </label>

          <input
            id="newUsername"
            type="text"
            maxlength="20"
            autocomplete="off"
            placeholder="e.g. CodeMaster"
          />
        </div>
      `,

      confirmText: "CREATE USER",

      onConfirm: () => {
        const input = $("newUsername");

        const username = normalizeUsername(
          input ? input.value : ""
        );

        if (!isValidUsername(username)) {
          showToast(
            "Invalid username. Use 2–20 letters, numbers, spaces, _ or -."
          );

          return false;
        }

        if (usernameExists(username)) {
          showToast(
            "That username already exists."
          );

          return false;
        }

        const profile = newProfile(username);

        state.data.users[profile.id] = profile;
        state.data.selectedUserId = profile.id;

        saveData();

        showToast(
          "User created: " + username
        );

        showScreen("mainMenu");

        return true;
      }
    });

    setTimeout(() => {
      const input = $("newUsername");

      if (input) {
        input.focus();
      }
    }, 50);
  }

// =========================================================
  // CHANGE USER
  // =========================================================

  function openChangeUserModal() {
    const users = userList();

    if (!users.length) {
      showToast("No users found. Please register first.")
      return;
    }

    const body = `
      <div class="user-list">
        ${users
          .map(
            (user) => `
              <button
                class="user-choice ${
                  user.id === state.data.selectedUserId ? "selected" : ""
                }"
                data-user-id="${escapeHtml(user.id)}"
                type="button"
              >
                <span>
                  ${escapeHtml(user.username)}
                </span>

                <small>
                  Level ${user.currentLevel}
                  •
                  ${user.totalScore}
                  pts
                </small>
              </button>
            `
          )
          .join("")}
      </div>
    `;

    openModal({
      title: "Change User",
      message: "Select the profile you want to use.",
      body,
      confirmText: "SELECT USER",
      onConfirm: () => {
        const selected = document.querySelector(".user-choice.selected");

        if (!selected) {
          showToast("Select a user first.");
          return false;
        }

        state.data.selectedUserId = selected.dataset.userId;
        saveData();

        const user = getCurrentUser();
        showToast("Switched to " + user.username);

        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
          window.location.href = "main.html";
        } else {
          showScreen("mainMenu");
        }

        return true;
      }
    });

    document.querySelectorAll(".user-choice").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".user-choice").forEach((b) => {
          b.classList.remove("selected");
        });
        button.classList.add("selected");
      });
    });
  }
// =========================================================
  // ADMIN DELETE USER
  // =========================================================
  function openAdminDeleteModal() {
    const users = userList();

    if (!users.length) {
      showToast("No users exist.");
      return;
    }

    const body = `
      <div class="user-list">
        ${users.map((user) => `
            <button class="user-choice" data-delete-id="${escapeHtml(user.id)}" type="button" style="border-color: var(--red);">
              <span>${escapeHtml(user.username)}</span>
              <small style="color: var(--red);">DELETE</small>
            </button>
          `).join("")}
      </div>
    `;

    openModal({
      title: "Delete Player Profiles",
      message: "Warning: Deleting a player cannot be undone.",
      body,
      confirmText: "CLOSE",
      showCancel: false
    });

    document.querySelectorAll("[data-delete-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.deleteId;
        const userToDelete = state.data.users[id];

        if (confirm(`Permanently delete ${userToDelete.username}?`)) {
          delete state.data.users[id];

          if (state.data.selectedUserId === id) {
            const remaining = userList();
            state.data.selectedUserId = remaining[0]?.id || null;
          }

          saveData();
          showToast(`Deleted ${userToDelete.username}.`);
          closeModal();
        }
      });
    });
  }

// =========================================================
  // ADMIN DELETE ALL USERS
  // =========================================================
  function openAdminDeleteAllModal() {
    const users = userList();

    if (!users.length) {
      showToast("Database is already empty. No users exist.");
      return;
    }

    openModal({
      title: "NUKE DATABASE",
      message: "CRITICAL WARNING: This will permanently delete ALL player profiles, scores, and save data. This action cannot be undone.",
      confirmText: "DELETE EVERYTHING",
      cancelText: "CANCEL",
      onConfirm: () => {
        // Erase all users from the game state
        state.data.users = {};
        state.data.selectedUserId = null;
        
        saveData();
        showToast("Database wiped. All users deleted.");
        
        // Boot the user back to the logo/login screen since no profiles exist
        setTimeout(() => {
          if (window.location.pathname.includes("main.html")) {
            window.location.href = "index.html";
          }
        }, 1000);

        return true;
      }
    });
  }
  
// =========================================================
  // MODE SELECTION MODAL
  // =========================================================
function openModeSelectionModal() {
    openModal({
      title: "Select Game Mode",
      message: "Choose your challenge type for this session.",
      body: `
        <div class="option-grid" style="grid-template-columns: 1fr; gap: 12px; margin-bottom: 0;">
          <button id="modeCodeDebug" class="feature-card" type="button" style="min-height: 80px;">
            <span class="feature-icon">⌨</span>
            <span><strong>CODE DEBUGGING</strong></span>
          </button>
          <button id="modeSpotDiff" class="feature-card" type="button" style="min-height: 80px;">
            <span class="feature-icon">🔍</span>
            <span><strong>SPOT THE DIFFERENCE</strong></span>
          </button>
        </div>
      `,
      confirmText: "CANCEL",
      showCancel: false
    });

    if ($("modeCodeDebug")) {
      $("modeCodeDebug").onclick = () => {
        const user = getCurrentUser();
        user.gameMode = "codeDebug";
        saveData(); // Save to local storage
        openLanguageSelectionModal();
      };
    }

    if ($("modeSpotDiff")) {
      $("modeSpotDiff").onclick = () => {
        const user = getCurrentUser();
        user.gameMode = "spotDiff";
        saveData(); // Save to local storage
        openLanguageSelectionModal();
      };
    }
  }
  function openLanguageSelectionModal() {
    openModal({
      title: "Select Language",
      message: "Choose the programming language for this run.",
      body: `
        <div class="option-grid" style="grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 0;">
          <button class="feature-card lang-btn" data-lang="python" type="button" style="min-height: 80px;">
            <span class="feature-icon">🐍</span>
            <span><strong>PYTHON</strong></span>
          </button>
          
          <button class="feature-card lang-btn" data-lang="cpp" type="button" style="min-height: 80px;">
            <span class="feature-icon">⚙️</span>
            <span><strong>C++</strong></span>
          </button>

          <button class="feature-card lang-btn" data-lang="java" type="button" style="min-height: 80px;">
            <span class="feature-icon">☕</span>
            <span><strong>JAVA</strong></span>
          </button>

          <button class="feature-card lang-btn" data-lang="web" type="button" style="min-height: 80px;">
            <span class="feature-icon">🌐</span>
            <span><strong>HTML/CSS/JS</strong></span>
          </button>
        </div>
      `,
      confirmText: "CANCEL",
      showCancel: false
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.onclick = () => {
        const user = getCurrentUser();
        user.language = btn.dataset.lang;
        saveData(); // Save to local storage
        closeModal();
        goToWorld(); 
      };
    });
  }
  // =========================================================
  // NEW GAME
  // =========================================================

  function startNewGame() {
    const user = requireUser(
      "start a game"
    );

    if (!user) {
      return;
    }

    const hasProgress =
      user.totalScore > 0 ||
      user.completedLevels.length > 0 ||
      user.currentLevel > 1;

    if (hasProgress) {
      openModal({
        title: "Start New Game?",

        message:
          `This will reset ${user.username}'s current progress, score, level, and lives. Other profiles will not be affected.`,

        confirmText: "RESET & START",

        onConfirm: () =>
          resetUserProgress(user)
      });
    } else {
      resetUserProgress(user);
    }
  }

  // =========================================================
  // RESET USER PROGRESS
  // =========================================================

  function resetUserProgress(user) {
    user.currentLevel = 1;
    user.completedLevels = [];

    user.totalScore = 0;
    user.bestScore = 0;

    // New Game is one of the places where hearts
    // are intentionally restored to full.
    user.lives = DEFAULT_LIVES;

    user.currentLevelScore = 0;
    user.gameState = "playing";

    touchSave(user);
    saveData();

    startLevel(1);
  }

  // =========================================================
  // CONTINUE
  // =========================================================

  function continueGame() {
    const user = requireUser(
      "continue"
    );

    if (!user) {
      return;
    }

    // If a corrupted/old save has zero lives,
    // do not silently restore health.
    if (Number(user.lives) <= 0) {
      gameOverReset();
      return;
    }

    user.gameState = "playing";

    touchSave(user);
    saveData();

    startLevel(
      Math.max(
        1,
        Number(user.currentLevel) || 1
      )
    );
  }
  function goToWorld() {
  const user = requireUser("play");
  if (!user) return;

  user.gameState = "playing";
  touchSave(user);
  saveData();

  window.location.href = "game.html";
}

  // =========================================================
  // GET QUESTION
  // =========================================================

function getQuestionForLevel(level) {
    const user = getCurrentUser();
    if (!user) return null;

    // CRASH PREVENTION: Safely check for the banks
    let bank = [];
    if (user.gameMode === "spotDiff" && typeof SPOT_DIFF_BANK !== "undefined") {
      bank = SPOT_DIFF_BANK;
    } else if (typeof QUESTION_BANK !== "undefined") {
      bank = QUESTION_BANK;
    }
    
    const langBank = bank.filter(q => q.language === user.language);
    const finalBank = langBank.length > 0 ? langBank : bank;

    return finalBank.find((q) => q.level === level) || null;
  }

  // =========================================================
  // START LEVEL
  // =========================================================

  function startLevel(level) {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const safeLevel = Math.max(
      1,
      Number(level) || 1
    );

    const question =
      getQuestionForLevel(safeLevel);

    // No question means there are no more levels.
    if (!question) {
      user.gameState = "complete";

      touchSave(user);
      saveData();

      showToast(
        "All prototype levels completed!"
      );

      renderLeaderboard();
      showScreen(
        "leaderboardsScreen"
      );

      return;
    }

    state.currentQuestion = question;
    state.selectedAnswer = null;
    state.answerLocked = false;
    state.paused = false;

    const difficulty =
      question.difficulty || "MEDIUM";

    state.timeLeft =
      DIFFICULTY_TIME[difficulty] ||
      LEVEL_TIME;

    user.currentLevel = safeLevel;
    user.currentLevelScore = 0;

    // =======================================================
    // IMPORTANT HEART LOGIC
    // =======================================================
    //
    // Starting/restarting a level MUST NOT restore hearts.
    // The only normal full-heal operation is New Game.
    //
    // If zero hearts somehow reaches this function, Game Over
    // is triggered instead of silently giving three hearts.
    //

    user.lives = Math.min(
      DEFAULT_LIVES,
      Math.max(
        0,
        Number(user.lives) || 0
      )
    );

    if (user.lives <= 0) {
      gameOverReset();
      return;
    }

    user.gameState = "playing";

    touchSave(user);
    saveData();

    renderQuestion();

    showScreen("gameScreen");

    startTimer();
  }

  // =========================================================
  // RENDER QUESTION
  // =========================================================

  function renderQuestion() {
    const q = state.currentQuestion;
    const user = getCurrentUser();

    if (!q || !user) {
      return;
    }

    if ($("levelNumber")) {
      $("levelNumber").textContent =
        q.level;
    }

    if ($("scoreValue")) {
      $("scoreValue").textContent =
        user.totalScore;
    }

    renderLives();

    if ($("timerValue")) {
      $("timerValue").textContent =
        state.timeLeft;
    }

    if ($("difficultyBadge")) {
      $("difficultyBadge").textContent =
        q.difficulty;
    }

    if ($("challengeType")) {
      $("challengeType").textContent =
        q.type;
    }

    if ($("questionTitle")) {
      $("questionTitle").textContent =
        q.title;
    }

    if ($("questionPrompt")) {
      $("questionPrompt").textContent =
        q.prompt;
    }

if (user.gameMode === "spotDiff") {
      // SPOT THE DIFFERENCE MODE: Show Reference Code & Split to 2 Columns
      $("referenceBox")?.classList.remove("hidden");
      if ($("codeLayout")) $("codeLayout").style.gridTemplateColumns = "1fr 1fr";

      $("answerOptions")?.classList.add("hidden");
      $("checkAnswerBtn")?.classList.add("hidden");
      
      state.bugsFound = [];
      if ($("answerLabel")) $("answerLabel").textContent = `BUGS FOUND: 0 / ${q.bugLines.length}`;

      const renderLines = (codeStr, isInteractive) => {
        return codeStr.split('\n').map((line, idx) => 
          `<div class="${isInteractive ? 'code-line' : 'ref-line'}" data-line="${idx}"><span class="line-num">${idx + 1}</span><span class="line-content">${escapeHtml(line)}</span></div>`
        ).join('');
      };

      if ($("referenceCode")) $("referenceCode").innerHTML = renderLines(q.referenceCode, false);
      if ($("debugCode")) {
        $("debugCode").innerHTML = renderLines(q.debugCode, true);
        // Reset to default smaller size for split-screen
        $("debugCode").style.minHeight = "190px"; 
        $("debugCode").style.fontSize = "14px";
      }

      // Handle Line Clicks
      document.querySelectorAll(".code-line").forEach(lineEl => {
        lineEl.addEventListener("click", () => {
          if (state.answerLocked || state.paused) return;
          const lineIdx = Number(lineEl.dataset.line);

          if (state.bugsFound.includes(lineIdx)) return;

          if (q.bugLines.includes(lineIdx)) {
            state.bugsFound.push(lineIdx);
            lineEl.classList.add("bug-found");
            if ($("answerLabel")) $("answerLabel").textContent = `BUGS FOUND: ${state.bugsFound.length} / ${q.bugLines.length}`;
            setFeedback("Bug spotted!", "success");

            // Win Condition
            if (state.bugsFound.length === q.bugLines.length) {
              state.answerLocked = true;
              stopTimer();
              const earned = POINTS_CORRECT + Math.max(0, state.timeLeft) * POINTS_SPEED_BONUS;
              user.currentLevelScore = earned;
              user.totalScore += earned;
              user.bestScore = Math.max(user.bestScore, user.totalScore);
              
              if (!user.completedLevels.includes(q.level)) user.completedLevels.push(q.level);
              user.completedLevels.sort((a, b) => a - b);
              
              const activeBank = user.gameMode === "spotDiff" ? SPOT_DIFF_BANK : QUESTION_BANK;
              const langBank = activeBank.filter(question => question.language === user.language);
              user.currentLevel = Math.min(q.level + 1, langBank.length + 1);
              
              user.gameState = "level-complete";
              touchSave(user); saveData(); renderLives();
              
              setFeedback(`All bugs found! +${earned} points. ${q.explanation || ''}`, "success");
              $("nextLevelBtn")?.classList.remove("hidden");
            }
          } else {
            // Wrong line logic
            lineEl.classList.add("bug-wrong");
            setTimeout(() => lineEl.classList.remove("bug-wrong"), 400);

            user.lives = Math.max(0, Number(user.lives || 0) - 1);
            touchSave(user); saveData(); renderLives();
            setFeedback("Incorrect! No bug on this line.", "error");

            if (user.lives <= 0) {
              state.answerLocked = true;
              stopTimer();
              setTimeout(() => gameOverReset(), 500);
            } else {
              state.answerLocked = true;
              stopTimer();
              setTimeout(() => openRetryModal("Incorrect Line", `You lost a heart. ${user.lives} remaining.`), 150);
            }
          }
        });
      });

    } else {
      // CODE DEBUGGING MODE: Hide Reference Code & Expand to 1 Column
      $("referenceBox")?.classList.add("hidden");
      if ($("codeLayout")) $("codeLayout").style.gridTemplateColumns = "1fr";

      $("answerOptions")?.classList.remove("hidden");
      $("checkAnswerBtn")?.classList.remove("hidden");
      if ($("answerLabel")) $("answerLabel").textContent = "Choose the buggy line";
      
      if ($("referenceCode")) $("referenceCode").textContent = q.referenceCode;
      
      if ($("debugCode")) {
        $("debugCode").textContent = q.debugCode;
        // Make the panel significantly taller and the text larger for 1-column mode
        $("debugCode").style.minHeight = "350px";
        $("debugCode").style.minWidth = "1100px";
        $("debugCode").style.fontSize = "16px";
      }
      
      if ($("answerOptions")) {
        $("answerOptions").innerHTML = q.answers.map((answer, index) => `
          <button type="button" class="answer-option" data-answer="${index}">
            ${escapeHtml(answer)}
          </button>
        `).join("");
      }
      
      document.querySelectorAll(".answer-option").forEach((button) => {
        button.addEventListener("click", () => {
            if (state.answerLocked || state.paused) return;
            state.selectedAnswer = Number(button.dataset.answer);
            document.querySelectorAll(".answer-option").forEach((b) => b.classList.remove("selected"));
            button.classList.add("selected");
        });
      });
    }
    // --- PUT THIS AT THE VERY END OF renderQuestion() ---

    // 1. Clear old feedback messages
    if ($("feedback")) {
      $("feedback").textContent = "";
      $("feedback").className = "feedback";
    }

    // 2. Hide the Next Level button until they answer correctly
    if ($("nextLevelBtn")) {
      $("nextLevelBtn").classList.add("hidden");
      $("nextLevelBtn").textContent = "NEXT LEVEL";
    }

    // 3. Re-enable the Hint button
    if ($("hintBtn")) {
      $("hintBtn").disabled = false;
    }
  } // <-- This is the final closing bracket of renderQuestion()



  // =========================================================
  // TIMER
  // =========================================================

  function startTimer() {
    stopTimer();

    if (
      state.paused ||
      state.answerLocked ||
      state.screen !== "gameScreen"
    ) {
      return;
    }

    state.timerId = setInterval(() => {
      if (
        state.paused ||
        state.answerLocked ||
        state.screen !== "gameScreen"
      ) {
        return;
      }

      state.timeLeft -= 1;

      if (state.timeLeft < 0) {
        state.timeLeft = 0;
      }

      if ($("timerValue")) {
        $("timerValue").textContent =
          state.timeLeft;
      }

      if (state.timeLeft <= 0) {
        stopTimer();
        handleTimeout();
      }
    }, 1000);
  }

  // =========================================================
  // STOP TIMER
  // =========================================================

  function stopTimer() {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  // =========================================================
  // GAME OVER RESET
  // =========================================================

  function gameOverReset() {
    const user = getCurrentUser();

    stopTimer();

    state.currentQuestion = null;
    state.selectedAnswer = null;
    state.answerLocked = false;
    state.paused = false;

    if ($("pauseOverlay")) {
      $("pauseOverlay").classList.add(
        "hidden"
      );
    }

    if (!user) {
      showScreen("mainMenu");
      return;
    }

    // =======================================================
    // GAME OVER = FULL RESET
    // =======================================================

    user.currentLevel = 1;
    user.completedLevels = [];

    user.totalScore = 0;
    user.bestScore = 0;

    user.currentLevelScore = 0;

    // Hearts are restored ONLY after Game Over reset
    // so the player can begin a completely new run.
    user.lives = DEFAULT_LIVES;

    user.gameState = "ready";

    touchSave(user);
    saveData();

    showToast(
      "GAME OVER! Your progress has been reset."
    );

    setTimeout(() => {
      showScreen("mainMenu");
    }, 700);
  }

  // =========================================================
  // TIMEOUT
  // =========================================================

  function handleTimeout() {
    if (state.answerLocked) {
      return;
    }

    state.answerLocked = true;
    stopTimer();

    const user = getCurrentUser();

    if (!user) {
      return;
    }

    // =======================================================
    // DEDUCT ONE HEART
    // =======================================================

    user.lives = Math.max(
      0,
      Number(user.lives || 0) - 1
    );

    user.gameState = "timeout";

    touchSave(user);
    saveData();

    renderLives();

    if ($("checkAnswerBtn")) {
      $("checkAnswerBtn").classList.add(
        "hidden"
      );
    }

    setFeedback(
      "Time is up. You lost one life.",
      "error"
    );

    // =======================================================
    // LAST HEART LOST
    // =======================================================

    if (user.lives <= 0) {
      gameOverReset();
      return;
    }

    // =======================================================
    // HEARTS REMAIN
    // =======================================================

    setTimeout(() => {
      openRetryModal(
        "Time's Up",
        `You lost one heart. You have ${
          user.lives
        } heart${
          user.lives === 1 ? "" : "s"
        } remaining.`
      );
    }, 150);
  }

  // =========================================================
  // RETRY / RESTART MODAL
  // =========================================================

  function openRetryModal(title, message) {
    openModal({
      title,

      message,

      confirmText: "RESTART LEVEL",

      cancelText: "MAIN MENU",

      onConfirm: () => {
        restartLevel();
        return true;
      }
    });

    if ($("modalCancel")) {
      $("modalCancel").onclick = () => {
        closeModal();
        showScreen("mainMenu");
      };
    }
  }

  // =========================================================
  // CHECK ANSWER
  // =========================================================

  function checkAnswer() {
    if (state.answerLocked) {
      return;
    }

    const user = getCurrentUser();
    const q = state.currentQuestion;

    if (!user || !q) {
      return;
    }

    if (state.selectedAnswer === null) {
      showToast(
        "Choose an answer first."
      );

      return;
    }

    state.answerLocked = true;
    stopTimer();

// =========================================================
  // CHECK ANSWER
  // =========================================================

  function checkAnswer() {
    const user = getCurrentUser();
    const q = state.currentQuestion;

    if (!user || !q) return;
    
    // Spot the Difference logic is handled inside renderQuestion(), so exit early here
    if (user.gameMode === "spotDiff") return; 

    if (state.answerLocked) return;

    if (state.selectedAnswer === null) {
      showToast("Choose an answer first.");
      return;
    }

    state.answerLocked = true;
    stopTimer();

    // Determine the active bank and filter by language to get the true max level
    const activeBank = user.gameMode === "spotDiff" ? SPOT_DIFF_BANK : QUESTION_BANK;
    const langBank = activeBank.filter(question => question.language === user.language);

    // =======================================================
    // CORRECT ANSWER
    // =======================================================
    if (state.selectedAnswer === q.answerIndex) {
      const bonus = Math.max(0, state.timeLeft) * POINTS_SPEED_BONUS;
      const earned = POINTS_CORRECT + bonus;

      user.currentLevelScore = earned;
      user.totalScore += earned;
      user.bestScore = Math.max(user.bestScore, user.totalScore);

      if (!user.completedLevels.includes(q.level)) {
        user.completedLevels.push(q.level);
      }
      user.completedLevels.sort((a, b) => a - b);

// Inside checkAnswer() -> CORRECT ANSWER section:

      // IMPORTANT: Cap the next level at 3 (since each house has 3 questions)
      const MAX_QUESTIONS = 3;
      user.currentLevel = Math.min(q.level + 1, MAX_QUESTIONS + 1);
      user.gameState = "level-complete";

      touchSave(user);
      saveData();
      renderLives();

      setFeedback(`Correct! +${earned} points. ${q.explanation || ""}`, "success");

      if ($("checkAnswerBtn")) $("checkAnswerBtn").classList.add("hidden");

      if ($("nextLevelBtn")) {
        $("nextLevelBtn").classList.remove("hidden");
        // Change text to FINISH GAME if they beat question 3
        if (q.level >= MAX_QUESTIONS) {
          $("nextLevelBtn").textContent = "FINISH GAME";
        } else {
          $("nextLevelBtn").textContent = "NEXT LEVEL";
        }
      }
      return;
    }

    // =======================================================
    // WRONG ANSWER
    // =======================================================
    user.lives = Math.max(0, Number(user.lives || 0) - 1);
    user.gameState = "answer-incorrect";

    touchSave(user);
    saveData();
    renderLives();

    setFeedback(`Not quite. You lost one life. ${q.explanation}`, "error");

    if ($("checkAnswerBtn")) $("checkAnswerBtn").classList.add("hidden");

    if (user.lives <= 0) {
      setTimeout(() => gameOverReset(), 150);
      return;
    }

    $("nextLevelBtn")?.classList.add("hidden");
    setTimeout(() => openRetryModal("Incorrect Answer", `You lost one heart. You have ${user.lives} heart${user.lives === 1 ? "" : "s"} remaining.`), 150);
  }

  // =========================================================
  // NEXT LEVEL
  // =========================================================

  function nextLevel() {
    const user = requireUser("continue");
    if (!user) return;

    const q = state.currentQuestion;
    if (!q) return;

    // Determine which bank we are using based on saved user profile
    const bank = user.gameMode === "spotDiff" ? SPOT_DIFF_BANK : QUESTION_BANK;
    // Filter questions by the selected language
    const langBank = bank.filter(question => question.language === user.language);

    if (q.level >= langBank.length) {
      user.gameState = "complete";
      user.currentLevel = langBank.length + 1; 

      touchSave(user);
      saveData();
      
      showToast("All levels completed for this language!");
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }

    // =======================================================
    // ADVANCE TO NEXT LEVEL
    // =======================================================

    const nextLevelNumber = q.level + 1;
    const nextQuestion = getQuestionForLevel(nextLevelNumber);

    // Failsafe in case a level is missing in question.js
    if (!nextQuestion) {
      user.gameState = "complete";
      touchSave(user);
      saveData();
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }

    startLevel(nextLevelNumber);
  }

    // =======================================================
    // LAST HEART LOST
    // =======================================================

    if (user.lives <= 0) {
      // NO restart menu.
      // NO retry option.
      // Direct Game Over.
      setTimeout(() => {
        gameOverReset();
      }, 150);

      return;
    }

    // =======================================================
    // HEARTS STILL REMAIN
    // =======================================================

    $("nextLevelBtn")?.classList.add(
      "hidden"
    );

    setTimeout(() => {
      openRetryModal(
        "Incorrect Answer",
        `You lost one heart. You have ${
          user.lives
        } heart${
          user.lives === 1 ? "" : "s"
        } remaining.`
      );
    }, 150);
  }
// =========================================================
  // CHECK ANSWER
  // =========================================================

  function checkAnswer() {
    const user = getCurrentUser();
    const q = state.currentQuestion;

    if (!user || !q) return;
    
    // Spot the Difference logic is handled inside renderQuestion(), so exit early here
    if (user.gameMode === "spotDiff") return; 

    if (state.answerLocked) return;

    if (state.selectedAnswer === null) {
      showToast("Choose an answer first.");
      return;
    }

    state.answerLocked = true;
    stopTimer();

    // CRASH PREVENTION: Safely check for the banks in case question.js is missing parts
    let activeBank = [];
    if (user.gameMode === "spotDiff" && typeof SPOT_DIFF_BANK !== "undefined") {
      activeBank = SPOT_DIFF_BANK;
    } else if (typeof QUESTION_BANK !== "undefined") {
      activeBank = QUESTION_BANK;
    }
    
    const langBank = activeBank.filter(question => question.language === user.language);
    // If the language filter fails (e.g. old save file), fallback to the whole bank to prevent getting stuck
    const finalBank = langBank.length > 0 ? langBank : activeBank;

    // =======================================================
    // CORRECT ANSWER
    // =======================================================
    // Fallback to -1 if answerIndex is missing so it doesn't crash
    if (state.selectedAnswer === (q.answerIndex ?? -1)) {
      const bonus = Math.max(0, state.timeLeft) * POINTS_SPEED_BONUS;
      const earned = POINTS_CORRECT + bonus;

      user.currentLevelScore = earned;
      user.totalScore += earned;
      user.bestScore = Math.max(user.bestScore, user.totalScore);

      if (!user.completedLevels.includes(q.level)) {
        user.completedLevels.push(q.level);
      }
      user.completedLevels.sort((a, b) => a - b);

      user.currentLevel = Math.min(q.level + 1, finalBank.length + 1);
      user.gameState = "level-complete";

      touchSave(user);
      saveData();
      renderLives();

      setFeedback(`Correct! +${earned} points. ${q.explanation || ""}`, "success");

      if ($("checkAnswerBtn")) $("checkAnswerBtn").classList.add("hidden");

      if ($("nextLevelBtn")) {
        $("nextLevelBtn").classList.remove("hidden");
        if (q.level >= finalBank.length) {
          $("nextLevelBtn").textContent = "FINISH GAME";
        } else {
          $("nextLevelBtn").textContent = "NEXT LEVEL";
        }
      }
      return;
    }

    // =======================================================
    // WRONG ANSWER
    // =======================================================
    user.lives = Math.max(0, Number(user.lives || 0) - 1);
    user.gameState = "answer-incorrect";

    touchSave(user);
    saveData();
    renderLives();

    setFeedback(`Not quite. You lost one life. ${q.explanation || ""}`, "error");

    if ($("checkAnswerBtn")) $("checkAnswerBtn").classList.add("hidden");

    if (user.lives <= 0) {
      setTimeout(() => gameOverReset(), 150);
      return;
    }

    $("nextLevelBtn")?.classList.add("hidden");
    setTimeout(() => openRetryModal("Incorrect Answer", `You lost one heart. You have ${user.lives} heart${user.lives === 1 ? "" : "s"} remaining.`), 150);
  }
  // =========================================================
  // RENDER LIVES
  // =========================================================

  function renderLives() {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const lives = Math.min(
      DEFAULT_LIVES,
      Math.max(
        0,
        Number(user.lives) || 0
      )
    );

    if ($("livesValue")) {
      $("livesValue").textContent =
        "♥".repeat(lives) +
        "♡".repeat(
          DEFAULT_LIVES - lives
        );
    }

    if ($("scoreValue")) {
      $("scoreValue").textContent =
        user.totalScore;
    }
  }

  // =========================================================
  // FEEDBACK
  // =========================================================

  function setFeedback(message, type) {
    if (!$("feedback")) {
      return;
    }

    $("feedback").textContent = message;

    $("feedback").className =
      "feedback " + type;
  }

  // =========================================================
  // HINT
  // =========================================================

  function showHint() {
    if (
      state.answerLocked ||
      !state.currentQuestion
    ) {
      return;
    }

    setFeedback(
      "Hint: " +
        state.currentQuestion.hint,
      "info"
    );

    if ($("hintBtn")) {
      $("hintBtn").disabled = true;
    }
  }

// =========================================================
  // NEXT LEVEL
  // =========================================================

  function nextLevel() {
    const user = requireUser("continue");
    if (!user) return;

    const q = state.currentQuestion;
    if (!q) return;

// Determine which bank we are using
    const bank = user.gameMode === "spotDiff" ? SPOT_DIFF_BANK : QUESTION_BANK;
    // Filter questions by the selected language
    const langBank = bank.filter(question => question.language === user.language);

    if (q.level >= langBank.length) {
      user.gameState = "complete";
      // FIX: Ensure the level stays above the max length to trigger the completion screen on continue
      user.currentLevel = langBank.length + 1; 

      touchSave(user);
      saveData();
      
      showToast("All prototype levels completed!");
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }

    // =======================================================
    // NEXT LEVEL
    // =======================================================

    const nextLevelNumber = q.level + 1;
    const nextQuestion = getQuestionForLevel(nextLevelNumber);

    if (!nextQuestion) {
      user.gameState = "complete";
      touchSave(user);
      saveData();
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }

    startLevel(nextLevelNumber);
  }


  // =========================================================
  // RESTART LEVEL
  // =========================================================

  function restartLevel() {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const level =
      Math.max(
        1,
        Number(
          state.currentQuestion?.level ||
            user.currentLevel
        ) || 1
      );

    // =======================================================
    // CRITICAL FIX:
    // DO NOT RESTORE HEARTS HERE.
    // =======================================================

    user.lives = Math.min(
      DEFAULT_LIVES,
      Math.max(
        0,
        Number(user.lives) || 0
      )
    );

    // If there are no hearts left,
    // Restart must NOT revive the player.
    if (user.lives <= 0) {
      gameOverReset();
      return;
    }

    user.gameState = "playing";

    touchSave(user);
    saveData();

    startLevel(level);
  }

  // =========================================================
  // PAUSE
  // =========================================================

  function pauseGame() {
    if (
      state.screen !== "gameScreen"
    ) {
      return;
    }

    if (state.answerLocked) {
      return;
    }

    state.paused = true;

    stopTimer();

    if ($("pauseOverlay")) {
      $("pauseOverlay").classList.remove(
        "hidden"
      );
    }
  }

  // =========================================================
  // RESUME
  // =========================================================

  function resumeGame() {
    if (
      state.screen !== "gameScreen"
    ) {
      return;
    }

    if ($("pauseOverlay")) {
      $("pauseOverlay").classList.add(
        "hidden"
      );
    }

    state.paused = false;

    startTimer();
  }

  // =========================================================
  // LEADERBOARD
  // =========================================================

  function renderLeaderboard() {
    const users = userList().sort(
      (a, b) => {
        if (
          b.totalScore !==
          a.totalScore
        ) {
          return (
            b.totalScore -
            a.totalScore
          );
        }

        if (
          b.completedLevels.length !==
          a.completedLevels.length
        ) {
          return (
            b.completedLevels.length -
            a.completedLevels.length
          );
        }

        return a.username.localeCompare(
          b.username
        );
      }
    );

    if ($("leaderboardEmpty")) {
      $("leaderboardEmpty").classList.toggle(
        "hidden",
        users.length !== 0
      );
    }

    if (!$("leaderboardBody")) {
      return;
    }

    $("leaderboardBody").innerHTML =
      users
        .map(
          (user, index) => `
            <tr
              class="${
                user.id ===
                state.data.selectedUserId
                  ? "current"
                  : ""
              }"
            >
              <td>
                ${index + 1}
              </td>

              <td>
                <strong>
                  ${escapeHtml(
                    user.username
                  )}
                </strong>
              </td>

              <td>
                ${user.totalScore}
              </td>

              <td>
                ${
                  user.completedLevels.length
                    ? Math.max(
                        ...user.completedLevels
                      )
                    : 0
                }
              </td>

              <td>
                ${
                  user.completedLevels.length
                }
              </td>
            </tr>
          `
        )
        .join("");
  }

  // =========================================================
  // ESCAPE HTML
  // =========================================================

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

// =========================================================
  // EXIT
  // =========================================================

  function exitGame() {
    stopTimer();

    openModal({
      title: "Disconnect Session",
      message: "Are you sure you want to exit BrainByte? Your progress is automatically saved.",
      confirmText: "CONFIRM",
      cancelText: "CANCEL",
      onConfirm: () => {
        // 1. Attempt to close the browser tab
        window.close();

        // 2. Fallback if the browser blocks window.close()
        setTimeout(() => {
          window.location.href = '../index.html'; 
        }, 150);
      }
    });
  }
// =======================================================
    // LOGO SCREEN / REGISTRATION
    // =======================================================
    
    $("registerBtn")?.addEventListener("click", () => {
      const input = $("newUsername");
      const username = normalizeUsername(input ? input.value : "");

      if (!isValidUsername(username)) {
        alert("Invalid username. Use 2–20 letters, numbers, spaces, _ or -.");
        return;
      }

      if (usernameExists(username)) {
        alert("That username already exists.");
        return;
      }

      // Create and save the new user
      const profile = newProfile(username);
      state.data.users[profile.id] = profile;
      state.data.selectedUserId = profile.id;
      saveData();

      // Send the user to the main menu page
      window.location.href = "main.html";
    });
  // =========================================================
  // BIND EVENTS
  // =========================================================

  function bindEvents() {
    // =======================================================
    // MAIN MENU
    // =======================================================

    $("continueBtn")?.addEventListener(
      "click",
      () => {
        const user = getCurrentUser();
        if (!user) return;
        
        const hasProgress = 
          user.totalScore > 0 || 
          user.completedLevels.length > 0 || 
          user.currentLevel > 1;

        // If they have progress, continue immediately. 
        // If it is a New Game, show the mode selection.
        if (hasProgress) {
          goToWorld();
        } else {
          openModeSelectionModal();
        }
      }
    );
    $("tutorialBtn")?.addEventListener(
      "click",
      () => {
        showScreen("tutorialScreen");
      }
    );
    $("tutorialBackBtn")?.addEventListener(
      "click",
      () => {
        showScreen("mainMenu");
      }
    )


    $("optionsBtn")?.addEventListener(
      "click",
      () => {
        showScreen("optionsScreen");
      }
      
    );



    $("leaderboardsBtn")?.addEventListener(
      "click",
      () => {
        renderLeaderboard();

        showScreen(
          "leaderboardsScreen"
        );
      }
    );
    $("creditsBtn")?.addEventListener(
      "click", () => {
    showScreen("creditsScreen");
    });

    $("creditsBackBtn")?.addEventListener("click", () => {
    showScreen("mainMenu");
    });

    // =======================================================
    // BOSS KEY (SECRET ADMIN REVEAL)
    // =======================================================
    document.addEventListener("keydown", (event) => {
      // Press Ctrl + Shift + A to reveal or hide the Admin button
      if (event.ctrlKey && event.shiftKey && (event.key === "A" || event.key === "a")) {
        const adminBtn = $("adminBtn");
        if (adminBtn) {
          adminBtn.classList.toggle("hidden");
          
          if (!adminBtn.classList.contains("hidden")) {
            showToast("Admin access unlocked.");
          }
        }
      }
    });
// =======================================================
    // ADMIN ROUTING
    // =======================================================
    $("adminBtn")?.addEventListener("click", () => {
      showScreen("adminScreen");
    });
    
    $("adminBackBtn")?.addEventListener("click", () => {
      showScreen("mainMenu");
    });

    $("adminDeleteUserBtn")?.addEventListener("click", openAdminDeleteModal);
    
    // ADD THIS NEW LINE:
    $("adminDeleteAllBtn")?.addEventListener("click", openAdminDeleteAllModal);

    $("exitBtn")?.addEventListener(
      "click",
      exitGame
    );

    // =======================================================
    // OPTIONS
    // =======================================================


    $("loginBtn")?.addEventListener(
      "click",
      openChangeUserModal
    );


    $("optionsBackBtn")?.addEventListener(
      "click",
      () => {
        showScreen("mainMenu");
      }
    );

    // =======================================================
    // LEADERBOARD
    // =======================================================

    $("leaderboardsBackBtn")?.addEventListener(
      "click",
      () => {
        showScreen("mainMenu");
      }
    );

    // =======================================================
    // GAME
    // =======================================================

    $("checkAnswerBtn")?.addEventListener(
      "click",
      checkAnswer
    );

    $("hintBtn")?.addEventListener(
      "click",
      showHint
    );

    $("nextLevelBtn")?.addEventListener(
      "click",
      nextLevel
    );

    // =======================================================
    // PAUSE
    // =======================================================

    $("pauseBtn")?.addEventListener(
      "click",
      pauseGame
    );

    // =======================================================
    // RESUME
    // =======================================================

    $("resumeBtn")?.addEventListener(
      "click",
      resumeGame
    );

    // =======================================================
    // RESTART LEVEL
    // =======================================================

    $("restartBtn")?.addEventListener(
      "click",
      () => {
        openModal({
          title: "Restart Level?",

          message:
            "The current level will restart, but any hearts you already lost will remain lost.",

          confirmText: "RESTART",

          cancelText: "CANCEL",

          onConfirm: () => {
            restartLevel();
          }
        });
      }
    );

    // =======================================================
    // GAME MENU
    // =======================================================

    $("gameMenuBtn")?.addEventListener(
      "click",
      () => {
        stopTimer();

        showScreen("mainMenu");
      }
    );

    // =======================================================
    // PAUSE MENU
    // =======================================================

    $("pauseMenuBtn")?.addEventListener(
      "click",
      () => {
        stopTimer();

        if ($("pauseOverlay")) {
          $("pauseOverlay").classList.add(
            "hidden"
          );
        }

        showScreen("mainMenu");
      }
    );

    // =======================================================
    // MODAL CANCEL
    // =======================================================

    $("modalCancel")?.addEventListener(
      "click",
      closeModal
    );

    // =======================================================
    // ESCAPE KEY
    // =======================================================

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Escape") {
          return;
        }

        // Close normal modal first.
        if (
          $("modalOverlay") &&
          !$("modalOverlay").classList.contains(
            "hidden"
          )
        ) {
          closeModal();
          return;
        }

        // Resume from pause overlay.
        if (
          $("pauseOverlay") &&
          !$("pauseOverlay").classList.contains(
            "hidden"
          )
        ) {
          resumeGame();
          return;
        }

        // Pause game.
        if (
          state.screen ===
          "gameScreen"
        ) {
          pauseGame();
        }
      }
    );
  }


// =========================================================
  // INITIALIZE
  // =========================================================

  function initialize() {
    bindEvents();
    updateHeader();
    showScreen("mainMenu");

    // Coming from a Godot house: main.html?level=1&lang=cpp
    const params = new URLSearchParams(location.search);
    const level = Number(params.get("level"));
    const lang = params.get("lang"); 

    const user = getCurrentUser();
    if (level > 0 && user) {
      // If Godot sends a language in the URL, automatically switch the user to that language
      if (lang) {
        user.language = lang;
        saveData();
      }
      startLevel(level);
    }
  }
  // =========================================================
  // START
  // =========================================================

  initialize();
})();
