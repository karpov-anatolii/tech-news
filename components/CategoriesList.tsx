import Link from "next/link";
import { TCategory } from "@/app/types";

const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
export default async function CategoriesList() {

  const categories = await getCategories();

  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categories &&
        categories.map((category: TCategory) => (
          <Link
            key={category.id}
            href={`/categories/${category.catName}`}
            className=" bg-slate-800 rounded-md px-4 py-1 text-white cursor-pointer"
          >
            {category.catName}
          </Link>
        ))}
    </div>
  );
}
