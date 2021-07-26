import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const productCategory = req.query.type;
  const curPage = req.query.page || 1;
  const perPage = req.query.limit || 12;

  try {
    const product = await prisma.product.findMany({
      take: perPage * curPage,
      where: {
        category: productCategory,
      },
    });

    const totalProducts = product.length;

    res.status(200).json({
      msg: "success",
      data: product,
      curPage: curPage,
      maxPage: Math.ceil(totalProducts / perPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
