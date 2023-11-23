import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/ProductImages";

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
    <div>
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
    </div>
  );
};

export default ProductsDetailsPage;
