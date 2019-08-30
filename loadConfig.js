const config_path	= './restruct.yml'
const yaml = require('yaml')
const fs = require('fs')
var config

try {
	config = yaml.parse(fs.readFileSync(config_path, 'utf8'))
} catch (e) {}

module.exports = config
