var achievment = require("./achievmentsModel.js");
var user = require("../user/userModel.js")
module.exports ={
	getAllAchievments : function (req, res) {
	  achievment.find({}).exec(function (err, data) {
	    if(err){
		  res.status(500).send('err');
		}else{
		  res.status(200).json(data)
		}
		});
	},
	insertAchievment : function (req, res) {
		console.log(req.body)
		var newAch = new achievment(req.body);
		var n = req.body.name;  
		user.findOne({username : n}).exec(function(err, u){
		  	if(err) throw err;
		  	newAch.save(function(err, achievment){
		  		if(err) throw err;
		  		u.achievments.push(achievment._id);
		  		u.save(function(err, u){
		  			res.status(201).send(achievment)
		  		})
		  	})
	  })
	}
}