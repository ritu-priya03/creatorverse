import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import { Link } from "react-router-dom";

export default function ShowCreators({ refresh }) {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCreators(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount & when refresh changes
  useEffect(() => {
    fetchCreators();
  }, [refresh]);

  if (loading) return <p>Loading creators…</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>All Creators</h2>
        <Link to="/new"><button>+ Add Creator</button></Link>
      </div>

      {creators.length > 0 ? (
        creators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)
      ) : (
        <p>No creators yet. Click “Add Creator” to create one.</p>
      )}
    </section>
  );
}
