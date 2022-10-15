import { useState, useEffect } from "react";

export default function PetInfo({ chosen, pet, setPet, setUpdate, update }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chosen != null) getPet();
  }, [chosen]);

  useEffect(() => {
    if (chosen !== null) updatePet();
  }, [pet]);

  const getPet = async () => {
    try {
      setLoading(true);
      console.log("Pet was fetched");
      const response = await fetch(
        "https://petstore.swagger.io/v2/pet/" + chosen
      );
      const result = await response.json();
      setPet(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const changePet = async (newStatus) => {
    const newPet = { ...pet, status: newStatus };
    setPet(newPet);
  };

  const updatePet = async () => {
    try {
      console.log("Pet was updated");
      await fetch("https://petstore.swagger.io/v2/pet", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet),
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setUpdate(!update);
    }
  };

  if (!chosen) {
    return <></>;
  } else if (loading) {
    return (
      <div className="petInfoBox">
        <span>Loading...</span>
      </div>
    );
  } else if (error) {
    return (
      <div className="petInfoBox">
        <span>Data fetch error - {error}</span>
      </div>
    );
  } else {
    return (
      <div className="petInfoBox">
        <h1>Pet</h1>
        <span>
          <b>ID:</b> {pet.id}
        </span>
        <br />
        <span>
          <b>Name:</b> {pet.name}
        </span>
        <br />
        <span>
          <b>Category:</b>{" "}
          {typeof pet.category.name != "undefined" && <>{pet.category.name}</>}
        </span>
        <br />
        <span>
          <b>Tags:</b>{" "}
          {typeof pet.tags != "undefined" &&
            pet.tags.map((tag, i) => {
              return (
                <>
                  {tag.name}
                  {pet.tags.length - 1 > i && <>, </>}
                </>
              );
            })}
        </span>
        <br />
        <span>
          <b>Status:</b>
        </span>
        <br />
        <div onChange={(e) => changePet(e.target.value)}>
          <label>
            <input
              type="radio"
              value="sold"
              checked={pet.status === "sold"}
              name="pet_status"
            />
            Sold
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="available"
              checked={pet.status === "available"}
              name="pet_status"
            />
            Available
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="pending"
              checked={pet.status === "pending"}
              name="pet_status"
            />
            Pending
          </label>
          <br />
        </div>
      </div>
    );
  }
}
