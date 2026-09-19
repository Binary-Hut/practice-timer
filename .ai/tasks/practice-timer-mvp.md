# Task Plan — Practice Timer MVP

Status: PAUSED_AI_FAILURE

Issue: #3
Owner architecture/dependency approval: 2026-09-19

## 1. Goal

Build the smallest polished, responsive Practice Timer that satisfies the approved MVP in PRODUCT.md using the approved static browser architecture in ARCHITECTURE.md.

## 2. In scope

- Plain HTML/CSS/JavaScript implementation.
- Custom duration entry in minutes.
- Presets: 5, 10, 15, 25, 30, 45, and 60 minutes.
- Start, pause/resume, stop, and reset controls.
- Clear remaining-time display in mm:ss.
- Completion behavior at 00:00 with a simple Web Audio notification attempt.
- Musical visual theme with subtle notes/staff/clef-inspired details while keeping the timer visually dominant.
- Responsive desktop/mobile layout.
- Playwright deterministic browser tests.
- package.json/package-lock.json only as needed for the approved Playwright test harness.

## 3. Out of scope

- Backend, database, authentication, accounts, payments, external APIs, paid services, analytics, cloud sync, practice history, AI features, social features, push/background notifications, deployment changes, frameworks, and runtime third-party dependencies.
- Features not explicitly listed in PRODUCT.md.

## 4. Acceptance criteria

1. Initial UI clearly shows the selected duration and timer in mm:ss.
2. Clicking any approved preset selects that duration and updates the timer before a session begins.
3. A valid custom whole-number minute duration can be entered and selected before starting.
4. Start begins a countdown from the selected duration.
5. Pause freezes remaining time; Resume continues from the same remaining time.
6. Stop stops an active session without allowing the countdown to continue.
7. Reset restores the currently selected duration and returns the controls to the ready state.
8. At zero, the timer remains at 00:00, stops running, returns to a sensible finished/ready control state, and attempts a browser-generated audible notification without an external asset/service.
9. Controls prevent contradictory actions such as starting multiple concurrent timers.
10. The interface is keyboard-accessible enough for standard form/buttons and remains usable at desktop and mobile widths.
11. The timer is the main visual focus and the interface contains restrained musical styling.
12. Deterministic Playwright tests verify presets/custom duration and the core start/pause/resume/stop/reset/completion behavior.
13. npm test runs the deterministic suite successfully.
14. Code is readable and comments explain only non-obvious timer/timekeeping logic.

## 5. Likely files to change

- index.html
- styles.css
- app.js
- package.json
- package-lock.json
- playwright.config.js
- tests/practice-timer.spec.js
- PRODUCT.md / ARCHITECTURE.md / ROADMAP.md only if implementation requires factual completion notes consistent with the approved scope

## 6. Tests to add/update

- Initial state and mm:ss formatting.
- Every preset updates selected duration.
- Valid custom minute input updates duration.
- Start changes state and counts down.
- Pause freezes; resume continues.
- Stop prevents continued countdown.
- Reset restores selected duration.
- Completion reaches exactly 00:00 and does not go negative.
- Responsive smoke checks for desktop and mobile viewport sizes.

Tests should use controllable/short durations or browser time control where practical so CI remains fast and deterministic.

## 7. Risks or questions

- Browser audio may be subject to autoplay/user-gesture policies; the implementation should attempt Web Audio after user interaction and must not make timer completion depend on sound succeeding.
- Timer logic should derive remaining time from elapsed wall-clock time rather than assuming setInterval fires exactly on schedule.
- No open product question blocks development. The owner has explicitly approved the architecture and Playwright test dependency.
