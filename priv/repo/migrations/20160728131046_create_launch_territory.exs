defmodule LaunchMap.Repo.Migrations.CreateLaunchTerritory do
  use Ecto.Migration

  def change do
    create table(:launchterritories) do
      add :name, :string
      add :code, :string
      add :num_buyers, :integer

      timestamps()
    end

  end
end
