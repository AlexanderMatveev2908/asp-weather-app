package server.features.weather.paperwork;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormWeatherCoords {

  @NotNull(message = "Latitude is required")
  @Min(value = -90, message = "Latitude must be greater than or equal to -90")
  @Max(value = 90, message = "Latitude must be less than or equal to 90")
  private Double lat;

  @NotNull(message = "Longitude is required")
  @Min(value = -180, message = "Longitude must be greater than or equal to -180")
  @Max(value = 180, message = "Longitude must be less than or equal to 180")
  private Double lon;

}
