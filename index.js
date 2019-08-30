const structure_path = './structure.yml'
const fs 											= require('fs')
const addTagsToPathObjs	= require('./addTagsToPathObjs.js')
const yaml = require('yaml')
var statPaths = require('./statPaths.js')
var analyze = require('./analyze.js')

statPaths('./')
	.then( obj => {
		obj = addTagsToPathObjs(obj)
		return obj
	})
	.then( obj => {
		return obj
	})
	.then( obj => {
		let obj_yml = yaml.stringify(obj)
		fs.writeFileSync( structure_path, obj_yml, 'utf8')
		return structure_path
	})
	.then( structure_path => {
		let data = yaml.parse(fs.readFileSync(structure_path, 'utf8'))
		analysis = analyze(data)
		return analysis
	})
	.then( analysis => {
//		console.log(analysis)
	})
