module.exports = {
  attributes: {
    Total_Sale: {
      type: 'string',
      required: true
    },
    Note: {
      type: 'string'
    },

    User_id: {
      model: 'user',
    },
    Garden_id: {
      model: 'gardens',
    }
  }
};
