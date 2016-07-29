defmodule LaunchMap.PageController do
  use LaunchMap.Web, :controller
  alias LaunchMap.Territory

  def index(conn, _params) do
    render conn, "index.html"
  end

  def edit(conn, _params) do
     render conn, "edit.html"
  end

  

end
