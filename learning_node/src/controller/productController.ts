import type { IncomingMessage, ServerResponse } from "http";
import { InsertProduct, ReadFile } from "../service/readFile";
import type { Iproduct } from "../types/product.type";
import { ParseBody } from "../utility/parse.body";
import { SendResponse } from "../utility/SendResponse";

export const ProductController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const Products = ReadFile();

  const urlId = url?.split("/");
  // console.log(urlId)
  const id = urlId && urlId[1] === "products" ? Number(urlId[2]) : null;
  // console.log(id)

  if (url === "/products" && method === "GET") {
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "products retrieved successfully",
    //     data: Products,
    //   }),
    // );

    // resuable reponse

    const Products = ReadFile();

    SendResponse(res, 200, true, Products,"products retrieved successfully");
  } else if (method === "GET" && id !== null) {
    // get single product
    const Products = ReadFile();
    const Product = Products.find((p: Iproduct) => p.id === id);
    // console.log(product)
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "single product retrieved successfully",
    //     data: Product,
    //   }),
    // );

    SendResponse(
      res,
      200,
      true,
      Product,
      "single product retrieved successfully",
    );
  }

  // to make a post we need postman as well.. we need to craete a function in sevice named insertProduct to insert data and we create utility folder to parse the data and enable post chunk by chunk...
  else if (method === "POST" && url === "/products") {
    const body = await ParseBody(req);
    // console.log("Body",body)
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    Products.push(newProduct);
    InsertProduct(Products);

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "product created successfully",
    //     data: newProduct,
    //   }),
    // );

    SendResponse(res, 200, true, newProduct, "product created successfully");
  } else if (method === "PUT" && id !== null) {
    const body = await ParseBody(req);
    const Products = ReadFile();

    const index = Products.findIndex((p: Iproduct) => p.id === id);
    console.log(index);

    if (index < 0) {
      //   res.writeHead(404, { "content-type": "application/json" });
      //   res.end(
      //     JSON.stringify({
      //       message: "product not found",
      //       data: null,
      //     }),
      //   );

      SendResponse(res, 404, true, null, "product not found");
    }

    // product update
    Products[index] = { id: Products[index].id, ...body };

    InsertProduct(Products);

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "product updated successfully",
    //     data: Products[index],
    //   }),
    // );

    SendResponse(
      res,
      200,
      true,
      Products[index],
      "product updated successfully",
    );

  } else if (method === "DELETE" && id !== null) {
    const body = await ParseBody(req);

    const Products = ReadFile();

    const index = Products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
    //   res.writeHead(404, { "content-type": "application/json" });
    //   res.end(JSON.stringify({ message: "product not found" }));

      SendResponse(
      res,
      200,
      true,
      null,
      "product not found",
    );
    }

    Products.splice(index, 1);
    InsertProduct(Products);
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "product deleted successfully",
    //     data: Products[index],
    //   }),
    // );

    SendResponse(
      res,
      200,
      true,
      Products[index],
      "product deleted successfully",
    );

  }
};
