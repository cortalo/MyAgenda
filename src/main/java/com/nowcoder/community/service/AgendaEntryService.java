package com.nowcoder.community.service;

import com.nowcoder.community.dao.AgendaEntryMapper;
import com.nowcoder.community.entity.AgendaEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class AgendaEntryService {

    @Autowired
    private AgendaEntryMapper agendaEntryMapper;

    public List<AgendaEntry> findAgendaEntriesByDay(int userId, Date startTime) {
        List<AgendaEntry> nonRepeatEntries = agendaEntryMapper.selectAgendaEntriesByDay(userId, startTime);
        List<AgendaEntry> repeatEntries = agendaEntryMapper.selectAgendaEntries(userId, 1);

        List<AgendaEntry> filerRepeat = new ArrayList<>();
        if (!repeatEntries.isEmpty()) {
            for (AgendaEntry entry : repeatEntries) {
                // Calculate days difference using Calendar
                Calendar entryCalendar = Calendar.getInstance();
                entryCalendar.setTime(entry.getStartTime());
                entryCalendar.set(Calendar.HOUR_OF_DAY, 0);
                entryCalendar.set(Calendar.MINUTE, 0);
                entryCalendar.set(Calendar.SECOND, 0);
                entryCalendar.set(Calendar.MILLISECOND, 0);

                Calendar startCalendar = Calendar.getInstance();
                startCalendar.setTime(startTime);
                startCalendar.set(Calendar.HOUR_OF_DAY, 0);
                startCalendar.set(Calendar.MINUTE, 0);
                startCalendar.set(Calendar.SECOND, 0);
                startCalendar.set(Calendar.MILLISECOND, 0);

                long diffInMillis = startCalendar.getTimeInMillis() - entryCalendar.getTimeInMillis();
                long diffInDays = diffInMillis / (24 * 60 * 60 * 1000);

                if (diffInDays >= 0 && diffInDays % entry.getRepeatDays() == 0) {
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

    public List<AgendaEntry> example(Date startTime) {
        List<AgendaEntry> list = new ArrayList<>();

        AgendaEntry agendaEntry = new AgendaEntry();
        agendaEntry.setTitle("example task");
        agendaEntry.setContent("This is an example agenda entry");
        agendaEntry.setType(0); // TYPE_TODO
        agendaEntry.setUserId(1); // Example user ID
        agendaEntry.setCreateTime(new Date());
        Calendar cal = Calendar.getInstance();
        cal.setTime(startTime);
        cal.set(Calendar.HOUR_OF_DAY, 8);
        agendaEntry.setStartTime(cal.getTime());
        cal.set(Calendar.HOUR_OF_DAY, 9);
        agendaEntry.setEndTime(cal.getTime());

        list.add(agendaEntry);
        return list;
    }

    public AgendaEntry findById(int id) {
        return agendaEntryMapper.selectById(id);
    }

    public int updateAgendaEntry(AgendaEntry agendaEntry) {
        return agendaEntryMapper.updateAgendaEntry(agendaEntry);
    }

}
