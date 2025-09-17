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
        List<AgendaEntry> list = agendaEntryMapper.selectAgendaEntries(149);
        for (AgendaEntry entry : list) {
            System.out.println(entry);
        }
        Assertions.assertEquals(1, 1);
    }

    @Test
    public void testSelectAgendaEntriesByDay() {
        // Test with current date/time
        LocalDateTime today = LocalDateTime.now();
        List<AgendaEntry> todayEntries = agendaEntryMapper.selectAgendaEntriesByDay(149, today);

        System.out.println("Agenda entries for today (" + today.toLocalDate() + "):");
        for (AgendaEntry entry : todayEntries) {
            System.out.println(entry);
        }

        // Test with a specific date
        LocalDateTime specificDate = LocalDateTime.of(2024, 9, 16, 10, 0);
        List<AgendaEntry> specificDateEntries = agendaEntryMapper.selectAgendaEntriesByDay(149, specificDate);

        System.out.println("Agenda entries for " + specificDate.toLocalDate() + ":");
        for (AgendaEntry entry : specificDateEntries) {
            System.out.println(entry);
        }

        Assertions.assertTrue(todayEntries != null);
        Assertions.assertTrue(specificDateEntries != null);
    }

}
