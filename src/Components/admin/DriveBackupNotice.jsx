import { Link } from 'react-router-dom';

export default function DriveBackupNotice() {
  return (
    <p className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-gray-700">
      Google Drive text backups apply to newly created records only. Existing records, edits, and deletions are not synced.{' '}
      <Link to="/admin/gallery" className="text-blue-700 underline">Manage Google Drive connection</Link>
    </p>
  );
}
