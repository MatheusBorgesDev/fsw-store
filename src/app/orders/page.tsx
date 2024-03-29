import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/OrderItem";

async function OrdersPage() {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Access Denied</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-5 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        Meus pedidos
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.length == 0 && (
          <div className="flex text-center text-lg mt-4">
            <p className="w-full">Ainda não há pedidos realizados</p>
          </div>
        )}

        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
