import Categories from "./components/Categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/ProductList";
import SessionTitle from "../../components/ui/SectionTitle";
import PromoBanner from "./components/PromoBanner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <main>
      <div className="flex flex-col gap-8 py-8">
        <PromoBanner
          src="/banner-home-01.png"
          alt="até 55% de desconto só esse mês"
        />

        <div className="px-5">
          <Categories />
        </div>

        <div>
          <SessionTitle>Ofertas</SessionTitle>
          <ProductList products={deals} />
        </div>

        <PromoBanner
          src="/banner-home-02.png"
          alt="até 55% de desconto em Mouses"
        />

        <div>
          <SessionTitle>Teclados</SessionTitle>
          <ProductList products={keyboards} />
        </div>

        <PromoBanner
          src="/banner-home-03.png"
          alt="até 20% de Desconto em Fones"
        />

        <div>
          <SessionTitle>Mouses</SessionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </main>
  );
}
