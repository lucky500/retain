$(function(){
	var model = {
		init: function(){
			//checking if there is any notes on locaStorage
			//and if there is we are using JSON.stringify to format them.
			if (!localStorage.notes){
				localStorage.notes = JSON.stringify([]);
			}
		},
		add: function(obj){
			//parsing the localStorage.notes
			//pusing it to obj
			//stringify data
			var data = JSON.parse(localStorage.notes);
			data.push(obj);
			localStorage.notes = JSON.stringify(data);
		},
		getAllNotes: function(){
			//return parse notes
			return JSON.parse(localStorage.notes);
		}
	};

	var octopus = {
		//controller
		//add new note to model.content
		addNewNote: function(noteStr){
			model.add({
				content: noteStr
			});
			view.render();
		},
		getNotes: function(){
			//return notes
			return model.getAllNotes();
		},
		getNotesReverse: function(){
			//return reverse notes
			return model.getAllNotes().reverse();
		},

		init: function(){
			//initializing model and view
			model.init();
			view.init();
		}
	};

	var view = {
		init: function(){
			//appending noteList to #notes
			this.noteList = $('#notes');
			//accessing #new-note-form
			var newNoteForm = $('#new-note-form');
			//accessing new-note-content
			var newNoteContent = $('#new-note-content');
			newNoteForm.submit(function(e){
				//on submit addnewnote, get value of input
				octopus.addNewNote(newNoteContent.val());
				newNoteContent.val('');
				e.preventDefault();
			});
			view.render();
		},
		render: function(){
			var htmlStr = '';
			octopus.getNotes().forEach(function(note){
				//appending note to html body.
				htmlStr += '<li class="note">' + note.content + '</li>';
			});
			this.noteList.html(htmlStr);
		}
	};
	octopus.init();
});