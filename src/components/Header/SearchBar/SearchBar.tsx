import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import { SearchIcon } from '@heroicons/react/outline';

async function getCategories(): Promise<Array<string>> {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();
    return categories;
}

export default function SearchBar() {
    const [categories, setCategories] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const [mouseOver, setMouseOver] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        getCategories().then(res => setCategories(res));
    }, [])

    const addOutline = {
        outline: "3px solid #ffa600",
        boxShadow: "0 0 10px #ffa600",
        borderRadius: "10px",
    }

    const removeOutline = {
        outline: "",
        boxShadow: "",
        borderRadius: "",
    }

    const changeWidth = () => {
        const newWidth = selectRef.current.value.length;
        selectRef.current.style.width = `${newWidth+2}ch`;
    }

    return (
        <div className={styles.searchBar}>
            <form onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} style={mouseOver ? addOutline : removeOutline}>
                <div className={styles.category_selector}>
                    <select ref={selectRef} name="products" onChange={changeWidth}>
                        {categories && categories.map((e, index) => (
                            <option value={e} key={index}>{e}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.input_bar}>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search an item"/>
                </div>

                <button type="submit" className={styles.searchBtn}>
                    <SearchIcon className={styles.searchicon} />
                </button>
            </form>
        </div>
    )
}