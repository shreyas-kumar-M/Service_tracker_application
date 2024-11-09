import React, { useState } from "react";

const SaveForm = ({ 
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
  closeSave, 
  saveChanges 
}) => {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      solved:true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    saveChanges(formData);
  };

  return (
    <form className="save-form" onSubmit={handleSubmit}>
     
      <div className="form-group">
        <label>Money:</label>
        <input 
          type="text" 
          name="money" 
          value={formData.money} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>Solver's Name:</label>
        <input 
          type="text" 
          name="solversname" 
          value={formData.solversname} 
          onChange={handleChange} 
        />
      </div>
     
      <div className="form-actions">
        <button type="submit" className="btn btn-save">Save</button>
        <button type="button" className="btn btn-cancel" onClick={closeSave}>Cancel</button>
      </div>
    </form>
  );
};

export default SaveForm;
