import React, { useState } from "react";
import CertificateAdd from "./CertificateAdd";
import CertificateList from "./CertificateList";

const CertificateAdmin = () => {
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleDone = () => {
    setEditingCertificate(null); 
    setRefreshList((prev) => !prev); 
  };

  return (
    <div>
      <CertificateAdd editingCertificate={editingCertificate} onDone={handleDone} />
      <CertificateList onEdit={setEditingCertificate} refresh={refreshList} />
    </div>
  );
};

export default CertificateAdmin;
