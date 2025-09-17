package com.nowcoder.community.controller;

import com.nowcoder.community.annotation.LoginRequired;
import com.nowcoder.community.entity.AgendaEntry;
import com.nowcoder.community.util.HostHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/agenda")
public class AgendaController {

    @Autowired
    HostHolder hostHolder;


    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.GET)
    public String getAddTaskPage() {
        return "/site/add-task";
    }

    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public String addTask(Model model, AgendaEntry agendaEntry, String startTimeString, String endTimeString) {
        agendaEntry.setUserId(hostHolder.getUser().getId());
        System.out.println(agendaEntry);
        System.out.println(startTimeString);
        System.out.println(endTimeString);
        return "redirect:/index";
    }

}
