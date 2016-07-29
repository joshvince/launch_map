defmodule LaunchMap.TerritoryChannel do
  use LaunchMap.Web, :channel

  alias LaunchMap.{Territory, Repo}

  def join("map:all", _params, socket) do
     resp = map_of_added_territories
     {:ok, resp, socket}
  end

  def map_of_added_territories do
     Repo.all(all_territories)
     |> Enum.into(%{}, fn list -> convert_list_to_tuple(list) end)
  end

  def all_territories do
     from t in "territories",
     select: [t.code, t.name]
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

  def handle_in("manual_add_territory", payload, socket) do
     create_territory(payload)
     |> broadcast_manual_added_territory(socket)
  end

  def broadcast_manual_added_territory(%{name: name} = territory, socket) do
     broadcast socket, "manual_add_territory", %{name: name}
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
