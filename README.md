This repository contains the code to test and compare the performance of
geospatial computations with
[simple-data-analysis](https://github.com/nshiab/simple-data-analysis) (Deno),
GeoPandas (Python) and sf (R).

Each script has been run ten times on a MacBook Pro (Apple M1 Pro / 16 GB).

Here are the steps taken in each script:

- Loading a CSV file with the latitude and longitude of
  [all trees](https://donnees.montreal.ca/dataset/arbres) in the city of
  Montreal (128 MB / 316,321 rows / 33 columns).
- Creating point geometries from the latitude and longitude columns.
- Loading the
  [Montreal neighbourhoods](https://donnees.montreal.ca/dataset/quartiers) as
  polygons (991 KB / 91 rows / 6 columns).
- Performing a spatial join to match each tree to its neighbourhood.
- Counting the number of trees in each neighbourhood.

The results are presented in the following notebook.
