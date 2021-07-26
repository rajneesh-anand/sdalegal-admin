import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "teal",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "black",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneComponent(props) {
  const { onDrop, files } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 3,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name} style={{ height: 72, width: 104, margin: "0px 4px" }}>
      <img src={file.preview} alt={file.name} height="72" width="104" />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <>
      <GridItem xs={12} sm={6} md={6}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div>
            <i className="fas fa-cloud-upload-alt "></i>{" "}
            <span>Drag 'n' Drop or Click here to upload images (max 3)</span>
          </div>
        </div>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 4 }}
        >
          {thumbs}
        </div>
      </GridItem>
    </>
  );
}

export default DropzoneComponent;
