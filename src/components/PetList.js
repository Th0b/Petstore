import { useEffect, useState } from "react";

export default function PetList({ setChosen, type, update }) {
  useEffect(() => {
    if (update === true) getPets();
  }, [type, update]);

  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPets = async () => {
    try {
      console.log("Pet list was fetched");
      const response = await fetch(
        "https://petstore.swagger.io/v2/pet/findByStatus?status=" + type
      );
      const result = await response.json();
      setPets(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Data fetch error - {error}</span>;
  } else {
    return (
      <div className="petsBox">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr /*key={pet.id}*/ onClick={() => setChosen(pet.id)}>
                  <td>{pet.id}</td>
                  <td>{pet.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
