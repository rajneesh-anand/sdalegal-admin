import React, { useState, useEffect, useRef, useCallback } from "react";
import slugify from "slugify";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ToastMessage from "components/Snackbar/Snackbar.js";
import DropzoneComponent from "components/Dropzone/Dropzone.js";
import Seo from "components/Seo";
import Admin from "layouts/Admin.js";

import {
  serviceSubCategoryOptions,
  serviceCategoryOptions,
} from "constant/service";

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      paddingRight: 4,
      width: "100%",
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },

    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },

    "& .multiSelectContainer": {
      marginTop: 8,
      paddingRight: 4,
    },
    "& .MuiInputLabel-shrink": {
      color: "#085050",
      fontWeight: 500,
    },
  },
  input: {
    height: 40,
  },
  formControl: {
    marginTop: theme.spacing(1),
    paddingRight: 4,
    width: "100%",
  },
}));

function ServicePage() {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [isProcessing, setProcessingTo] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [usage, setUsage] = useState("");
  const [message, setMessage] = useState();
  const [subCat, setSubCat] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState();

  const classes = useStyles();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const subCatSelectedValues = ["Yoga"];
  const onCatSelect = (event) => {
    setSubCat(event);
  };

  const onCatRemove = (event) => {
    setSubCat(event);
  };

  const onSubmit = async (data) => {
    setProcessingTo(true);

    const formData = new FormData();
    for (let i = 0; i < selectedImage.length; i += 1) {
      formData.append("images", selectedImage[i]);
    }
    formData.append("service_name", data.service_name);
    formData.append("description", data.service_desc);
    formData.append("service_fee", data.service_fee);
    formData.append("sale_fee", data.sale_price);
    formData.append(
      "discount",
      ((data.service_fee - data.sale_price) / data.service_fee) * 100
    );
    formData.append("gst", data.gst);

    formData.append("category", data.category);
    formData.append(
      "sub_category",
      subCat.length === 0
        ? JSON.stringify(subCatSelectedValues)
        : JSON.stringify(subCat)
    );
    formData.append("status", data.status === "Active" ? true : false);
    formData.append("usage", usage);
    formData.append(
      "slug",
      slugify(data.service_name, {
        remove: /[*+~.()'"!:@,]/g,
        lower: true,
      })
    );
    console.log(`${process.env.API_URL}/service`);

    await fetch(`${process.env.API_URL}/service`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        } else {
          setProcessingTo(false);
          setMessage("Service saved successfuly !");
          setSuccess(true);
          setOpen(true);
          setUsage("");
          setSelectedImage([]);
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
    <React.Fragment>
      <Seo title="New Service | SDA LEGAL" />
      <form className={classes.root}>
        <GridContainer>
          <DropzoneComponent onDrop={onDrop} files={selectedImage} />

          <GridItem xs={12} sm={12} md={12}>
            <Controller
              name="service_name"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Service Name"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: " Service Name is required !" }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Controller
              name="service_desc"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Brief Description"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Brief Introduction is required" }}
            />
          </GridItem>

          <GridItem xs={6} sm={4} md={4}>
            <Controller
              name="service_fee"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Service Fee"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "Service Fee is required",
                pattern: {
                  value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                  message: "Accept only decimal numbers",
                },
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={4} md={4}>
            <Controller
              name="sale_price"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Sale Fee"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "Sale Fee is required",
                pattern: {
                  value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                  message: "Accept only decimal numbers",
                },
              }}
            />
          </GridItem>

          <GridItem xs={6} sm={4} md={4}>
            <Controller
              name="gst"
              control={control}
              defaultValue="18"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel htmlFor="gst_rate">GST Rate</InputLabel>
                  <Select
                    native
                    defaultValue="18"
                    onChange={onChange}
                    label="GST Rate"
                    inputProps={{
                      id: "gst_rate",
                    }}
                  >
                    <option value="3">3 %</option>
                    <option value="5">5 %</option>
                    <option value="12">12 %</option>
                    <option value="18">18 %</option>
                    <option value="28">28 %</option>
                    <option value="0">Exempted</option>
                  </Select>
                </FormControl>
              )}
            />
          </GridItem>

          <GridItem xs={6} sm={4} md={4}>
            <div className={classes.select}>
              <Controller
                name="category"
                defaultValue="Rent Agreement"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    <InputLabel htmlFor="category">Service Category</InputLabel>
                    <Select
                      native
                      defaultValue="Rent Agreement"
                      onChange={onChange}
                      label="Service Category"
                      inputProps={{
                        id: "category",
                      }}
                    >
                      {serviceCategoryOptions.map((item, i) => (
                        <option key={i} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </GridItem>
          <GridItem xs={6} sm={4} md={4}>
            <Multiselect
              options={serviceSubCategoryOptions}
              selectedValues={subCatSelectedValues}
              onSelect={onCatSelect}
              onRemove={onCatRemove}
              placeholder="+ Add Sub Category"
              id="catOption"
              isObject={false}
              className="catDrowpdown"
            />
          </GridItem>

          <GridItem xs={6} sm={4} md={4}>
            <div className={classes.select}>
              <Controller
                name="status"
                control={control}
                defaultValue="Active"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    <InputLabel htmlFor="service_status">
                      Service Status
                    </InputLabel>
                    <Select
                      native
                      defaultValue="Active"
                      onChange={onChange}
                      label="Service Status"
                      inputProps={{
                        id: "service_status",
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            {editorLoaded ? (
              <CKEditor
                editor={ClassicEditor}
                data={usage}
                onReady={(editor) => {
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      "height",
                      "160px",
                      editor.editing.view.document.getRoot()
                    );
                  });
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setUsage(data);
                }}
              />
            ) : (
              <p>editor..</p>
            )}
          </GridItem>

          <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
            <div>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                {isProcessing ? "Saving..." : `Save`}
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </form>
      <ToastMessage
        open={open}
        success={success}
        message={message}
        onClose={handleClose}
      />
    </React.Fragment>
  );
}

ServicePage.layout = Admin;

export default ServicePage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
