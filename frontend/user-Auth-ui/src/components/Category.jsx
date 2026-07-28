import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3050/api/categories/', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });

                const dataArray = response.data.data;

                if (Array.isArray(dataArray)) {
                    setCategories(dataArray);
                } else {
                    console.error('Expected an array under response.data.data but got:', response.data);
                    setCategories([]);
                }
            } catch (err) {
                console.error('API Fetch Error:', err);
            }
        })();
    }, []);

    const handleCategoryAdded = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3050/api/categories/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            setCategories((prevCategories) =>
                prevCategories.filter((category) => (category._id || category.id) !== id)
            );
        } catch (err) {
            console.error('Delete API Error:', err);
        }
    };

    const handleStartEdit = (category) => {
        setEditingId(category._id || category.id);
        setEditingName(category.name);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingName('');
    };

    const handleUpdateCategory = async (id) => {
        const trimmedName = editingName.trim();

        if (!trimmedName) {
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3050/api/categories/${id}`,
                { name: trimmedName },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            const updatedCategory = response.data?.data || response.data;

            setCategories((prevCategories) =>
                prevCategories.map((category) => {
                    const categoryId = category._id || category.id;
                    if (categoryId === id) {
                        return {
                            ...category,
                            name: updatedCategory?.name || trimmedName,
                        };
                    }
                    return category;
                })
            );

            handleCancelEdit();
        } catch (err) {
            console.error('Update API Error:', err);
        }
    };

    return (
        <div>
            <h2>Listing Categories - {categories.length}</h2>
            <CategoryForm onCategoryAdded={handleCategoryAdded} />
            <ul>
                {categories?.map((category) => {
                    const categoryId = category._id || category.id;
                    const isEditing = editingId === categoryId;

                    return (
                        <li key={categoryId || Math.random()} style={{ marginBottom: '8px' }}>
                            {isEditing ? (
                                <>
                                    <input
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <button type="button" onClick={() => handleUpdateCategory(categoryId)}>
                                        Save
                                    </button>
                                    <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '8px' }}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{category.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleStartEdit(category)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteCategory(categoryId)}
                                        style={{ marginLeft: '8px' }}
                                    >
                                        Remove
                                    </button>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
