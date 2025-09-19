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

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Calendar;

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
        // get start of the day
        Calendar cal = Calendar.getInstance();
        Date today = new Date();
        cal.setTime(today);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        today = cal.getTime();

        // Get a list of dates for this week (Monday to Sunday)
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        cal.add(Calendar.WEEK_OF_YEAR, current);

        List<Date> weekDates = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            weekDates.add(cal.getTime());
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }
        SimpleDateFormat formatter = new SimpleDateFormat("EEEE dd MMMM yyyy");

        List<Map<String, Object>> days = new ArrayList<>();
        for (Date date : weekDates) {
            Map<String, Object> map = new HashMap<>();
            map.put("date", date);

            // Check if this date is today
            boolean isToday = isSameDay(today, date);
            String formattedDate = formatter.format(date);
            if (isToday) {
                formattedDate = "* " + formattedDate;
            }
            map.put("formattedDate", formattedDate);
            if (user == null) {
                List<AgendaEntry> agendaEntries = agendaEntryService.example(date);
                map.put("agendaEntries", agendaEntries);
                map.put("agendaCounts", agendaEntries.size());
            } else {
                List<AgendaEntry> agendaEntries = agendaEntryService.findAgendaEntriesByDay(user.getId(), date);
                map.put("agendaEntries", agendaEntries);
                map.put("agendaCounts", agendaEntries.size());
            }
            days.add(map);
        }
        model.addAttribute("days", days);
        model.addAttribute("current", current);
        return "/index";
    }

    private boolean isSameDay(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();
        cal1.setTime(date1);
        cal2.setTime(date2);
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
               cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR);
    }

}
