package spring.controllers;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String getIndexPage() {
        return "index.html";
    }

    @RequestMapping("/localDate")
    @JsonFormat(pattern = "YYYY-MM-dd")
    public LocalDate getLocalDate() {
        return LocalDate.now();
    }

    @RequestMapping("/offsetDateTime")
    public OffsetDateTime todayOffsetDateTime() {
        return OffsetDateTime.now();
    }
}