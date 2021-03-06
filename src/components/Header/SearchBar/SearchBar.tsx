import { useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import { SearchIcon } from '@heroicons/react/outline';


export default function SearchBar({categories}:{categories:string[]}) {
    const [query, setQuery] = useState('');
    const [mouseOver, setMouseOver] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);


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
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>

                <button type="submit" className={styles.searchBtn}>
                    <SearchIcon className={styles.searchicon} />
                </button>
            </form>
        </div>
    )
}