export class ExpenseTrackerPage {
  visit() {
    cy.visit('https://track-expenses-v1.netlify.app/')
  }

  enterTransaction(text: string, amount: number) {
    cy.get('#transaction-text').type(text)
    cy.get('#transaction-amount').type(amount.toString())
    cy.get('#add-transaction-btn').click()
  }

  verifyTransactionVisible(text: string) {
    cy.contains('#transaction-list li', text).should('be.visible')
  }

  getBalance() {
    return cy.get('#balance-amount')
  }

  getIncome() {
    return cy.get('#income-amount')
  }

  getExpense() {
    return cy.get('#expense-amount')
  }

  deleteTransaction(text: string) {
    cy.contains('#transaction-list li', text)
      .as('transactionItem')
      .should('be.visible')

    cy.get('@transactionItem').find('.delete-btn').click()
    cy.get('@transactionItem').should('not.exist')
  }
}
