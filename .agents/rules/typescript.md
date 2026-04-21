---
trigger: always_on
---

# TypeScript Validation Rule

Whenever I ask you to complete a coding task, fix a bug, or refactor code, you must:

1. Perform the requested changes.
2. Immediately after finishing the code edits, execute the following command in the integrated terminal to verify there are no regressions or type errors:
   `npx tsx --no-emit`
3. Report the output of that command to me. If errors are found, automatically attempt to fix them.