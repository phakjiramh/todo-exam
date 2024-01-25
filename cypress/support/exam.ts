declare namespace Cypress {
    interface Chainable {
      inputTodoItems(): Chainable<null>
      validateTodoItems() : Chainable<null>
      clickCheckboxTodoItems(): Chainable<null>
      clickFilterTab(filterTab:string, filterName : string): Chainable<null>
      validateActiveItem():Chainable<null>
      validateCompletedItem(): Chainable<null>
      
      
    }
  }

  enum TODO_ITEM {    //ใช้ enum เพื่อกำหนด scope ของตัวแปร ให้ valid มากขึ้น
    TEST1 = "Test1",
    TEST2 = "Test2",
    TEST3 = "Test3",
    TEST4 = "Test4"
  }
  

  const allTodoItems = [TODO_ITEM.TEST1, TODO_ITEM.TEST2,TODO_ITEM.TEST3, TODO_ITEM.TEST4]; // item ที่ต้องการใส่เอามาเก็บไว้ใน array ชื่อ todoItems
  const activeTodoItems =[TODO_ITEM.TEST2,TODO_ITEM.TEST3]
  const completedTodoItems = [TODO_ITEM.TEST1,TODO_ITEM.TEST4]

  Cypress.Commands.add('inputTodoItems', () => {
    for (const item of allTodoItems) {
      // ใช้ for of ในการวนลูปใน allTodoItems (กำหนดให้ item เป็นตัวแปร)
      cy.get(".new-todo").type(item + "{enter}"); //ขั้นตอน 1.ใส่ข้อมูลลงใน input field 2.กด enter
    }
  })
  
  Cypress.Commands.add('validateTodoItems', () => {
    // validate expected result (todoItems) เทียบกับ actual result ในหน้าเว็บ
    cy.get('[data-testid="todo-item"]').each(($element, index) => {
        // li แต่ละตัวมี property เป็น data-testid="todo-item" เหมือนกัน
        // เมื่อเข้าถึง property ระบบจะคืนค่ามา 4 list จึงใช้ each ในการวนลูป
        // each รับ parameter 2 ตัว คือ $element(JQuery)และ index (วนลูปใน array)
        const todoItem = allTodoItems[index]; //ประกาศตัวแปร todoItem เพื่อต้องการให้ได้ item ใน array
        cy.wrap($element).within(() => {
          // ใช้ todoItem เพื่อ validate ว่าแต่ละ il แสดงข้อมูลถูกต้องหรือไม่
          //wrap $element เพื่อให้ใช้ใน cypress ได้
          //ใช้ within เพื่อให้เข้าถึง element ใน li ได้
          cy.get('[data-testid="todo-title"]').should("have.text", todoItem);
        });
      });
  })
  

  Cypress.Commands.add('clickCheckboxTodoItems',()=>{
    //3. Click on the checkbox Todo item as completed
    cy.get('[data-testid="todo-item"]').each(($element) => {
        // ใช้ each ในการวนลูป
        cy.wrap($element).within(() => {
          cy.get('[data-testid="todo-title"]').then(($todoItem) => {
            // สร้าง $todoItem 
            if ($todoItem.text() === TODO_ITEM.TEST1 || $todoItem.text() === TODO_ITEM.TEST4) { //ใช้ if เพื่อกำหนด condition ที่ต้องการ คือ Test1 or Test4
              cy.get('[type="checkbox"]').check();
            }
          });
        });
      });
    });

    Cypress.Commands.add('clickFilterTab',(filterTab,filterName)=>{
        cy.get(`[href= "#/${filterTab}"]`).should('have.text', filterName).click()
    })

    Cypress.Commands.add('validateActiveItem',()=>{
        cy.get('[data-testid="todo-item"]').each(($element, index) => {
            const activeTodoItem = activeTodoItems[index]; //ประกาศตัวแปร todoItem เพื่อต้องการให้ได้ item ใน array
        cy.wrap($element).within(() => {
            cy.get('[data-testid="todo-title"]').should("have.text", activeTodoItem);
        });
      });

    })

    Cypress.Commands.add('validateCompletedItem',()=>{
      cy.get('[data-testid="todo-item"]').each(($element, index) => {
        const completedTodoItem = completedTodoItems[index]; //ประกาศตัวแปร todoItem เพื่อต้องการให้ได้ item ใน array
    cy.wrap($element).within(() => {
        cy.get('[data-testid="todo-title"]').should("have.text", completedTodoItem);
    });
  });


    })

    

