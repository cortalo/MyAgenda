package com.nowcoder.community.controller;

import com.nowcoder.community.annotation.LoginRequired;
import com.nowcoder.community.entity.AgendaEntry;
import com.nowcoder.community.service.AgendaEntryService;
import com.nowcoder.community.util.HostHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/agenda")
public class AgendaController {

    @Autowired
    private HostHolder hostHolder;

    @Autowired
    private AgendaEntryService agendaEntryService;


    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.GET)
    public String getAddTaskPage() {
        return "/site/add-task";
    }

    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public String addTask(Model model, AgendaEntry agendaEntry, String dateString, String startTimeString, String endTimeString) {

        // Combine date and time strings to create full datetime strings
        String startDateTimeString = dateString + " " + startTimeString + ":00";
        String endDateTimeString = dateString + " " + endTimeString + ":00";
        // Parse to Date objects
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startTime = null;
        try {
            startTime = formatter.parse(startDateTimeString);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        Date endTime = null;
        try {
            endTime = formatter.parse(endDateTimeString);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        // Set the parsed dates
        agendaEntry.setStartTime(startTime);
        agendaEntry.setEndTime(endTime);
        agendaEntry.setUserId(hostHolder.getUser().getId());
        agendaEntry.setCreateTime(new Date());
        agendaEntryService.addAgendaEntry(agendaEntry);

        return "redirect:/index";

    }

}
