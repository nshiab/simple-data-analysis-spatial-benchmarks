import { SimpleDB } from "@nshiab/simple-data-analysis";
import { writeFileSync } from "node:fs";

for (let i = 0; i < 10; i++) {
  const start = Date.now();

  const sdb = new SimpleDB();

  const trees = sdb.newTable("trees");
  await trees.loadData("sda/data-raw/arbres-publics.csv");
  await trees.filter(`Latitude IS NOT NULL AND Longitude IS NOT NULL`);
  await trees.points("Latitude", "Longitude", "geom");

  const neighbourhoods = sdb.newTable("neighbourhoods");
  await neighbourhoods.loadGeoData(
    "sda/data-raw/quartierreferencehabitation.geojson",
  );

  const joined = await trees.joinGeo(neighbourhoods, "inside", {
    outputTable: "joined",
  });
  await joined.summarize({
    categories: "nom_qr",
    summaries: "count",
  });
  // await joined.logTable();

  // This crashes everything since using duckdb neo. Don't know why.
  // await sdb.done();

  const end = Date.now();
  const duration = end - start;
  console.log(i, duration);
  const csvLine = `id,iteration,duration\n
deno@2.1.7/sda@4.0.1,${i},${duration}`;
  writeFileSync(
    `output/deno-sda-${i}.csv`,
    csvLine,
  );
}
