/// <reference types="cypress" />
import { ExpenseTrackerPage } from '../../support/pages/expenseTrackerPage'

const expenseTracker = new ExpenseTrackerPage()

describe('Expense Tracker E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should add multiple income transactions and validate balance', () => {
    const incomes = [
      { text: 'Salary', amount: 1000 },
      { text: 'Freelance', amount: 500 }
    ]

    expenseTracker.addMultipleTransactions(incomes)
    expenseTracker.assertTransactionsVisible(incomes)
    expenseTracker.assertBalanceCalculations(incomes)
  })

  it('should add income and expense transactions and verify full balance', () => {
    const income_expenses = [
      { text: 'Salary', amount: 1000 },
      { text: 'Groceries', amount: -200 },
      { text: 'Petrol', amount: -100 }
    ]

    expenseTracker.addMultipleTransactions(income_expenses)
    expenseTracker.assertTransactionsVisible(income_expenses)
    expenseTracker.assertBalanceCalculations(income_expenses)
  })

  it('should delete an income transaction', () => {
    const income = { text: 'Investment', amount: 250 }

    expenseTracker.addTransaction(income.text, income.amount)
    expenseTracker.assertTransactionVisible(income.text)
    expenseTracker.deleteTransactionByText(income.text)
  })

  it('should delete an expense transaction', () => {
    const expense = { text: 'Food', amount: -75 }
    
    expenseTracker.addTransaction(expense.text, expense.amount)
    expenseTracker.assertTransactionVisible(expense.text)
    expenseTracker.deleteTransactionByText(expense.text)
  })
})
