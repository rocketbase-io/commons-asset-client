import { createAssetClient } from "src/index";

const client = createAssetClient();

client.fetch({ context: "screenshot" }).then(({ content }) => {
  console.log(content);
});

const file: unknown = "File Content";
client.upload(file, { context: "test" }).then((asset) => {
  console.log(asset);
});
