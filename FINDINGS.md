# Findings & Improvements

### 1. Date Formatting
* **Found:** The expense list displayed raw ISO database timestamps (e.g., 2026-05-29T09:20:00Z), resulting in poor user experience.
* **Changed:** Created a utility function using `Intl.DateTimeFormat` to parse and display the dates in a clean, human-readable format.

### 2. Form Refactor & State Mutation Fix
* **Found:** The `addExpense` function was mutating state directly using `.push()`. Additionally, the entire page re-rendered on every keystroke because the form state lived in the main component. The form also allowed empty submissions.
* **Changed:** Extracted the form into its own `ExpenseForm` component to isolate renders. Replaced the state mutation with the spread operator (`[...expenses, newExpense]`) to properly update React state. Added basic validation to prevent submitting empty fields.