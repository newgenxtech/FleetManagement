// import Dashboard from "@/components/Dashboard";

import ChartComponent from "@/components/average-graph";
import RecentTable from "@/components/recent-transaction";
import RecentTrips from "@/components/recent-trips";
import DashboardCard from "@/components/ui/dashboard-card";
import { DollarSign, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="m-2">
      <div
        className="
        grid
        grid-cols-1
        gap-4
        md:grid-cols-2
        lg:grid-cols-4
        xl:grid
      "
      >
        <DashboardCard
          title="Total Trips"
          number={10}
          sincelast={"+10 Since "}
          icon={<Truck size={24} />}
        />
        <DashboardCard
          title="Total Load"
          number={200}
          sincelast={"+10 Since "}
          icon={<Truck size={24} />}
        />
        <DashboardCard
          title="Total Spend"
          number={7600}
          sincelast={"$10 Since "}
          icon={<DollarSign size={24} />}
        />
        <DashboardCard
          title="Total Income"
          number={100}
          sincelast={"+10 Since "}
          icon={<DollarSign size={24} />}
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <RecentTrips />
        <ChartComponent />
        <RecentTable />
      </div>
    </div>
  );
}
