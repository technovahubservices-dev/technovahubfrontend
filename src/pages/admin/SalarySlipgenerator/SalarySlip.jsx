import RecordCreateForm from '../../../Components/admin/RecordCreateForm';
import { addSalarySlipApi } from '../../../api/salaryApi';

const fields = [
  { name: 'employeeName', label: 'Employee Name', required: true },
  { name: 'employeeId', label: 'Employee ID', required: true },
  { name: 'designation', label: 'Designation' },
  { name: 'month', label: 'Month', type: 'month' },
  { name: 'period', label: 'Pay Period' },
  { name: 'location', label: 'Location' },
  { name: 'workType', label: 'Work Type' },
  { name: 'bankAccount', label: 'Bank Account' },
  { name: 'basicSalary', label: 'Basic Salary', type: 'number' },
  { name: 'housingAllowance', label: 'Housing Allowance', type: 'number' },
  { name: 'transportation', label: 'Transportation', type: 'number' },
  { name: 'performanceBonus', label: 'Performance Bonus', type: 'number' },
];

export default function SalarySlip() {
  return <RecordCreateForm title="Create Salary Slip" fields={fields}
    createRecord={addSalarySlipApi} successMessage="Salary slip created successfully!" />;
}
