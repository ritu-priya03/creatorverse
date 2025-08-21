import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error) return setError(error.message);
      setCreator(data);
      setLoading(false);
    };
    fetchCreator();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <section>
      <p><Link to="/">← Back</Link></p>
      <h2>{creator.name}</h2>
      {creator.image_url && <img src={creator.image_url} alt={creator.name} width="220" style={{ borderRadius: "10px" }} />}
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noreferrer">Visit Channel</a>
      <p><Link to={`/edit/${creator.id}`}>Edit</Link></p>
    </section>
  );
}
