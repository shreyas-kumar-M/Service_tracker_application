import React, { useState } from "react";

const EditForm = ({ 
  id, 
  name, 
  phone1, 
  phone2, 
  view, 
  description, 
  address, 
  money, 
  solversname, 
  solved, 
  closeEdit, 
  saveEdit 
}) => {
  const [formData, setFormData] = useState({
    id,
    name,
    phone1,
    phone2,
    view,
    description,
    address,
    money: solved ? money : '',  // Include money if solved
    solversname: solved ? solversname : '',  // Include solversname if solved
    solved,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure money and solversname are strings before trimming
    const moneyString = typeof formData.money === 'string' ? formData.money.trim() : '';
    const solversnameString = typeof formData.solversname === 'string' ? formData.solversname.trim() : '';
  
    // Update `solved` based on trimmed `money` and `solversname`
    const updatedFormData = {
      ...formData,
      solved: moneyString !== '' || solversnameString !== '' ? true : false,
      money: moneyString,  // Ensure that trimmed value is saved
      solversname: solversnameString,  // Ensure that trimmed value is saved
    };
  
    console.log('Edited Data:', updatedFormData);
    saveEdit(updatedFormData);
  };
  
  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <div className="edit-field">
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
        />
      </div>
      <div className="edit-field">
        <label>Phone 1:</label>
        <input 
          type="text" 
          name="phone1" 
          value={formData.phone1} 
          onChange={handleChange} 
        />
      </div>
      <div className="edit-field">
        <label>Phone 2:</label>
        <input 
          type="text" 
          name="phone2" 
          value={formData.phone2} 
          onChange={handleChange} 
        />
      </div>
      <div className="edit-field">
        <label>Address:</label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
        />
      </div>
      <div className="edit-field">
        <label>Description:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
        />
      </div>

      {/* Conditionally render money and solversname if solved is true */}
      {formData.solved && (
        <>
          <div className="edit-field">
            <label>Money:</label>
            <input 
              type="text" 
              name="money" 
              value={formData.money} 
              onChange={handleChange} 
            />
          </div>
          <div className="edit-field">
            <label>Solvers Name:</label>
            <input 
              type="text" 
              name="solversname" 
              value={formData.solversname} 
              onChange={handleChange} 
            />
          </div>
        </>
      )}

      <div className="edit-actions">
        <button type="submit" className="edit-submit-btn">Submit</button>
        <button type="button" className="edit-close-btn" onClick={closeEdit}>Close</button>
      </div>
    </form>
  );
};

export default EditForm;
