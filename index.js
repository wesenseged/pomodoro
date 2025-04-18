#!/usr/bin/env node

import { intro, outro, text, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import readline from "readline";
import notifier from "node-notifier";
import path from "path";
import fs from "fs";
import player from "play-sound";

const soundPath = path.join(process.cwd(), "alarm.mp3");

function playAlarm() {
  if (fs.existsSync(soundPath)) {
    play.play(soundPath, (err) => {
      if (err) console.error("Error playing sound:", err);
    });
  } else {
    console.log(
      "🔇 No alarm sound found (expected: alarm.mp3 in current directory)."
    );
  }
}

let countdownInterval = null;
let totalSeconds = 0;
let initialMinutes = 0;
let isRunning = true;

const play = player();

function displayAsciiTime(min, sec) {
  const formatted = `${min}:${sec.toString().padStart(2, "0")}`;
  const ascii = figlet.textSync(formatted, {
    horizontalLayout: "controlled smushing",
  });
  console.clear();
  console.log(chalk.cyan(ascii));
  console.log(
    chalk.gray("Press 'r' to reset, 's' to stop/start, Ctrl+C to exit")
  );
}

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  totalSeconds = initialMinutes * 60;
  isRunning = true;

  countdownInterval = setInterval(() => {
    if (!isRunning) return;

    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    displayAsciiTime(min, sec);

    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(countdownInterval);
      console.log(chalk.green("🎉 Countdown finished!"));
      playAlarm();
      notifier.notify({
        title: "Pomodoro Finished 🍅",
        message: "Time for a break!",
        sound: true, // system notification sound
      });
      process.exit(0);
    }
  }, 1000);
}

function handleKeyPress() {
  readline.emitKeypressEvents(process.stdin);

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.resume();

  process.stdin.on("keypress", (str, key) => {
    if (key.name === "r") {
      console.clear();
      console.log(chalk.yellow("Resetting countdown..."));
      startCountdown();
    } else if (key.name === "s") {
      if (isRunning) {
        isRunning = false;
        console.log(chalk.red("Countdown stopped."));
      } else {
        console.clear();
        isRunning = true;
        console.log(chalk.red("Countdown start."));
      }
    } else if (key.ctrl && key.name === "c") {
      console.log(chalk.magenta("\nExiting..."));
      process.exit(0);
    }
  });
}

async function main() {
  intro(`Pomodoro Countdown`);

  const input = await text({
    message: "Enter Pomodoro session duration (in minutes):",
    validate: (val) =>
      isNaN(Number(val)) || Number(val) <= 0
        ? "Enter a valid number greater than 0"
        : undefined,
  });

  if (isCancel(input)) {
    process.exit(0);
  }

  initialMinutes = Number(input);
  startCountdown(); // then start countdown
  handleKeyPress(); // start listening for keys AFTER prompt
  outro("Starting countdown...");
}

main();
