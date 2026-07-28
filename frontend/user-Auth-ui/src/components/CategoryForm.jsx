import { useState } from "react";
import axios from "axios";

export default function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name.trim()) return;

  try {
    const response = await axios.post(
      "http://localhost:3050/api/categories/",
      { name: name.trim() },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (onCategoryAdded) {
      // FIX: Extract the actual category object from response.data.data
      const newCategory = response.data.data;
      
      if (newCategory && (newCategory.name || newCategory._id)) {
        onCategoryAdded(newCategory);
      } else {
        console.error("Could not find category object in:", response.data);
      }
    }

    setName("");
  } catch (error) {
    console.error("Error creating category:", error);
  }
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        style={{ marginRight: "8px", padding: "6px" }}
      />
      <button type="submit">Add Category</button>
    </form>
  );
}

