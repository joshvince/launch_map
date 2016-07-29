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
      Info.addToList(territoryObject, 'many');
   },
   initialiseEditable: function(territoryObject){
      Map.generateEditable(territoryObject);
   },
   update: function(updateObject){
      Info.addToList(updateObject, 'one')
      Info.updateCount()
      Map.addTerritory(updateObject.code, updateObject.name)
   }

}
