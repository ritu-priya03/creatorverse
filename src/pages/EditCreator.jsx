import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator({ setRefresh }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", image_url: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [working, setWorking] = useState(false);

  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error) throw error;
      setForm({
        name: data.name || "",
        url: data.url || "",
        description: data.description || "",
        image_url: data.image_url || ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setWorking(true);
    setError(null);

    try {
      const updates = {
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim(),
        image_url: form.image_url.trim() || null
      };

      const { error } = await supabase.from("creators").update(updates).eq("id", id);
      if (error) throw error;

      // Trigger refresh in ShowCreators
      setRefresh(prev => !prev);

      navigate("/"); // go back to list
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this creator? This cannot be undone.")) return;
    setWorking(true);
    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) throw error;

      // Trigger refresh in ShowCreators
      setRefresh(prev => !prev);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <section>
      <p><Link to="/">← Back</Link></p>
      <h2>Edit Creator</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          URL
          <input
            type="url"
            required
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            rows="4"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label>
          Image URL (optional)
          <input
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
        </label>
        {error && <p role="alert">Error: {error}</p>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" disabled={working}>{working ? "Saving…" : "Save"}</button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={working}
            style={{ borderColor: "crimson" }}
          >
            {working ? "Deleting…" : "Delete"}
          </button>
        </div>
      </form>
    </section>
  );
}
