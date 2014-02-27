// file: dude.js
// var dude =(function() {
// 	var name= 'Justin Charles'
//     var getName = function (){
//     return name; 

//     };
//     var setName = function(newName){
//     name = newName;
//     };
//     return {
//     penutButter : getName, 
//     jelly : setName
//     };

// })(); // without () makes the whole function public it also means your defining it and running it in the same place 

// // shouter is dependent on the previous module to be able to do its task 
// // file: shouter.js 
// var shouter = (function(){ 
// 	var shout = function(name){
// 		alert(name); 

// 	};
//  return{
//  	shout : shout 

//  };
// })(); (above is commnted out so we can write individual ones below )

// Example of a blueprint 

// var Person = function(firstName, lastName, age, profession, hobby){
// 	this.firstName = fistName; 
// 	this.lastName = lastName; 
// 	this.age = age;
// 	this.profession = profession; 
// 	this.hobby = hobby; 
// }; 

// var me = new Person('Mani', 'Nilchiani', 27,'designer', 'music'); //new always followed by capital letter 



var app = (function() {

	var elements ={
	//storing refernces to the dom elements will be using in the application 
	noteField : document.querySelector('.write-note') // inside object use colen 
	noteSubmit : document.querySelector('.submit-note'), 
	noteList : document.querySelector ('.notes')
}; 

var notes = []; 

var attachEvents - function(){
	elements.noteSubmit.addEventListener('click', function (event){
		event.preventDefault(); // prevents the defualt of reloading the page
		var filedValue - elements.noteField.value; 
		notes.push(new Note(fieldValue));
		elements. noteFiled.value = '';  
		//alert ('oh look a new note!'); 
		//console.log(event); 
	}); //listen to click events and run function 

}; 

var Note = funtion (noteBodyText){
	this.noteBodyText = noteBodyText;
	this.listItem = document.createElement('li'); 
	this.paragraph = document.createElement('p'); 
	this.liteItem.classList.add('note'); // class list returns the list of all things attahed to it 
	this.paragraph.innterHTML = this.noteBodyText;
	this.listItem.appendChild(this.paragraph); 
	this.actions = document.createElement('ul'); 
	this.actions.classList.add('actions'); 
	this.removeButton = document.createElement('li'); 
	this.likeButton =document.createElement('li'); 
	this.removeButton.classList.add('remove', 'icon-cancel'); 
	this.likeButton = document.classlist.add('like', 'icon-heart'); 
	this.actions.appendChild(this.removeButton); 
	this.listItem.appendChild(this.likeButton); 
	this.listItem.appendChild(this.actions); 
	elements.noteList.appendChild(this.listItem);  
	this.liked = false; // boolean because true / false 
	this.like = function (){
		this.liked = !this.liked; // ! meand opposite and flips it 
		that.liked =!that.liked; 
		console.log('I am liked' , this.liked); 
		that.elements.likeButton.classList.toggle('liked'); 

	};
	this.remove = function (){
		console.log('I am a goner'); 

	};
	this.attachEvents = function (){
		this.likeButton.addEventListener('click', this.like); 
		this.removeButton.addEventListener('click', this.remove); 

	}; 
	this.init = function(){
		this.attachEvents(); // listen for on and off clicks 
	};

};

	var init = function(){ // in charge of initilizing app 
		console.log('App init'); 
		attachEvents(); // call this to load during first initialization 
};

	return {
		init : init,
		elements : elements,
		Note : Note,
		notes :notes 


	}; 
})(); 

window.addEventListener('DOMContentLoaded', app.init); 
// window is our global object it exposes an event messagner called add evet listner the above waits for all the DOM to render 

























































