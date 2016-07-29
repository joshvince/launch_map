defmodule LaunchMap.Territory do
  use LaunchMap.Web, :model

  schema "territories" do
    field :name, :string
    field :code, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :code])
    |> validate_required([:name, :code])
  end
end
