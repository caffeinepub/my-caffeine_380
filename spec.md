# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
- Finance.tsx: Commission is auto-calculated from customer data (monthlyFee × commissionPercent × completedPeriods). Expenses stored via useExpenses hook with categories including 'টেকনিশিয়ান বেতন'. সংযোগ ফি বকেয়া already syncs bidirectionally with DebtManagement.
- DebtManagement.tsx: CommissionDue, TechnicianSalaryDue, WholesalerDue are all manually entered with no sync to Finance.

## Requested Changes (Diff)

### Add
- Sync 1 (Commission): When CommissionDue form opens in DebtManagement, auto-populate totalCommission with the calculated commission total from Finance (sum across all customers). Display a note that the value is sourced from financial management.
- Sync 2 (Technician Salary): When an expense with category 'টেকনিশিয়ান বেতন' is saved in Finance, auto-create/update a corresponding TechnicianSalaryDue record in DebtManagement (technicianName=description, dueMonth=month from expense date, dueAmount=amount). When TechnicianSalaryDue is edited/paid in DebtManagement, update the corresponding Finance expense amount.
- Sync 3 (Wholesaler): When a new expense is added in Finance with product categories (রাউটার, ONU, অপটিক্যাল ফাইবার, স্প্লিটার), auto-create a WholesalerDue entry in DebtManagement (productName=category, description=description, rate=rate, amount=qty×rate, dueBill=amount by default, date=expense date). When WholesalerDue is paid/updated in DebtManagement, reflect dueBill in Finance.

### Modify
- Finance.tsx: After addExpense/updateExpense for 'টেকনিশিয়ান বেতন' → call actor to create/update TechnicianSalaryDue. After addExpense for product categories → call actor to create WholesalerDue.
- DebtManagement.tsx CommissionDuesSection: On dialog open (add mode), fetch total calculated commission from customer data and pre-fill totalCommission field. Add a helper to compute total commission using same formula as Finance.
- DebtManagement.tsx TechnicianSalarySection: On save, also sync to Finance expense (add or update via actor.addExpense/updateExpense with category='টেকনিশিয়ান বেতন').
- DebtManagement.tsx WholesalerDuesSection: On save (when dueBill > 0), also create/update corresponding Finance expense.

### Remove
- Nothing removed.

## Implementation Plan
1. Add a shared utility function `calculateTotalCommission(customers)` that both Finance and DebtManagement can use.
2. In Finance.tsx: after saving an expense, check category and trigger appropriate sync (টেকনিশিয়ান বেতন → TechnicianSalaryDue, product categories → WholesalerDue). Link expense IDs to DebtManagement records via description or a reference field.
3. In DebtManagement.tsx CommissionDuesSection: On 'নতুন কমিশন যুক্ত করুন' dialog open, fetch all customers from actor and compute total commission, pre-fill the form.
4. In DebtManagement.tsx TechnicianSalarySection: On save, sync to Finance expenses via actor.
5. In DebtManagement.tsx WholesalerDuesSection: On save, sync to Finance expenses via actor.
6. Use expense description or a naming convention (e.g. 'TECH_SYNC:name:month', 'WHOLE_SYNC:id') to match records across modules and avoid duplicates.
