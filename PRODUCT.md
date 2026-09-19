# PRODUCT.md — Practice Timer

## Product goal

Build a simple musical practice timer for music students.

Core features:
- Set a practice duration in minutes.
- Start, pause/resume, and stop the timer.
- Reset the timer after stopping.
- Show the remaining time clearly in minutes and seconds.
- Play a simple notification when the practice session finishes.
- Include quick duration presets such as 5, 10, 15, 25, 30, 45, and 60 minutes.
- Keep the application simple and easy to use.

Design:
- The interface should have a polished musical theme.
- Use subtle musical notes, staff/clef elements, or other music-inspired visual details.
- The timer should be the main visual focus.
- Use the supplied Practice Timer design concept as visual inspiration, but keep the implementation clean and responsive for desktop and mobile.
- Avoid unnecessary complexity, accounts, databases, or external services for this first version.

## MVP user stories

- As a music student, I can choose a preset or enter a duration so I can define my practice session.
- As a music student, I can start and clearly see the remaining time in mm:ss.
- As a music student, I can pause and resume without losing my remaining time.
- As a music student, I can stop a running session and reset it before starting again.
- As a music student, I receive a simple audible notification when the timer reaches zero.
- As a user on desktop or mobile, I get a clear, polished, music-themed interface with the timer as the main visual focus.

## MVP acceptance criteria

- Presets: 5, 10, 15, 25, 30, 45, and 60 minutes.
- A valid custom duration in minutes can be entered before a session starts.
- Start begins countdown; pause freezes it; resume continues it; stop stops the active session; reset restores the selected duration.
- Remaining time is always displayed as minutes and seconds.
- Reaching zero stops the countdown at 00:00 and attempts a simple browser-generated completion sound.
- Controls have sensible disabled/enabled states so contradictory actions are not possible.
- The layout remains usable on common desktop and mobile viewport sizes.
- Deterministic Playwright tests cover the core timer behavior.

## Out of scope for MVP

- Accounts, sign-in, cloud sync, databases, analytics, payments, external APIs, AI features, social features, practice history, and notifications outside the open browser page.
- Frameworks and additional runtime dependencies.
- Deployment changes.
