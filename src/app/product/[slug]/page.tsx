import { prismaClient } from "@/lib/prisma";

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

  return <h1>{product.name}</h1>;
};

export default ProductsDetailsPage;
