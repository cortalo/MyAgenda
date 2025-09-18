package com.nowcoder.community.service;

import com.nowcoder.community.dao.AgendaEntryMapper;
import com.nowcoder.community.entity.AgendaEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AgendaEntryService {

    @Autowired
    private AgendaEntryMapper agendaEntryMapper;

    public List<AgendaEntry> findAgendaEntriesByDay(int userId, LocalDateTime startTime) {
        List<AgendaEntry> nonRepeatEntries = agendaEntryMapper.selectAgendaEntriesByDay(userId, startTime);
        List<AgendaEntry> repeatEntries = agendaEntryMapper.selectAgendaEntries(userId, 1);

        List<AgendaEntry> filerRepeat = new ArrayList<>();
        if (!repeatEntries.isEmpty()) {
            for (AgendaEntry entry : repeatEntries) {
                // Convert Date to LocalDateTime
                LocalDateTime entryStartTime = entry.getStartTime()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime()
                        .toLocalDate()
                        .atStartOfDay();

                long diff = ChronoUnit.DAYS.between(entryStartTime, startTime);
                if (diff >= 0 && diff % entry.getRepeatDays() == 0) {
                    filerRepeat.add(entry);
                }
            }
        }

        nonRepeatEntries.addAll(filerRepeat);

        return nonRepeatEntries;
    }

    public int addAgendaEntry(AgendaEntry agendaEntry) {
        return agendaEntryMapper.insertAgendaEntry(agendaEntry);
    }

    public List<AgendaEntry> example(LocalDateTime startTime) {
        List<AgendaEntry> list = new ArrayList<>();

        AgendaEntry agendaEntry = new AgendaEntry();
        agendaEntry.setTitle("example task");
        agendaEntry.setContent("This is an example agenda entry");
        agendaEntry.setType(0); // TYPE_TODO
        agendaEntry.setUserId(1); // Example user ID
        agendaEntry.setCreateTime(new Date());
        agendaEntry.setStartTime(Date.from(startTime.plusHours(8).atZone(ZoneId.systemDefault()).toInstant()));
        agendaEntry.setEndTime(Date.from(startTime.plusHours(9).atZone(ZoneId.systemDefault()).toInstant()));

        list.add(agendaEntry);
        return list;
    }

}
