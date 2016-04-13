module.exports = {
  attributes: {
    Total_Sale: {
      type: 'float',
      require: true
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
