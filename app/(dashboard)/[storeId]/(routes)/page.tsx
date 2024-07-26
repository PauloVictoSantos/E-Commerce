import prismadb from "@/lib/prismadb";

interface DashboardOverviewProps {
  params: { storeId: string };
}

export default async function DashboardOverview({
  params,
}: DashboardOverviewProps) {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    }
  })

  return <div>Overview : {}</div>;
}
