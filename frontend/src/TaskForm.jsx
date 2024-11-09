import React, { useState } from 'react';

const TaskForm = (props) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone1: '',
    phone2: '',
    address: '',
    money: '',
    solversname: '',
    view: false,
    solved: false,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, phone1, address, description } = formData;

  //   // Check if the required fields are filled
  //   if (!name || !phone1 || !address || !description) {
  //     alert('Please fill all the required fields.');
  //     return;
  //   }

  //   console.log('Form Data Submitted:', formData);
  //   props.remove();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Destructure the necessary fields from formData
    const { id, name, phone1, phone2, address, money, solversname, view, solved, description } = formData;
  
    // Check if the required fields are filled
    if (!name || !phone1 || !address || !description) {
      alert('Please fill all the required fields.');
      return;
    }
  
    try {
      // Send the form data to the server
      const response = await fetch('http://localhost:8080/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          phone1,
          phone2,
          address,
          money,
          solversname,
          view,
          solved,
          description
        }), // Send the form data as JSON
      });
  
      if (response.ok) {
        console.log('Form Data Submitted:', formData);
        props.remove(); // Close the form or perform any other necessary actions
        props.setItemsVersion((prevVersion) => prevVersion + 1);
      } else {
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  

  const handleClose = () => {
    setFormData({
      id: '',
      name: '',
      phone1: '',
      phone2: '',
      address: '',
      money: '',
      solversname: '',
      view: false,
      solved: false,
      description: '',
    });
    console.log('Form Closed');
    props.remove();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone 1: </label>
        <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} required />
      </div>
      <div className="form-group">
<label>Phone 2: </label>
<input type="text" name="phone2" value={formData.phone2} onChange={handleChange} />
</div>
      <div className="form-group">
        <label>Address: </label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description: </label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-submit">Submit</button>
        <button type="button" className="btn btn-close" onClick={handleClose}>Close</button>
      </div>
    </form>
  );
};

export default TaskForm;
