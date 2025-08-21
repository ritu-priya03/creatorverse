import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", image_url: "" });
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    setWorking(true);
    setError(null);
    try {
      const newCreator = {
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim(),
        image_url: form.image_url.trim() || null
      };

      const { error } = await supabase.from("creators").insert([newCreator]);
      if (error) throw error;

      navigate("/", { state: { updated: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  };

  return (
    <section>
      <p><Link to="/">← Back</Link></p>
      <h2>Add Creator</h2>
      <form onSubmit={handleAdd}>
        <label>
          Name
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          URL
          <input type="url" required value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
        </label>
        <label>
          Description
          <textarea rows="4" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
        </label>
        <label>
          Image URL (optional)
          <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
        </label>
        {error && <p role="alert">Error: {error}</p>}
        <button type="submit" disabled={working}>{working ? "Adding…" : "Add Creator"}</button>
      </form>
    </section>
  );
}
