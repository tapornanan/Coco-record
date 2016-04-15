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
    User_Token: {
      type: 'string',
      required: true
    },
    Gardens: {
     collection: 'gardens',
     via: 'User_id'
   },
    // toJSON: function() {
    //   var obj = this.toObject();
    //   delete obj.User_Password;
    //   delete obj.User_Token;
    //   delete obj._csrf;
    //   return obj;
    // }


  }
};
