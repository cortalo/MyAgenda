package com.nowcoder.community;


import com.nowcoder.community.dao.AgendaEntryMapper;
import com.nowcoder.community.dao.DiscussPostMapper;
import com.nowcoder.community.entity.AgendaEntry;
import com.nowcoder.community.entity.DiscussPost;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class MapperTests {

    @Autowired
    private DiscussPostMapper discussPostMapper;

    @Autowired
    private AgendaEntryMapper agendaEntryMapper;

    @Test
    public void testSelectPosts() {
        List<DiscussPost> list = discussPostMapper.selectDiscussPosts(149, 0, 10);
        for(DiscussPost post : list) {
            System.out.println(post);
        }
        Assertions.assertEquals(1,1);
    }

    @Test
    public void testSelectAgenda() {
//        AgendaEntry agendaEntry = new AgendaEntry();
//        agendaEntry.setUserId(149);
//        agendaEntry.setTitle("task 2");
//        agendaEntry.setContent("task 2 content");
//        agendaEntry.setCreateTime(new Date());
//        agendaEntry.setStartTime(new Date(2025-1900, Calendar.SEPTEMBER, 17, 15, 30));
//        agendaEntry.setEndTime(new Date(2025-1900, Calendar.SEPTEMBER, 17, 16, 30));
//        agendaEntryMapper.insertAgendaEntry(agendaEntry);

        List<AgendaEntry> list = agendaEntryMapper.selectAgendaEntries(150, 1);
        for (AgendaEntry entry : list) {
            System.out.println(entry);
        }
        Assertions.assertEquals(1, 1);
    }


}
