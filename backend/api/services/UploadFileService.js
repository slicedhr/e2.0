var UploadFileService = {
	setFolder: function(type){
		var folder;
		switch(type){
			case 'profile_image':
				folder = 'img/profile_photos/';
			break;
		}
		return folder;
	},
	uploadFile: function(options,callback){
		var data;
		var ext,options = options
		
		options.uploadFile.upload({
	      dirname: process.cwd()+'/assets/'+this.setFolder(options.type),
	      maxBytes: 100000000,
	      saveAs:function (__newFileStream,cb) {
	      	cb(null, options.name+ function(){
				switch(__newFileStream.headers['content-type']){
					case 'image/jpeg':
						ext = '.jpg'
					break;
					case 'image/png':
						ext = '.png'
					break;
					case 'application/pdf':
						ext = '.pdf'
					break
				}
				return ext
		      	}()); 
	      }
	    }, function(err, files) {
      			if (err) return err;

       			var profile_image = options.name+ext

	       		Usuarios.update({id:options.user_id},{profile_image: profile_image}).exec(function(err,user){

	       			if (err) return err

	       			data = {
	       				profile_image: profile_image
	       			}
	       			
	     			callback(data)

	       		})
	    	}
	    );
	}
}

module.exports = UploadFileService;  
