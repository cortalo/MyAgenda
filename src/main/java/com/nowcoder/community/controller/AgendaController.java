package com.nowcoder.community.controller;

import com.nowcoder.community.annotation.LoginRequired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/agenda")
public class AgendaController {


    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.GET)
    public String getAddTaskPage() {
        return "/site/add-task";
    }

    @LoginRequired
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public String addTask(Model model, String title) {
        System.out.println("title is: " + title);
        return "redirect:/index";
    }

}
