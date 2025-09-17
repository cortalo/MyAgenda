package com.nowcoder.community.controller;

import com.nowcoder.community.entity.AgendaEntry;
import com.nowcoder.community.service.AgendaEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.DayOfWeek;
import java.util.*;

@Controller
public class HomeController {

    @Autowired
    private AgendaEntryService agendaEntryService;

    @RequestMapping(path = "/index", method = RequestMethod.GET)
    public String getIndexPage(Model model) {
        LocalDate today = LocalDate.now();

        // Get a list of dates for this week (Monday to Sunday)
        LocalDate monday = today.with(DayOfWeek.MONDAY);
        List<LocalDate> weekDates = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            weekDates.add(monday.plusDays(i));
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE dd MMMM yyyy");

        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate date : weekDates) {
            Map<String, Object> map = new HashMap<>();
            map.put("date", date);
            map.put("formattedDate", date.format(formatter));
            List<AgendaEntry> agendaEntries = agendaEntryService.findAgendaEntriesByDay(149, date.atStartOfDay());
            map.put("agendaEntries", agendaEntries);
            map.put("agendaCounts", agendaEntries.size());
            days.add(map);
        }
        model.addAttribute("days", days);
        return "/index";
    }

}
