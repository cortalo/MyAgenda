package com.nowcoder.community.dao;

import com.nowcoder.community.entity.AgendaEntry;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface AgendaEntryMapper {

    int insertAgendaEntry(AgendaEntry agendaEntry);

    /**
     * return all agenda entries for a user, based on the repeat mode
     * @param userId: match userId
     * @param repeatMode: 0 -> return all non-repeated agenda; 1 -> return all repeated agenda
     * @return a list of agenda entries
     */
    List<AgendaEntry> selectAgendaEntries(int userId, int repeatMode);

    /**
     * return match non-repeated agenda entries.
     * @param userId: match userId
     * @param startTime: match startTime by DATE
     * @return a list of agendaEntry
     */
    List<AgendaEntry> selectAgendaEntriesByDay(int userId, LocalDateTime startTime);

    AgendaEntry selectById(int id);

    int updateAgendaEntry(AgendaEntry agendaEntry);

}
