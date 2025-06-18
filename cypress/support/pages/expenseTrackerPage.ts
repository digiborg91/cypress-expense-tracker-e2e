export class ExpenseTrackerPage {
  visit() {
    cy.visit('https://track-expenses-v1.netlify.app/')
  }

  addTransaction(text: string, amount: number) {
    cy.get('#transaction-text').type(text)
    cy.get('#transaction-amount').type(amount.toString())
    cy.get('#add-transaction-btn').click()
  }

  addMultipleTransactions(transactions: { text: string; amount: number }[]) {
    transactions.forEach(({ text, amount }) => this.addTransaction(text, amount))
  }

  assertTransactionVisible(text: string) {
    cy.contains('#transaction-list li', text).should('be.visible')
  }

  assertTransactionsVisible(transactions: { text: string }[]) {
    transactions.forEach(({ text }) => this.assertTransactionVisible(text))
  }

  assertBalanceCalculations(transactions: { text: string; amount: number }[]) {
    const incomeTotal = transactions
      .filter(t => t.amount > 0)
      .reduce((a, b) => a + b.amount, 0)

    const expenseTotal = transactions
      .filter(t => t.amount < 0)
      .reduce((a, b) => a + Math.abs(b.amount), 0)

    const expectedBalance = incomeTotal - expenseTotal

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
  }

  deleteTransactionByText(text: string) {
    cy.contains('#transaction-list li', text).as('transactionItem')
    cy.get('@transactionItem').find('.delete-btn').click()
    cy.get('@transactionItem').should('not.exist')
  }
}
