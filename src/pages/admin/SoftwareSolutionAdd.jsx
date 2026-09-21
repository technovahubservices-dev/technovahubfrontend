import RecordCreateForm from '../../Components/admin/RecordCreateForm';
import { addSoftwareSolutionApi } from '../../api/softwareSolutionApi';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
];

export default function SoftwareSolutionAdd() {
  return <RecordCreateForm title="Add Software Solution" fields={fields}
    createRecord={addSoftwareSolutionApi} successMessage="Software solution added successfully!" />;
}
