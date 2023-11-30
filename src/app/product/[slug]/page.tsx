import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import { computeProductTotalPrice } from "@/helpers/product";

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
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />

      <ProductInfo product={computeProductTotalPrice(product)}/>
    </div>
  );
};

export default ProductsDetailsPage;
