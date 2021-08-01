import prisma from "../../../libs/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const id = req.query.id;
      try {
        const category = await prisma.categories.findUnique({
          where: {
            id: Number(id),
          },
        });

        res.status(200).json({
          msg: "success",
          data: category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      } finally {
        async () => {
          await prisma.$disconnect();
        };
      }
      break;

    case "PUT":
      const catId = req.query.id;
      const { category_name, description, slug } = req.body;
      try {
        const category = await prisma.categories.update({
          where: { id: Number(catId) },
          data: {
            name: category_name,
            description: description,
            slug: slug,
          },
        });
        res.status(200).json({
          msg: "success",
          data: category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      } finally {
        async () => {
          await prisma.$disconnect();
        };
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
