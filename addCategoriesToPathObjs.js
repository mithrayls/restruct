const path = require('path')

async function addCategoriesToPathObjs(arr){

	let new_arr = []
	await arr.forEach(obj =>{
		obj.categories = []
		
		let dirname		= path.dirname(obj.path)
		let extname		= path.extname(obj.path)
		let basename	= path.basename(obj.path, extname)

		let path_cats = dirname.split('/')

		if (path_cats.length > 0) {
			obj.categories.push(...path_cats)
		}
		if (extname){
			obj.categories.push(extname)
		} if (basename){
		//	obj.categories.push(basename)
		}

		new_arr.push(obj)

	})
	
	return new_arr

}

module.exports = addCategoriesToPathObjs
