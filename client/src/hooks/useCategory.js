import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:3308/get-categories');
            setCategories(data?.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return categories;
};

export default useCategory;
