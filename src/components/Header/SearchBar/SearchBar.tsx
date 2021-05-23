import { useEffect, useState } from 'react';
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

    useEffect(() => {
        getCategories().then(res => setCategories(res));
    }, [])

    return (
        <div className={styles.searchBar}>
            <form>
                <div className={styles.category_selector}>
                    <select name="products">
                        {categories && categories.map((e, index) => (
                            <option value={e} key={index}>{e}</option>
                        ))}
                    </select>
                </div>
                
                <div className={styles.input_bar}>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>

                <button type="submit" className={styles.searchBtn}>
                    <SearchIcon className={styles.searchicon} />
                </button>
            </form>
        </div>
    )
}