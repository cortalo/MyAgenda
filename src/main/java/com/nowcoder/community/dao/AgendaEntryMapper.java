package com.nowcoder.community.dao;

import com.nowcoder.community.entity.AgendaEntry;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface AgendaEntryMapper {

    int insertAgendaEntry(AgendaEntry agendaEntry);

    List<AgendaEntry> selectAgendaEntries(int userId);

    List<AgendaEntry> selectAgendaEntriesByDay(int userId, LocalDateTime startTime);

}
