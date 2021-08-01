import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ToastMessage from "components/Snackbar/Snackbar.js";
import { useForm, Controller } from "react-hook-form";
import slugify from "slugify";

import { categoryContext } from "../../contexts/category/use-category";
import { useCategory } from "../../contexts/category/use-category";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #ddd",
    "& .MuiTableCell-root": {
      padding: 4,
    },
  },
});

export default function CategoryList() {
  const classes = useStyles();
  const { state, fetchCategories, totalNumberOfrecords, categories } =
    useCategory();
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState();
  const [toastOpen, setToastOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isProcessing, setProcessingTo] = useState(false);
  const [editData, setEditData] = useState();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
  });

  const handleClose = () => {
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

    await fetch(`/api/categories/${editData.id}`, {
      method: "PUT",
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
          setMessage("Category updated successfuly !");
          setSuccess(true);
          setToastOpen(true);
          handleClose();
        }
        return response;
      })
      .catch((error) => {
        setProcessingTo(false);
        setMessage("Oops something went wrong !");
        setSuccess(false);
        setToastOpen(true);
      });
  };

  const editCategory = (id) => {
    fetch(`/api/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEditData(data.data);
        setOpen(true);
      })
      .catch((error) => {
        setMessage(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, [totalNumberOfrecords, toastOpen]);

  return (
    <>
      {categories && (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Category Name</TableCell>
                <TableCell align="left">Category Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="left">{category.description}</TableCell>
                  <TableCell align="center">
                    <button
                      style={{ cursor: "pointer", marginTop: 4 }}
                      onClick={() => {
                        editCategory(category.id);
                      }}
                    >
                      Update Category
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {editData && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Category</DialogTitle>
          <DialogContent>
            <form>
              <Controller
                name="category_name"
                control={control}
                defaultValue={editData.name}
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

              <Controller
                name="description"
                control={control}
                defaultValue={editData.description}
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
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              {isProcessing ? "Updating..." : `Update Category`}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastMessage
        open={toastOpen}
        success={success}
        message={message}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}
