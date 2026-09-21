import { useState } from 'react';
import toast from 'react-hot-toast';
import useSubmitLock from '../../hooks/useSubmitLock';
import notifyCreateResult from '../../utils/notifyCreateResult';
import DriveBackupNotice from './DriveBackupNotice';

export default function RecordCreateForm({ title, fields, createRecord, successMessage }) {
  const [values, setValues] = useState({});
  const { loading, beginSave, finishSave } = useSubmitLock();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!beginSave()) return;
    try {
      const payload = Object.fromEntries(fields.map(({ name, type }) => [
        name, type === 'number' ? Number(values[name] || 0) : values[name] || '',
      ]));
      const response = await createRecord(payload);
      notifyCreateResult(response, () => toast.success(successMessage));
      setValues({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save record. Please try again.');
    } finally {
      finishSave();
    }
  };

  return (
    <div className="m-4 rounded-xl bg-white p-5 shadow-md md:m-6">
      <h2 className="mb-4 text-xl font-semibold text-blue-600">{title}</h2>
      <DriveBackupNotice />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map(({ name, label, type = 'text', required = false }) => (
            <label key={name} className="block text-sm font-medium text-gray-700">
              {label}
              {type === 'textarea' ? (
                <textarea name={name} required={required} value={values[name] || ''}
                  onChange={(e) => setValues({ ...values, [name]: e.target.value })}
                  rows={5} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
              ) : (
                <input name={name} type={type} required={required} value={values[name] ?? ''}
                  min={type === 'number' ? 0 : undefined} step={type === 'number' ? '0.01' : undefined}
                  onChange={(e) => setValues({ ...values, [name]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
              )}
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  );
}
