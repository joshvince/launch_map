// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"

import {App} from "./app"
import {Map} from "./map"
import {Info} from "./info"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

// Now that you are connected, you can join channels with a topic:
let mapChannel = socket.channel("map:all")

if (document.getElementById('world-map-editable')) {
// EDIT MODE
   mapChannel.join()
     .receive("ok", resp => { App.initialiseEditable(resp)})
     .receive("error", resp => { console.log("Unable to join", resp) })

   //   $(document).on('click', 'path.jvectormap-region.jvectormap-element', function(){
   //      let code = $(this).attr('data-code')
   //      let payload = territoryPayloadObject(code)
   //      function territoryPayloadObject(code){
   //         return {"code": code, "name": Map.countries[code].name}
   //      }
   //      mapChannel.push('add_territory', payload)
   //   })

// MANIPULATING TERRITORIES FROM THE MAP
     $(document).on('click', 'path.jvectormap-region.jvectormap-element', function(){
        if ($(this).hasClass('added')) {
   // REMOVE IT
           console.log("fired removal block");
           let code = $(this).attr('data-code')
           let name = Map.countries[code].name
           let payload = App.createPayload(name, code)
           mapChannel.push("remove_territory", payload)
        }
        else {
   // ADD IT
           let code = $(this).attr('data-code')
           let name = Map.countries[code].name
           let payload = App.createPayload(name, code)
           mapChannel.push("add_territory", payload)
        }
     });
// MANIPULATING TERRITORIES ADDED MANUALLY
// REMOVING THEM
     $(document).on('click', '.territory', function(){
        let name = $(this).attr('data-name')
        let code = $(this).attr('data-code')
        let payload = App.createPayload(name, code)
        mapChannel.push('remove_territory', payload)

     })
// ADDING THEM
     $(document).on('click', '#add-manual-territory', function(){
        let name = document.getElementById('manual-territory-name').value
        let code = `0${name.slice(0,2).toUpperCase()}`
        let payload = {"name": name, "code": code}
        mapChannel.push('add_territory', payload)
     })

     mapChannel.on('add_territory', resp => {
        App.addTerritory(resp)
     })

     //TODO: this doesn't work when the div has been created after the page has loaded. JQUERY is not picking up the div because it was created by the channel!
     mapChannel.on('remove_territory', resp => {
        App.removeTerritory(resp)
     })




}

else {
// VIEW MODE
   mapChannel.join()
     .receive("ok", resp => { App.initialise(resp)})
     .receive("error", resp => { console.log("Unable to join", resp) })


   mapChannel.on('add_territory', resp => {
      App.addTerritory(resp)
   })

   mapChannel.on('remove_territory', resp => {
      App.removeTerritory(resp)
   })



}



export default socket
