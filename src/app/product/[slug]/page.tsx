import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/ProductList";
import SessionTitle from "@/components/ui/SectionTitle";

interface ProductDetaislPageProps {
  params: {
    slug: string;
  };
}

const ProductsDetailsPage = async ({
  params: { slug },
}: ProductDetaislPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />

      <ProductInfo product={computeProductTotalPrice(product)} />

      <div>
        <SessionTitle>Produtos recomendados</SessionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  );
};

export default ProductsDetailsPage;
