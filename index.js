const fs = require('fs')

paths = fs.readdirSync('./')

paths.forEach( path => {
	fs.stat( path, (err, stats) => {
		console.log(stats.isDirectory())
	})
})

