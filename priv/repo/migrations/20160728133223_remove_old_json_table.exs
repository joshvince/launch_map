defmodule LaunchMap.Repo.Migrations.RemoveOldJsonTable do
  use Ecto.Migration

  def change do
     drop table(:launchterritories)
  end
end
