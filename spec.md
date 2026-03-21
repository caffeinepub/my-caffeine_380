# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
- All financial data (expenses, customer connection fees) stored only in browser localStorage
- localStorage is wiped on browser data clear, PWA reinstall, or app update deployments
- Backend (main.mo) has no functions for expenses or connection fees
- 107 customers stored in localStorage under key "nosheen_customers_v6" with ExtendedCustomer type (connectionFeeCash, connectionFeeDue, commissionPercent, username, password, carnivalId, cidNumber)
- Expenses stored in localStorage under key "isp_expenses"
- Admin accounts stored permanently in ICP backend

## Requested Changes (Diff)

### Add
- Backend: `Expense` type with all fields (id, serial, category, description, unit, rate, amount, date, createdAt)
- Backend: `addExpense(expense)` function — stores expense in stable var HashMap
- Backend: `updateExpense(expense)` function
- Backend: `deleteExpense(id)` function
- Backend: `getExpenses()` function — returns all expenses
- Backend: `CustomerFinancial` type for storing per-customer financial overrides (connectionFeeCash, connectionFeeDue)
- Backend: `updateCustomerFinancial(cidNumber, connectionFeeCash, connectionFeeDue)` function
- Backend: `getCustomerFinancials()` function — returns all financial overrides by cidNumber
- Frontend: On app load, fetch expenses from backend and merge with any existing localStorage data (then migrate to backend)
- Frontend: On expense add/update/delete, call backend actor instead of localStorage only
- Frontend: On connection fee edit/save, call backend actor to persist
- Frontend: On load, fetch customerFinancials from backend and apply to customers
- Keep localStorage as fallback cache for offline display only

### Modify
- useExpenses hook: save to backend actor (primary) + localStorage (cache)
- Finance.tsx updateCustomer for connectionFee: save to backend actor
- App startup: migrate existing localStorage data to backend if backend is empty

### Remove
- Nothing removed — purely additive

## Implementation Plan
1. Add expense and customerFinancial types and CRUD functions to main.mo using stable HashMap
2. Regenerate backend.d.ts bindings
3. Update useExpenses hook to use backend actor as primary storage
4. Update Finance.tsx to persist connection fee changes to backend
5. On app init, load expenses and customerFinancials from backend; migrate localStorage data if backend empty
6. Validate and deploy
