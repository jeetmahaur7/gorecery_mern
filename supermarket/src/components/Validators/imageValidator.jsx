export default function imageValidator(event) {
  let { files } = event.target;
  if (files.length === 1) {
    if (files[0].size > 1048576)
      return "Pic size is more then 1 MB please upload an image upto 1 mb";
    else if (
      files[0].type === "image/jpg" ||
      files[0].type === "image/jpeg" ||
      files[0].type === "image/png" ||
      files[0].type === "image/gif"
    )
      return "";
    else
      return "Invalid Pic Type Please Upload .jpg, .jpeg, .png or .gif image";
  } else {
    let error = [];
    Array.from(files).forEach((item, index) => {
      let message = "";
      if (item.size > 1048576)
        message = `Pic ${
          index + 1
        } size is more then 1 MB please upload an image upto 1 mb.`;
      else if (
        item.type === "image/jpg" ||
        item.type === "image/jpeg" ||
        item.type === "image/png" ||
        files[0].type === "image/gif"
      )
        message = "";
      else
        message = `Invalid Pic ${
          index + 1
        } Type Please Upload .jpg, .jpeg, .png or .gif image.`;

      if (message !== "") error.push(message);
    });
    return error.length ? error : "";
  }
}