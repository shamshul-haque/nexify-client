import { useQuery } from "@tanstack/react-query";
import { Cell, Legend, Pie, PieChart } from "recharts";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Statistics = () => {
  const axiosPublic = useAxiosPublic();

  const { data: collectionLength, isLoading } = useQuery({
    queryKey: ["collectionLength"],
    queryFn: async () => {
      const res = await axiosPublic.get("/collectionLength");
      return res?.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner w-40 py-52 bg-yellow-500"></span>
      </div>
    );
  }

  const data = collectionLength.map((item) => {
    return {
      name: item?.category,
      value: item?.length,
    };
  });

  const COLORS = ["#FF444A", "#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const entry = data[index];
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${entry.value}`}
      </text>
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend></Legend>
      </PieChart>
    </div>
  );
};

export default Statistics;
