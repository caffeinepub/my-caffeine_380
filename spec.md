# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
- Finance.tsx income tab has "সংযোগ ফি নগদ" and "সংযোগ ফি বকেয়া" columns per customer, stored via `actor.updateCustomerFinancial()` (by cidNumber)
- DebtManagement.tsx has a `ConnectionFeeDuesSection` in "প্রাপ্য বকেয়া" tab with its own independent backend records via `actor.addConnectionFeeDue()` / `actor.updateConnectionFeeDue()` / `actor.deleteConnectionFeeDue()`
- These two systems are currently completely independent — no sync exists

## Requested Changes (Diff)

### Add
- Two-way synchronization between Finance.tsx `connectionFeeDue` and DebtManagement.tsx `ConnectionFeeDuesSection`

### Modify
- **Finance.tsx `handleEditSave`**: After calling `saveFinancial()`, also sync to ConnectionFeeDue backend:
  - If `dueFee > 0`: upsert (find by cidNumber, update existing or create new) a `ConnectionFeeDue` record
  - If `dueFee === 0` and an existing record exists: delete it
  - Preserve existing `dueMonth` if record already exists; otherwise use current Bangla month+year
- **DebtManagement.tsx `ConnectionFeeDuesSection` `handleSave`**: After saving ConnectionFeeDue, also call `actor.updateCustomerFinancial()` to update the customer's `connectionFeeDue`:
  - Fetch existing financial overrides first to preserve `connectionFeeCash`
  - Update `connectionFeeDue` to the new `dueAmount`

### Remove
- Nothing removed

## Implementation Plan
1. In `Finance.tsx`: import `useActor` and get `actor`; in `handleEditSave` after `saveFinancial()`, call `actor.getConnectionFeeDues()`, find by cidNumber, upsert or delete accordingly
2. In `DebtManagement.tsx` `ConnectionFeeDuesSection.handleSave`: after saving, call `actor.getCustomerFinancials()`, find existing cash amount, call `actor.updateCustomerFinancial()` with preserved cash + new due amount
3. Link key: `cidNumber` on both sides
