import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CategoryList from "components/CategoryList";
import NewCategoryPage from "components/Category";
import Admin from "layouts/Admin.js";
import { getSession } from "next-auth/client";
import { CategoryProvider } from "../../contexts/category/use-category";

function CategoryPage() {
  return (
    <CategoryProvider>
      <NewCategoryPage />
      <CategoryList />
    </CategoryProvider>
  );
}
CategoryPage.layout = Admin;

export default CategoryPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
