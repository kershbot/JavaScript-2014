var app = app || {};

app.router = (function() { // a router routes requests 

	var route = function() {
	    var hash = window.location.hash.slice(2); // changing different states of an app 
	    console.log(hash); 
	    if(typeof handle[hash] === 'function') {
	      requestHandlers[hash]();
	    } else {
	      console.log('404 not found');// 404
	    }
  	};
  	console.log(app);
  	var requestHandlers = { // map different things to different values 
	    archive : function() { // if say archive then take to archive view 
	      // render archive view
	      console.log('Archive!');
	    },
	    compose : function() {
	      // render compose view
	      console.log('Compose!');
	    }
	  };
	var handle = {};
	handle['/'] = requestHandlers.archive; // handel holds different functions 
	handle['archive'] = requestHandlers.archive;
	handle['compose'] = requestHandlers.compose;

	return {
		route : route // return one method which is route 
	}

})();