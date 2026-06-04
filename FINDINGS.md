# Findings & Improvements

### 1. Date Formatting
* **Found:** The expense list displayed raw ISO database timestamps (e.g., 2026-05-29T09:20:00Z), resulting in poor user experience.
* **Changed:** Created a utility function using `Intl.DateTimeFormat` to parse and display the dates in a clean, human-readable format.

