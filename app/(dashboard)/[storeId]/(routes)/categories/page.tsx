import { collection, doc, getDocs } from "firebase/firestore";
import { CategoryClient } from "./_components/client";
import { db } from "@/lib/firebase";
import { Category } from "@/types/types-db";
import { CategoryColumns } from "./_components/colums";
import { format } from "date-fns";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categoriesData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "Categories"))
  ).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];

  const formattedCategories: CategoryColumns[] = categoriesData.map(
    (item) => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboardLabel,
      createdAt: item.createdAt
        ? format(item.createdAt.toDate(), "MMMM do, yyyy")
        : "",
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
