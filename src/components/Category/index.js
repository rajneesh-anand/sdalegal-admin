import React, { useState } from "react";
import slugify from "slugify";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ToastMessage from "components/Snackbar/Snackbar.js";

export default function NewCategoryPage() {
  const [isProcessing, setProcessingTo] = useState(false);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
  });

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (data) => {
    setProcessingTo(true);

    const bodyData = {
      category_name: data.category_name,
      description: data.description,
      slug: slugify(data.category_name, {
        remove: /[*+~.()'"!:@,]/g,
        lower: true,
      }),
    };

    await fetch("/api/categories", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        } else {
          setProcessingTo(false);
          setMessage("Category saved successfuly !");
          setSuccess(true);
          setOpen(true);
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        setProcessingTo(false);
        setMessage("Oops something went wrong !");
        setSuccess(false);
        setOpen(true);
      });
  };

  return (
    <>
      <form className="new-category-form">
        <GridContainer>
          <GridItem xs={12} sm={3} md={3}>
            <Controller
              name="category_name"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Category Name"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Category Name is required !" }}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Category Description"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Category Description is required" }}
            />
          </GridItem>

          <GridItem xs={12} sm={2} md={2}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {isProcessing ? "Adding..." : `Add New Category`}
            </Button>
          </GridItem>
        </GridContainer>
      </form>
      <ToastMessage
        open={open}
        success={success}
        message={message}
        onClose={handleClose}
      />
    </>
  );
}
