## 2024-05-23 - Accessibility of Icon-only Buttons
**Learning:** Icon-only buttons (like delete trash cans) are a common accessibility gap. Without `aria-label` or a tooltip, screen reader users only hear "button" and don't know the action or the target.
**Action:** Always wrap icon-only buttons in a `Tooltip` for mouse users and add `aria-label` describing the action and the specific item (e.g., "Remove bill: Rent") for screen reader users.
