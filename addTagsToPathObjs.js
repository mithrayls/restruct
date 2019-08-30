const path = require('path')
const config = require('./loadConfig.js')

async function addTagsToPathObjs(arr){

	let new_arr = []
	await arr.forEach(obj =>{
		obj.tags = []
		
		let dirname		= path.dirname(obj.path)
		let extname		= path.extname(obj.path)
		let basename	= path.basename(obj.path, extname)

		let path_cats = dirname.split('/')

		if (path_cats.length > 0) {
			obj.tags.push(...path_cats)
		}
		if ( extname && config.extname_tag){
			obj.tags.push(extname)
		} if ( basename && config.basename_tag ){
			obj.tags.push(basename)
		}

		new_arr.push(obj)

	})
	
	return new_arr

}

module.exports = addTagsToPathObjs
