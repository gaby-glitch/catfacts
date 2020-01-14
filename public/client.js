//Cat Facts
   let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   let url = "https://cat-fact.herokuapp.com/facts";

   function generate() {
	   console.log("running generate");
	   fetch(proxyUrl + url).then(function(response) {
           response.json().then(function(json) {
          showCatFact(json);
         //showJSON(json);
         
		 });
	   })
	   .catch(function(error){console.log("Error" + error);});
   }
   
   
  
    function kittens() {
	   console.log("running kittens");
	   fetch(proxyUrl + url).then(function(response) {
           response.json().then(function(json) {
          showKittenFact(json);
         //showJSON(json);
         
		 });
	   })
	   .catch(function(error){console.log("Error" + error);});
   }
   
   
      function showCatFact(json) {
		  console.log("in showCatFacts");
      let fact = document.getElementById("fact");  
	  let num = Math.floor(Math.random() * json.all.length); //random calc;
      fact.textContent = json.all[num].text + " submitted by " + json.all[num].user.name.first + json.all[num].user.name.last;
   }
  
   
     function showKittenFact(json) {
		  console.log("in showKittenFact");
	 //var json.all[i] = ["kitten"];  //json.all
	   let fact = document.getElementById("jact");  
	 var i = Math.floor(Math.random() * json.all.length/2);
	 for (; i < json.all.length; i++) {
         if ((json.all[i].text).search("kitten") != -1) {
	        fact.textContent = json.all[i].text + " submitted by " + json.all[i].user.name.first + json.all[i].user.name.last;
			break;
		 }
	 }
   }
  
   
   
   
   
   function Mathrandom(){
   document.getElementById("number").innerHTML = Math.floor(Math.random() *10);
   }
 function showJSON(json) {
     let content = document.getElementById("content");
     content.innerHTML = "<pre>" + JSON.stringify(json, undefined, 2) + "</pre>";
   
   }
   
  