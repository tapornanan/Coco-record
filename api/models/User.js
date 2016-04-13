module.exports = {
  attributes: {
    User_Name: {
      type: 'string',
      required: true
    },
    User_Last_name: {
      type: 'string'
    },
    User_Email: {
      type: 'string',
      required: true,
      unique: true
    },
    User_Password: {
      type: 'string',
      required: true
    },

    // Garden: {
    //   collection: 'garden',
    //   via: 'owner'
    // },
    // Sale_Record: {
    //   collection: 'sale_record',
    //   via: 'owner'
    // }


  }
};
