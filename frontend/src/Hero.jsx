import React, { useState, useEffect } from "react";
import Uncheck from "./Unchecked";
import Task from "./TaskForm";
import Navigation from "./Navi";

export default function Hero({ handleLogout }) {
  const [items, setItems] = useState([]);
  const [save, setSave] = useState(false);
  const [comp, setComp] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [itemsVersion, setItemsVersion] = useState(0);

  // Fetch tasks
  useEffect(() => {
    if (!isSearchActive) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8080/task");
          if (response.ok) {
            const data = await response.json();
            setItems(data);
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [itemsVersion, isSearchActive]);

  // Update items when search is active
  useEffect(() => {
    if (isSearchActive && searchTerm !== "") {
      const filteredResults = items.filter((item) =>
        item.id.toString().includes(searchTerm) || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.phone1.includes(searchTerm)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(items);
    }
  }, [searchTerm, items, isSearchActive]);
  
  const toggleView = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, view: !item.view } : item
      )
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearchActive(true);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const countJobs = (solved) => {
    return items.filter((item) => item.solved === solved).length;
  };

  const issaved = () => setSave((prev) => !prev);

  const addComp = () => setComp(true);

  const removeComp = () => setComp(false);

  const handleUnsave = async (id) => {
    const confirmed = window.confirm("Are you sure you want to unsave?");
    if (confirmed) {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, solved: false, money: "", solversname: "" } : item
      );
      const updatedItem = updatedItems.find((item) => item.id === id);

      try {
        const response = await fetch(`http://localhost:8080/task/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        });

        if (response.ok) {
          setItems(updatedItems);
          setItemsVersion((prevVersion) => prevVersion + 1);
        } else {
          console.error("Failed to send data:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  const handleUpdateItem = async (id, updatedData) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedData }; // Update the item
      }
      return item;
    });
  
    // Find the updated item to send to the server
    const updatedItem = updatedItems.find((item) => item.id === id);
  
    try {
      const response = await fetch(`http://localhost:8080/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
  
      if (response.ok) {
        // Update the local state with the updated items
        setItems(updatedItems);
      } else {
        console.error(
          "Failed to update item on the server, status:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating item on the server:", error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        setItemsVersion((prevVersion) => prevVersion + 1);
      } else {
        console.error("Failed to delete item on the server:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item on the server:", error);
    }
  };

  const filteredItems = isSearchActive ? searchResults : items;

  const tiles = filteredItems.map((obj) => (
    <Uncheck
      key={obj.id}
      {...obj}
      updateItem={handleUpdateItem}
      toggleView={() => toggleView(obj.id)}
      issaved={save}
      onUnsave={() => handleUnsave(obj.id)}
      onDelete={() => handleDelete(obj.id)}
      onEdit={() => {
        setCurrentItem(obj);
        addComp();
      }}
    />
  ));

  return (
    <>
      {!comp ? (
        <>
          <Navigation
            logout={handleLogout}
            onSearch={handleSearch}
            onReset={resetSearch}
          />
          <div className="hero-cont">
            <div className="hero--btns">
              <button
                className="hero-btn"
                onClick={issaved}
                style={{
                  backgroundColor: save ? "#28a745" : "#dc3545",
                  marginRight: "1rem",
                }}
              >
                {save ? `Closed jobs: ${countJobs(true)}` : `Pending jobs: ${countJobs(false)}`}
              </button>
              <button className="hero-btn" onClick={addComp}>Add</button>
            </div>
            <div className="tiles-container">{tiles}</div>
          </div>
        </>
      ) : (
        <Task item={currentItem} remove={removeComp} onSave={handleUpdateItem} setItemsVersion={setItemsVersion} />
      )}
    </>
  );
}
