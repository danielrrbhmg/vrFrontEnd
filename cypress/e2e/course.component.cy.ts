

describe('Courses', () => {
  beforeEach(() => {
    cy.visit('/courses');
  })

  it('should add a new course when the form is submitted', () => {
    cy.get('.card').then((cards) => {
      const initialLength = cards.length;

      cy.get('.floating-action-button').click();
      cy.get('input[name="description"]').type('New Course');
      cy.get('input[name="subject"]').type('Course Subject');
      cy.get('.modal-footer button[type="submit"]').click();

      cy.get('.card').should('have.length', initialLength + 1);

    });
    
  });

  it('should edit a course', () => {
    
    cy.get('.card').last().find('#course-btn-edit').click();
  
    const updatedDescription = 'Updated Course Description';
    cy.get('input[name="description"]').clear().type(updatedDescription);
  
    const updatedSubject = 'Updated Course Subject';
    cy.get('input[name="subject"]').clear().type(updatedSubject);

    cy.get('.modal-footer button[type="submit"]').click();

    cy.get('.card').last().within(() => {
      cy.get('.card-title').should('have.text', updatedDescription);
  
      cy.get('.card-text').should('have.text', updatedSubject);
    });
  });
  

  it('should delete the last course', () => {
    cy.get('.card').then(($cards) => {
      const initialLength = $cards.length;
  
      cy.get('.card').last().find('#course-btn-delete').click();
      cy.get('.card').should('have.length', initialLength - 1);
    });
  });

})