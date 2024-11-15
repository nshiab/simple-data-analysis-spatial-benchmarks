suppressPackageStartupMessages({
  library(sf)
  library(dplyr)
})

for (i in 1:10) {
  start_time <- Sys.time()
  
  # Load trees data
  trees <- read.csv("sda/data-raw/arbres-publics.csv")
  
  # Remove rows with missing coordinates
  trees <- trees %>%
    filter(!is.na(Longitude), !is.na(Latitude))
  
  trees_sf <- st_as_sf(trees, coords = c("Longitude", "Latitude"), crs = 4326)
  
  # Load neighborhoods data
  neighborhoods <- st_read("sda/data-raw/quartierreferencehabitation.geojson", quiet = TRUE)
  
  # Spatial join: trees within neighborhoods
  joined <- st_join(trees_sf, neighborhoods, join = st_within)
  
  # Summarize by neighborhood
  summary <- joined %>%
    group_by(nom_qr) %>%
    summarize(count = n())
  
  end_time <- Sys.time()
  execution_time <- round(as.numeric(end_time - start_time) * 1000)
  print(paste("Execution time:", execution_time, "ms"))
  csv_line <- data.frame(id = "r@4.4.2/sf@1.0.19", iteration = i, duration = execution_time)
  write.csv(csv_line, file = paste0("output/R-", i, ".csv"), row.names = FALSE, quote = FALSE)
}
