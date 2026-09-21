import toast from 'react-hot-toast';

export default function notifyCreateResult(response, onSuccess) {
  const backup = response?.googleDrive ?? response?.data?.googleDrive;
  if (backup?.status === 'saved') {
    let href;
    try {
      const url = new URL(backup.webViewLink);
      if (url.protocol === 'https:') href = url.href;
    } catch { /* A missing or malformed link must not affect a successful save. */ }
    toast.success(
      <div>
        <p>Saved successfully and backed up to Google Drive.</p>
        {href && <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Open in Drive</a>}
      </div>,
      { duration: 8000 },
    );
  } else if (backup?.status === 'failed') {
    toast(
      <div>
        <p>Record saved in database, but Google Drive backup failed. Check the Drive connection and folder access.</p>
        <a href="/admin/gallery" className="text-blue-700 underline">Reconnect Google Drive</a>
      </div>,
      { icon: '⚠️', duration: 10000, style: { background: '#fffbeb', color: '#92400e' } },
    );
  } else {
    onSuccess();
  }
}
