"use strict";

const STORAGE_KEY = "osrCharacters";
let lastRolledStats = null;

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollStat3d6() {
  const rolls = [rollDie(6), rollDie(6), rollDie(6)];
  return rolls.reduce((sum, n) => sum + n, 0);
}

function rollAllStats() {
  const keys = ["str", "dex", "con", "int", "wis", "cha"];
  const values = keys.map(() => rollStat3d6());
  return {
    str: values[0],
    dex: values[1],
    con: values[2],
    int: values[3],
    wis: values[4],
    cha: values[5],
  };
}

function renderStats(stats) {
  const pairs = [
    ["str", "#str"],
    ["dex", "#dex"],
    ["con", "#con"],
    ["int", "#int"],
    ["wis", "#wis"],
    ["cha", "#cha"],
  ];

  pairs.forEach(([key, selector]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = stats[key];
  });
}

function setStatus(message) {
  const statusEl = document.querySelector("#status");
  if (statusEl) statusEl.textContent = message;
}

function loadCharacters() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCharacters(characters) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

function buildCharacter() {
  const nameEl = document.querySelector("#characterName");
  const classEl = document.querySelector("#characterClass");

  return {
    name: nameEl.value.trim(),
    class: classEl.value,
    stats: lastRolledStats,
  };
}

function handleRoll() {
  lastRolledStats = rollAllStats();
  renderStats(lastRolledStats);
  setStatus("Stats rolled. You can now save your character.");
}

function handleSave() {
  const character = buildCharacter();

  if (!character.name) {
    setStatus("Please enter a character name.");
    return;
  }

  if (!character.class) {
    setStatus("Please select a class.");
    return;
  }

  if (!character.stats) {
    setStatus("Please roll stats before saving.");
    return;
  }

  const characters = loadCharacters();
  characters.push(character);
  saveCharacters(characters);

  setStatus(`"${character.name}" has been saved to the Tavern.`);
}

function setTavernStatus(message) {
  const el = document.querySelector("#tavernStatus");
  if (el) el.textContent = message;
}

function populateCharacterSelect(characters) {
  const select = document.querySelector("#characterSelect");
  if (!select) return;

  select.innerHTML = "";

  if (characters.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No characters saved.";
    select.appendChild(opt);
    select.disabled = true;
    setTavernStatus("Save a character on the Home page to see it here.");
    return;
  }

  select.disabled = false;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a character...";
  select.appendChild(placeholder);

  characters.forEach((c, index) => {
    const opt = document.createElement("option");
    opt.value = String(index);
    opt.textContent = c.name;
    select.appendChild(opt);
  });
}

function renderSheet(character) {
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  if (!character) {
    setText("#sheetName", "—");
    setText("#sheetClass", "—");
    setText("#sheetStr", "—");
    setText("#sheetDex", "—");
    setText("#sheetCon", "—");
    setText("#sheetInt", "—");
    setText("#sheetWis", "—");
    setText("#sheetCha", "—");
    return;
  }

  setText("#sheetName", character.name);
  setText("#sheetClass", character.class);
  setText("#sheetStr", character.stats.str);
  setText("#sheetDex", character.stats.dex);
  setText("#sheetCon", character.stats.con);
  setText("#sheetInt", character.stats.int);
  setText("#sheetWis", character.stats.wis);
  setText("#sheetCha", character.stats.cha);
}

function initHomePage() {
  const rollBtn = document.querySelector("#rollBtn");
  const saveBtn = document.querySelector("#saveBtn");

  if (!rollBtn || !saveBtn) return;

  rollBtn.addEventListener("click", handleRoll);
  saveBtn.addEventListener("click", handleSave);
}

function initTavernPage() {
  const select = document.querySelector("#characterSelect");
  if (!select) return;

  const characters = loadCharacters();
  populateCharacterSelect(characters);
  renderSheet(null);

  select.addEventListener("change", () => {
    if (select.value === "") {
      renderSheet(null);
      setTavernStatus("");
      return;
    }

    const selected = characters[Number(select.value)];
    if (!selected) {
      renderSheet(null);
      setTavernStatus("That character could not be found.");
      return;
    }

    renderSheet(selected);
    setTavernStatus("");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  initTavernPage();
});
