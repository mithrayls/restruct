const fs 											= require('fs')
const yaml = require('yaml')
const jsonata = require('jsonata')
var statPaths = require('./statPaths.js')
const _ = require('lodash')
const path = require('path')

async function countTags(sorted){

		var tag_counts = []
		var i = 0

		while ( i < sorted.length) {
			let tag = sorted[i]
			let idx_start	= sorted.indexOf(tag)
			let idx_end		= sorted.lastIndexOf(tag)
			let count = idx_end - idx_start + 1
			i = idx_end + 1

			tag_counts.push({tag,count})
		}

		return tag_counts

}

async function mutateObjectTagsToPath( data, tag ){

	data.forEach( obj => {
		tags = obj.tags

		let idx = tags.indexOf(tag)
		if ( idx > -1 ){
			tags.splice(idx,1)
			obj.tags = tags
			if (obj.new_path) {
				obj.new_path = path.join(obj.new_path, tag)
			} else {
				obj.new_path = path.join('./', tag)
			}
		}
	})

	return data
	
}


async function analyze(data){
		var expression

//		console.log(data)
		expression =  jsonata("tags")
		let tags = expression.evaluate(data)
				if ( typeof tags !== 'undefined' && tags.length > 0 ){
//				console.log(tags)
		let sorted_categories = tags.sort()
		let tag_counts = await countTags(sorted_categories)

		let sorted_tag_counts = _.sortBy(tag_counts, ['count'])

		let top_category = sorted_tag_counts.pop().tag
		
		data = await mutateObjectTagsToPath(data, top_category )

		data = await analyze(data)
				}

				/*
		let max = _.maxBy(tagCounts, 'count')
					console.log(_.find(data, function(o){
						return o.categories.includes(max.tag)
					}))

				*/
		console.log(data)
		return data

}

module.exports = analyze
