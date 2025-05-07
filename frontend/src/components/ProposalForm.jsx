import React, { useState } from 'react';

function ProposalForm({ daoContract }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Add image state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await daoContract.createProposal(description, image); // Pass both parameters
      alert("Proposal submitted!");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create proposal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-2">📢 Create Proposal</h2>
      <input
        type="text"
        className="p-2 w-full text-black rounded mb-2"
        placeholder="Describe the post to remove"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        className="p-2 w-full text-black rounded mb-2"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="bg-blue-600 px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default ProposalForm;
