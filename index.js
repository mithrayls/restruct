const fs 											= require('fs')
const path 										= require('path')
const config_path							= './restruct.yml'
const addCategoriesToPathObjs	= require('./addCategoriesToPathObjs.js')
const yaml = require('yaml')
var config

try {
	config = yaml.parse(fs.readFileSync(config_path, 'utf8'))
//	console.log(config)
} catch (e) {}

var paths_objs = []

async function readDir(root_path, depth){

	let paths = fs.readdirSync(root_path)

	await paths.forEach( async file_path => {
		file_path = path.join(root_path, file_path)
		let stats = fs.statSync( file_path )
		let type = stats.isDirectory() ? 'dir' : 'file'
//		console.log(`${file_path} at ${depth}`)

		let obj = { path: file_path, type }

//					console.log("config.mindepth: " + config.mindepth)
//					console.log("depth: " + depth)
		if ( depth >= config.mindepth ){
			paths_objs.push(obj)
		} else {
//			console.log(`exclude file ${root_path}`)
		}

		if (obj.type === 'dir'){
			await statPaths(obj.path, depth)
		}

	})


}

async function statPaths(root_path, depth=0){
	
	depth++
//	console.log(depth)

	if ( config.ignore.includes(root_path) ){
//		console.log(`exclude path ${root_path}`)
	}	else {
		readDir(root_path, depth)
	}

	return paths_objs

}

statPaths('./')
	.then( obj => {
		console.log( obj )
		obj = addCategoriesToPathObjs(obj)
		return obj
	})
	.then( obj => {
		console.log( obj )
		return obj
	})
	.then( obj => {
		let obj_yaml = yaml.stringify(obj)
		fs.writeFileSync( './structure.yml', obj_yaml, 'utf8')
	})
