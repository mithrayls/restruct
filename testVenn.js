const d3 = require('d3')
const venn = require('venn.js')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM('')

svg = d3.select(dom.window.document.body).append("svg")

var sets = [ {sets: ['A'], size: 12}, 
				             {sets: ['B'], size: 12},
				             {sets: ['A','B'], size: 2}]

var chart = venn.VennDiagram()
d3.select(dom.window.document.body).datum(sets).call(chart)

console.log(dom.serialize())
