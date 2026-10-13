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
    answerLocked: false
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
      showToast(
        "Create or select a user before you " +
          actionText +
          "."
      );

      openAddUserModal(onCreated);
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

        showScreen("optionsScreen");

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
      openAddUserModal();
      return;
    }

    const body = `
      <div class="user-list">
        ${users
          .map(
            (user) => `
              <button
                class="user-choice ${
                  user.id ===
                  state.data.selectedUserId
                    ? "selected"
                    : ""
                }"
                data-user-id="${escapeHtml(
                  user.id
                )}"
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

      message:
        "Select the profile you want to use.",

      body,

      confirmText: "SELECT USER",

      onConfirm: () => {
        const selected =
          document.querySelector(
            ".user-choice.selected"
          );

        if (!selected) {
          showToast(
            "Select a user first."
          );

          return false;
        }

        state.data.selectedUserId =
          selected.dataset.userId;

        saveData();

        const user = getCurrentUser();

        showToast(
          "Switched to " + user.username
        );

        showScreen("optionsScreen");

        return true;
      }
    });

    document
      .querySelectorAll(".user-choice")
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            document
              .querySelectorAll(".user-choice")
              .forEach((b) => {
                b.classList.remove(
                  "selected"
                );
              });

            button.classList.add("selected");
          }
        );
      });
  }

  // =========================================================
  // DELETE USER
  // =========================================================

  function openDeleteUserModal() {
    const user = requireUser(
      "delete a user"
    );

    if (!user) {
      return;
    }

    openModal({
      title: "Delete User",

      message:
        `Delete "${user.username}" and all of this profile's saved progress? This cannot be undone.`,

      confirmText:
        "DELETE PERMANENTLY",

      cancelText: "KEEP USER",

      onConfirm: () => {
        const id = user.id;

        delete state.data.users[id];

        const remaining = userList();

        state.data.selectedUserId =
          remaining[0]?.id || null;

        saveData();

        showToast("User deleted.");

        showScreen("optionsScreen");
      }
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

  // =========================================================
  // GET QUESTION
  // =========================================================

  function getQuestionForLevel(level) {
    if (
      typeof QUESTION_BANK === "undefined" ||
      !Array.isArray(QUESTION_BANK)
    ) {
      console.error(
        "QUESTION_BANK is missing."
      );

      return null;
    }

    return (
      QUESTION_BANK.find(
        (q) => q.level === level
      ) || null
    );
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

    if ($("referenceCode")) {
      $("referenceCode").textContent =
        q.referenceCode;
    }

    if ($("debugCode")) {
      $("debugCode").textContent =
        q.debugCode;
    }

    if ($("answerOptions")) {
      $("answerOptions").innerHTML =
        q.answers
          .map(
            (answer, index) => `
              <button
                type="button"
                class="answer-option"
                data-answer="${index}"
              >
                ${escapeHtml(answer)}
              </button>
            `
          )
          .join("");
    }

    if ($("feedback")) {
      $("feedback").textContent = "";
      $("feedback").className =
        "feedback";
    }

    if ($("checkAnswerBtn")) {
      $("checkAnswerBtn").classList.remove(
        "hidden"
      );
    }

    if ($("nextLevelBtn")) {
      $("nextLevelBtn").classList.add(
        "hidden"
      );

      $("nextLevelBtn").textContent =
        "NEXT LEVEL";
    }

    if ($("hintBtn")) {
      $("hintBtn").disabled = false;
    }

    document
      .querySelectorAll(".answer-option")
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            if (
              state.answerLocked ||
              state.paused
            ) {
              return;
            }

            state.selectedAnswer =
              Number(
                button.dataset.answer
              );

            document
              .querySelectorAll(
                ".answer-option"
              )
              .forEach((b) => {
                b.classList.remove(
                  "selected"
                );
              });

            button.classList.add(
              "selected"
            );
          }
        );
      });
  }

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

    // =======================================================
    // CORRECT ANSWER
    // =======================================================

    if (
      state.selectedAnswer ===
      q.answerIndex
    ) {
      const bonus =
        Math.max(
          0,
          state.timeLeft
        ) * POINTS_SPEED_BONUS;

      const earned =
        POINTS_CORRECT + bonus;

      user.currentLevelScore = earned;

      user.totalScore += earned;

      user.bestScore = Math.max(
        user.bestScore,
        user.totalScore
      );

      if (
        !user.completedLevels.includes(
          q.level
        )
      ) {
        user.completedLevels.push(
          q.level
        );
      }

      user.completedLevels.sort(
        (a, b) => a - b
      );

      // IMPORTANT:
      // The next level is q.level + 1.
      user.currentLevel = Math.min(
        q.level + 1,
        QUESTION_BANK.length + 1
      );

      user.gameState =
        "level-complete";

      touchSave(user);
      saveData();

      renderLives();

      setFeedback(
        `Correct! +${earned} points. ${q.explanation}`,
        "success"
      );

      if ($("checkAnswerBtn")) {
        $("checkAnswerBtn").classList.add(
          "hidden"
        );
      }

      if ($("nextLevelBtn")) {
        $("nextLevelBtn").classList.remove(
          "hidden"
        );

        if (
          q.level >=
          QUESTION_BANK.length
        ) {
          $("nextLevelBtn").textContent =
            "FINISH GAME";
        } else {
          $("nextLevelBtn").textContent =
            "NEXT LEVEL";
        }
      }

      return;
    }

    // =======================================================
    // WRONG ANSWER
    // =======================================================

    user.lives = Math.max(
      0,
      Number(user.lives || 0) - 1
    );

    user.gameState =
      "answer-incorrect";

    touchSave(user);
    saveData();

    renderLives();

    setFeedback(
      `Not quite. You lost one life. ${q.explanation}`,
      "error"
    );

    if ($("checkAnswerBtn")) {
      $("checkAnswerBtn").classList.add(
        "hidden"
      );
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

    if (q.level >= QUESTION_BANK.length) {
      user.gameState = "complete";
      // FIX: Ensure the level stays above the max length to trigger the completion screen on continue
      user.currentLevel = QUESTION_BANK.length + 1; 

      touchSave(user);
      saveData();
      
      showToast("All prototype levels completed!");
      renderLeaderboard();
      showScreen("leaderboardsScreen");
      return;
    }
    
    // ... remainder of function ...

    // =======================================================
    // NEXT LEVEL
    // =======================================================

    const nextLevelNumber =
      q.level + 1;

    const nextQuestion =
      getQuestionForLevel(
        nextLevelNumber
      );

    if (!nextQuestion) {
      user.gameState = "complete";

      touchSave(user);
      saveData();

      renderLeaderboard();
      showScreen(
        "leaderboardsScreen"
      );

      return;
    }

    startLevel(
      nextLevelNumber
    );
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
      confirmText: "SHUT DOWN",
      cancelText: "CANCEL",
      onConfirm: () => {
        // 1. Attempt to close the browser tab
        window.close();

        // 2. Fallback if the browser blocks window.close()
        setTimeout(() => {
          document.body.innerHTML = `
            <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #09090b; color: #00ff41; font-family: 'Consolas', monospace; text-align: center; padding: 20px;">
              <h1 style="font-size: 28px; margin-bottom: 12px; color: #9d00ff; text-shadow: 0 0 10px rgba(157, 0, 255, 0.4);">[ SYSTEM TERMINATED ]</h1>
              <p style="color: #8892b0; font-size: 14px;">Session closed safely. You may now close this browser tab.</p>
            </div>
          `;
        }, 150);
      }
    });
  }

  // =========================================================
  // BIND EVENTS
  // =========================================================

  function bindEvents() {
    // =======================================================
    // MAIN MENU
    // =======================================================

    $("continueBtn")?.addEventListener(
      "click",
      continueGame
    );

    $("newGameBtn")?.addEventListener(
      "click",
      startNewGame
    );

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

    $("exitBtn")?.addEventListener(
      "click",
      exitGame
    );

    // =======================================================
    // OPTIONS
    // =======================================================

    $("addUserBtn")?.addEventListener(
      "click",
      openAddUserModal
    );

    $("changeUserBtn")?.addEventListener(
      "click",
      openChangeUserModal
    );

    $("deleteUserBtn")?.addEventListener(
      "click",
      openDeleteUserModal
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
  }

  // =========================================================
  // START
  // =========================================================

  initialize();
})();