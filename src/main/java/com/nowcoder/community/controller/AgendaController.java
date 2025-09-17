package com.nowcoder.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/agenda")
public class AgendaController {

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public String addAgenda(Model model, String taskTitle) {
        System.out.println("title is: " + taskTitle);
        return "redirect:/index";
    }

}
