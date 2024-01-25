describe("Verify filtering", () => {
    beforeEach(() => {
      cy.visit("https://demo.playwright.dev/todomvc/#/");
    });

    it("Verify Active Tab filtering", () => {
        const filterTab = "active"
        const filterName = 'Active'

      cy.inputTodoItems()
      cy.get('[data-testid="todo-count"] > strong').should("have.text","4") //validate count of All todo items
      cy.validateTodoItems()
      cy.clickCheckboxTodoItems()
      cy.get('[data-testid="todo-count"] > strong').should('have.text','2') //validate count of Active todo items
      cy.clickFilterTab(filterTab,filterName)
      cy.validateActiveItem()

    })

    it("Verify Completed Tab filtering", () => {
        const filterTab = "completed"
        const filterName = 'Completed'

      cy.inputTodoItems()
      cy.get('[data-testid="todo-count"] > strong').should('have.text','4') //validate count of All todo items
      cy.validateTodoItems()
      cy.clickCheckboxTodoItems()
      cy.get('[data-testid="todo-count"] > strong').should('have.text','2') //validate count of Completed todo items
      cy.clickFilterTab(filterTab,filterName)
      cy.validateCompletedItem()

    })

})