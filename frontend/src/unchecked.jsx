import React, { useState } from "react";
import EditForm from "./EditForm";
import SaveForm from "./SaveForm";

export default function Uncheck({ 
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
  toggleView, 
  issaved,
  onUnsave,
  updateItem, // Ensure this is destructured from props
  onDelete
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => setIsEditing(true);

  const closeEdit = () => {
    setIsEditing(false);
    setIsSaving(false);
  };

  const saveEdit = (editedData) => {
    console.log('New Edited Data:', editedData);
    setIsEditing(false);
    updateItem(id, editedData);
  };

  const handleSave = () => setIsSaving(true);

  const saveChanges = (updatedData) => {
    console.log('Saved Data:', updatedData);
    setIsSaving(false);
    
      updateItem(id, updatedData); // Ensure updateItem is a function
    
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(id); // Call the delete handler
    }
  };

  return (
    <>
      {issaved === solved && (
        <div className="card">
          {!isEditing && !isSaving ? (
            <>
              <div className="head-view">
                <div className="head-info">
                  <p className="c-id">{id}</p>
                  <h3>{name}</h3>
                  <p className="c-phone">{phone1}</p>
                </div>
                <button onClick={toggleView}>{!view ? "view" : "hide"}</button>
              </div>
              {view && <hr className="line" />}
              {view && <p className="description"><strong className="c-tit">Description</strong> <br />{description}</p>}
              {view && <p className="address"><strong className="c-tit">Address</strong><br />{address}</p>}
              {view && phone2 && <p className="c-phone">{phone2}</p>}
              {view && issaved && <h5 className="money">₹ {money} /-</h5>}
              {view && issaved && <h4 className="solver">{solversname}</h4>}
              {view && (
                <div>
                  <button className="btn" onClick={handleEdit}>edit</button>
                  {!issaved && <button className="btn" onClick={handleSave}>{issaved ? "unsave" : "save"}</button>}
                  {issaved && <button className="btn" onClick={() => onUnsave(id)}>Unsave</button>}
                  <button className="btn" onClick={handleDelete}>Delete</button>
                </div>
              )}
            </>
          ) : isSaving ? (
            <SaveForm 
              id={id}
              name={name}
              phone1={phone1}
              phone2={phone2}
              view={view}
              description={description}
              address={address}
              money={money}
              solversname={solversname}
              solved={solved}
              closeSave={() => setIsSaving(false)}
              saveChanges={saveChanges}
            />
          ) : (
            <EditForm
              id={id}
              name={name}
              phone1={phone1}
              phone2={phone2}
              view={view}
              description={description}
              address={address}
              money={money}
              solversname={solversname}
              solved={solved}
              closeEdit={closeEdit}
              saveEdit={saveEdit}
            />
          )}
        </div>
      )}
    </>
  );
}
