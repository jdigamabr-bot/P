// TECHVORA NEBULAVERSE — interactive demo logic
"use strict";

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Local AI-inspired demo. This uses simple templates and keyword checks;
// it is not a real AI model and does not send data over the internet.
const toolConfig = {
  idea: {
    label: "What are you dreaming of building?",
    placeholder: "Example: an app that helps students learn faster...",
    hint: "Describe your idea in one sentence."
  },
  bio: {
    label: "What should your profile say about you?",
    placeholder: "Example: engineering student, web developer, AI enthusiast...",
    hint: "Add your interests, skills, or goal."
  },
  study: {
    label: "Which topic are you preparing for?",
    placeholder: "Example: DBMS, graph theory, JavaScript...",
    hint: "Enter a subject or topic to create a starter plan."
  }
};

const tabs = document.querySelectorAll(".console-tab");
const aiInput = document.getElementById("aiInput");
const inputLabel = document.getElementById("inputLabel");
const toolHint = document.getElementById("toolHint");
const generateBtn = document.getElementById("generateBtn");
const aiOutput = document.getElementById("aiOutput");
let activeTool = "idea";

function setOutput(title, message) {
  aiOutput.replaceChildren();
  const icon = document.createElement("span");
  icon.className = "output-icon";
  icon.textContent = "✦";
  const content = document.createElement("div");
  const heading = document.createElement("strong");
  heading.textContent = title;
  const paragraph = document.createElement("p");
  paragraph.textContent = message;
  content.append(heading, paragraph);
  aiOutput.append(icon, content);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    activeTool = tab.dataset.tool || "idea";
    const config = toolConfig[activeTool];
    inputLabel.textContent = config.label;
    aiInput.placeholder = config.placeholder;
    toolHint.textContent = config.hint;
    aiInput.value = "";
    setOutput("Awaiting input...", "Your result will appear here.");
    aiInput.focus();
  });
});

function makeIdeaResult(text) {
  const clean = text.trim().replace(/[.!?]+$/, "");
  const lower = clean.toLowerCase();
  let direction = "Build a simple prototype, ask 3 people to test it, and improve one thing at a time.";
  if (lower.includes("student") || lower.includes("study") || lower.includes("learn")) {
    direction = "Start with one subject, add short learning cards and a progress tracker, then test it with classmates.";
  } else if (lower.includes("health") || lower.includes("fitness")) {
    direction = "Focus on habit tracking and helpful reminders first. Avoid making medical claims or storing sensitive data.";
  } else if (lower.includes("shop") || lower.includes("business")) {
    direction = "Start with a clean product list, search, and a clear contact or checkout journey.";
  } else if (lower.includes("ai") || lower.includes("resume")) {
    direction = "Begin with a clear input form and transparent feedback. Add a real AI API only through a secure backend.";
  }
  return {
    title: "Your idea spark",
    message: `Concept: ${clean}.\n\nFirst move: ${direction}\n\nSuggested next step: sketch the main screen and build one feature that works end-to-end.`
  };
}

function makeBioResult(text) {
  const clean = text.trim().replace(/\s+/g, " ");
  return {
    title: "Profile bio draft",
    message: `🚀 ${clean}\n💡 Building ideas into reality\n🌌 Exploring code, creativity & the future\n\nTip: Replace any line that doesn't feel like you.`
  };
}

function makeStudyResult(text) {
  const clean = text.trim();
  return {
    title: `Starter plan: ${clean}`,
    message: `1. 10 min — List the main concepts in ${clean}.\n2. 20 min — Learn one concept and write a short definition.\n3. 20 min — Solve 2 practice questions without looking at notes.\n4. 10 min — Check mistakes and revise them.\n\nRepeat with breaks. This is a starter template; adjust it to your syllabus and exam date.`
  };
}

if (generateBtn && aiInput) {
  generateBtn.addEventListener("click", () => {
    const value = aiInput.value.trim();
    if (!value) {
      setOutput("Input needed", "Type a topic or idea first, then select Generate.");
      aiInput.focus();
      return;
    }
    generateBtn.disabled = true;
    generateBtn.textContent = "Working...";
    window.setTimeout(() => {
      let result;
      if (activeTool === "bio") result = makeBioResult(value);
      else if (activeTool === "study") result = makeStudyResult(value);
      else result = makeIdeaResult(value);
      setOutput(result.title, result.message);
      generateBtn.disabled = false;
      generateBtn.textContent = "Generate ↗";
    }, 350);
  });
}

// Secret mission: the answer is "keyboard".
const missionForm = document.getElementById("missionForm");
const missionAnswer = document.getElementById("missionAnswer");
const missionFeedback = document.getElementById("missionFeedback");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const hintBtn = document.getElementById("hintBtn");
let missionSolved = false;
let hintUsed = false;

if (missionForm && missionAnswer && missionFeedback) {
  missionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = missionAnswer.value.trim().toLowerCase().replace(/[^a-z]/g, "");
    if (answer === "keyboard" || answer === "a keyboard") {
      missionSolved = true;
      missionFeedback.className = "mission-feedback success";
      missionFeedback.textContent = "ACCESS GRANTED. Correct — a keyboard! Level 01 unlocked. Keep exploring, agent.";
      progressFill.style.width = "100%";
      progressText.textContent = "1 / 1";
      missionAnswer.disabled = true;
      missionForm.querySelector("button").textContent = "Unlocked ✓";
      missionForm.querySelector("button").disabled = true;
      hintBtn.disabled = true;
      hintBtn.textContent = "Mission complete ✓";
    } else {
      missionFeedback.className = "mission-feedback error";
      missionFeedback.textContent = "ACCESS DENIED. Not quite. Re-read the clue and try again.";
      missionAnswer.select();
    }
  });
}

if (hintBtn && missionFeedback) {
  hintBtn.addEventListener("click", () => {
    if (missionSolved) return;
    hintUsed = true;
    missionFeedback.className = "mission-feedback";
    missionFeedback.textContent = "HINT: You use it to type, and it has a space bar plus an Enter key.";
    hintBtn.textContent = "Hint revealed";
    hintBtn.disabled = true;
  });
}

// Add a subtle parallax movement to the hero planet on pointer devices.
const heroArt = document.querySelector(".hero-art");
if (heroArt && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroArt.addEventListener("pointermove", (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty("--pointer-x", `${x * 8}px`);
    heroArt.style.setProperty("--pointer-y", `${y * 8}px`);
    const planet = heroArt.querySelector(".planet");
    if (planet) planet.style.translate = `${x * 8}px ${y * 8}px`;
  });
  heroArt.addEventListener("pointerleave", () => {
    const planet = heroArt.querySelector(".planet");
    if (planet) planet.style.translate = "0 0";
  });
}
