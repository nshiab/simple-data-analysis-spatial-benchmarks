import { SimpleDB } from "@nshiab/simple-data-analysis";

const sdb = new SimpleDB();

const data = await sdb.newTable("data").loadDataFromDirectory("./output");
await data.convert({ duration: "double" });
await data.updateColumn("duration", `duration/1000`);
await data.summarize({
    values: "duration",
    categories: "id",
    summaries: ["mean", "stdDev"],
    decimals: 3,
});
await data.writeData("results.csv");
await data.logTable();
