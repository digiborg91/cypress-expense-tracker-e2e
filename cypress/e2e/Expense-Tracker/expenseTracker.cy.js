/// <reference types="cypress" />


context('Expense Tracker', () => {
  beforeEach(() => {
    cy.visit('https://track-expenses-v1.netlify.app/')
  })

  it('should add income and expense transactions', () => {

    cy.get('#transaction-text').type('Salary')
    cy.get('#transaction-amount').type('1000')
    cy.get('#add-transaction-btn').click()
    cy.get('#balance-amount').should('contain.text', '1000')
    cy.get('#income-amount').should('contain.text', '1000')
    cy.get('#transaction-list').should('contain.text', 'Salary')
  });

it('should delete a transaction and verify balance', () => {
  // Step 1: Add income transaction
  const transactionText = 'Bonus'
  const transactionAmount = 200

  cy.get('#transaction-text').type(transactionText)
  cy.get('#transaction-amount').type(transactionAmount.toString())
  cy.get('#add-transaction-btn').click()

  // Step 2: Confirm transaction added
  cy.contains('#transaction-list li', transactionText).as('transactionItem')
  cy.get('@transactionItem').should('be.visible')

  // Step 3: Capture amounts before delete
  cy.get('#balance-amount').invoke('text').then(balanceText => {
    const balanceBefore = parseFloat(balanceText.replace(/[^\d.-]/g, ''))

    cy.get('#income-amount').invoke('text').then(incomeText => {
      const incomeBefore = parseFloat(incomeText.replace(/[^\d.-]/g, ''))

      // Step 4: Click delete button
      cy.get('@transactionItem').find('.delete-btn').click()

      // Step 5: Ensure transaction is removed
      cy.get('@transactionItem').should('not.exist')

      // Step 6: Re-check balance and income
      cy.get('#balance-amount').invoke('text').then(balanceAfterText => {
        const balanceAfter = parseFloat(balanceAfterText.replace(/[^\d.-]/g, ''))
        expect(balanceAfter).to.eq(balanceBefore - transactionAmount)
      })

      cy.get('#income-amount').invoke('text').then(incomeAfterText => {
        const incomeAfter = parseFloat(incomeAfterText.replace(/[^\d.-]/g, ''))
        expect(incomeAfter).to.eq(incomeBefore - transactionAmount)
      })
    })
  })
})

  it('should add multiple transactions and verify balance/expense', () => {
const transactions = [
    { text: 'Freelance', amount: 300 },    // income
    { text: 'Groceries', amount: -70 },    // expense
    { text: 'Internet Bill', amount: -30 } // expense
  ]

  // Step 1: Add all transactions
  transactions.forEach(({ text, amount }) => {
    cy.get('#transaction-text').type(text)
    cy.get('#transaction-amount').type(amount.toString())
    cy.get('#add-transaction-btn').click()
  })

  // Step 2: Confirm all transactions appear
  transactions.forEach(({ text }) => {
    cy.contains('#transaction-list li', text).should('be.visible')
  })

  // Step 3: Validate balance, income, expense
  const incomeTotal = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const expenseTotal = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const expectedBalance = incomeTotal - expenseTotal

  // Step 4: Get and assert values
  cy.get('#income-amount').invoke('text').then(incomeText => {
    const income = parseFloat(incomeText.replace(/[^\d.-]/g, ''))
    expect(income).to.eq(incomeTotal)
  })

  cy.get('#expense-amount').invoke('text').then(expenseText => {
    const expense = parseFloat(expenseText.replace(/[^\d.-]/g, ''))
    expect(expense).to.eq(expenseTotal)
  })

  cy.get('#balance-amount').invoke('text').then(balanceText => {
    const balance = parseFloat(balanceText.replace(/[^\d.-]/g, ''))
    expect(balance).to.eq(expectedBalance)
  })
});
})