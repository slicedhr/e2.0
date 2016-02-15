module.exports = {
	count: function(id, isAdmin){

		var condicion = {}
		
		if (!isAdmin) 
			condicion.vendedor_asignado = id;

		return Clientes.count(condicion)
	}
}