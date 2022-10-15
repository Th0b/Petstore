export default function PetsType({ setType }) {
  const handleChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="petsTypeBox" onChange={(e) => handleChange(e)}>
      <h2>Status</h2>
      <label>
        <input type="radio" value="sold" defaultChecked name="pets_status" />
        Sold
      </label>
      <br />
      <label>
        <input type="radio" value="available" name="pets_status" />
        Available
      </label>
      <br />
      <label>
        <input type="radio" value="pending" name="pets_status" />
        Pending
      </label>
      <br />
    </div>
  );
}
