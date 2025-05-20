# 🍅 Pomodoro Countdown CLI

A sleek and interactive **Pomodoro timer** for your terminal. Designed to help you stay focused with a big ASCII countdown, keyboard shortcuts, desktop notifications, and optional sound support.

---

## 📸 Preview
![pomodoro Screenshot](https://github.com/wesenseged/pomodoro/blob/Screenshot.png)


When the timer ends:

- ✅ ASCII timer completes
- 🔔 A desktop notification appears
- 🔊 An audio alert plays (if `alarm.mp3` is present)

---

## 🚀 Features

- ⌨️ **Keyboard Controls**
  - `s` → Start/Pause
  - `r` → Reset
  - `Ctrl+C` → Exit
- 🎨 **ASCII Countdown Timer** using `figlet`
- 🔔 **Desktop Notification** when time’s up
- 🔊 **Optional Sound Alert** (just drop `alarm.mp3` into your folder)
- 🌍 Installable as a **Global CLI Tool**

---

## 📦 Installation

### 1. Clone & Install

```bash
git clone https://github.com/your-username/pomodoro-cli.git
cd pomodoro-cli
npm install
```

### 2. Install Globally

```bash
npm install -g .
```

Now you can run the timer from **anywhere**:

```bash
pomodoro
```

---

## 🔊 Audio Alerts (Optional)

By default, the CLI looks for a file called `alarm.mp3` in the **current directory** where you run the command.

### ✅ To enable sound:

1. Add an `alarm.mp3` to the folder you're running the timer from.
2. The CLI will automatically play it when the countdown ends.

#### Example:

```bash
cp ~/Downloads/bell.mp3 ./alarm.mp3
pomodoro
```

> If no `alarm.mp3` is found, the timer will skip audio and still send a desktop notification.

---

## 🔔 Desktop Notifications

The app will send a system-level desktop notification at the end of the timer:

> **Pomodoro Finished 🍅**  
> Time for a break!

Works on **macOS**, **Windows**, and most **Linux** systems.

---

## 🛠 Dependencies

| Package          | Purpose                           |
|------------------|-----------------------------------|
| `@clack/prompts` | Beautiful CLI prompts             |
| `chalk`          | Terminal styling                  |
| `figlet`         | ASCII timer display               |
| `readline`       | Keyboard event handling           |
| `play-sound`     | Audio playback                    |
| `node-notifier`  | Cross-platform notifications      |

---

## 🧠 How It Works

- Prompts you to enter duration in minutes
- Displays a large ASCII-style countdown
- Allows pausing/resetting with keys
- Plays a sound (if `alarm.mp3` exists)
- Sends a notification when the timer ends

---

## 💡 Ideas for Future Enhancements

- 🔁 Add custom break cycles (e.g. 25/5, 50/10)
- 🧘 Optional ambient background sounds
- 📁 Config file or CLI flags (`--duration`, `--sound`, etc.)
- ✅ Progress bar view (minimal mode)

---

## 📄 License

MIT — Free to use, modify, and share.

---

## 🙌 Acknowledgements

Thanks to the great open source libraries that made this possible:

- [`chalk`](https://github.com/chalk/chalk)
- [`figlet`](https://github.com/patorjk/figlet.js)
- [`node-notifier`](https://github.com/mikaelbr/node-notifier)
- [`@clack/prompts`](https://github.com/natemoo-re/clack)

