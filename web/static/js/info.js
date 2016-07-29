export var Info = {
   initialCount: function(territoryObject){
      let el = document.getElementById('territory-count')
      let count = Object.keys(territoryObject).length
      el.innerHTML =   `<h2 id="count-number"> ${count} </h2>
                        <h4> in total </h4>`
   },
   updateCount: function(){
      let element = document.getElementById('count-number');
      let currentNum = element.innerHTML;
      let newNum = (currentNum ++)
      element.innerHTML = currentNum ++
   },
   addToList: function(territoryObject, param){
      let listDiv = document.getElementById('territory-list')

      function setHTML(element, className, value){
         element.innerHTML += `<div class="col-sm-12 country ${className}"><h4> ${value} </h4></div>`
      }
      if (param == 'one') {
         setHTML(listDiv, 'dark', territoryObject.name)
      }
      else if (param == 'many') {
         let nameList = [];
         for (var terr in territoryObject) {
            nameList.push(territoryObject[terr])
         }
         for (var i = 0; i < nameList.length; i++) {
            setHTML(listDiv, 'dark', nameList[i])
         }
      }

   }


}
