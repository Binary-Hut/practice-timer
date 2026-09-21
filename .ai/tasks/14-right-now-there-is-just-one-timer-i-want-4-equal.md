# Implementation Plan - Supporting 4 Independent Timers

Status: READY_FOR_APPROVAL

## Goal
Update the `practice-timer` application to display 4 independent, equally sized timers on the same page. Each timer must retain the full functionality of the current single timer (preset selection, start/pause/stop/reset, countdown display, audible notification).

## In scope
- Update the UI to render 4 instances of the timer component.
- Refactor the JavaScript logic to manage 4 independent timer states (one per timer instance).
- Ensure the layout remains responsive for desktop and mobile (e.g., a 2x2 grid on desktop, 1x4 on mobile).
- Maintain all existing features (presets, start/pause/stop/reset, audio notification) for each timer.
- Update existing Playwright tests to verify independent timer behavior (e.g., starting one timer does not affect others).

## Out of scope
- Adding new features beyond the requirement to have 4 instances (e.g., no global timers, no timer synchronization).
- Changes to the core timer UI design or notification mechanism.
- Changes to the underlying technology stack (must remain vanilla HTML/CSS/JS).

## Acceptance criteria
- [ ] The page displays exactly 4 timers in a clean, responsive layout.
- [ ] Each of the 4 timers operates independently:
  - [ ] Setting a duration on Timer A does not affect Timers B, C, or D.
  - [ ] Starting Timer A does not start B, C, or D.
  - [ ] Pausing/Stopping Timer A does not affect B, C, or D.
- [ ] All 4 timers support the same preset durations (5, 10, 15, 25, 30, 45, 60 mins).
- [ ] Each timer plays the completion sound independently when its own time reaches 00:00.
- [ ] Existing functionality works as before, but per-timer.
- [ ] Playwright tests pass, verifying the independence of the 4 timers.

## Likely files to change
- `index.html`: Update structure to hold 4 timer containers.
- `styles.css`: Update layout for 4 timers (grid/flexbox).
- `app.js`: Refactor state management to support multiple timer objects/classes.
- `tests/practice-timer.spec.js`: Update tests to cover multiple timers.

## Implementation steps
1. **Refactor JS**: Convert the current timer implementation into a reusable class or object-based pattern in `app.js` that can be instantiated 4 times.
2. **Update UI**: Modify `index.html` to instantiate 4 copies of the timer structure, ensuring unique IDs/classes for each timer's controls/display.
3. **Update Styles**: Modify `styles.css` to ensure the layout arranges 4 timers appropriately on different screen sizes.
4. **Update Tests**: Update `tests/practice-timer.spec.js` to assert independent behavior of the 4 timers.
5. **Verify**: Run tests to confirm independence and feature parity.

## Risks and recovery
- **Complexity**: Refactoring the single-timer logic to be reusable might introduce regressions.
  - *Recovery*: Ensure robust unit testing of the new timer class before integrating it.
- **Layout Issues**: The current CSS might not easily support 4 timers.
  - *Recovery*: Use CSS Grid for the container, ensuring responsive breakpoints.
- **Independent Audio**: Multiple timers reaching zero simultaneously might cause audio glitches.
  - *Recovery*: Ensure the browser audio context is handled correctly for multiple concurrent sounds (should be safe with modern browser APIs if they are played independently).
