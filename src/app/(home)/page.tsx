import Image from "next/image";
import Categories from "./components/Categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/ProductList";
import SessionTitle from "./components/SectionTitle";
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

  return (
    <main>
      <div>
        <PromoBanner
          src="/banner-home-01.png"
          alt="até 55% de desconto só esse mês"
        />

        <div className="mt-8 px-5">
          <Categories />
        </div>

        <div className="mt-8 p-0">
          <SessionTitle>Ofertas</SessionTitle>
          <ProductList products={deals} />
        </div>

        <PromoBanner
          src="/banner-home-02.png"
          alt="até 55% de desconto em Mouses"
        />

        <div className="mt-8 p-0">
          <SessionTitle>Teclados</SessionTitle>
          <ProductList products={keyboards} />
        </div>
      </div>
    </main>
  );
}
