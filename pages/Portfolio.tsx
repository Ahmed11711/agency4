import React, { useState, useEffect } from "react";
import { useI18n } from "../contexts/I18nContext";

interface Product {
  id: number;
  name: string;
  short_description: string;
  slug: string; // لو عايز تستخدم slug للمنتجات
  images: string[] | null;
  category_id: number;
  sku: string | null;
  description: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  products: Product[];
  description: string;
}

const Portfolio: React.FC = () => {
  const { t, language } = useI18n();

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories & products
  useEffect(() => {
    fetch("https://adv6ksa.com/api/web/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
  };

  const filteredProducts = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)?.products || []
    : categories.flatMap((c) => c.products);

  // دوال لاختيار الاسم أو slug حسب اللغة
  const getCategoryLabel = (category: Category) => {
    return language === "ar" ? category.description : category.name;
  };

  const getProductTitle = (product: Product) => {
    return language === "ar" ? product.sku : product.name;
  };

  const getProductDescription = (product: Product) => {
    return language === "ar" ? product.short_description : product.description;

    return product.short_description; // لو عندك ترجمة بالعربي هنا ممكن تغيرها
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#201213] dark:bg-[#201213] light:bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white dark:text-white light:text-gray-900 mb-6 uppercase tracking-tighter">
            {t("portfolio.title1")}{" "}
            <span className="text-primary">{t("portfolio.title2")}</span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-xl">
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Category Buttons */}
        <div className="mb-12 flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all border ${
              activeCategoryId === null
                ? "bg-primary border-primary text-white"
                : "bg-white/5 dark:bg-white/5 light:bg-gray-100 border-white/10 dark:border-white/10 light:border-gray-300 text-gray-400 dark:text-gray-400 light:text-gray-700 hover:border-primary hover:text-white dark:hover:text-white light:hover:text-gray-900"
            }`}
          >
            {t("portfolio.categoryAll")}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all border ${
                activeCategoryId === cat.id
                  ? "bg-primary border-primary text-white"
                  : "bg-white/5 dark:bg-white/5 light:bg-gray-100 border-white/10 dark:border-white/10 light:border-gray-300 text-gray-400 dark:text-gray-400 light:text-gray-700 hover:border-primary hover:text-white dark:hover:text-white light:hover:text-gray-900"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-white">No projects found</p>
          ) : (
            filteredProducts.map((product) => {
              const category = categories.find(
                (c) => c.id === product.category_id
              );
              return (
                <div
                  key={product.id}
                  className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-card-dark dark:bg-card-dark light:bg-white cursor-pointer"
                >
                  <div className="w-full overflow-hidden">
                    <img
                      alt={product.name}
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/600x400"
                      }
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 dark:from-black/95 light:from-black/80 via-black/40 dark:via-black/40 light:via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    {category && (
                      <span className="mb-3 inline-block rounded bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md w-fit">
                        {getCategoryLabel(category)}
                      </span>
                    )}
                    <h3 className="text-2xl font-black text-white mb-2">
                      {getProductTitle(product)}
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-100 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-4">
                      {getProductDescription(product)}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {t("portfolio.viewCaseStudy")}{" "}
                      <span className="material-symbols-outlined text-lg">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More Button */}
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 bg-secondary-gray/20 dark:bg-secondary-gray/20 light:bg-gray-100 hover:bg-secondary-gray/40 dark:hover:bg-secondary-gray/40 light:hover:bg-gray-200 border border-white/10 dark:border-white/10 light:border-gray-300 px-10 py-4 rounded-xl font-bold transition-all text-white dark:text-white light:text-gray-900">
            {t("portfolio.loadMore")}{" "}
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
