// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
// import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

import { Map } from "./map"
import { Info } from "./info"

export var App = {
   initialise: function(territoryObject){
      Map.generate(territoryObject);
      Info.initialCount(territoryObject);
      Info.initialiseList(territoryObject);
   },
   initialiseEditable: function(territoryObject){
      Map.generateEditable(territoryObject);
      Info.initialCount(territoryObject);
      Info.initialiseList(territoryObject);
   },
   addTerritory: function(updateObject){
      //TODO: refactor this so you that both editable and non-editable maps use the same code. See my ideas in removeTerritory for ideas.
      let editableMap = document.getElementById('world-map-editable')

      if (editableMap) {
         console.log("fired editable block");
         Info.updateCount('add')
         Info.addToStaticList(updateObject, 'one')
         if (updateObject.code[0] != "0") {
            Map.addTerritoryEditable(updateObject.code, updateObject.name)
         }
      }
      else {
         console.log("fired noneditable block");
         Info.updateCount('add')
         Info.addToStaticList(updateObject, 'one')
         if (updateObject.code[0] != "0") {
            Map.addTerritory(updateObject.code, updateObject.name)
         }

      }
   },
   createPayload: function(name, code){
      return {name: name, code: code}
   },
   removeTerritory: function(updateObject){
      Info.updateCount("remove");
      Info.removeFromList(updateObject.code);
      if (updateObject.code[0] != "0") {
         Map.removeTerritory('.map-wrapper', updateObject.code)
      }
   }


}
