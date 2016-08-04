defmodule LaunchMap.Repo.Migrations.AddUniqueIndex do
  use Ecto.Migration

  def change do
     create index(:territories, [:name, :code], unique: true)
  end
end
