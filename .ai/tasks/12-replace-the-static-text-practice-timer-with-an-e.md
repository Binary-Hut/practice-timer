# Task #12 — Replace the static text "Practice Timer" with an editable title at the top of the app

Status: READY_FOR_REVIEW

## Owner request

Replace the static text "Practice Timer" with an editable title at the top of the practice timer.

## Goal

Provide the user with the ability to customize the title of their practice session by replacing the static "Practice Timer" heading with an interactive, editable text field.

## Scope

- Replace the `<h1>` (or equivalent header element) in `index.html` containing "Practice Timer" with an `<input>` element or a `contenteditable` span.
- Style the new element in `styles.css` to match the existing musical theme, ensuring it retains the appearance of a header while providing clear affordance for editing.
- Ensure the edit experience is intuitive and responsive across desktop and mobile.

## Out of scope

- Persisting the custom title (e.g., local storage, backend).
- Adding complex UI for editing (e.g., edit/save buttons).
- Any architectural changes outside of the browser-based HTML/CSS/JS structure.

## Files likely affected

- `index.html`: Update the markup for the header.
- `styles.css`: Update styling to style the editable element.
- `tests/practice-timer.spec.js`: Update tests if they currently rely on the static text "Practice Timer".

## Implementation steps

1.  **Modify Markup:** Replace the static header text in `index.html` with an appropriately styled `<input type="text">` or `contenteditable` element.
2.  **Apply Styles:** Adjust `styles.css` to ensure the new editable element matches the visual design constraints and remains responsive.
3.  **Update Tests:** Update any existing Playwright tests that assert the presence of the static "Practice Timer" text.
4.  **Verify:** Perform manual UI checks to ensure editing functions correctly and that the design remains consistent.

## Deterministic validation

- Run existing Playwright tests to ensure no regressions in core timer functionality.
- Add/update a test case in `tests/practice-timer.spec.js` to verify that the title can be edited and that the new value persists in the DOM until refreshed.

## Risks and recovery

- **Risk:** The editable title field breaks the current responsive layout.
- **Mitigation/Recovery:** Test across different viewport sizes using browser developer tools and Playwright; revert to a simpler styling approach if layout issues occur.
- **Risk:** Existing tests fail due to the change in DOM structure.
- **Mitigation/Recovery:** Update tests to target the new element selector instead of the static text.

## Acceptance criteria

- The application displays an editable title field at the top where "Practice Timer" used to be.
- Users can click the title and change the text.
- The design remains polished, responsive, and aligned with the existing musical theme.
- Playwright tests pass, including a new or updated test verifying the title is editable.
