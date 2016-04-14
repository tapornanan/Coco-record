module.exports = {
  attributes: {
    Garden_Name: {
      type: 'string',
      require: true
    },
    Garden_Area: {
      type: 'integer',
      require: true
    },
    Number_Of_Trees: {
      type: 'integer'
    },
    Garden_Type: {
      type: 'string',

    },

    User_id : {
      model: 'user',
    }
  }
};
