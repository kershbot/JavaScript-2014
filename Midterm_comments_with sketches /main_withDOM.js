

var app= (function(w,d) {


var DOM ={ // Doctument object modle this create increase in speed for large apps

  'write-suggestion-form': d.querySelector ('.write-suggestion-form'), // query selectors is a string containing one or more css selectors 
  'write-suggestion' : d.querySelector ('.write-suggestion'), //need to mach a css ID / element  
  'submit-suggestion' : d.querySelector('.submit-suggestion'), 
  'suggestions' : d.querySelector('.suggestions')
}; 

//no we will scrub everything including white space 
var sanitize = function(string){
  return string.replace(/(^\s+|\s+$)/g,''); 

};


// change to JSON 
var suggestion = JSON.parse(localStorage.getItem ('suggestion')) || []; // or its empty 


// Event handlers function 
var attachEvents = function (){ // all attach event functions
  DOM['submit-suggestion'].addEventListener('click', function(e){
    e.preventDefault(); 

    suggestions.push(new Suggestion(sanitize(DOM['write-suggestion'].value), DOM['suggestions']).init()); 
    //make new suggestion object and push it to "suggestions" array. 
    DOM['write-suggestion'].value = ''; 
   }); 
  }; 

  //Suggestion is a constructor 

elements.suggestionSubmit.addEventListener('click', function (event){ 
  event.preventDefault(); // what does this mean? 
  var fieldValue = elements.suggestionField.value; 

  var newSuggestion = new Model (fieldValue, suggestion).save(); // houses every suggestion
  new View(newSuggestion, elements.suggestionList).init(); // when there is a new suggestion initialize the retreval of elemnts of suggesitonList from CSS 

  elements.suggestionField.value = ''; // 0 or whatever is in there


}); // why does it have bracket and then ); 

window.addEventListener('hashchange', function(e){ // window listens for a hashtag to load new window view what does function (e) mean? 
  e.preventDefault(); // preventing the default 
  console.log ('hash just changed'); // window view just changed 
  app.router.route(); // routing to new app called route 
}); 

}; 

var addAsFirstChild = function (parent,child){
  var parentNode = parent, // varible of parent node which is also related to child node 
    childNode = child; 
  if(parentNode.firstChild){
    parentNode.insertBefore(child,parent.firstChild); // instert info to parent 
  } else{ 
    parentNode.appendChild(child); //otherwise change child

  }

}; 

var View = function (suggestions, containerEL) {// this is the interface for every view there is a model for 

var index = suggestion.indexOf(suggestions), // this view is the list index of every suggestion
  that = this; // check on what it means  

this.render = function () {
  this.listItem = document.createElement('li'); // pulling elements from css 
  this.paragraph = document.createElement('p'); // paragraph styling 
  this.actions = document.createElement('ul'); //action styling 
  this.voteButton = document.createElement('li'); // vote button styling 

  this.listItem.classList.add('suggestions'); // suggestions class for the list
  this.actions.classList.add('actions');
  this.voteButton.classList.add('vote', 'icon-check'); // icon for vote button

  this.paragraph.innerHTML = suggestions.suggestionsBodyText; // innerHTML? 
  this.actions.appendChild(this.voteButton); // change the child when action 
  this.listItem.appendChild(this.paragraph); 
  this.listItem.appendChild(this.actions); // everytime change happens this have to change 

  addAsFirstChild(elements.suggestionsList, this.listItem); 

  elements.noSuggestionFound.classList.add('hidden'); // if there are no suggestions hide 

  return this; // return everything with this 

}; 

this.vote = function(){ // changing data when there is a vote occuring 
  suggestions.vote(); // update the "vote" in data 
  console.log ('View says : did they vote on me?', suggestions.vote); 
  that.voteButton.classList.toggle('voted'); // update the UI and show checkmark // want to add a counter 
}; 

this.attachEvent = function(){
  this.voteButton.addEventListener('click', this.vote); // listen for click and invoke vote
}; 

this.init = function(){ //creating the initialize function
  this.render(); 
  this.attachEvents(); 
  return this; 

  }; 

}; 

var Model = function (suggestionsBodyText, collection) { 
  this.suggestionsBodyText = suggestionsBodyText; 
  this.voted = false; // voted starts off not being shown 

  this.save = function (){ // pushes the array of suggestions into local storage instead of into database 
    collection.push(this); 
    localStorage.setItem ('suggestion', JSON.stringify(collection)); // make a collection and write in long json string of suggestions 
    return this; 
  }; 

  this.vote = function (){ 
    this.voted = !this.voted; 
    localStorage.setItem('suggestion', JSON.stringify(suggestion)); 
    console.log('Model says : did they vote on me?', this.voted); 
  }; 

}; // model ends 

var initialRender = function () { // if there is anything in render view show it 
  console.log('this is saved data:', JSON.parse(localStorage.getItem('suggestion'))); 

  if (('suggestion' in localStorage) && (JSON.parse (localStorage.getItem('suggestion')).length>0)){ 
  var savedSuggestion = JSON.parse (localStorage.getItem('suggestion')), 

  suggestion = savedSuggestion.slice(); // check what slice means i think slice message 

  i=0, 
  len = savedSuggestion.length; 
  for (i; i < len; i += 1){
    new View(savedSuggestion[i], elements.suggestionsList).init(); 
  }

} //else {
  //elements.noSuggestionFound.classList.remove('hidden'); // might need to delet this 
   // }
}; 

// initialize everything and only show what you want 

var init = function(){ 
  console.log('App init'); // lets me know in console if the app was initilized 
  attachEvents (); // initiates any attache Events 
  initialRender (); // renders view ?? ** check 
  app.router.route(); // routing it to a new "page aka view because we are not dealing with pages "
}; 

return {
  init:init, 
  suggestion : suggestion // only return notes varible 

}; 


})(); // what is this one doing? 

window.addEventListener ('DOMContentLoaded', app.main.init); // scrubs 