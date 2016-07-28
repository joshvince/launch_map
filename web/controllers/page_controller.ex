defmodule LaunchMap.PageController do
  use LaunchMap.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
