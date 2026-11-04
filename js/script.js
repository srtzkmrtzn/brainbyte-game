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
    language: "python",
    bugsFound: []
  };

  const $ = (id) => document.getElementById(id);

  // =========================================================
  // DATA MANAGEMENT
  // =========================================================

  function createId() {
    return "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { users: {}, selectedUserId: null };
      
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid save");
      if (!parsed.users || typeof parsed.users !== "object") parsed.users = {};
      if (!("selectedUserId" in parsed)) parsed.selectedUserId = null;
      
      return parsed;
    } catch (error) {
      console.warn("BrainByte save data could not be loaded:", error);
      return { users: {}, selectedUserId: null };
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      updateHeader();
    } catch (error) {
      console.error("Could not save BrainByte data:", error);
      showToast("Save failed. Check browser storage permissions.");
    }
  }

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
      gameMode: "codeDebug",
      language: "python",
      gameState: "ready",
      lastSave: now,
      createdAt: now
    };
  }

  function getCurrentUser() {
    return state.data.users[state.data.selectedUserId] || null;
  }

  function userList() {
    return Object.values(state.data.users).sort((a, b) =>
      a.username.localeCompare(b.username, undefined, { sensitivity: "base" })
    );
  }

  function normalizeUsername(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function isValidUsername(username) {
    return username.length >= 2 && username.length <= 20 && /^[a-zA-Z0-9 _-]+$/.test(username);
  }

  function usernameExists(username, exceptId = null) {
    return userList().some(
      (user) => user.id !== exceptId && user.username.toLowerCase() === username.toLowerCase()
    );
  }

  function formatSaveTime(iso) {
    if (!iso) return "No save yet";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "No save yet";
    return date.toLocaleString([], {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit"
    });
  }

  function touchSave(user) {
    user.lastSave = new Date().toISOString();
  }

  // =========================================================
  // UI & SCREENS
  // =========================================================

  function updateHeader() {
    const user = getCurrentUser();
    const name = user ? user.username : "No user selected";

    if ($("headerUser")) $("headerUser").textContent = name;
    if ($("menuUsername")) $("menuUsername").textContent = user ? user.username : "Guest";
    if ($("optionsUsername")) $("optionsUsername").textContent = user ? user.username : "Guest";
    if ($("lastSave")) $("lastSave").textContent = user ? formatSaveTime(user.lastSave) : "No save yet";

    if ($("continueBtn")) {
      $("continueBtn").disabled = !user;
      $("continueBtn").title = user ? "Continue " + user.username : "Add or select a user first";
      $("continueBtn").style.opacity = user ? "1" : ".55";

      if (user) {
        const hasProgress = user.totalScore > 0 || user.completedLevels.length > 0 || user.currentLevel > 1;
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

  function showScreen(id) {
    stopTimer();
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    const target = $(id);
    if (!target) return;
    
    target.classList.add("active");
    state.screen = id;
    state.paused = false;

    if ($("pauseOverlay")) $("pauseOverlay").classList.add("hidden");
    updateHeader();
  }

  function requireUser(actionText = "do that") {
    const user = getCurrentUser();
    if (!user) {
      showToast("Create or select a user before you " + actionText + ".");
      window.location.href = 'index.html'; 
      return null;
    }
    return user;
  }

  function showToast(message) {
    const toast = $("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // =========================================================
  // MODALS
  // =========================================================

  function openModal({ title, message = "", body = "", confirmText = "CONFIRM", cancelText = "CANCEL", onConfirm, showCancel = true }) {
    if (!$("modalOverlay")) return;
    $("modalTitle").textContent = title;
    $("modalMessage").textContent = message;
    $("modalBody").innerHTML = body;
    $("modalConfirm").textContent = confirmText;
    $("modalCancel").textContent = cancelText;
    $("modalCancel").classList.toggle("hidden", !showCancel);
    $("modalOverlay").classList.remove("hidden");

    $("modalConfirm").onclick = () => {
      let result = true;
      if (typeof onConfirm === "function") result = onConfirm();
      if (result !== false) closeModal();
    };
  }

  function closeModal() {
    if ($("modalOverlay")) $("modalOverlay").classList.add("hidden");
    if ($("modalBody")) $("modalBody").innerHTML = "";
    if ($("modalConfirm")) $("modalConfirm").onclick = null;
  }

  function openAddUserModal() {
    openModal({
      title: "Add User",
      message: "Create a player profile. Usernames must be 2–20 characters.",
      body: `<div class="form-field"><label for="newUsername">USERNAME</label><input id="newUsername" type="text" maxlength="20" autocomplete="off" placeholder="e.g. CodeMaster" /></div>`,
      confirmText: "CREATE USER",
      onConfirm: () => {
        const input = $("newUsername");
        const username = normalizeUsername(input ? input.value : "");
        if (!isValidUsername(username)) {
          showToast("Invalid username. Use 2–20 letters, numbers, spaces, _ or -.");
          return false;
        }
        if (usernameExists(username)) {
          showToast("That username already exists.");
          return false;
        }

        const profile = newProfile(username);
        state.data.users[profile.id] = profile;
        state.data.selectedUserId = profile.id;
        saveData();
        showToast("User created: " + username);
        showScreen("mainMenu");
        return true;
      }
    });
    setTimeout(() => { if ($("newUsername")) $("newUsername").focus(); }, 50);
  }

  function openChangeUserModal() {
    const users = userList();
    if (!users.length) {
      showToast("No users found. Please register first.");
      return;
    }

    const body = `<div class="user-list">
      ${users.map((user) => `
        <button class="user-choice ${user.id === state.data.selectedUserId ? "selected" : ""}" data-user-id="${escapeHtml(user.id)}" type="button">
          <span>${escapeHtml(user.username)}</span>
          <small>Level ${user.currentLevel} • ${user.totalScore} pts</small>
        </button>`).join("")}
      </div>`;

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
        document.querySelectorAll(".user-choice").forEach((b) => b.classList.remove("selected"));
        button.classList.add("selected");
      });
    });
  }

  function openAdminDeleteModal() {
    const users = userList();
    if (!users.length) {
      showToast("No users exist.");
      return;
    }
    const body = `<div class="user-list">
      ${users.map((user) => `
        <button class="user-choice" data-delete-id="${escapeHtml(user.id)}" type="button" style="border-color: var(--red);">
          <span>${escapeHtml(user.username)}</span>
          <small style="color: var(--red);">DELETE</small>
        </button>`).join("")}
      </div>`;

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

  function openAdminDeleteAllModal() {
    const users = userList();
    if (!users.length) {
      showToast("Database is already empty.");
      return;
    }
    openModal({
      title: "NUKE DATABASE",
      message: "CRITICAL WARNING: This will permanently delete ALL player profiles, scores, and save data.",
      confirmText: "DELETE EVERYTHING",
      cancelText: "CANCEL",
      onConfirm: () => {
        state.data.users = {};
        state.data.selectedUserId = null;
        saveData();
        showToast("Database wiped. All users deleted.");
        setTimeout(() => {
          if (window.location.pathname.includes("main.html")) {
            window.location.href = "index.html";
          }
        }, 1000);
        return true;
      }
    });
  }

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
        saveData();
        openLanguageSelectionModal();
      };
    }
    if ($("modeSpotDiff")) {
      $("modeSpotDiff").onclick = () => {
        const user = getCurrentUser();
        user.gameMode = "spotDiff";
        saveData();
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
            <span class="feature-icon">🐍</span><span><strong>PYTHON</strong></span>
          </button>
          <button class="feature-card lang-btn" data-lang="cpp" type="button" style="min-height: 80px;">
            <span class="feature-icon">⚙️</span><span><strong>C++</strong></span>
          </button>
          <button class="feature-card lang-btn" data-lang="java" type="button" style="min-height: 80px;">
            <span class="feature-icon">☕</span><span><strong>JAVA</strong></span>
          </button>
          <button class="feature-card lang-btn" data-lang="web" type="button" style="min-height: 80px;">
            <span class="feature-icon">🌐</span><span><strong>HTML/CSS/JS</strong></span>
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
        saveData();
        closeModal();
        goToWorld(); 
      };
    });
  }

  // =========================================================
  // GAME PROGRESSION
  // =========================================================

  function startNewGame() {
    const user = requireUser("start a game");
    if (!user) return;
    const hasProgress = user.totalScore > 0 || user.completedLevels.length > 0 || user.currentLevel > 1;

    if (hasProgress) {
      openModal({
        title: "Start New Game?",
        message: `This will reset ${user.username}'s current progress, score, level, and lives.`,
        confirmText: "RESET & START",
        onConfirm: () => resetUserProgress(user)
      });
    } else {
      resetUserProgress(user);
    }
  }

  function resetUserProgress(user) {
    user.currentLevel = 1;
    user.completedLevels = [];
    user.totalScore = 0;
    user.bestScore = 0;
    user.lives = DEFAULT_LIVES;
    user.currentLevelScore = 0;
    user.gameState = "playing";
    touchSave(user);
    saveData();
    startLevel(1);
  }

  function continueGame() {
    const user = requireUser("continue");
    if (!user) return;
    if (Number(user.lives) <= 0) {
      gameOverReset();
      return;
    }
    user.gameState = "playing";
    touchSave(user);
    saveData();
    startLevel(Math.max(1, Number(user.currentLevel) || 1));
  }

  function goToWorld() {
    const user = requireUser("play");
    if (!user) return;
    user.gameState = "playing";
    touchSave(user);
    saveData();
    window.location.href = "game.html";
  }
  function goToMap() {
  stopTimer();
  window.location.href = "game.html";
  }

  function getQuestionForLevel(level) {
    const user = getCurrentUser();
    if (!user) return null;
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

  function startLevel(level) {
    const user = getCurrentUser();
    if (!user) return;
    const safeLevel = Math.max(1, Number(level) || 1);
    const question = getQuestionForLevel(safeLevel);

    if (!question) {
      user.gameState = "complete";
      touchSave(user);
      saveData();
      showToast("All prototype levels completed!");
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }

    state.currentQuestion = question;
    state.selectedAnswer = null;
    state.answerLocked = false;
    state.paused = false;
    const difficulty = question.difficulty || "MEDIUM";
    state.timeLeft = DIFFICULTY_TIME[difficulty] || LEVEL_TIME;
    user.currentLevel = safeLevel;
    user.currentLevelScore = 0;
    user.lives = Math.min(DEFAULT_LIVES, Math.max(0, Number(user.lives) || 0));

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

  function renderQuestion() {
    const q = state.currentQuestion;
    const user = getCurrentUser();
    if (!q || !user) return;

    if ($("levelNumber")) $("levelNumber").textContent = q.level;
    if ($("scoreValue")) $("scoreValue").textContent = user.totalScore;
    renderLives();
    if ($("timerValue")) $("timerValue").textContent = state.timeLeft;
    if ($("difficultyBadge")) $("difficultyBadge").textContent = q.difficulty;
    if ($("challengeType")) $("challengeType").textContent = q.type;
    if ($("questionTitle")) $("questionTitle").textContent = q.title;
    if ($("questionPrompt")) $("questionPrompt").textContent = q.prompt;

    if (user.gameMode === "spotDiff") {
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
        $("debugCode").style.minHeight = "190px"; 
        $("debugCode").style.fontSize = "14px";
      }

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

            if (state.bugsFound.length === q.bugLines.length) {
              state.answerLocked = true;
              stopTimer();
              const earned = POINTS_CORRECT + Math.max(0, state.timeLeft) * POINTS_SPEED_BONUS;
              user.currentLevelScore = earned;
              user.totalScore += earned;
              user.bestScore = Math.max(user.bestScore, user.totalScore);
              
              if (!user.completedLevels.includes(q.level)) user.completedLevels.push(q.level);
              user.completedLevels.sort((a, b) => a - b);
              
              user.currentLevel = q.level + 1;
              user.gameState = "level-complete";
              touchSave(user); saveData(); renderLives();
              
              setFeedback(`All bugs found! +${earned} points. ${q.explanation || ''}`, "success");
              
              if ($("nextLevelBtn")) {
                $("nextLevelBtn").classList.remove("hidden");
                const nextQ = getQuestionForLevel(user.currentLevel);
                if (!nextQ) {
                  $("nextLevelBtn").textContent = "FINISH GAME";
                } else if (nextQ.house !== q.house) {
                  $("nextLevelBtn").textContent = "HOUSE CLEARED (RETURN)";
                } else {
                  $("nextLevelBtn").textContent = "NEXT QUESTION";
                }
              }
            }
          } else {
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
      $("referenceBox")?.classList.add("hidden");
      if ($("codeLayout")) $("codeLayout").style.gridTemplateColumns = "1fr";
      $("answerOptions")?.classList.remove("hidden");
      $("checkAnswerBtn")?.classList.remove("hidden");
      if ($("answerLabel")) $("answerLabel").textContent = "Choose the buggy line";
      if ($("referenceCode")) $("referenceCode").textContent = q.referenceCode;
      
      if ($("debugCode")) {
        $("debugCode").textContent = q.debugCode;
        $("debugCode").style.minHeight = "350px";
        $("debugCode").style.minWidth = "1100px";
        $("debugCode").style.fontSize = "16px";
      }
      
      if ($("answerOptions")) {
        $("answerOptions").innerHTML = q.answers.map((answer, index) => `
          <button type="button" class="answer-option" data-answer="${index}">${escapeHtml(answer)}</button>
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

    if ($("feedback")) {
      $("feedback").textContent = "";
      $("feedback").className = "feedback";
    }
    if ($("nextLevelBtn")) {
      $("nextLevelBtn").classList.add("hidden");
      $("nextLevelBtn").textContent = "NEXT LEVEL";
    }
    if ($("hintBtn")) {
      $("hintBtn").disabled = false;
    }
  }

  function startTimer() {
    stopTimer();
    if (state.paused || state.answerLocked || state.screen !== "gameScreen") return;
    
    state.timerId = setInterval(() => {
      if (state.paused || state.answerLocked || state.screen !== "gameScreen") return;
      
      state.timeLeft -= 1;
      if (state.timeLeft < 0) state.timeLeft = 0;
      if ($("timerValue")) $("timerValue").textContent = state.timeLeft;
      
      if (state.timeLeft <= 0) {
        stopTimer();
        handleTimeout();
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function gameOverReset() {
    const user = getCurrentUser();
    stopTimer();
    state.currentQuestion = null;
    state.selectedAnswer = null;
    state.answerLocked = false;
    state.paused = false;

    if ($("pauseOverlay")) $("pauseOverlay").classList.add("hidden");
    if (!user) {
      showScreen("mainMenu");
      return;
    }

    user.currentLevel = 1;
    user.completedLevels = [];
    user.totalScore = 0;
    user.bestScore = 0;
    user.currentLevelScore = 0;
    user.lives = DEFAULT_LIVES;
    user.gameState = "ready";

    touchSave(user);
    saveData();
    showToast("GAME OVER! Your progress has been reset.");
    setTimeout(() => { showScreen("mainMenu"); }, 700);
  }

  function handleTimeout() {
    if (state.answerLocked) return;
    state.answerLocked = true;
    stopTimer();
    const user = getCurrentUser();
    if (!user) return;

    user.lives = Math.max(0, Number(user.lives || 0) - 1);
    user.gameState = "timeout";
    touchSave(user);
    saveData();
    renderLives();

    if ($("checkAnswerBtn")) $("checkAnswerBtn").classList.add("hidden");
    setFeedback("Time is up. You lost one life.", "error");

    if (user.lives <= 0) {
      gameOverReset();
      return;
    }

    setTimeout(() => {
      openRetryModal("Time's Up", `You lost one heart. You have ${user.lives} heart${user.lives === 1 ? "" : "s"} remaining.`);
    }, 150);
  }

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
  // CHECK ANSWER & NEXT LEVEL
  // =========================================================

  function checkAnswer() {
    const user = getCurrentUser();
    const q = state.currentQuestion;

    if (!user || !q) return;
    if (user.gameMode === "spotDiff") return; 
    if (state.answerLocked) return;

    if (state.selectedAnswer === null) {
      showToast("Choose an answer first.");
      return;
    }

    state.answerLocked = true;
    stopTimer();

    let activeBank = [];
    if (user.gameMode === "spotDiff" && typeof SPOT_DIFF_BANK !== "undefined") {
      activeBank = SPOT_DIFF_BANK;
    } else if (typeof QUESTION_BANK !== "undefined") {
      activeBank = QUESTION_BANK;
    }
    
    const langBank = activeBank.filter(question => question.language === user.language);

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

      user.currentLevel = q.level + 1;
      user.gameState = "level-complete";

      touchSave(user);
      saveData();
      renderLives();

      setFeedback(`Correct! +${earned} points. ${q.explanation || ""}`, "success");
      if ($("checkAnswerBtn")) $("checkAnswerBtn").classList.add("hidden");

      if ($("nextLevelBtn")) {
        $("nextLevelBtn").classList.remove("hidden");
        
        const nextQ = getQuestionForLevel(user.currentLevel);
        if (!nextQ) {
          $("nextLevelBtn").textContent = "FINISH GAME";
        } else if (nextQ.house !== q.house) {
          $("nextLevelBtn").textContent = "HOUSE CLEARED (RETURN)";
        } else {
          $("nextLevelBtn").textContent = "NEXT QUESTION";
        }
      }
      return;
    }

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

  function nextLevel() {
    const user = requireUser("continue");
    if (!user) return;

    const q = state.currentQuestion; 
    if (!q) return;

    const nextLevelNumber = q.level + 1;
    const nextQuestion = getQuestionForLevel(nextLevelNumber);

    if (!nextQuestion) {
      user.gameState = "complete";
      user.currentLevel = nextLevelNumber; 
      touchSave(user);
      saveData();
      
      showToast("All levels completed!");
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }

    if (nextQuestion.house !== q.house) {
       user.gameState = "playing";
       touchSave(user);
       saveData();
       window.location.href = "game.html"; 
       return;
    }

    startLevel(nextLevelNumber);
  }

  function renderLives() {
    const user = getCurrentUser();
    if (!user) return;
    const lives = Math.min(DEFAULT_LIVES, Math.max(0, Number(user.lives) || 0));

    if ($("livesValue")) $("livesValue").textContent = "♥".repeat(lives) + "♡".repeat(DEFAULT_LIVES - lives);
    if ($("scoreValue")) $("scoreValue").textContent = user.totalScore;
  }

  function setFeedback(message, type) {
    if (!$("feedback")) return;
    $("feedback").textContent = message;
    $("feedback").className = "feedback " + type;
  }

  function showHint() {
    if (state.answerLocked || !state.currentQuestion) return;
    setFeedback("Hint: " + state.currentQuestion.hint, "info");
    if ($("hintBtn")) $("hintBtn").disabled = true;
  }

  function restartLevel() {
    const user = getCurrentUser();
    if (!user) return;
    const level = Math.max(1, Number(state.currentQuestion?.level || user.currentLevel) || 1);

    user.lives = Math.min(DEFAULT_LIVES, Math.max(0, Number(user.lives) || 0));
    if (user.lives <= 0) {
      gameOverReset();
      return;
    }

    user.gameState = "playing";
    touchSave(user);
    saveData();
    startLevel(level);
  }

  function pauseGame() {
    if (state.screen !== "gameScreen" || state.answerLocked) return;
    state.paused = true;
    stopTimer();
    if ($("pauseOverlay")) $("pauseOverlay").classList.remove("hidden");
  }

  function resumeGame() {
    if (state.screen !== "gameScreen") return;
    if ($("pauseOverlay")) $("pauseOverlay").classList.add("hidden");
    state.paused = false;
    startTimer();
  }

  function renderLeaderboard() {
    const users = userList().sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (b.completedLevels.length !== a.completedLevels.length) return b.completedLevels.length - a.completedLevels.length;
      return a.username.localeCompare(b.username);
    });

    if ($("leaderboardEmpty")) $("leaderboardEmpty").classList.toggle("hidden", users.length !== 0);
    if (!$("leaderboardBody")) return;

    $("leaderboardBody").innerHTML = users.map((user, index) => `
      <tr class="${user.id === state.data.selectedUserId ? "current" : ""}">
        <td>${index + 1}</td>
        <td><strong>${escapeHtml(user.username)}</strong></td>
        <td>${user.totalScore}</td>
        <td>${user.completedLevels.length ? Math.max(...user.completedLevels) : 0}</td>
        <td>${user.completedLevels.length}</td>
      </tr>
    `).join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function exitGame() {
    stopTimer();
    openModal({
      title: "Disconnect Session",
      message: "Are you sure you want to exit BrainByte? Your progress is automatically saved.",
      confirmText: "CONFIRM",
      cancelText: "CANCEL",
      onConfirm: () => {
        window.close();
        setTimeout(() => { window.location.href = '../index.html'; }, 150);
      }
    });
  }

  function bindEvents() {
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
      const profile = newProfile(username);
      state.data.users[profile.id] = profile;
      state.data.selectedUserId = profile.id;
      saveData();
      window.location.href = "main.html";
    });

    $("continueBtn")?.addEventListener("click", () => {
      const user = getCurrentUser();
      if (!user) return;
      const hasProgress = user.totalScore > 0 || user.completedLevels.length > 0 || user.currentLevel > 1;
      if (hasProgress) {
        goToWorld();
      } else {
        openModeSelectionModal();
      }
    });

    $("tutorialBtn")?.addEventListener("click", () => { showScreen("tutorialScreen"); });
    $("tutorialBackBtn")?.addEventListener("click", () => { showScreen("mainMenu"); });
    $("optionsBtn")?.addEventListener("click", () => { showScreen("optionsScreen"); });
    $("optionsBackBtn")?.addEventListener("click", () => { showScreen("mainMenu"); });
    
    $("leaderboardsBtn")?.addEventListener("click", () => {
      renderLeaderboard();
      showScreen("leaderboardsScreen");
    });
    $("leaderboardsBackBtn")?.addEventListener("click", () => { showScreen("mainMenu"); });
    
    $("creditsBtn")?.addEventListener("click", () => { showScreen("creditsScreen"); });
    $("creditsBackBtn")?.addEventListener("click", () => { showScreen("mainMenu"); });

    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.shiftKey && (event.key === "A" || event.key === "a")) {
        const adminBtn = $("adminBtn");
        if (adminBtn) {
          adminBtn.classList.toggle("hidden");
          if (!adminBtn.classList.contains("hidden")) showToast("Admin access unlocked.");
        }
      }
    });

    $("adminBtn")?.addEventListener("click", () => { showScreen("adminScreen"); });
    $("adminBackBtn")?.addEventListener("click", () => { showScreen("mainMenu"); });
    $("adminDeleteUserBtn")?.addEventListener("click", openAdminDeleteModal);
    $("adminDeleteAllBtn")?.addEventListener("click", openAdminDeleteAllModal);
    $("exitBtn")?.addEventListener("click", exitGame);
    $("loginBtn")?.addEventListener("click", openChangeUserModal);
    $("checkAnswerBtn")?.addEventListener("click", checkAnswer);
    $("hintBtn")?.addEventListener("click", showHint);
    $("nextLevelBtn")?.addEventListener("click", nextLevel);
    $("pauseBtn")?.addEventListener("click", pauseGame);
    $("resumeBtn")?.addEventListener("click", resumeGame);
    
    $("restartBtn")?.addEventListener("click", () => {
      openModal({
        title: "Restart Level?",
        message: "The current level will restart, but any hearts you already lost will remain lost.",
        confirmText: "RESTART",
        cancelText: "CANCEL",
        onConfirm: () => { restartLevel(); }
      });
    });

    $("gameMenuBtn")?.addEventListener("click", goToMap);

    $("pauseMenuBtn")?.addEventListener("click", () => {
      if ($("pauseOverlay")) $("pauseOverlay").classList.add("hidden");
      goToMap();
    });

    $("modalCancel")?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if ($("modalOverlay") && !$("modalOverlay").classList.contains("hidden")) {
        closeModal();
        return;
      }
      if ($("pauseOverlay") && !$("pauseOverlay").classList.contains("hidden")) {
        resumeGame();
        return;
      }
      if (state.screen === "gameScreen") {
        pauseGame();
      }
    });
  }
// =========================================================
  // INITIALIZE
  // =========================================================

  function initialize() {
    bindEvents();
    updateHeader();

    const params = new URLSearchParams(location.search);
    const lang = params.get("lang"); 
    const user = getCurrentUser();

    // 1. If no user is logged in, always show the Main Menu
    if (!user) {
      showScreen("mainMenu");
      return;
    }

    if (lang) {
      user.language = lang;
      saveData();
    }

    // 2. CHECK WHERE YOU CAME FROM:
    // If the URL has NO level parameter at all (meaning you just booted the game or hit Main Menu), stay on menu.
    if (!params.has("level")) {
      showScreen("mainMenu");
      return;
    }

    // 3. IF YOU ENTERED ANY BUILDING:
    // Ignore whatever random number Godot's door sent, and load the player's 
    // ACTUAL current level from their save file!
    const targetLevel = user.currentLevel;

    if (targetLevel <= 23) {
      startLevel(targetLevel);
    } else {
      showToast("You have completed all buildings!");
      renderLeaderboard();
      showScreen("leaderboardsScreen");
    }
  }
  // =========================================================
  // START
  // =========================================================

  initialize();
})();