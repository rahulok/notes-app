var yargs = require('yargs')
var fs = require('fs')
const notes = require('./notes.js')
const log = console.log


yargs.command({
	command: 'add',
	describe: 'This will add a note',
	builder: {
		title:{
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		},
		body:{
			describe: 'The body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.addNote(argv.title, argv.body)
	}
})

yargs.command({
	command: 'remove',
	describe: 'This will remove a note',
	builder:{
		title:{
			describe:'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.remNote(argv.title)
	}
})

yargs.command({
	command: 'readNote',
	builder:{
		title:{
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.readNote(argv.title)
	}
})

yargs.command({
	command: 'see',
	describe: 'used to see all the notes',
	handler(){
		notes.seeAllnotes()
	}
})

yargs.parse();