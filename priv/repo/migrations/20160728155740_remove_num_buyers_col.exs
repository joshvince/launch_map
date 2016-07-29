defmodule LaunchMap.Repo.Migrations.RemoveNumBuyersCol do
  use Ecto.Migration

  def change do
     alter table(:territories) do
        remove :num_buyers
     end
  end
end
