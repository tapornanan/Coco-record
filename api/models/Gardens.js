module.exports = {
  attributes: {
    Garden_Name: {
      type: 'string',
      required: true
    },
    Garden_Area: {
      type: 'integer',
      required: true
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
