module.exports = {
  attributes: {
    Expense_Description: {
      type: 'string',
      required: true
    },
    Expense_Amount: {
      type: 'double',
      required: true
    },
    User_id: {
      model: 'user',
    },
    Garden_id: {
      model: 'gardens',
    }
  }

};
