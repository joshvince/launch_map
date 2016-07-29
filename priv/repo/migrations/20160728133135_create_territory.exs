defmodule LaunchMap.Repo.Migrations.CreateTerritory do
  use Ecto.Migration

  def change do
    create table(:territories) do
      add :name, :string
      add :code, :string
      add :num_buyers, :integer

      timestamps()
    end

  end
end
