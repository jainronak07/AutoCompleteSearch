import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [showSugg, setShowsugg] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[search]) {
      setRecipe(cache[search]);
      return;
    }
    const data = await fetch(
      "https://dummyjson.com/recipes/search?q=" + search
    );
    const jsonData = await data.json();
    setRecipe(jsonData?.recipes);
    setCache((prev) => ({ ...prev, [search]: jsonData?.recipes }));
  };
  useEffect(() => {
    if (!search.trim()) {
      setRecipe([]);
      return;
    }
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="App">
      <h1>Search Recipe..</h1>
      <div>
        <input
          type="text"
          value={search}
          class="input-box"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowsugg(true)}
          onBlur={() => setShowsugg(false)}
        ></input>
      </div>
      {showSugg && (
        <div className="sugg-container">
          {recipe.map((r) => (
            <span className="sugg" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
