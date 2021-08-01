import prisma from "../../../libs/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const categories = await prisma.categories.findMany();
        console.log(categories);
        res.status(200).json({
          msg: "success",
          data: categories,
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

    case "POST":
      const { category_name, description, slug } = req.body;
      try {
        const category = await prisma.categories.create({
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
