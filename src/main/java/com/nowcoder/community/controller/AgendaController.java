package com.nowcoder.community.controller;

import com.nowcoder.community.annotation.LoginRequired;
import com.nowcoder.community.entity.AgendaEntry;
import com.nowcoder.community.service.AgendaEntryService;
import com.nowcoder.community.util.CommunityConstant;
import com.nowcoder.community.util.HostHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class AgendaController implements CommunityConstant {

    @Autowired
    private HostHolder hostHolder;

    @Autowired
    private AgendaEntryService agendaEntryService;


    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.GET)
    public String getAddTaskPage(Model model) {
        model.addAttribute("today", new Date());
        return "/site/add-task";
    }

    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public String addTask(Model model, AgendaEntry agendaEntry, String dateString, String startTimeString,
                          String endTimeString, int repeatType, String repeatNum) {

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


        // repeat information
        int repeatNumInt = 0;
        try {
            repeatNumInt = Integer.parseInt(repeatNum);
        } catch (Exception e) {
            repeatNumInt = 0;
        }

        switch (repeatType) {
            case REPEAT_TYPE_WEEK:
                agendaEntry.setRepeatDays(7*repeatNumInt);
                break;
            case REPEAT_TYPE_DAY:
                agendaEntry.setRepeatDays(repeatNumInt);
                break;
            default:
                agendaEntry.setRepeatDays(0);
        }

        agendaEntryService.addAgendaEntry(agendaEntry);

        return "redirect:/index";

    }

    @LoginRequired
    @RequestMapping(path = "/update/{id}", method = RequestMethod.GET)
    public String getUpdatePage(Model model, @PathVariable("id") int agendaId) {
        AgendaEntry agendaEntry = agendaEntryService.findById(agendaId);
        if (agendaEntry.getUserId() != hostHolder.getUser().getId()) {
            return "redirect:/index";
        }
        model.addAttribute("agendaEntry", agendaEntry);
        if (agendaEntry.getRepeatDays() == 0) {
            model.addAttribute("repeatType", 0);
        } else if (agendaEntry.getRepeatDays() % 7 == 0) {
            model.addAttribute("repeatType", 1);
            model.addAttribute("repeatNum", agendaEntry.getRepeatDays() / 7);
        } else {
            model.addAttribute("repeatType", 2);
            model.addAttribute("repeatNum", agendaEntry.getRepeatDays());
        }

        return "/site/update-task";
    }

    @LoginRequired
    @PostMapping("/update/{id}")
    public String updateAgendaEntry(@PathVariable("id") int agendaId, AgendaEntry agendaEntry,
                                    String dateString, String startTimeString,
                                    String endTimeString, int repeatType, String repeatNum) {
        System.out.println("inside this method");
        AgendaEntry oldAgendaEntry = agendaEntryService.findById(agendaId);
        if (oldAgendaEntry.getUserId() != hostHolder.getUser().getId()) {
            return "redirect:/index";
        }


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
        agendaEntry.setCreateTime(oldAgendaEntry.getCreateTime());
        agendaEntry.setId(oldAgendaEntry.getId());


        // repeat information
        int repeatNumInt = 0;
        try {
            repeatNumInt = Integer.parseInt(repeatNum);
        } catch (Exception e) {
            repeatNumInt = 0;
        }

        switch (repeatType) {
            case REPEAT_TYPE_WEEK:
                agendaEntry.setRepeatDays(7*repeatNumInt);
                break;
            case REPEAT_TYPE_DAY:
                agendaEntry.setRepeatDays(repeatNumInt);
                break;
            default:
                agendaEntry.setRepeatDays(0);
        }

        agendaEntryService.updateAgendaEntry(agendaEntry);
        return "redirect:/index";

    }

}
