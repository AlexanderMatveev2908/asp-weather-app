package server.features.weather.paperwork;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import server.paperwork.Reg;

@Data
public class FormWeatherCity {
  @NotNull
  @NotBlank
  @Pattern(regexp = Reg.CITY, message = "Invalid city")
  @Length(max = 100, message = "City max be within 100 characters")
  String city;
}
