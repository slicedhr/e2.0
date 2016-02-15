module.exports = {

	tareasPendientes : function(options){

		var condicion = {}, self = this

		switch(options.which){

			case 'week':
				condicion.alarm = self.setMommet('week')
			break;

			case 'month':
				condicion.alarm = self.setMommet('month')
			break;

			case 'year':
				condicion.alarm = self.setMommet('year')
			break;

			default:
				condicion.alarm = {
					'<=': sails.moment().format()
				}
		}

		condicion.to = options.id;

		// value: true or false
		
		if(options.success !== 'all')
			condicion.success = options.success

		return Tasks.find(condicion)

	},

	setMommet: function(value){
		return {
			'<=':sails.moment().endOf(value).add(1).format(),
			'>=':sails.moment().startOf(value).add(1).format()
		}
	},
}