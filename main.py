import pandas as pd
from shapely.geometry import Point
from geopandas import GeoDataFrame, sjoin
import time

for i in range(10):
    start_time = time.time()

    # Load trees data
    trees = pd.read_csv("sda/data-raw/arbres-publics.csv")

    # Remove rows with missing coordinates
    trees = trees.dropna(subset=['Longitude', 'Latitude'])

    trees["geom"] = trees.apply(lambda row: Point(row["Longitude"], row["Latitude"]), axis=1)
    trees = GeoDataFrame(trees, geometry="geom")

    # Load neighborhoods data
    neighborhoods = GeoDataFrame.from_file("sda/data-raw/quartierreferencehabitation.geojson")

    # Join trees and neighborhoods data
    joined = sjoin(trees, neighborhoods, predicate="within")

    # Summarize by neighborhood
    summary = joined.groupby("nom_qr").size().reset_index(name="count")

    # print(summary)

    end_time = time.time()
    duration = round((end_time - start_time) * 1000)
    print(f"Iteration {i+1}: {duration} ms")
    csv_line = f"id,iteration,duration\npython@3.13.1/geopandas@1.0.1,{i+1},{duration}"
    with open(f"output/python-{i+1}.csv", "w") as file:
        file.write(csv_line)
