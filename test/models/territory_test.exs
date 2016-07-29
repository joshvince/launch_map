defmodule LaunchMap.TerritoryTest do
  use LaunchMap.ModelCase

  alias LaunchMap.Territory

  @valid_attrs %{code: "some content", name: "some content", num_buyers: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Territory.changeset(%Territory{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Territory.changeset(%Territory{}, @invalid_attrs)
    refute changeset.valid?
  end
end
