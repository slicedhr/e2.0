/**
 * TasksController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getTasks : function(req, res){
		TaskService
			.tareasPendientes(JSON.parse(req.param('options')))
			.then(function(data){
				return res.send(data)
			}, function(){
				return res.send({error: true})
			})
	},
	
};

