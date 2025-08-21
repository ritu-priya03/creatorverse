import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  return (
    <article style={{ border: "1px solid #e5e7eb", padding: "1rem", margin: "1rem 0", borderRadius: "12px" }}>
      {creator.image_url && (
        <img src={creator.image_url} alt={creator.name} width="220" style={{ borderRadius: "10px" }} />
      )}
      <h3 style={{ marginBottom: "0.25rem" }}>{creator.name}</h3>
      <p style={{ marginTop: 0 }}>{creator.description}</p>
      <nav>
        <a href={creator.url} target="_blank" rel="noreferrer">Visit Channel</a>{" | "}
        <Link to={`/creator/${creator.id}`}>View</Link>{" | "}
        <Link to={`/edit/${creator.id}`}>Edit</Link>
      </nav>
    </article>
  );
}
