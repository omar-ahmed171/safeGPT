import React, { useState } from 'react';
import axios from 'axios';
import '../styles/MedicalDocumentUpload.css';

const MedicalDocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setResponse('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('/api/medical-documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error analyzing document:', error);
      setResponse('Error analyzing document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medical-document-upload">
      <h1>Medical Document Analysis</h1>
      <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload and Analyze'}
      </button>
      {response && (
        <div className="response">
          <h2>Analysis</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default MedicalDocumentUpload;
