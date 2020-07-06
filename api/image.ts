import { createCanvas, registerFont } from "canvas";
import { NowRequest, NowResponse } from "@vercel/node";

import axios from "axios";
import ordinal from "ordinal";

import path from "path";

export default async (req: NowRequest, res: NowResponse) => {
  registerFont(path.join(__dirname, "_lib", "FiraSans-Regular.ttf"), {
    family: "Fira Sans",
  });

  const canvas = createCanvas(300, 100);
  const ctx = canvas.getContext("2d");

  ctx.font = '25px "Fira Sans"';
  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  let resp = await axios(
    "https://api.countapi.xyz/hit/scrapbook.hackclub.com/caleb-test"
  );

  var textString = `You're the ${ordinal(
    resp.data.value
  )} person\nto visit my scrapbook!`;

  ctx.fillText(textString, 150, 40);

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
};
