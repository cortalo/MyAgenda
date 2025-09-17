package com.nowcoder.community.service;

import com.nowcoder.community.dao.AgendaEntryMapper;
import com.nowcoder.community.entity.AgendaEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgendaEntryService {

    @Autowired
    private AgendaEntryMapper agendaEntryMapper;

    public List<AgendaEntry> findAgendaEntriesByDay(int userId, LocalDateTime startTime) {
        return agendaEntryMapper.selectAgendaEntriesByDay(userId, startTime);
    }

    public int addAgendaEntry(AgendaEntry agendaEntry) {
        return agendaEntryMapper.insertAgendaEntry(agendaEntry);
    }

}
