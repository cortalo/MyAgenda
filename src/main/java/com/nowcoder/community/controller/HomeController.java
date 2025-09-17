package com.nowcoder.community.controller;

import com.nowcoder.community.entity.AgendaEntry;
import com.nowcoder.community.entity.LoginTicket;
import com.nowcoder.community.entity.User;
import com.nowcoder.community.service.AgendaEntryService;
import com.nowcoder.community.service.UserService;
import com.nowcoder.community.util.CommunityConstant;
import com.nowcoder.community.util.CookieUtil;
import com.nowcoder.community.util.HostHolder;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.DayOfWeek;
import java.util.*;

@Controller
public class HomeController implements CommunityConstant {

    @Autowired
    private AgendaEntryService agendaEntryService;

    @Autowired
    private UserService userService;

    @Autowired
    private HostHolder hostHolder;

    @RequestMapping(path = "/index", method = RequestMethod.GET)
    public String getIndexPage(Model model,
                               @RequestParam(name = "current", required = false, defaultValue = "0") int current) {

        User user = hostHolder.getUser();
        LocalDate today = LocalDate.now();

        // Get a list of dates for this week (Monday to Sunday)
        LocalDate monday = today.with(DayOfWeek.MONDAY);
        List<LocalDate> weekDates = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            weekDates.add(monday.plusDays(i + current * 7));
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE dd MMMM yyyy");

        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate date : weekDates) {
            Map<String, Object> map = new HashMap<>();
            map.put("date", date);
            map.put("formattedDate", date.format(formatter));
            if (user == null) {
                List<AgendaEntry> agendaEntries = agendaEntryService.example(date.atStartOfDay());
                map.put("agendaEntries", agendaEntries);
                map.put("agendaCounts", agendaEntries.size());
            } else {
                List<AgendaEntry> agendaEntries = agendaEntryService.findAgendaEntriesByDay(user.getId(), date.atStartOfDay());
                map.put("agendaEntries", agendaEntries);
                map.put("agendaCounts", agendaEntries.size());
            }
            days.add(map);
        }
        model.addAttribute("days", days);
        model.addAttribute("current", current);
        return "/index";
    }

}
