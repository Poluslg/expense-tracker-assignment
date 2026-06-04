# Findings & Improvements

## What Was Found & Fixed

### 1. Direct State Mutation
**Found:** The `addExpense` function was calling `expenses.push(newExpense)` followed by `setExpenses(expenses)`. This mutates the existing state array directly, which React cannot detect as a change — it still holds the same array reference. The UI would not reliably re-render.  
**Fixed:** Replaced with the spread operator `[...expenses, newExpense]` to produce a new array, giving React a new reference and guaranteeing a proper re-render.

### 2. Raw ISO Date Displayed
**Found:** Each expense row was rendering `{e.date}` directly, which showed the raw ISO timestamp (e.g. `2026-05-29T09:20:00.000Z`) — unreadable for a real user.  
**Fixed:** Created `src/lib/formatDate.ts` using `Intl.DateTimeFormat('en-IN')` to display clean, human-readable dates (e.g. `29 May 2026`).

### 3. Raw Amount and Total Not Formatted as Currency
**Found:** Expense amounts displayed as plain numbers (e.g. `1840`) and the running total showed `Total: 9829` — no currency symbol, no formatting.  
**Fixed:** Created `src/lib/formatCurrency.ts` using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`. Applied to both per-row amounts and the total.

### 4. No Form Validation
**Found:** The Add button had no validation. Clicking it with empty fields would push a broken expense with an empty description, NaN amount, and empty category into the list.  
**Fixed:** Added validation in `ExpenseForm` to block submission if description or category is empty, or if the amount is not a positive number. An inline error message is shown without causing layout shift (using `min-height` on the error wrapper).

### 5. Category Was a Free-Text Input
**Found:** The category field was a plain `<input>`, allowing anything to be typed — including nothing. There was no way to ensure consistent category values across expenses.  
**Fixed:** Replaced with a `<select>` dropdown populated from a `CATEGORIES` constant in `src/lib/data.ts`. This enforces a fixed, consistent set of values.

### 6. All State in One Component — Unnecessary Re-renders
**Found:** Form state (`description`, `amount`, `category`) lived alongside list state in the main `Daybook` component. Every keystroke in any form field re-rendered the entire page, including the expense list.  
**Fixed:** Extracted the form into its own `ExpenseForm` component. Form state is now local to that component, so typing in the form no longer causes the list to re-render.

### 7. Case-Sensitive Search
**Found:** The search filter used `e.description.includes(query)`, which is case-sensitive. Searching "lunch" would not find an expense described as "Lunch with team".  
**Fixed:** Changed to `e.description.toLowerCase().includes(query.toLowerCase())` so search is case-insensitive. Also wrapped in `useMemo` so the filter only recalculates when `expenses` or `query` changes, not on every render.

### 8. Wrong `key` in List (`key={index}`)
**Found:** The expense list used `key={index}` (the array index). When an item is deleted, all subsequent items shift position and get a new index — React re-renders more than necessary and can mix up component state.  
**Fixed:** Changed to `key={e.id}`, which is stable and uniquely tied to each expense.

### 9. Amount Input Accepted Any Text
**Found:** The amount field was `<input type="text">`, meaning any string could be entered. The original code used `parseFloat(amount)`, which silently produces `NaN` for non-numeric input.  
**Fixed:** Changed to `<input type="number">` and added explicit `isNaN` / `<= 0` validation in the form handler.

### 10. No Delete Confirmation
**Found:** Clicking `×` deleted an expense immediately with no warning. A single accidental tap would permanently remove a row with no way to undo.  
**Fixed:** Added a `DeleteDialog` component using the native `<dialog>` element with a confirmation step (Cancel / Delete). The dialog has a smooth slide-up animation on open and slide-down on close.

### 11. Dialog Animations Injected as Runtime `<style>` Tag
**Found:** `DeleteDialog` used a template literal (`dialogStyles`) injected as `<style>{dialogStyles}</style>` inside JSX. This inserts a new `<style>` node into the DOM on every render — a clear anti-pattern.  
**Fixed:** Moved all keyframe animations and dialog selector rules into `globals.css`, where static styles belong. Removed the constant and the style tag from the component entirely.

### 12. `console.log` Left in Production Code
**Found:** `addExpense` contained `console.log("adding expense", description, amount)`, which would appear in every user's browser console in production.  
**Fixed:** Removed.

### 13. No Empty State When No Results
**Found:** When the search query matched nothing, the list rendered as blank — no feedback to the user about whether there were no results or an error.  
**Fixed:** Added a "No expenses found." message rendered when the filtered list is empty.

### 14. Mobile Responsiveness
**Found:** The amount input, category input, and Add button were in a fixed horizontal row that broke on small screens.  
**Fixed:** Added a responsive layout using a Tailwind breakpoint (`min-[500px]:flex-row`) so the inputs stack vertically on narrow screens and sit side-by-side on wider ones.

---

## Deliberately Not Fixed

| Issue | Reason |
|---|---|
| `Date.now()` used as expense ID | Acceptable for a single-session, in-memory app. Would need a proper UUID or server-generated ID if data were persisted. Not a real problem here. |
| No `localStorage` persistence | Out of scope for this assessment — the brief did not ask for persistence, and adding it would obscure the core fixes with infrastructure code. |
| Total reflects all expenses, not just filtered | A deliberate product choice could go either way. Showing a filtered total changes the meaning of the number. Left as-is since the brief did not specify behaviour. |
| Amount input still accepts `e`, `+`, `-` | Browser behaviour for `type="number"`. Can be blocked with `onKeyDown`, but this is a minor edge case and the `> 0` validation already catches any invalid final value. |
| `category` typed as `string` in `Expense` | Could be `typeof CATEGORIES[number]` for stricter typing. Skipped to avoid widening the scope of the `data.ts` change and its downstream effects. |