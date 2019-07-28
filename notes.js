const fs = require('fs')
const chalk = require('chalk')
const log = console.log

var addNote = (title,body) => {
	let notes = loadNotes()
	// let duplicate = notes.filter( (ele) =>  ele.title === title )
	let isThereDuplicate = notes.find((ele) => ele.title === title)
	// log('Loaded data is ', notes)
	if(!isThereDuplicate){
		notes.push({
			title:title,
			body: body
		})
		// log('Notes now is ', notes)
		notes = JSON.stringify(notes)
		// console.log('The note data stringifyed is ', notes)
		fs.writeFileSync('notedata.json',notes)
		// console.log('Item Pushed')		
	}
	else{
		log('Duplicate data found!!')
	}
}

var remNote = (title) =>{
	let index,found = false;
	let notes = loadNotes()
	notes.forEach( (ele,i) => {
		if(ele.title === title)
		{	
			found = true;
			index = i;
		}
	})
	// log('notes is ', notes)
	if(found){
		log(chalk.green('Title found at index ', index, ' and deleted'))
		notes.splice(index, 1);
		// log('notes now is ', notes)

		notes = JSON.stringify(notes)
		fs.writeFileSync('notedata.json',notes)		
	}else{
		log(chalk.red.bold('Title not found'))
	}
}

var readNote = (title) => {
	let notes = loadNotes()
	let noteFound = notes.find( (ele) => ele.title === title  )
	if(noteFound){
		log( chalk.green(noteFound.title) + ' ' + noteFound.body )
	}else{
		log( chalk.red.inverse('Note not found') )
	}
}

var seeAllnotes = () =>{
	let notes = loadNotes()
	log(chalk.green.bold('The notes are'))
	notes.forEach(function(ele,index){
		log(index+1, ' ' ,ele.title, '\t', ele.body)
	})
}

var loadNotes =  () => { 
	try{
		var notesbuffer = fs.readFileSync('notedata.json')
		var notesobj = JSON.parse(notesbuffer)
		return notesobj		
	}catch(e)
	{
		return []
	}
}

module.exports = {
	addNote: addNote,
	remNote: remNote,
	seeAllnotes: seeAllnotes,
	readNote: readNote,
}