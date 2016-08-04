defmodule LaunchMap.TerritoryChannel do
  use LaunchMap.Web, :channel

  alias LaunchMap.{Territory, Repo}

  def join("map:all", _params, socket) do
     resp = map_of_added_territories
     {:ok, resp, socket}
  end

  def map_of_added_territories do
     Repo.all(territory_maps)
     |> Enum.into(%{}, fn list -> convert_list_to_tuple(list) end)
  end

  def territory_maps do
     from t in "territories",
     select: [t.name, %{name: t.name, code: t.code}]
  end

  def convert_list_to_tuple([name, code]) do
     {name, code}
  end

  def handle_in("add_territory", payload, socket) do
     create_territory(payload)
     |> broadcast_added_territory(socket)
  end

  def create_territory(params) do
     changeset = Territory.changeset(%Territory{}, params)
     case Repo.insert(changeset) do
       {:ok, territory} ->
           territory
     end
  end

  def broadcast_added_territory(%{code: code, name: name} = territory, socket) do
     broadcast socket, "add_territory", %{code: code, name: name}
     {:reply, :ok, socket}
  end

  def handle_in("remove_territory", payload, socket) do
     atomise_and_fetch_by(payload, :code)
     |> remove_territory
     |> broadcast_removed_territory(socket)
  end

# # handle cases where a territory was removed NOT via the map.
#   def handle_in("remove_territory", %{"code" => "00"} = payload, socket) do
#      atomise_and_fetch_by(payload, :name)
#      |> remove_territory
#      |> broadcast_removed_territory(socket)
#   end
#
#  # handle cases where a territory was removed via the map
#   def handle_in("remove_territory", payload, socket) do
#      atomise_and_fetch_by(payload, :code)
#      |> remove_territory
#      |> broadcast_removed_territory(socket)
#   end

  def atomise_and_fetch_by(map, :code) do
     payload = atomise_map(map)
     Repo.get_by(Territory, code: payload.code)
  end

  def atomise_and_fetch_by(map, :name) do
     payload = atomise_map(map)
     Repo.get_by(Territory, name: payload.name)
  end

"""
   @doc this takes in an object with strings for keys and turns the strings into atoms.
    example input: %{"code": "00", "name": "Singapore"}
    outputs as: %{code: "00", name: "Singapore"}
"""
  def atomise_map(map) do
     map
     |> Enum.map(fn tuple -> atomise_tuple(tuple) end )
     |> Enum.into %{}
  end

  def atomise_tuple({key, val}) do
     {String.to_atom(key), val}
  end

  def remove_territory(struct) do
     case Repo.delete(struct) do
        {:ok, struct} ->
           struct
     end
  end

  def broadcast_removed_territory(territory, socket) do
     broadcast socket, "remove_territory", %{name: territory.name,
                                             code: territory.code}
     {:reply, :ok, socket}
  end





  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (territory:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end



    # Add authorization logic here as required.
    defp authorized?(_payload) do
      true
    end
end
