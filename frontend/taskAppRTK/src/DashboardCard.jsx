export default function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}