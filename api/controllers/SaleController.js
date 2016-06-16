module.exports = {

  insertView: function (req, res) {
    console.log(">create record view<");
    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var garden_id = req.param("id");
      var user_id = req.session.userId;
      var user_data = {
        User_id : user_id,
        Garden_id : garden_id
      };
      console.log(user_data);
    }
    return res.view('record/new', { User_Data : user_data } );
  },



  insertSaleRecord: function (req, res) {
    console.log(">insert sale record.<");
    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var data = req.allParams();
      console.log(data);

      var sale_data = {
        Total_Sale : req.param("total_sale"),
        Note : req.param("note"),
        User_id : req.param("user_id"),
        Garden_id : req.param("garden_id")
      };

      if (!data){
        console.log("no data");
      }else{
        console.log("data..");
        console.log(sale_data);
        Sales.create(sale_data).exec(function createDB (err, result){
          if (err) {
            console.log(result);
            console.log("error! when insert sale record" + err);
            console.log(sale_data);
            return res.json({ error : err });
          }else {
            console.log("insert successfully.:)");
            return res.redirect('/home');
          }
        });
      }
    }
  },



  viewSaleRecord: function (req, res) {
    console.log(">View Sale Record...<");

    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var garden_id = req.param("id");
      var user_id = req.session.userId;
      var User_Data = {
        User_id : user_id,
        Garden_id : garden_id
      };
      console.log(User_Data);
      // get garden data

        Gardens.findOne({id: garden_id}).exec(function(err, garden){
          if (err) {
            console.log(err);
            console.log('error!.. while finding garden information');
          }else{
            console.log('garden data...');
            console.log(garden);
            var Garden_Info = {
              Garden_Info : garden
            };

            Sales.find({User_id: user_id, Garden_id: garden_id}).exec(function(err, sale){
              if (err) {
                console.log('error!.. while finding garden sale information');
              }else{
                console.log('Sale data..');
                console.log(sale);
                var Sales_Data = {
                  Sales_Data : sale
                };

                console.log('Check before show view...');
                console.log(Sales_Data);
                console.log(Garden_Info);
                console.log(User_Data);

                var data = { User_Data, Garden_Info, Sales_Data };



                return res.view('record/show', {
                  Data : data
                });
              }
            }); // end sale
          }
        }); //end garden
    }
  }




};
